import { api } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Download,
  Globe,
  Layers,
  Layout,
  Palette,
  ShieldCheck,
  User,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import PermissionRow from "../components/PermissionRow";
import Breadcrumbs from "../../layout/Breadcrumb";
import Heading from "../../components/Heading";
import UserAccessPageSkeleton from "../../components/Skeleton/UserAccessPageSkeleton";
import { Animated } from "@/components/ui/animated";

const breadcrumbs = [{ label: "Settings" }, { label: "user access" }];

function UserAccessPage() {
  document.title = "Portify - " + "User access";
  const { data: portfolio, isFetching } = useQuery({
    queryKey: ["portfolio-profile"],
    queryFn: async () => {
      const res = await api.get("/portfolios/me");
      return res.data;
    },
  });
  console.log(portfolio?.user);
  
  if (isFetching) return <UserAccessPageSkeleton />;
  if (!portfolio)
    return <p className="p-6 text-destructive">Failed to load access info.</p>;

  return (
    <div>
      <Breadcrumbs items={breadcrumbs} />

      <div className="py-16 px-4 md:px-10 max-w-7xl">
        <Heading title="Your Access" className="mb-2" />
        <Animated variant="flip">
          <p className="text-muted-foreground text-sm mb-8">
            Overview of your current plan, limits, and permissions.
          </p>
        </Animated>

        {/* Plan Card */}
        {/* <Card>
        <CardHeader className="flex flex-row items-center gap-3 pb-2">
          <Crown className="w-5 h-5 text-primary" />
          <CardTitle className="text-base">Current Plan</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{plan.label}</span>
            <Badge
              variant={plan.label === "Pro" ? "default" : "secondary"}
              className="text-sm"
            >
              {user.role}
            </Badge>
          </div>
          <Separator />
          <div className="space-y-1">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Portfolio Publishes</span>
              <span>
                {plan.publishedCount} / {plan.publishLimit}
              </span>
            </div>
            <Progress value={publishPct} className="h-2" />
            <p className="text-xs text-muted-foreground">
              {plan.remainingPublishes} publish
              {plan.remainingPublishes !== 1 ? "es" : ""} remaining
            </p>
          </div>
        </CardContent>
      </Card> */}

        {/* Account Info */}
        <Card>
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <User className="w-5 h-5 text-blue-500" />
            <CardTitle className="text-base">Account</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm flex flex-wrap items-center gap-6 justify-between">
            <div className="flex flex-col gap-1.5">
              <span className="text-muted-foreground">Name</span>
              <span className="font-medium">{portfolio.user.name ?? "—"}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-muted-foreground">Email</span>
              <span className="font-medium">{portfolio.user.email}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              <span className="text-muted-foreground">Role</span>
              <span className="font-medium capitalize">
                {portfolio?.user?.role?.toLowerCase()}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Permissions */}
        <Card className="mt-6">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            <CardTitle className="text-base">Permissions</CardTitle>
          </CardHeader>
          <CardContent className="divide-y">
            <PermissionRow
              icon={Layout}
              label="Premium Templates"
              granted={portfolio.template.isPremium}
            />
            <PermissionRow
              icon={Palette}
              label="Custom Theme"
              granted={portfolio.theme}
            />
            <PermissionRow
              icon={Download}
              label="Export Portfolio"
              granted={portfolio.isPublished}
            />
            <PermissionRow
              icon={Layers}
              label={`Up to ${portfolio.content?.sectionsOrder?.length || 0} Sections`}
              granted={true}
            />
            <PermissionRow
              icon={Globe}
              label="Public Portfolio"
              granted={!!portfolio?.isPublished}
            />
          </CardContent>
        </Card>

        {/* Portfolio Summary */}
        {portfolio && (
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center gap-3 pb-2">
              <Globe className="w-5 h-5 text-orange-500" />
              <CardTitle className="text-base">Portfolio</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Title</span>
                <span className="font-medium">{portfolio.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Slug</span>
                <span className="font-medium">/{portfolio.slug}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge
                  variant={portfolio.isPublished ? "default" : "secondary"}
                >
                  {portfolio.status}
                </Badge>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

export default UserAccessPage;
