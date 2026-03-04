// src/features/builder/components/PublishOptions.tsx - UPDATED
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Copy, ExternalLink, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle2, AlertCircle } from "lucide-react";

interface PublishOptionsProps {
  portfolio: any;
  onTogglePublish: (isPublished: boolean) => void;
  isLoading: boolean;
}

function PublishOptions({
  portfolio,
  onTogglePublish,
  isLoading,
}: PublishOptionsProps) {
  const [copied, setCopied] = useState(false);

  // Build public URL
  const username = portfolio?.user?.username;
  const publicUrl = username ? `${window.location.origin}/${username}` : null;

  // Copy to clipboard
  const handleCopy = () => {
    if (publicUrl) {
      navigator.clipboard.writeText(publicUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Open in new tab
  const handleViewLive = () => {
    if (publicUrl) {
      window.open(publicUrl, "_blank");
    }
  };

  return (
    <div className="rounded-sm border p-8 bg-background">
      <h3 className="font-semibold mb-2">Publish Online</h3>
      <p className="text-muted-foreground mb-6">
        Make your portfolio publicly accessible with a custom URL.
      </p>

      {/* Publish Toggle */}
      <div className="flex items-center justify-between mb-6 p-4 rounded-lg bg-muted/40">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <Label htmlFor="publish-toggle" className="text-base font-medium">
              {portfolio?.isPublished ? (
                <span className="flex items-center gap-2">
                  <Eye className="h-4 w-4 text-green-500" />
                  Published
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                  Private
                </span>
              )}
            </Label>
            <span className="text-sm text-muted-foreground">
              {portfolio?.isPublished
                ? "Your portfolio is live and visible to everyone"
                : "Only you can see your portfolio"}
            </span>
          </div>
        </div>

        <Switch
          id="publish-toggle"
          checked={portfolio?.isPublished}
          onCheckedChange={onTogglePublish}
          disabled={isLoading}
        />
      </div>

      {/* Published State - Show URL */}
      {portfolio?.isPublished && publicUrl && (
        <div className="space-y-4">
          <Alert className="border-green-500/50 bg-green-50 dark:bg-green-950">
            <CheckCircle2 className="h-4 w-4 text-green-500" />
            <AlertDescription>
              Your portfolio is live! Share your link with others.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label>Your Public URL</Label>
            <div className="flex gap-2">
              <Input value={publicUrl} readOnly className="font-mono text-sm" />
              <Button
                variant="outline"
                size="icon"
                onClick={handleCopy}
                title="Copy link"
              >
                <Copy
                  className={copied ? "h-4 w-4 text-green-500" : "h-4 w-4"}
                />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={handleViewLive}
                title="Open in new tab"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex gap-2">
            <Button onClick={handleViewLive} className="flex-1">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Live Portfolio
            </Button>
          </div>
        </div>
      )}

      {/* Unpublished State - Show CTA */}
      {!portfolio?.isPublished && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Turn on publishing to make your portfolio accessible to everyone.
            You'll get a shareable link like: <br />
            <span className="font-mono text-sm">
              {window.location.origin}/{username || "your-username"}
            </span>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export default PublishOptions;
