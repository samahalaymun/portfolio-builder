import { useFormContext } from "react-hook-form";
import type { ContentFormValues } from "../schema";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

function GoToPreviewButton() {
  const navigate = useNavigate();
  const form = useFormContext<ContentFormValues>();
  async function handlePreview() {
    const isValid = await form.trigger();

    if (!isValid) {
      // optional: scroll لأول error
      const firstError = Object.keys(form.formState.errors)[0];
      if (firstError) {
        const el = document.querySelector(`[name="${firstError}"]`);
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    navigate("/builder/preview");
  }
  return (
    <Button
      onClick={handlePreview}
      variant="ghost"
      className="flex items-center gap-3 px-4 py-2 text-sm font-medium transition"
    >
      Preview <Eye />
    </Button>
  );
}

export default GoToPreviewButton;
