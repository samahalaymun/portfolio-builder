
import type { ReactNode } from "react";

interface PublicPortfolioLayoutProps {
  children: ReactNode;
  theme?: string;
}
function PublicPortfolioLayout({
  children,
  theme = "default",
}: PublicPortfolioLayoutProps) {
  return (
    <div
      data-theme={theme}
      className=" selection:bg-primary selection:text-foreground"
    >
      {children}
    </div>
  );
}

export default PublicPortfolioLayout;
