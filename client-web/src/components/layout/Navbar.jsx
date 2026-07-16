import { useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const [showProfile, setShowProfile] = useState(false);

  const location = useLocation();

const pageTitles = {
  "/dashboard": {
    title: "Dashboard",
    subtitle: "Welcome back, Admin 👋",
  },

  "/customers": {
    title: "Customers",
    subtitle: "Manage all customers",
  },

  "/employees": {
    title: "Employees",
    subtitle: "Manage all employees",
  },

  "/products": {
    title: "Products",
    subtitle: "Manage all products",
  },

  "/billing": {
    title: "Billing",
    subtitle: "Manage bills & invoices",
  },

  "/settings": {
    title: "Settings",
    subtitle: "Application settings",
  },
};

const current =
  pageTitles[location.pathname] || {
    title: "BusinessHub",
    subtitle: "",
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between">

      {/* Left */}
      <div>
        <h1 className="text-3xl font-bold text-slate-800">
        {current.title}
        </h1>

        <p className="text-slate-500">
        {current.subtitle}
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-8 pr-4">

        {/* Search */}
        <div className="relative">

          <input
            type="text"
            placeholder="Search..."
            className="w-96 h-10 rounded-xl border border-gray-300 pl-5 pr-12 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />

          <FaSearch className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400" />

        </div>

        {/* Notification */}
        <button className="relative">

          <FaBell className="text-xl text-slate-500 hover:text-blue-600 transition" />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        {/* Profile */}
        <div className="relative">

          <button
            onClick={() => setShowProfile(!showProfile)}
            className="flex items-center"
          >
            <FaUserCircle className="text-3xl text-blue-600 hover:text-blue-700 transition" />
          </button>

          {showProfile && (
            <div className="absolute right-1 top-14 w-72 rounded-2xl bg-white border border-gray-200 shadow-2xl overflow-hidden z-50">

              {/* User Info */}
              <div className="flex items-center gap-4 p-5 bg-slate-50">

                <FaUserCircle className="text-2xl text-blue-600" />

                <div>
                  <h2 className="text-lg font-semibold text-slate-800">
                    Kalyani
                  </h2>

                  <p className="text-sm text-slate-500">
                    Administrator
                  </p>
                </div>

              </div>

              {/* Menu */}
              <div className="py-2">

                <button className="w-full px-2 py-2 text-left hover:bg-slate-100 transition">
                  My Profile
                </button>

                <button className="w-full px-5 py-3 text-left hover:bg-slate-100 transition">
                  Settings
                </button>

                <button className="w-full px-5 py-3 text-left text-red-600 hover:bg-red-50 transition">
                  Logout
                </button>

              </div>

            </div>
          )}

        </div>

      </div>

    </header>
  );
};

export default Navbar;