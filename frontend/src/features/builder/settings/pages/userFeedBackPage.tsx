import { Animated } from "@/components/ui/animated";
import Heading from "../../components/Heading";
import Breadcrumbs from "../../layout/Breadcrumb";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import type { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios";
import { Field, FieldLabel } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";

const breadcrumbs = [{ label: "Settings" }, { label: "user feedback" }];
const NPS_LABELS: Record<number, string> = {
  0: "Terrible",
  1: "Very bad",
  2: "Bad",
  3: "Poor",
  4: "Below avg",
  5: "Average",
  6: "Above avg",
  7: "Good",
  8: "Very good",
  9: "Great",
  10: "Excellent",
};

const scoreColor = (s: number) => {
  if (s <= 3) return "bg-red-500 text-white border-red-500";
  if (s <= 6) return "bg-yellow-400 text-black border-yellow-400";
  return "bg-green-500 text-white border-green-500";
};
interface FeedbackPayload {
  score: number;
  comment?: string;
}

function UserFeedBackPage() {
  document.title = "Portify - " + "User feedback";
  const [score, setScore] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const [scoreError, setScoreError] = useState("");
  const { mutate, isPending, isSuccess, reset } = useMutation({
    mutationFn: async (data: FeedbackPayload) => {
      const res = await api.post("/feedback", data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Thank you for your feedback!");
      setTimeout(() => {
        reset();
        setScore(null);
        setComment("");
      }, 3000);
    },
    onError: (error: AxiosError<{ message: string; statusCode: number }>) => {
      const message =
        error.response?.data?.message ||
        error.message ||
        "Failed to submit feedback. Please try again.";
      toast.error(message);
    },
  });

  const handleSubmit = () => {
    if (score === null) {
      setScoreError("Please select a score before submitting.");
      return;
    }
    setScoreError("");
    mutate({ score, comment: comment.trim() || undefined });
  };
  if (isSuccess) {
    return (
      <div className="flex flex-col items-center justify-center py-12 space-y-4">
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
          <CheckCircle2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-foreground">
          Feedback received!
        </h3>
        <p className="text-muted-foreground text-center max-w-sm">
          Your response helps us build a better product. We truly appreciate it.
        </p>
      </div>
    );
  }

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />
      <div className="py-16 px-4 md:px-10 max-w-7xl">
        <Heading title="Your Feedback" className="mb-2" />
        <Animated variant="flip">
          <p className="text-muted-foreground text-sm mb-8">
            Help us improve by sharing how likely you are to recommend us.
          </p>
        </Animated>
        {/* NPS Score */}
        <Field className="space-y-3 mb-4">
          <FieldLabel className="text-sm font-medium text-foreground">
            How likely are you to recommend us to a friend or colleague? *
          </FieldLabel>
          <div className="flex justify-between text-xs text-muted-foreground border-b-2 pb-3">
            <span>0 = Not at all likely</span>
            <span>10 = Extremely likely</span>
          </div>

          <div className="flex gap-1.5 flex-wrap">
            {Array.from({ length: 11 }, (_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => {
                  setScore(i);
                  setScoreError("");
                }}
                className={cn(
                  "w-10 h-10 rounded-lg border-2 text-sm font-semibold transition-all",
                  score === i
                    ? scoreColor(i)
                    : "border-border bg-background/60 hover:border-primary text-muted-foreground",
                )}
              >
                {i}
              </button>
            ))}
          </div>

          {score !== null && (
            <p className="text-sm font-medium">
              You selected <span className="text-primary">{score}</span> —{" "}
              {NPS_LABELS[score]}
            </p>
          )}

          {scoreError && (
            <p className="text-sm text-destructive">{scoreError}</p>
          )}
        </Field>

        {/* Comment */}
        <Field className="space-y-2">
          <FieldLabel
            htmlFor="comment"
            className="text-sm font-medium text-foreground"
          >
            What's the main reason for your score?{" "}
            <span className="text-muted-foreground font-normal">
              (optional)
            </span>
          </FieldLabel>
          <Textarea
            id="comment"
            placeholder="Tell us what you love or what we can improve..."
            rows={5}
            maxLength={1000}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="bg-background/60 resize-none"
          />
          <p className="text-xs text-muted-foreground text-right">
            {comment.length}/1000
          </p>
        </Field>

        <Button
          size="lg"
          onClick={handleSubmit}
          disabled={isPending || !score}
        >
          {isPending ? (
            <div className="flex gap-1.5 items-center">
              <Spinner className="size-6" />
              Submitting...
            </div>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Submit Feedback
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default UserFeedBackPage;
