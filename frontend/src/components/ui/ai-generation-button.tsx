import { Sparkles } from "lucide-react";
import { Button } from "./button";
import { Spinner } from "./spinner";

function AiGenerationButton({
  isPending,
  onClick,
}: {
  isPending: boolean;
  onClick:()=>void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={isPending}
      className="gap-2"
    >
      {isPending ? (
        <>
          <Spinner className="h-4 w-4" />
          Generating...
        </>
      ) : (
        <>
          <Sparkles className="h-4 w-4" />
          Generate with AI
        </>
      )}
    </Button>
  );
}

export default AiGenerationButton;
