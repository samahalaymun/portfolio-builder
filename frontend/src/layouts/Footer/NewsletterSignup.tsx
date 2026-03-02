import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";

function NewsletterSignup() {
  return (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
      <Field>
        <ButtonGroup>
          <Input
            type="email"
            placeholder="your@email.com"
            className="flex-1 bg-background/60 border-border focus:border-primary transition-colors"
          />
          <Button
            type="submit"
            className="shadow-md shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 transition-all"
          >
            <ArrowRight className="w-4 h-4" />
          </Button>
        </ButtonGroup>
      </Field>
      <p className="text-xs text-muted-foreground">
        No spam. Unsubscribe anytime.
      </p>
    </form>
  );
}

export default NewsletterSignup
