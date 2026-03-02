import { Button } from "@/components/ui/button";
import { downloadBlob, downloadJSON } from "@/lib/utils";
import { exportPortfolio } from "../renderer/exportZip";

function ExportOptions() {
  
  return (
    <div className="rounded-sm border p-8 bg-background">
      <h3 className="text-lg font-semibold mb-2">Export options</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Download your portfolio and host it anywhere.
      </p>

      <div className="flex gap-4 flex-wrap">
        <Button
          onClick={async () => {
            //const blob = await exportPortfolio(profile);
            //downloadBlob(blob, "portfolio-export.zip");
          }}
        >
          Export as HTML
        </Button>

        <Button variant="outline" >
          Download JSON data
        </Button>

        <Button variant="ghost" disabled>
          Export PDF (coming soon)
        </Button>
      </div>
    </div>
  );
}

export default ExportOptions;
