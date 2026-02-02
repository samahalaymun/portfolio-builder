import StatusCard from "./StatusCard";

function ExportStatus() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <StatusCard
        title="Portfolio status"
        value="Ready"
        hint="All required sections completed"
      />
      <StatusCard
        title="Theme"
        value="Custom Theme"
        hint="Applied to preview & export"
      />
      <StatusCard
        title="Last update"
        value="Just now"
        hint="Saved automatically"
      />
    </div>
  );
}

export default ExportStatus
