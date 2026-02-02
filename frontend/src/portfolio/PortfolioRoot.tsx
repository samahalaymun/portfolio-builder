import Footer from "@/features/builder/preview/layout/Footer";
import Header from "@/features/builder/preview/layout/Header";
import About from "@/features/builder/preview/sections/About";
import Contact from "@/features/builder/preview/sections/Contact";
import Experience from "@/features/builder/preview/sections/Experience";
import Hero from "@/features/builder/preview/sections/Hero";
import Projects from "@/features/builder/preview/sections/Projects";
import Skills from "@/features/builder/preview/sections/Skills";
import type { BuilderProfile } from "@/features/builder/store/builder.store";


type Props = {
  data: BuilderProfile;
  theme: {
    mode: "light" | "dark";
    id: string;
  };
};
function PortfolioRoot({ data, theme }: Props) {
  return (
    <html lang="en" className={theme.mode} data-theme={theme.id}>
      <body>
        <Header title={data.firstname} />
        <main className="flex bg-background flex-col items-center w-full pb-16 text-foreground">
          <Hero profile={data} />
          <About
            cvUrl={data.cvUrl}
            avatar={data?.images?.avatar}
            summary={data.about}
          />
          <Skills skills={data.skills} />
          <Projects projects={data.projects} />
          <Experience experiences={data.experience} />
          <Contact
            email={data.email}
            location={data.location}
            phone={data.phone}
          />
        </main>
        <Footer
          role={data.role}
          firstname={data.firstname}
          lastname={data.lastname}
          socials={data.socials}
        />
      </body>
    </html>
  );
}

export default PortfolioRoot;
