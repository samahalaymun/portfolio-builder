import { useEffect, useRef, useCallback, useState } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

interface UseAutoSaveOptions<T extends FieldValues> {
  form: UseFormReturn<T>;
  onSave: (data: T) => Promise<void>;
  debounceMs?: number;
  enabled?: boolean;
  validateBeforeSave?: boolean;
}

export function useAutoSave<T extends FieldValues>({
  form,
  onSave,
  debounceMs = 2000,
  enabled = true,
  validateBeforeSave = true,
}: UseAutoSaveOptions<T>) {
  const { getValues, trigger } = form;
 

  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const [isSaving, setIsSaving] = useState(false);
  const [skipSave, setSkipSave] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | undefined>();
  const lastSavedDataRef = useRef<string>("");
  const saveInProgressRef = useRef(false); // ✅ Prevent race conditions

  const save = useCallback(async () => {
    //Prevent simultaneous saves
    if (saveInProgressRef.current || isSaving) {
      return;
    }
    const currentData = JSON.stringify(getValues());
    // Skip if no changes
    if (currentData === lastSavedDataRef.current) {
      return;
    }

    //CRITICAL: Validate BEFORE setting any flags
    if (validateBeforeSave) {
      const isFormValid = await trigger(); //Await validation
      if (!isFormValid) {
        setSkipSave(true);
        return; // EXIT - Don't proceed to save
      }
    }

    //Only set flags AFTER validation passes
    saveInProgressRef.current = true;
    setSkipSave(false);
    setIsSaving(true);

    try {
      await onSave(getValues());
      lastSavedDataRef.current = currentData;
      setLastSaved(new Date());
    } catch (error) {
      console.error("Save error:", error);
    } finally {
      setIsSaving(false);
      setSkipSave(false);

      saveInProgressRef.current = false;
    }
  }, [getValues, onSave, isSaving, trigger, validateBeforeSave]);

  // Debounced auto-save
 useEffect(() => {
   if (!enabled) return;
   const subscription = form.watch(() => {
     if (timeoutRef.current) {
       clearTimeout(timeoutRef.current);
     }

     timeoutRef.current = setTimeout(() => {
       save();
     }, debounceMs);
   });

   return () => {
     subscription.unsubscribe();
     if (timeoutRef.current) {
       clearTimeout(timeoutRef.current);
     }
   };
 }, [form, save, debounceMs, enabled]);

  // Save on unmount (only if form is valid)
  // useEffect(() => {
  //   return () => {
  //     if (isDirty && enabled) {
  //       // Check if there are unsaved changes
  //       const currentData = JSON.stringify(getValues());
  //       if (currentData !== lastSavedDataRef.current) {
  //         // Validate before saving on unmount
  //         trigger().then((isValid) => {
  //           if (isValid) {
  //             onSave(getValues()).catch(console.error);
  //           }
  //         });
  //       }
  //     }
  //   };
  // }, [isDirty, enabled, getValues, onSave, trigger]);

  return {
    isSaving,
    lastSaved,
    forceSave: save,
    skipSave,
  };
}
