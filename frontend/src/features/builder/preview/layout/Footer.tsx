import { GitHubIcon } from "@/layouts/SocialIcons/GithubIcon";
import { LinkedInIcon } from "@/layouts/SocialIcons/LinkedInIcon";
import { TwitterIcon } from "@/layouts/SocialIcons/TwitterIcon";

type footerProps = {
  firstname: string;
  lastname: string;
  socials: { github?: string; linkedin?: string; twitter?: string };
  role:string;
};
function Footer({ firstname, lastname, socials,role }: footerProps) {
  return (
    <footer className="border-t bg-muted  text-muted-foreground py-8 flex flex-col gap-8 lg:space-y-4">
      <div className="flex justify-between flex-col lg:flex-row gap-8  px-4 lg:px-10">
        <div>
          <h3 className="text-muted-foreground font-semibold">
            {firstname + " " + lastname}
          </h3>
          <small className="text-muted-foreground">{role}</small>
        </div>
        <div className="flex gap-6 flex-col lg:flex-row">
          <a
            href="#about"
            className=" hover:text-primary text-muted-foreground transform ease-in duration-100 transition-colors"
          >
            About
          </a>
          <a
            href="#projects"
            className=" hover:text-primary text-muted-foreground transform ease-in duration-100 transition-colors"
          >
            Projects
          </a>
          <a
            href="#contact"
            className=" hover:text-primary text-muted-foreground transform ease-in duration-100 transition-colors"
          >
            Contact
          </a>
        </div>
        <div className="flex gap-6 flex-col lg:flex-row">
          <a
            href={socials?.twitter}
            target="_blank"
            className="text-primary transition-colors hover:text-primary/70"
          >
            <TwitterIcon fill="currentColor" />
          </a>
          <a
            href={socials?.github}
            target="_blank"
            className="text-primary transition-colors hover:text-primary/70"
          >
            <GitHubIcon fill="currentColor" />
          </a>
          <a
            href={socials?.linkedin}
            target="_blank"
            className="text-primary transition-colors hover:text-primary/70"
          >
            <LinkedInIcon fill="currentColor" />
          </a>
        </div>
      </div>
      <div className=" px-4 lg:px-10   lg:text-center text-sm ">
        © {new Date().getFullYear()} Built with Portify
      </div>
    </footer>
  );
}

export default Footer;
