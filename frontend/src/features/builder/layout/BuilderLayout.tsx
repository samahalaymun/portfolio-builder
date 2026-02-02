import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import MobileSideBar from "./MobileSideBar";
import { useState } from "react";
import { cn } from "@/lib/utils";

export default function BuilderLayout() {
  const [collapse, setCollapse] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SideBar setCollapse={setCollapse} collapse={collapse} />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <MobileSideBar />
      </div>

      {/* Main Content */}
      <div
        className={cn(
          "min-h-screen flex flex-col lg:ml-64",
          collapse && "lg:ml-16",
        )}
      >
        <main className="flex-1 mx-auto w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
