import { Animated } from "@/components/ui/animated";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function HeroSection() {
  return (
    <section className="relative isolate  overflow-hidden px-6 pt-14 lg:px-8 border border-border rounded-xl bg-background">
      <div
        aria-hidden="true"
        className="absolute animate-pulse inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
          className="relative left-[calc(50%-11rem)] aspect-1155/678 w-144.5 -translate-x-1/2 rotate-30 bg-linear-to-tr from-secondary to-primary opacity-30 sm:left-[calc(50%-30rem)] sm:w-288.75"
        />
      </div>
      <div
        aria-hidden
        className="absolute -bottom-24 right-0 h-50 w-50 bg-primary/30 blur-[120px] rounded-full animate-pulse"
      />
      {/* Content */}
      <div className="relative mx-auto max-w-4xl py-32 sm:py-40 text-center space-y-6">
        <Animated variant="slide" direction="left" delay={80}>
          <span className="inline-flex items-center rounded-full border px-4 py-1 text-sm text-muted-foreground">
            ✨ Build with AI
          </span>
        </Animated>
        <Animated variant="slide" direction="left" delay={160}>
          <h1 className="font-bold leading-tight text-4xl sm:text-5xl lg:text-6xl">
            Build Your Portfolio
            <br />
            <span>In Minutes</span>
          </h1>
        </Animated>
        <Animated variant="slide" direction="left" delay={240}>
          <p className="mx-auto max-w-xl text-xl text-muted-foreground">
            Create a professional portfolio with AI-powered tools and beautiful
            themes.
          </p>
        </Animated>
        <Animated variant="slide" direction="left" delay={320}>
          <Button size="lg" asChild>
            <Link to="/builder/start">Get started</Link>
          </Button>
        </Animated>
      </div>
    </section>
  );
}

export default HeroSection;
