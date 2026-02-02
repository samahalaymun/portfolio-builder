
function StatusCard({
  title,
  value,
  hint,
}: {
  title: string;
  value: string;
  hint: string;
}) {
  return (
    <div className="rounded-xl border p-6 bg-background">
      <p className=" text-muted-foreground">{title}</p>
      <p className="text-xl font-semibold mt-1">{value}</p>
      <small className=" text-muted-foreground mt-2">{hint}</small>
    </div>
  );
}

export default StatusCard
