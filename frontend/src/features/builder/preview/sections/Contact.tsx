import { Mail, MapPin, Phone } from "lucide-react";
import Container from "../layout/Container";
import { Animated } from "@/components/ui/animated";
 import ContactForm from "./ContactForm";
import ContactCard from "./ContactCard";
import type { PortfolioContent } from "../../types";
import { useTemplateConfig } from "../../templates/config";
import { cn } from "@/lib/utils";
interface ContactProps {
  profile: PortfolioContent;
  variant?: string;
  id: string;
}
function Contact({ profile, id, variant ="default"}: ContactProps) {
  const contact = profile?.contact;
  const hasPhone = !!contact?.phone;
  const hasEmail = !!contact?.email;
  const hasLocation = !!contact?.location;
  const role = profile?.personalInfo?.role;
  const { config, isLoading } = useTemplateConfig(variant);
 const contactConfig = config?.contact;

  const intro = `I'm open to new opportunities${role ? ` in ${role}` : ""}. Feel free to reach out!`;
   if (!contactConfig || isLoading || !config) {
     return null;
   }
  return (
    <Container id={id} variant={variant}>
      {/* Section heading */}
      <Animated variant="flip">
        <div
          className={cn(
            "flex flex-col gap-2 mb-14",
            contactConfig.headingAlign === "center"
              ? "items-center text-center"
              : "items-start",
          )}
        >
          <span className={contactConfig.badge}>Get In Touch</span>
          <h2 className={contactConfig.title}>Contact Me</h2>
          <p className={contactConfig.subtitle}>{intro}</p>
          <div className="w-12 h-1 bg-primary rounded-full mt-1" />
        </div>
      </Animated>

      {/* ✅ Layout based on config */}
      <div className={contactConfig.grid}>
        {/* ✅ Contact cards (layout varies by template) */}
        {contactConfig.showContactCards && (
          <div className={contactConfig.contactCardsLayout}>
            {hasEmail && (
              <Animated variant="flip" delay={120}>
                <ContactCard
                  icon={Mail}
                  label="Email"
                  href={`mailto:${contact.email}`}
                  value={contact.email}
                  config={contactConfig}
                />
              </Animated>
            )}

            {hasPhone && (
              <Animated variant="flip" delay={160}>
                <ContactCard
                  icon={Phone}
                  label="Phone"
                  href={`tel:${contact.phone}`}
                  value={contact.phone}
                  config={contactConfig}
                />
              </Animated>
            )}

            {hasLocation && (
              <Animated variant="flip" delay={200}>
                <ContactCard
                  icon={MapPin}
                  label="Location"
                  value={contact?.location}
                  config={contactConfig}
                />
              </Animated>
            )}
          </div>
        )}

        {/* ✅ Form (conditional, position varies) */}
        {contactConfig.showForm && (
          <Animated variant="flip" delay={160}>
            <div className={contactConfig.formWrapper || ""}>
              <ContactForm recipientEmail={contact?.email} />
            </div>
          </Animated>
        )}
      </div>
    </Container>
  );
}

export default Contact;