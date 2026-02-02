import { useState } from "react";
import { cn } from "@/lib/utils";
import { Laptop, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBuilderStore } from "../store/builder.store";
import Breadcrumbs from "../layout/Breadcrumb";
 const breadcrumbs = [{ label: "Builder" }, { label: "Preview" }];

function PreviewPage() {
  const [mode, setMode] = useState<"desktop" | "mobile">("desktop");
  const { profile } = useBuilderStore();
   document.title ="Portify - "+"Preview";

  return (
    <>
      <Breadcrumbs items={breadcrumbs} className="ml-14 lg:ml-0" />

      <div className="min-h-screen bg-background py-16 px-4 md:px-10 ">
        <div className="space-y-6">
          {/* Toolbar */}
          <div className="flex justify-center items-center gap-2">
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

          {/* Preview Frame */}
          <div className="flex justify-center ">
            <div
              className={cn(
                "bg-background border rounded-xl shadow-lg overflow-hidden transition-all duration-300",
                mode === "desktop" && "w-full  h-[90vh] overflow-y-auto",
                mode === "mobile" && "w-93.75 h-180 overflow-y-auto",
              )}
            >
              <iframe
                src={`/preview-frame?theme=${profile?.theme?.id}`}
                className="w-full h-full border-0"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PreviewPage;
