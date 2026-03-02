import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { Toaster } from "react-hot-toast";


function PublicLayout() {

  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "14px",
            zIndex: 9999,
          },
        }}
      />
      <Navbar />
      <ScrollRestoration />
      <Outlet />
      <Footer />
    </>
  );
}

export default PublicLayout;
