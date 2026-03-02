import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import BuilderLogo from "./BuilderLogo";

type BreadcrumbItem = {
  label: string | undefined;
  to?: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
  className?: string;
};
function Breadcrumbs({ items,className }: BreadcrumbsProps) {
  return (
    <Breadcrumb
      className={cn(
        "border-b border-border h-16 w-full bg-background z-40 sticky top-0 flex items-center justify-between px-4 lg:px-10",
        className,
      )}
    >
      {/* Breadcrumb list - allow wrapping on small screens */}
      <BreadcrumbList className="flex-wrap gap-1">
        {items.map((item, index) => (
          <BreadcrumbItem key={index} className="flex items-center">
            {item.to ? (
              <BreadcrumbLink asChild>
                <Link
                  to={item.to}
                  className="hover:text-primary transition-colors max-w-30 sm:max-w-none truncate"
                >
                  {item.label}
                </Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage className="max-w-30 sm:max-w-none truncate">
                {item.label}
              </BreadcrumbPage>
            )}

            {index < items.length - 1 && (
              <BreadcrumbSeparator className="mx-1.5">
                <ChevronRight
                  size={16}
                  className="text-muted-foreground shrink-0"
                />
              </BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>

      {/* Logo - hidden on mobile if breadcrumb is long */}
      <div className="hidden lg:block shrink-0 ml-4">
        <BuilderLogo />
      </div>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
