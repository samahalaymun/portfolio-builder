import Features from "@/features/home/components/Features";
import FinalCTA from "@/features/home/components/FinalCTA";
import HeroSection from "@/features/home/components/HeroSection";
import HowItWorks from "@/features/home/components/HowItWorks";
import ThemesPreview from "@/features/home/components/ThemesPreview";

function HomePage() {
  return (
    <main className="space-y-32 py-8">
      <HeroSection />
      <HowItWorks />
      <ThemesPreview />
      <Features />
      <FinalCTA />

    </main>
  );
}

export default HomePage;
