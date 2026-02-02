import { Button } from "@/components/ui/button";

function ExportPreview() {
  return (
    <div className="rounded-xl border p-8">
      <h3 className="text-lg font-semibold mb-2">Preview your portfolio</h3>
      <p className="text-sm text-muted-foreground mb-6">
        See how your portfolio looks before exporting.
      </p>

      <div className="flex gap-4 flex-wrap">
        <Button variant="outline">Desktop Preview</Button>
        <Button variant="outline">Mobile Preview</Button>
      </div>
    </div>
  );
}

export default ExportPreview
