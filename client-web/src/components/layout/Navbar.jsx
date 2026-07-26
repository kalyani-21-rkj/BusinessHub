import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import {
  Avatar,
  Menu,
  MenuItem,
  Divider,
  ListItemIcon,
} from "@mui/material";

import {
  Home,
  //Person,
  //Settings,
  Logout,
} from "@mui/icons-material";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("user")) || {};

  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/");

    handleClose();
  };

  const pageTitles = {
    "/dashboard": {
      title: "Dashboard",
      subtitle: "Welcome back 👋",
    },

    "/customers": {
      title: "Customers",
      subtitle: "Manage all customers",
    },

    "/employees": {
      title: "Employees",
      subtitle: "Manage all employees",
    },

    "/attendance": {
      title: "Attendance",
      subtitle: "Manage employee attendance",
    },

    "/leave": {
      title: "Leave",
      subtitle: "Manage leave requests",
    },

    "/payroll": {
      title: "Payroll",
      subtitle: "Manage employee payroll",
    },

    "/products": {
      title: "Products",
      subtitle: "Manage all products",
    },

    "/inventory": {
      title: "Inventory",
      subtitle: "Manage inventory stock",
    },

    "/purchases": {
      title: "Purchases",
      subtitle: "Manage purchases",
    },

    "/billing": {
      title: "Billing",
      subtitle: "Manage invoices & billing",
    },
  };

  const current = pageTitles[location.pathname] || {
    title: "BusinessHub",
    subtitle: "",
  };

  return (
    <header className="h-20 bg-white border-b border-gray-200 px-6 md:px-8 flex items-center justify-between shadow-sm">

      {/* Left */}

      <div className="flex items-center gap-4">

        <div className="bg-blue-100 rounded-xl p-3">

          <Home
            sx={{
              color: "#2563EB",
              fontSize: 28,
            }}
          />

        </div>

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            {current.title}
          </h1>

          <p className="text-sm text-slate-500">
            {current.subtitle}
          </p>

        </div>

      </div>

      {/* Right */}

      <div>

        <Avatar
          onClick={handleProfileClick}
          sx={{
            bgcolor: "#2563EB",
            width: 35,
            height: 35,
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          {user?.fullName
            ? user.fullName.charAt(0).toUpperCase()
            : "A"}
        </Avatar>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            elevation: 8,
            sx: {
              mt: 1.5,
              width: 250,
              borderRadius: 3,
            },
          }}
        >
          {/* User */}

          <div className="flex items-center gap-3 px-4 py-4">

            <Avatar
              sx={{
                bgcolor: "#2563EB",
              }}
            >
              {user?.fullName
                ? user.fullName.charAt(0).toUpperCase()
                : "A"}
            </Avatar>

            <div>

              <h3 className="font-semibold text-slate-800">
                {user?.fullName || "Administrator"}
              </h3>

              <p className="text-sm text-gray-500 capitalize">
                {user?.role || "Admin"}
              </p>

            </div>

          </div>

          <Divider />


          <Divider />

          <MenuItem
            onClick={handleLogout}
            sx={{
              color: "red",
            }}
          >

            <ListItemIcon>
              <Logout
                fontSize="small"
                color="error"
              />
            </ListItemIcon>

            Logout

          </MenuItem>

        </Menu>

      </div>

    </header>
  );
};

export default Navbar;