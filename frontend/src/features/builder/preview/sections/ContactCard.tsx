import type { ReactNode } from "react";

type contactCardProps = {
  icon:ReactNode;
  value:string;
  label:string;
};
function ContactCard({ icon, value, label }: contactCardProps) {
  return (
    <div className="flex gap-4 items-center">
      {icon}
      <div className="space--y-2">
        <h4 className="font-semibold">{label}</h4>
        <p className="text-muted-foreground">{value}</p>
      </div>
    </div>
  );
}

export default ContactCard
