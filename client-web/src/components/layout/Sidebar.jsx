import {
  FaHome,
  FaUsers,
  FaUserTie,
  FaBoxOpen,
  FaMoneyBillWave,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaWarehouse,
  FaCartPlus,
  FaShoppingBag,
  FaTruck,
  FaCreditCard,
  FaUndoAlt,
  FaChartBar,
  FaBell,
  FaClipboardCheck,
  FaCalendarAlt,
  FaMoneyCheckAlt,
  
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";
//import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FaHome />,
  },
  {
    title: "Customers",
    path: "/customers",
    icon: <FaUsers />,
  },
  {
    title: "Employees",
    path: "/employees",
    icon: <FaUserTie />,
  },
  {
  title: "Attendance",
  path: "/attendance",
  icon: <FaClipboardCheck />,
},
{
  title: "Leave",
  path: "/leave",
  icon: <FaCalendarAlt />,
},
{
  title: "Payroll",
  path: "/payroll",
  icon: <FaMoneyCheckAlt />,
},
  {
    title: "Products",
    path: "/products",
    icon: <FaBoxOpen />,
  },
  {
    title: "Inventory",
    path: "/inventory",
    icon: <FaWarehouse />,
  },
  {
    title: "Purchases",
    path: "/purchases",
    icon: <FaCartPlus />,
  },
  {
    title: "Orders",
    path: "/Orders",
    icon: <FaShoppingBag />,
  },
  {
    title: "Billing",
    path: "/billing",
    icon: <FaMoneyBillWave />,
  },
  {
    title: "Suppliers",
    path: "/suppliers",
    icon: <FaTruck />,
  },
  {
    title: "Payments",
    path: "/payments",
    icon: <FaCreditCard />,
  },
  {
    title: "Returns",
    path: "/returns",
    icon: <FaUndoAlt />,
  },
  {
    title: "Reports",
    path: "/reports",
    icon: <FaChartBar />,
  },
  {
    title: "Notifications",
    path: "/notifications",
    icon: <FaBell />,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: <FaCog />,
  },
  {
  title: "Leave",
  path: "/leave",
  icon: <FaCalendarAlt />,
},
  
];

const Sidebar = ({ open, setOpen }) => {
  const location = useLocation();

  return (
    <aside
      className={`bg-[#132246] text-white h-screen flex flex-col transition-all duration-300 ${
        open ? "w-64" : "w-20"
      }`}
    >
      {/* Header */}
      <div className="border-b border-slate-700 p-4">
        <div
          className={
            open
              ? "flex justify-between items-start"
              : "flex justify-center"
          }
        >
          {open && (
            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                BusinessHub
              </h1>

              <p className="mt-2 text-sm text-slate-400">
                CRM & HRMS
              </p>
            </div>
           
          )}
          <br></br>
      

          <button
            onClick={() => setOpen(!open)}
            className="rounded-lg p-3 hover:bg-slate-700 transition"
          >
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>
      <br></br>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto mt-8 px-4 flex flex-col gap-2">

  {/* Dashboard, Customers, Employees */}
  {menuItems.slice(0, 3).map((item) => (
    <Link
      key={item.title}
      to={item.path}
      className={`flex items-center ${
        open ? "gap-5 px-5 justify-start" : "justify-center"
      } py-4 rounded-xl transition-all duration-300 ${
        location.pathname === item.path
          ? "bg-blue-600 shadow-md"
          : "hover:bg-slate-800"
      }`}
    >
      <span className="text-xl">{item.icon}</span>
      {open && <span className="text-[15px] font-medium">{item.title}</span>}
    </Link>
  ))}

  {/* HR Heading */}
  {open && (
    <p className="mt-5 mb-2 px-5 text-xs uppercase tracking-wider text-slate-400">
      HR
    </p>
  )}

  {/* Attendance, Leave, Payroll */}
  {menuItems.slice(3, 6).map((item) => (
    <Link
      key={item.title}
      to={item.path}
      className={`flex items-center ${
        open ? "gap-5 px-5 justify-start" : "justify-center"
      } py-4 rounded-xl transition-all duration-300 ${
        location.pathname === item.path
          ? "bg-blue-600 shadow-md"
          : "hover:bg-slate-800"
      }`}
    >
      <span className="text-xl">{item.icon}</span>
      {open && <span className="text-[15px] font-medium">{item.title}</span>}
    </Link>
  ))}

  {/* Inventory Heading */}
  {open && (
    <p className="mt-5 mb-2 px-5 text-xs uppercase tracking-wider text-slate-400">
      Inventory
    </p>
  )}

  {/* Remaining Menu */}
  {menuItems.slice(6).map((item) => (
    <Link
      key={item.title}
      to={item.path}
      className={`flex items-center ${
        open ? "gap-5 px-5 justify-start" : "justify-center"
      } py-4 rounded-xl transition-all duration-300 ${
        location.pathname === item.path
          ? "bg-blue-600 shadow-md"
          : "hover:bg-slate-800"
      }`}
    >
      <span className="text-xl">{item.icon}</span>
      {open && <span className="text-[15px] font-medium">{item.title}</span>}
    </Link>
  ))}

</nav>
      <br></br>

      {/* Logout */}
      <div className="border-t border-slate-700 p-3">
        <button
          className={`w-full flex items-center ${
            open ? "gap-5 px-5 justify-start" : "justify-center"
          } py-3.5 rounded-xl hover:bg-red-600 transition`}
        >
          <FaSignOutAlt className="text-xl" />

          {open && (
            <span className="font-medium">
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;