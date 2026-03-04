import { Skeleton } from "@/components/ui/skeleton";

function ContentPageSkeleton() {
  return (
    <div className="py-16 px-4 md:px-10 flex flex-col gap-16">
      <div>
        <Skeleton className="h-6 w-1/4  mb-4"></Skeleton>
        <Skeleton className="h-4 w-3/4  mb-2"></Skeleton>
        <Skeleton className="h-4 w-2/4  mb-2"></Skeleton>
        <Skeleton className="h-4 w-1/2  mb-2"></Skeleton>
        <Skeleton className="h-4 w-5/6  mb-2"></Skeleton>
        <Skeleton className="h-4 w-3/4  mb-2"></Skeleton>
        <Skeleton className="h-4 w-1/3  mb-2"></Skeleton>
      </div>
      <div>
        <Skeleton className="h-6 w-1/4  mb-4"></Skeleton>
        <Skeleton className="h-4 w-3/4  mb-2"></Skeleton>
        <Skeleton className="h-4 w-2/4  mb-2"></Skeleton>
        <Skeleton className="h-4 w-1/2  mb-2"></Skeleton>
        <Skeleton className="h-4 w-5/6  mb-2"></Skeleton>
        <Skeleton className="h-4 w-3/4  mb-2"></Skeleton>
        <Skeleton className="h-4 w-1/3  mb-2"></Skeleton>
      </div>
      <div>
        <Skeleton className="h-6 w-1/4  mb-4"></Skeleton>
        <Skeleton className="h-4 w-3/4  mb-2"></Skeleton>
        <Skeleton className="h-4 w-2/4 mb-2"></Skeleton>
        <Skeleton className="h-4 w-1/2  mb-2"></Skeleton>
        <Skeleton className="h-4 w-5/6  mb-2"></Skeleton>
        <Skeleton className="h-4 w-3/4  mb-2"></Skeleton>
        <Skeleton className="h-4 w-1/3  mb-2"></Skeleton>
      </div>
    </div>
  );
}

export default ContentPageSkeleton
