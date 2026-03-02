import { cn } from "@/lib/utils";

function UserAvatar({
  avatarUrl,
  username,
  className,
}: {
  avatarUrl?: string;
  username?: string;
  className?:string;
}) {
  return (
    <div
      className={cn(
        "rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center shrink-0",
        className,
      )}
    >
      <span className="text-sm font-bold text-primary-foreground">
        {avatarUrl ? (
          <img src={avatarUrl} className="rounded-full" />
        ) : (
          <span className="text-sm font-bold text-primary-foreground">
            {username
              ?.split(" ")
              .map((n: string) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2)}
          </span>
        )}
      </span>
    </div>
  );
}

export default UserAvatar;
