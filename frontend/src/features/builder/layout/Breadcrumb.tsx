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
        "border-b border-border h-16 w-full overflow-hidden sticky top-0 flex items-center px-4 lg:px-10",
        className,
      )}
    >
      <BreadcrumbList>
        {items.map((item, index) => (
          <BreadcrumbItem key={index}>
            {item.to ? (
              <BreadcrumbLink asChild>
                <Link  to={item.to}>{item.label}</Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage>{item.label}</BreadcrumbPage>
            )}

            {index < items.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight size={16} className="text-muted-foreground" />
              </BreadcrumbSeparator>
            )}
          </BreadcrumbItem>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
