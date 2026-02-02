import { THEMES } from "@/data/constants";
import ThemeCard from "../components/ThemeCard";
import { useBuilderStore } from "../store/builder.store";
import { Animated } from "@/components/ui/animated";
import Heading from "../components/Heading";
import Breadcrumbs from "../layout/Breadcrumb";
 const breadcrumbs = [{ label: "Builder" }, { label: "Theme" }];
function ThemePage() {
  const { setTheme, profile } = useBuilderStore((s) => s);

  return (
    <>
      <Breadcrumbs items={breadcrumbs} className="ml-14 lg:ml-0" />
      <div className="py-16 px-4 md:px-10 ">
        <Heading title="Choose Your Portfolio Theme" />
        <div className="grid gap-6 md:grid-cols-2  lg:grid-cols-3">
          {THEMES.map((t, index) => (
            <Animated delay={index * 80} variant="flip">
              <ThemeCard
                theme={t}
                setTheme={setTheme}
                active={profile.theme.id === t.id}
              />
            </Animated>
          ))}
        </div>
      </div>
    </>
  );
}

export default ThemePage;
