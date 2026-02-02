import { Button } from "@/components/ui/button";
import { DownloadIcon } from "lucide-react";
import Container from "../layout/Container";
import { Animated } from "@/components/ui/animated";

function About({
  summary,
  avatar,
  cvUrl,
}: {
  summary: string;
  avatar?: string;
  cvUrl?: string;
}) {
  const summaryArray = summary.trim().split(".");
  return (
    <Container id="about">
      <Animated variant="flip">
        <h2 className="md:text-2xl text-xl font-semibold mb-4 w-full text-center text-foreground">
          About me
        </h2>
      </Animated>
      <div className="grid lg:grid-cols-2 gap-6 ">
        <div className="flex flex-col gap-4 order-2">
          {summaryArray.map((summary, index) => (
            <Animated variant="flip" className="h-auto" delay={index * 80}>
              <p className="text-muted-foreground leading-relaxed">
                {summary !== "" && summary + "."}
              </p>
            </Animated>
          ))}
          {cvUrl && (
            <Animated variant="flip">
              <Button asChild>
                <a
                  href={cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="flex items-center gap-2"
                >
                  Download CV
                  <DownloadIcon className="w-4 h-4" />
                </a>
              </Button>
            </Animated>
          )}
        </div>
        <div className="flex items-center justify-center bg-muted">
          {avatar && (
            <Animated variant="scale">
           
              <img
                alt="profile image"
                className="w-full h-full object-cover"
                src={avatar}
              />
            </Animated>
          )}
        </div>
      </div>
    </Container>
  );
}

export default About;
