import { Animated } from "@/components/ui/animated";
import type { ContactReason } from "../types";
import { Mail, MessageSquare } from "lucide-react";

function ContactCard({
  reason,
  index,
}: {
  reason: ContactReason;
  index: number;
}) {
  const Icon = reason.icon;

  return (
    <Animated delay={index * 80} variant="flip">
      <div
        className="group rounded-2xl border border-border bg-background p-6
                      hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5
                      hover:-translate-y-1 transition-all duration-300"
      >
        <div
          className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20
                        flex items-center justify-center text-primary mb-4
                        group-hover:scale-110 transition-transform"
        >
          <Icon className="w-6 h-6" />
        </div>

        <h3 className="font-semibold text-foreground mb-2">{reason.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {reason.description}
        </p>

        <div className="flex items-center gap-2 text-sm text-primary/60 font-medium">
          {reason.action.includes("@") ? (
            <a
              href={`mailto:${reason.action}`}
              className="flex items-center gap-2 hover:underline"
            >
              <Mail className="w-4 h-4" />
              {reason.action}
            </a>
          ) : (
            <span className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              {reason.action}
            </span>
          )}
        </div>
      </div>
    </Animated>
  );
}
export default ContactCard;
