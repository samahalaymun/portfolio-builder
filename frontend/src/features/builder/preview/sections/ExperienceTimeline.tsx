// ExperienceTimeline.tsx - With Pagination & Smart Variants
import { useState } from "react";
import type { Experience } from "../../types";
import { Animated } from "@/components/ui/animated";
import {
  BriefcaseBusiness,
  CalendarDays,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ExpandableText from "./ExpandableText";
import type { QualificationConfig } from "../../templates/config";

interface ExperienceTimelineProps {
  data: Experience[];
  config: QualificationConfig;
}

function ExperienceTimeline({
  data,
  config,
}: ExperienceTimelineProps) {
  const [showAll, setShowAll] = useState(false);

  // ✅ Pagination from config
  const shouldPaginate = data.length > config.paginateThreshold;
  const displayData =
    shouldPaginate && !showAll ? data.slice(0, config.initialCount) : data;
  const hiddenCount = data.length - config.initialCount;

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-2 mb-8">
        <div className="p-2 rounded-md bg-primary/10">
          <BriefcaseBusiness className="text-primary" size={18} />
        </div>
        <h3 className="text-lg font-semibold text-foreground">
          Work Experience
        </h3>
        {shouldPaginate && (
          <span className="text-xs text-muted-foreground ml-auto">
            {data.length} positions
          </span>
        )}
      </div>

      <div className={cn("relative", config.showTimeline && "space-y-0")}>
        {/* ✅ Timeline track (conditional) */}
        {config.showTimeline && config.timelineTrack && (
          <div className={config.timelineTrack} />
        )}

        {displayData.map((exp, i) => (
          <Animated
            key={i}
            delay={i * 80}
            variant="flip"
            className={cn(
              config.showTimeline ? "mb-8 last:mb-0" : "mb-4 last:mb-0",
            )}
          >
            <div className={cn("relative", config.showTimeline && "pl-10")}>
              {/* ✅ Timeline dot (conditional, uses config styles) */}
              {config.showTimeline && config.timelineDot && (
                <span
                  className={cn(
                    "absolute left-0 top-1 flex items-center justify-center",
                    config.timelineDot,
                  )}
                >
                  {config.timelineDotInner && (
                    <span className={config.timelineDotInner} />
                  )}
                </span>
              )}

              {/* ✅ Card (uses config class) */}
              <div className={config.cardClass}>
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div>
                    <h4 className="font-semibold text-foreground">
                      {exp.role}
                    </h4>
                    <p className="text-sm text-primary font-medium">
                      {exp.company}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-background border px-2.5 py-1 rounded-full shrink-0">
                    <CalendarDays className="w-3 h-3" />
                    {exp.startDate} – {exp.endDate || "Present"}
                  </div>
                </div>
                {exp.description && <ExpandableText text={exp.description} />}
              </div>
            </div>
          </Animated>
        ))}

        {/* ✅ Pagination (conditional) */}
        {config.showPagination && shouldPaginate && (
          <Animated variant="flip" delay={400}>
            <div className="mt-6 flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowAll(!showAll)}
                className="gap-2"
              >
                {showAll ? (
                  <>
                    <ChevronUp className="h-4 w-4" />
                    Show Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-4 w-4" />
                    Show {hiddenCount} More{" "}
                    {hiddenCount === 1 ? "Position" : "Positions"}
                  </>
                )}
              </Button>
            </div>
          </Animated>
        )}
      </div>
    </div>
  );
}

export default ExperienceTimeline;
