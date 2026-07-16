import { useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
const DashboardLayout = ({ children }) => {
  const [open, setOpen] = useState(true);

  return (
    <div className="flex h-screen">
      <Sidebar open={open} setOpen={setOpen} />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="flex-1 bg-slate-100 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;