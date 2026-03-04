import { memo } from "react";
import { cn } from "@/lib/utils";
import { BLOCKS_REGISTRY } from "../schema/blocks.registry";

interface StepIndicatorProps {
  currentStep: number;
  completedSteps: string[];
  contentSteps: string[];
}

const StepIndicator = memo(
  ({ currentStep, completedSteps, contentSteps }: StepIndicatorProps) => {
      console.log("render StepIndicator");

    return (
      <div className="relative mb-10">
        {/* Progress line */}
        <div className="absolute top-4 left-0 right-0 h-0.5 bg-border -z-10 hidden sm:block" />

        {/* Steps */}
        <div className="flex justify-between items-start gap-2">
          {contentSteps.map((stepId, index) => {
            const isActive = index === currentStep;
            const isCompleted = completedSteps.includes(stepId);
            const block = BLOCKS_REGISTRY[stepId];

            return (
              <div
                key={`step-${stepId}-${index}`}
                className="flex flex-col items-center gap-2 flex-1"
              >
                {/* Step circle */}
                <div
                  className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all relative z-10",
                    "border-2",
                    isCompleted && "bg-green-500 border-green-500 text-white",
                    isActive &&
                      !isCompleted &&
                      "bg-primary border-primary text-primary-foreground ring-4 ring-primary/20",
                    !isActive &&
                      !isCompleted &&
                      "bg-background border-border text-muted-foreground",
                  )}
                >
                  {isCompleted ? (
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Desktop label */}
                <span className="text-xs text-center transition-colors hidden sm:block max-w-25 text-muted-foreground">
                  {block?.label || stepId}
                </span>

                {/* Mobile: only active label */}
                <span
                  className={cn(
                    "text-xs text-center transition-colors sm:hidden",
                    isActive ? "text-foreground font-semibold" : "hidden",
                  )}
                >
                  {block?.label || stepId}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

export default StepIndicator;
