import { Animated } from "@/components/ui/animated";
import { contactReasons, faqs } from "@/data/constants";
import ContactCard from "@/features/contact/components/ContactCard";
import ContactForm from "@/features/contact/components/ContactForm";
import FAQItem from "@/features/contact/components/FAQItem";
import { Clock, Mail, MapPin } from "lucide-react";

function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-secondary/30 border-b border-border">
        {/* Background grid */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10
                     bg-[linear-gradient(rgba(var(--color-primary)/0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(var(--color-primary)/0.03)_1px,transparent_1px)] 
                     bg-size-[56px_56px]
                    mask-[radial-gradient(ellipse_80%_50%_at_50%_50%,black_20%,transparent_100%)]"
        />

        {/* Gradient orb */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 -z-10
                     w-96 h-96 rounded-full bg-primary/10 blur-[120px] animate-pulse"
        />

        <div className="max-w-4xl mx-auto px-4 lg:px-10 py-20 sm:py-28 text-center space-y-6">
          <Animated delay={0} variant="flip">
            <span
              className="inline-flex items-center gap-2 rounded-full border border-secondary/30
                             bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              Get in touch
            </span>
          </Animated>

          <Animated delay={60} variant="flip">
            <h1 className="font-bold tracking-tight text-foreground text-4xl sm:text-5xl lg:text-6xl">
              We'd love to{" "}
              <span className="text-primary relative inline-block">
                hear from you.
                <span
                  className="absolute -bottom-1 left-0 right-0 h-1 rounded-full
                                 bg-linear-to-r from-primary to-transparent"
                />
              </span>
            </h1>
          </Animated>

          <Animated delay={120} variant="flip">
            <p className="text-muted-foreground text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Have questions, feedback, or need support? Our team is here to
              help. Choose the best way to reach us below.
            </p>
          </Animated>
        </div>
      </section>

      {/* ── Contact Options ── */}
      <section className="py-16 px-4 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {contactReasons.map((reason, index) => (
              <ContactCard key={reason.title} reason={reason} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Form Section ── */}
      <section className="py-16 px-4 lg:px-10 bg-secondary/20">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <Animated delay={0} variant="flip">
              <h2 className="font-bold text-3xl text-foreground">
                Send us a message
              </h2>
            </Animated>
            <Animated delay={60} variant="flip">
              <p className="text-muted-foreground">
                Fill out the form below and we'll get back to you within 24
                hours.
              </p>
            </Animated>
          </div>

          <Animated delay={120} variant="flip">
            <div
              className="rounded-2xl border border-border bg-background p-6 sm:p-8
                            shadow-lg shadow-primary/5"
            >
              <ContactForm />
            </div>
          </Animated>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="py-16 px-4 lg:px-10">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-3">
            <Animated delay={0} variant="flip">
              <h2 className="font-bold text-3xl text-foreground">
                Frequently asked questions
              </h2>
            </Animated>
            <Animated delay={60} variant="flip">
              <p className="text-muted-foreground">
                Quick answers to common questions about contacting us.
              </p>
            </Animated>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem key={faq.question} faq={faq} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Additional Contact Info ── */}
      <section className="py-16 px-4 lg:px-10 bg-secondary/30 border-t border-border">
        <div className="max-w-6xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-8">
            <Animated delay={0} variant="flip">
              <div
                className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl
                              border border-border bg-background/60"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Response Time
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Within 24 hours
                  </p>
                </div>
              </div>
            </Animated>

            <Animated delay={80} variant="flip">
              <div
                className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl
                              border border-border bg-background/60"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Location
                  </h3>
                  <p className="text-sm text-muted-foreground">Nablus, PS</p>
                </div>
              </div>
            </Animated>

            <Animated delay={160} variant="flip">
              <div
                className="flex flex-col items-center text-center space-y-3 p-6 rounded-xl
                              border border-border bg-background/60"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <a
                    href="mailto:hello@portify.io"
                    className="text-sm text-muted-foreground hover:underline"
                  >
                    hello@portify.io
                  </a>
                </div>
              </div>
            </Animated>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ContactPage;
