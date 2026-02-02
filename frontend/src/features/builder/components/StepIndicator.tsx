import { CONTENT_STEPS } from "@/data/constants";
import { cn } from "@/lib/utils";

function StepIndicator({
  currentStep,
  completedSteps,
}: {
  currentStep: number;
  completedSteps:string[];
}) {
  return (
    <div className="flex justify-between mb-10">
      {CONTENT_STEPS.map((step, index) => {
        const isActive = index === currentStep;
        const isCompleted = completedSteps.includes(step.id);
        return (
          <div>
            <div key={step.id} className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold",
                  isCompleted && "bg-green-500 text-white",
                  isActive && "bg-primary text-primary-foreground",
                  !isActive && !isCompleted && "bg-muted text-muted-foreground",
                )}
              >
                {isCompleted ? "✓" : index + 1}
              </div>
           
              <span className="text-xs md:block hidden">{step.title}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default StepIndicator
