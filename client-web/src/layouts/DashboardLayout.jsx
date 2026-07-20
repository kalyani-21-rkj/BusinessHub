import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/Footer";

const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
      {/* Left Sidebar stays fixed */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Right Side Column: Vertical Scroll View */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto">
        {/* Navbar stays fixed at top */}
        <Navbar />

        {/* Page Content View */}
        <main className="flex-1 pb-0">
      <div
        className="max-w-[1600px] py-6 px-6"
        style={{ marginLeft: "10px", marginRight: "20px" }}
      >
        {children}
      </div>
    </main>

        {/* 
          THE ABSOLUTE FIX: 
          Instead of relying on element margins which are getting squashed, 
          this dedicated blank space block guarantees a crisp 48px gap 
          between your dashboard cards and the footer container line.
        */}
        <div className="h-12 w-full bg-slate-100 shrink-0" />

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;