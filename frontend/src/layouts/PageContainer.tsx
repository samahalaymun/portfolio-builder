import { Outlet } from "react-router-dom";

function PageContainer() {
  return (
    <main className="min-h-screen px-4 lg:px-10 mx-auto max-w-7xl">
      <Outlet />
    </main>
  );
}

export default PageContainer;
