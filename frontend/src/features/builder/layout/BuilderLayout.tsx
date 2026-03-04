import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";
import MobileSideBar from "./MobileSideBar";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Toaster } from "react-hot-toast";

export default function BuilderLayout() {
  const [collapse, setCollapse] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Toaster
        position="top-right"
        toastOptions={{ style: { fontSize: "14px", zIndex: 9999 } }}
      />
      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <SideBar
          setCollapse={setCollapse}
          collapse={collapse}
        />
      </div>

      {/* Mobile Sidebar */}
      <div className="lg:hidden">
        <MobileSideBar/>
      </div>

      {/* Main Content */}
      {/* <div
        className={cn(
          "min-h-screen flex flex-col lg:ml-64 ",
          collapse && "lg:ml-16",
        )}
      >
        <main className="flex-1 mx-auto w-full dark:bg-[#212225] bg-muted">
          <Outlet />
        </main>
      </div> */}
      {/* Main Content */}
      <div
        className={cn(
          "min-h-screen flex flex-col",
          // Desktop: margin for sidebar
          "lg:ml-64",
          collapse && "lg:ml-16",
          // Mobile: margin for top bar
          "pt-16 lg:pt-0",
        )}
      >
        <main className="flex-1 w-full dark:bg-[#212225] bg-muted overflow-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
