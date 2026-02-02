import { Animated } from "@/components/ui/animated";
import Container from "../layout/Container";

function Skills({ skills }: { skills: string[] }) {
  return (
    <Container id="skills">
      <Animated variant="flip" delay={80}>
        <h2 className="md:text-2xl text-xl text-foreground font-semibold  text-center">
          Skills
        </h2>
      </Animated>
      <Animated variant="flip" delay={160}>
        <p className="text-muted-foreground mb-4 text-center">Here what i do</p>
      </Animated>
      <div className="flex justify-center flex-wrap gap-x-2 gap-y-4">
        {skills.map((skill, index) => (
          <Animated className="h-auto  w-auto" delay={index * 80 + 160}>
            <span
              key={skill}
              className="rounded-full font-semibold border px-3 py-2 text-sm bg-muted text-muted-foreground shadow-sm"
            >
              {skill}
            </span>
          </Animated>
        ))}
      </div>
    </Container>
  );
}

export default Skills;
