import { Animated } from "@/components/ui/animated";
import Heading from "../components/Heading";
import ExportStatus from "../export/components/ExportStatus";
import ExportPreview from "../export/components/ExportPreview";
import ExportOptions from "../export/components/ExportOptions";
import PublishOptions from "../export/components/PublishOptions";
import Breadcrumbs from "../layout/Breadcrumb";
const breadcrumbs = [{ label: "Builder" }, { label: "Export" }];
function ExportPage() {
  document.title = "Portify - " + "Export";
  return (
    <>
      <Breadcrumbs items={breadcrumbs} className="ml-14 lg:ml-0" />
      <div className="py-16 px-4 md:px-10 ">
        <Heading title="Export & Publish" />
        <Animated variant="flip">
          <p className="text-muted-foreground text-lg mb-10">
            Your portfolio is ready. Preview it, export the files, or publish it
            online.
          </p>
        </Animated>
        <ExportStatus />
        <ExportPreview />
        <ExportOptions />
        <PublishOptions />
      </div>
    </>
  );
}

export default ExportPage;
