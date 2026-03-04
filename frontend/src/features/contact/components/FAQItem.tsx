import { Animated } from "@/components/ui/animated";
import { cn } from "@/lib/utils";
import type { FAQ } from "../types";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useState } from "react";

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Animated delay={index * 60} variant="flip">
      <div
        className="border border-border rounded-xl overflow-hidden bg-background
                      hover:border-primary/40 transition-colors duration-200"
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between gap-4 p-5 text-left
                     group transition-colors duration-200 hover:bg-muted/30"
        >
          <div className="flex items-start gap-3 flex-1">
            <HelpCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <span className="font-semibold text-foreground">
              {faq.question}
            </span>
          </div>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>

        <div
          className={cn(
            "grid transition-all duration-200 ease-in-out",
            isOpen
              ? "grid-rows-[1fr] opacity-100"
              : "grid-rows-[0fr] opacity-0",
          )}
        >
          <div className="overflow-hidden">
            <p className="px-5 pb-5 pl-13 text-muted-foreground leading-relaxed">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </Animated>
  );
}

export default FAQItem
