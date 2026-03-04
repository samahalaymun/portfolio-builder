import { CalendarDays } from "lucide-react";
import Container from "../layout/Container";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Animated } from "@/components/ui/animated";
import type { Experience as ExperienceType } from "../../types";

function Experience({ profile }: any) {
  const experiences: ExperienceType[] = profile?.experience ?? [];
    return (
    <Container id="experience">
      <Animated variant="flip" delay={80}>
        <h2 className="md:text-2xl text-xl  text-foreground font-semibold text-center">
          Experience
        </h2>
      </Animated>
      <Animated variant="flip" delay={160}>
        <p className="text-muted-foreground text-center mb-8">
          My personal journey
        </p>
      </Animated>
      <Tabs
        defaultValue={experiences[0]?.company}
        className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto"
      >
        {/* Tabs List */}
        <TabsList
          className="
            flex md:flex-col
            overflow-x-auto md:overflow-visible
            md:h-full h-14  
            border-b md:border-b-0 md:border-l"
        >
          {experiences?.map((exp, i) => (
            <Animated delay={i * 80} variant="flip">
              <TabsTrigger
                key={exp?.company}
                value={exp?.company}
                className="
                whitespace-nowrap
                justify-start 
                px-4 py-2 
                w-full
                text-sm
                data-[state=active]:bg-muted
                data-[state=active]:font-semibold
                border-b-2 md:border-b-0
                md:border-l-2 md:border-transparent
                data-[state=active]:border-primary"
              >
                {exp?.company}
              </TabsTrigger>
            </Animated>
          ))}
        </TabsList>

        {/* Content */}
        <div className="flex-1">
          {experiences.map((exp) => (
            <TabsContent key={exp?.company} value={exp?.company} className="mt-0">
              <Animated variant="flip">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold">{exp?.role}</h3>
                    <p className="text-muted-foreground">{exp?.company}</p>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarDays className="w-4 h-4" />
                    <span>
                      {exp?.startDate} – {exp?.endDate || "Present"}
                    </span>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {exp?.description}
                  </p>
                </div>
              </Animated>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </Container>
  );
}

export default Experience;
