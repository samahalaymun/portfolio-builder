// ProjectCard.tsx - Using Config for Different Layouts
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CodeXml } from "lucide-react";
import { useState } from "react";
import { cn, resolveTheme } from "@/lib/utils";
import type { Project } from "../../types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useThemeStore } from "../../store/builder.store";
import type { ProjectsConfig } from "../../templates/config";

interface ProjectCardProps {
  project: Project;
  themeId: string;
  config: ProjectsConfig;
}

function ProjectCard({ project, themeId, config }: ProjectCardProps) {
  const [open, setOpen] = useState(false);
  const { themeMode } = useThemeStore((s) => s);
  const resolved = resolveTheme(themeMode);

  // ✅ Minimal template: Horizontal card
  if (config.layout === "list") {
    return (
      <>
        <div
          className={config.cardClass}
          onClick={() => config.showModal && setOpen(true)}
        >
          {/* Image on left */}
          {project.image?.url ? (
            <div className={config.imageWrapper}>
              <img
                src={project.image.url}
                alt={project.title}
                className={config.imageClass}
              />
            </div>
          ) : (
            <div
              className={cn(
                config.imageWrapper,
                "bg-muted flex items-center justify-center rounded-md",
              )}
            >
              <CodeXml className="w-8 h-8 text-primary/30" />
            </div>
          )}

          {/* Content on right */}
          <div className={config.titleClass}>
            <h5 className={config.titleText}>{project.title}</h5>
            {config.showDescriptionOnCard && project.description && (
              <p className={config.descriptionClass}>{project.description}</p>
            )}
            {project.technologies && project.technologies.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {project.technologies.slice(0, 3).map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs text-muted-foreground">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        {config.showModal && (
          <ProjectModal
            project={project}
            themeId={themeId}
            resolved={resolved??""}
            open={open}
            setOpen={setOpen}
          />
        )}
      </>
    );
  }

  // ✅ Default & Modern: Image card
  return (
    <>
      <div
        className={cn(config.cardClass, config.cardHeight)}
        onClick={() => config.showModal && setOpen(true)}
      >
        {/* Image */}
        {project.image?.url ? (
          <img
            src={project.image.url}
            alt={project.title}
            className={config.imageClass}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
            <CodeXml className="w-10 h-10 text-primary/30" />
          </div>
        )}

        {/* Overlay */}
        {config.showOverlay && <div className={config.overlayClass} />}

        {/* Title */}
        <div className={config.titleClass}>
          <h5 className={config.titleText}>{project.title}</h5>

          {/* ✅ Tags on card (modern template) */}
          {config.showTagsOnCard &&
            project.technologies &&
            project.technologies.length > 0 && (
              <div className={config.tagsClass}>
                {project.technologies.slice(0, 4).map((tech, i) => (
                  <span key={i} className={config.tagClass}>
                    {tech}
                  </span>
                ))}
              </div>
            )}
        </div>
      </div>

      {config.showModal && (
        <ProjectModal
          project={project}
          themeId={themeId}
          resolved={resolved??""}
          open={open}
          setOpen={setOpen}
        />
      )}
    </>
  );
}

// ✅ Extracted modal component
function ProjectModal({
  project,
  themeId,
  resolved,
  open,
  setOpen,
}: {
  project: Project;
  themeId: string;
  resolved: string;
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        data-theme={themeId}
        className={cn(resolved, "md:max-w-xl")}
      >
        <DialogHeader>
          <DialogTitle className="text-xl">{project.title}</DialogTitle>
        </DialogHeader>

        {project.image?.url && (
          <img
            src={project.image.url}
            alt={project.title}
            className="rounded-lg w-full object-cover max-h-56"
          />
        )}

        {project.description && (
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {project.description}
          </p>
        )}

        {(project.technologies?.length ?? 0) > 0 && (
          <div>
            <p className="text-xs font-semibold text-foreground mb-2 uppercase tracking-wide">
              Technologies
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies?.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 pt-2">
          {project.liveDemo && (
            <Button asChild size="sm">
              <a
                href={project.liveDemo}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ArrowUpRight className="w-4 h-4" />
                Live Demo
              </a>
            </Button>
          )}
          {project.sourceCode && (
            <Button asChild variant="outline" size="sm">
              <a
                href={project.sourceCode}
                target="_blank"
                rel="noopener noreferrer"
              >
                <CodeXml className="w-4 h-4" />
                Source Code
              </a>
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ProjectCard;
