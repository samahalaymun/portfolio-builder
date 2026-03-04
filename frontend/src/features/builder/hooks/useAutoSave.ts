import { useEffect, useRef, useCallback, useState } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

interface UseAutoSaveOptions<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSave: (data: T) => Promise<void>;
  debounceMs?: number;
  enabled?: boolean;
  fieldsToValidate?: string[];
}

export function useAutoSave<T extends FieldValues>({
  form,
  onSave,
  debounceMs = 2000,
  enabled = true,
  fieldsToValidate,
}: UseAutoSaveOptions<T>) {
  const { getValues, trigger } = form;

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const saveInProgressRef = useRef(false);
  const isSavingRef = useRef(false);
  const onSaveRef = useRef(onSave);
  const enabledRef = useRef(enabled);
  const fieldsToValidateRef = useRef(fieldsToValidate);
  const lastSavedDataRef = useRef<string | null>(null); // ✅ null = not seeded yet
  const isSeededRef = useRef(false);

  // Sync refs inline
  onSaveRef.current = onSave;
  enabledRef.current = enabled;
  fieldsToValidateRef.current = fieldsToValidate;

  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | undefined>();

  const save = useCallback(async () => {
    if (!enabledRef.current) return;
    if (saveInProgressRef.current || isSavingRef.current) return;
    // ✅ Not seeded yet — skip. Seed happens in useEffect after form values settle
    if (!isSeededRef.current) return;

    const currentData = JSON.stringify(getValues());
    if (currentData === lastSavedDataRef.current) return;

    if (fieldsToValidateRef.current?.length) {
      const isValid = await trigger(fieldsToValidateRef.current as any);
      if (!isValid) return;
    }

    saveInProgressRef.current = true;
    isSavingRef.current = true;
    setIsSaving(true);

    try {
      await onSaveRef.current(getValues());
      lastSavedDataRef.current = currentData;
      setLastSaved(new Date());
    } catch (err) {
      console.error("Auto-save error:", err);
    } finally {
      saveInProgressRef.current = false;
      isSavingRef.current = false;
      setIsSaving(false);
    }
  }, [getValues, trigger]);

  // ✅ Seed AFTER form values are fully settled from the API
  // formValues prop flows into RHF via `values`, which resets the form internally
  // form.watch fires during that reset — we must seed AFTER it settles
  // useEffect with form.formState.defaultValues as signal catches this correctly
  useEffect(() => {
    if (!enabled) return;
    // Small delay to let RHF finish its internal reset from `values` prop
    const t = setTimeout(() => {
      lastSavedDataRef.current = JSON.stringify(getValues());
      isSeededRef.current = true;
    }, 100);
    return () => clearTimeout(t);
  }, [enabled, getValues]);

  // ✅ Single subscription — mount once, never re-subscribes
  useEffect(() => {
    const subscription = form.watch(() => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(save, debounceMs);
    });
    return () => {
      subscription.unsubscribe();
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { isSaving, lastSaved, forceSave: save };
}
