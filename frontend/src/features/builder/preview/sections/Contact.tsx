import { Mail, MapPin, Phone } from "lucide-react";
import Container from "../layout/Container";
import ContactCard from "./ContactCard";
import { Animated } from "@/components/ui/animated";

type contactProps = {
  email: string;
  phone: string;
  location: string;
};
function Contact({ email, phone, location }: contactProps) {
  return (
    <Container id="contact">
      <Animated variant="flip" delay={80}>
        <h2 className="md:text-2xl text-xl text-foreground font-semibold mb-2 text-center">
          Contact me
        </h2>
      </Animated>
      <Animated variant="flip" delay={160}>
        <p className="text-muted-foreground mb-4 text-center">Get in touch</p>
      </Animated>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Animated variant="flip" delay={80}>
          <ContactCard
            label="Call Me"
            value={phone || "555-1234"}
            icon={<Phone className="text-primary w-8 h-8" />}
          />
        </Animated>
        <Animated variant="flip" delay={160}>
          <ContactCard
            label="Email"
            value={email || "john@mail.com"}
            icon={<Mail className="text-primary w-8 h-8" />}
          />
        </Animated>
        <Animated variant="flip" delay={240}>
          <ContactCard
            label="Location"
            value={location || "Nablus,Palestine"}
            icon={<MapPin className="text-primary w-8 h-8" />}
          />
        </Animated>
      </div>
    </Container>
  );
}

export default Contact;
