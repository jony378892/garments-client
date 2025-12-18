import { Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

export default function RootLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Toaster></Toaster>
      <Navbar />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <div className="footer sm:footer-horizontal footer-center bg-black/95 text-white p-2">
        <aside>
          <p>
            Copyright © {new Date().getFullYear()} - All right reserved by ACME
            Industries Ltd
          </p>
        </aside>
      </div>
    </div>
  );
}
