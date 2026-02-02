import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";

function AppLayout() {
  return (
    <>
      <Navbar />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </>
  );
}

export default AppLayout;
