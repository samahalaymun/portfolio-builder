import { Animated } from "@/components/ui/animated";
import type { Project } from "../../store/builder.store";
import Container from "../layout/Container";
import ProjectSlide from "./ProjectSlide";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

function Projects({ projects }: { projects: Project[] }) {
  return (
    <Container id="projects">
      <Animated variant="flip" delay={80}>
        <h2 className="md:text-2xl text-xl text-foreground font-semibold text-center">
          Projects
        </h2>
      </Animated>
      <Animated variant="flip" delay={160}>
        <p className="text-muted-foreground mb-4 text-center">
          Most recent work
        </p>
      </Animated>

      <Carousel className="">
        <CarouselContent>
          {projects.map((p: any, i: number) => (
            <CarouselItem key={i}>
              <Animated variant="flip">
                <ProjectSlide project={p} />
              </Animated>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="lg:left-10 left-4" />
        <CarouselNext className="lg:right-10 right-4" />
      </Carousel>
    </Container>
  );
}

export default Projects;
