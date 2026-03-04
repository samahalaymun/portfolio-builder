import { Badge } from "@/components/ui/badge";

function PermissionRow({
  icon: Icon,
  label,
  granted,
}: {
  icon: any;
  label: string;
  granted: boolean;
}) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Icon className="w-4 h-4" />
        {label}
      </div>
      <Badge variant={granted ? "default" : "secondary"}>
        {granted ? "Enabled" : "Locked"}
      </Badge>
    </div>
  );
}

export default PermissionRow
