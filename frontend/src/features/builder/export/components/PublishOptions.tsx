import { Button } from '@/components/ui/button';

function PublishOptions() {
  return (
    <div className="rounded-xl border p-8">
      <h3 className=" font-semibold mb-2">Publish online</h3>
      <p className="text-muted-foreground mb-6">
        Publish your portfolio with a custom URL.
      </p>

      <Button disabled>Publish portfolio (coming soon)</Button>
    </div>
  );
}

export default PublishOptions
