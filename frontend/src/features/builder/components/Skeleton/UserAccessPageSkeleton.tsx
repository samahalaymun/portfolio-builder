import { Skeleton } from "@/components/ui/skeleton";

function UserAccessPageSkeleton() {
  return (
    <div className="p-6 space-y-4">
      {[...Array(6)].map((_, i) => (
        <Skeleton key={i} className="h-32 w-full rounded-xl" />
      ))}
    </div>
  );
}

export default UserAccessPageSkeleton
