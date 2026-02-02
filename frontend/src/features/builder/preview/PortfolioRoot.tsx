import { useBuilderStore } from "../store/builder.store";
import { cn, resolveTheme } from "@/lib/utils";
import Header from "./layout/Header";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Contact from "./sections/Contact";
import Footer from "./layout/Footer";

function PortfolioRoot() {
  const { profile } = useBuilderStore();
  const { theme } = usePreviewTheme();
  const resolved = resolveTheme(profile.theme.mode);
  document.title=profile.firstname + " " + profile.lastname;
  function usePreviewTheme() {
    const params = new URLSearchParams(window.location.search);
    return {
      theme: params.get("theme") || "default",
    };
  }
  
  return (
    <div
      data-theme={theme || "default"}
      className={cn("h-full bg-background text-foreground", resolved)}
    >
      <Header title={profile.firstname} />
      <main className="flex bg-background flex-col items-center  w-full  pb-16">
        <Hero profile={profile} />
        <About
          cvUrl={profile.cvUrl}
          avatar={profile?.images?.avatar}
          summary={profile.about}
        />
        <Skills skills={profile.skills} />
        <Projects projects={profile.projects} />
        <Experience experiences={profile.experience} />
        <Contact
          email={profile.email}
          location={profile.location}
          phone={profile.phone}
        />
      </main>

      <Footer
        role={profile.role}
        firstname={profile.firstname}
        lastname={profile.lastname}
        socials={profile.socials}
      />
    </div>
  );
}

export default PortfolioRoot;
