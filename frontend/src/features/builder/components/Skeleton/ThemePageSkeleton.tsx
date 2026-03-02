import { Spinner } from "@/components/ui/spinner";

function ThemePageSkeleton() {
  return (
    <div className="fixed flex justify-center items-center top-0 left-0 bottom-0 right-0 inset-0 z-40 bg-black/40">
       <Spinner className="size-8 text-primary" />
    </div>
  );
}

export default ThemePageSkeleton
