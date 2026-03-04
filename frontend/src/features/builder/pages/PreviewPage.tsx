import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Laptop, MonitorUp, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import Breadcrumbs from "../layout/Breadcrumb";
import { Link } from "react-router-dom";

const breadcrumbs = [
  { label: "Builder", to: "/builder/start" },
  { label: "Preview" },
];

function PreviewPage() {
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    document.title = "Portify - Preview";
  }, []);
 
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <div className="min-h-screen py-16 px-4 md:px-10">
        <div className="space-y-6">
          {/* Toolbar */}
          <div className="flex items-start justify-between flex-col md:flex-row md:items-center gap-4 md:px-4">
            <div className="flex gap-2">
              <Button
                variant={mode === "desktop" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("desktop")}
              >
                <Laptop className="w-4 h-4 mr-2" />
                Desktop
              </Button>
              <Button
                variant={mode === "mobile" ? "default" : "outline"}
                size="sm"
                onClick={() => setMode("mobile")}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Mobile
              </Button>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link className="flex gap-2 items-center" to="/builder/export">
                <MonitorUp size={18} />
                Export
              </Link>
            </Button>
          </div>

          {/* Preview Frame */}
          <div className="flex justify-center">
            <div
              className={cn(
                "bg-background border rounded-xl shadow-lg overflow-hidden transition-all duration-300",
                mode === "desktop" && "w-full h-[90vh] overflow-y-auto",
                mode === "mobile" && "w-[375px] h-[812px] overflow-y-auto",
              )}
            >
              <iframe src="/preview-frame" className="w-full h-full border-0" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PreviewPage;
