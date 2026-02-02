import { Animated } from "@/components/ui/animated";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-24 px-4 lg:px-10">
      {/* Gradient background */}
      <div className="absolute animate-pulse inset-0 -z-10 bg-linear-to-br from-primary/20 via-secondary/10 to-transparent" />

      <div className="mx-auto max-w-3xl text-center">
        <Animated variant="flip">
          <h2 className=" font-semibold tracking-tight">
            Launch your portfolio in minutes.
          </h2>
        </Animated>
        <Animated variant="flip">
          <p className="mt-4 text-muted-foreground text-lg">
            Design, customize, and launch a professional portfolio in minutes,
            no design skills required.
          </p>
        </Animated>
        <Animated variant="flip">
          <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Button
              size="lg"
              asChild
              className="px-8 shadow-md hover:shadow-lg transition-shadow"
            >
              <Link to="/builder/start">Get started for free</Link>
            </Button>

            <Button size="lg" variant="outline" asChild className="px-8">
              <a href="#themes">
                View themes
              </a>
            </Button>
          </div>
        </Animated>
      </div>
    </section>
  );
}

export default FinalCTA;
