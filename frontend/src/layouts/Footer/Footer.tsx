import Logo from "../Logo";
import ThemeToggle from "../Navbar/ThemeToggle";
import SocialIcon from "../SocialIcon";
import { FacebookIcon } from "../SocialIcons/FacebookIcon";
import { InstagramIcon } from "../SocialIcons/InstagramIcon";
import { TwitterIcon } from "../SocialIcons/TwitterIcon";

function Footer() {
  return (
    <footer className="bg-background ">
      <div className="px-4 bg-secondary text-secondary-foreground  lg:px-10 flex flex-col gap-2.5 lg:flex-row justify-between py-10 lg:border-b border-border">
        <Logo />
        <div className="flex gap-5">
          <SocialIcon
            icon={
              <InstagramIcon fill="var(--color-primary)" className="w-6 h-6" />
            }
            to="https://www.instagram.com/samah_abulaymun/"
            label="instagram"
          />
          <SocialIcon
            icon={
              <FacebookIcon fill="var(--color-primary)" className="w-6 h-6" />
            }
            to="#"
            label="Facebook"
          />
          <SocialIcon
            icon={
              <TwitterIcon fill="var(--color-primary)" className="w-6 h-6" />
            }
            to="#"
            label="Twitter"
          />
        </div>
      </div>
      <div className="py-6.25 flex justify-between items-center bg-secondary text-secondary-foreground px-4 lg:px-10">
        <p className="font-bold  lg:text-start text-center">
         All Right Reserved 2026
        </p>
        <ThemeToggle className="text-primary transition hover:scale-110" />
      </div>
    </footer>
  );
}

export default Footer;
