import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";
import Container from "../layout/Container";
import { TwitterIcon } from "@/layouts/SocialIcons/TwitterIcon";
import { GitHubIcon } from "@/layouts/SocialIcons/GithubIcon";
import { LinkedInIcon } from "@/layouts/SocialIcons/LinkedInIcon";
import { Animated } from "@/components/ui/animated";

function Hero({ profile }: any) {
  return (
    <Container
      id="hero"
      className="relative overflow-hidden pt-22  md:pt-40 pb-20"
    >
      {/* Text */}
      <div className="flex gap-8 items-center">
        <div className="flex flex-col gap-8 text-primary">
          <Animated variant="scale" delay={80}>
            <a
              href={profile?.socials?.twitter}
              target="_blank"
              className="text-primary transition-colors hover:text-primary/70"
            >
              <TwitterIcon fill="currentColor" />
            </a>
          </Animated>
          <Animated variant="scale" delay={160}>
            <a
              href={profile?.socials?.github}
              target="_blank"
              className="text-primary transition-colors hover:text-primary/70"
            >
              <GitHubIcon fill="currentColor" />
            </a>
          </Animated>
          <Animated variant="scale" delay={160}>
            <a
              href={profile?.socials?.linkedin}
              target="_blank"
              className="text-primary transition-colors hover:text-primary/70"
            >
              <LinkedInIcon fill="currentColor" />
            </a>
          </Animated>
        </div>
        <div>
          <Animated variant="flip">
            <h1 className="text-foreground font-bold leading-tight mt-4 lg:text-7xl md:text-6xl text-4xl">
              Hi, I'm {profile.firstname+" "+profile.lastname || "Jhon"}.
            </h1>
          </Animated>
          <Animated variant="flip">
            <h3 className="text-muted-foreground font-bold">
              {profile.role}
            </h3>
          </Animated>
          <Animated variant="flip">
            <h3 className="mt-2 font-semibold text-sm md:text-lg   text-muted-foreground">
              {profile.summary ||
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod nemo et amet sit ullam repellat accusantium labore recusandae, esse ab rem fugiat aperiam. Qui iusto, eveniet officiis laudantium magnam sunt. "}
            </h3>
          </Animated>
          <Animated variant="flip">
            <Button asChild className="mt-4">
              <a href="#contact">
                <Mail className="w-6 h-6" />
                Contact Me
              </a>
            </Button>
          </Animated>
        </div>
      </div>
    </Container>
  );
}

export default Hero;
