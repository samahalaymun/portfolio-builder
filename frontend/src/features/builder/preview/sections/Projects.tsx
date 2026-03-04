import { Animated } from "@/components/ui/animated";
import Container from "../layout/Container";
import type { PortfolioContent, Project } from "../../types";
import ProjectCard from "./ProjectCard";
import { cn } from "@/lib/utils";
import {
  useTemplateConfig,
} from "../../templates/config";
interface ProjectsProps {
  profile: PortfolioContent;
  variant?: string;
  themeId?: string;
  id: string;
}

function Projects({
  profile,
  themeId,
  id,
  variant = "default",
}: ProjectsProps) {
  const projects: Project[] = profile?.projects ?? [];
  const { config, isLoading } = useTemplateConfig(variant);
  const projectsConfig = config?.projects;

  if (!projects.length || !config || isLoading || !projectsConfig) return null;

  return (
    <Container id={id} variant={variant}>
      {/* Section heading */}
      <Animated variant="flip">
        <div
          className={cn(
            "flex flex-col gap-2 mb-14",
            projectsConfig.headingAlign === "center"
              ? "items-center text-center"
              : "items-start",
          )}
        >
          <span className={projectsConfig.badge}>My Work</span>
          <h2 className={projectsConfig.title}>Projects</h2>
          <p className={projectsConfig.subtitle}>
            A selection of things I've built
          </p>
          <div className="w-12 h-1 bg-primary rounded-full mt-1" />
        </div>
      </Animated>

      {/* Grid */}
      <div className={projectsConfig.grid}>
        {projects.map((project, i) => (
          <Animated key={i} delay={i * 60} variant="flip">
            <div className={projectsConfig?.itemWrapper}>
              <ProjectCard
                themeId={themeId ?? "default"}
                project={project}
                config={projectsConfig}
              />
            </div>
          </Animated>
        ))}
      </div>
    </Container>
  );
}

export default Projects;
