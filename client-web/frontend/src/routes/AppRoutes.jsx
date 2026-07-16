import { Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

// Auth
import Login from "../pages/auth/Login";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";

// CRM
import Customers from "../pages/customers/Customers";
import Employees from "../pages/employees/Employees";
import Products from "../pages/products/Products";
import Inventory from "../pages/inventory/Inventory";
import Purchases from "../pages/purchases/Purchases";
import Orders from "../pages/orders/Orders";
import Billing from "../pages/billing/Billing";
import Suppliers from "../pages/suppliers/Suppliers";
import Payments from "../pages/payments/Payments";
import Returns from "../pages/returns/Returns";
import Reports from "../pages/reports/Reports";
import Notifications from "../pages/notifications/Notifications";
import Settings from "../pages/settings/Settings";

// HR
import Attendance from "../pages/attendance/Attendance";
import Leave from "../pages/leave/Leave";
import Payroll from "../pages/payroll/Payroll";

const AppRoutes = () => {
  return (
    <Routes>

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Dashboard */}
      <Route
        path="/dashboard"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />

      {/* Customers */}
      <Route
        path="/customers"
        element={
          <DashboardLayout>
            <Customers />
          </DashboardLayout>
        }
      />

      {/* Employees */}
      <Route
        path="/employees"
        element={
          <DashboardLayout>
            <Employees />
          </DashboardLayout>
        }
      />

      {/* HR */}

      <Route
        path="/attendance"
        element={
          <DashboardLayout>
            <Attendance />
          </DashboardLayout>
        }
      />

      <Route
        path="/leave"
        element={
          <DashboardLayout>
            <Leave />
          </DashboardLayout>
        }
      />

      <Route
        path="/payroll"
        element={
          <DashboardLayout>
            <Payroll />
          </DashboardLayout>
        }
      />

      {/* Products */}
      <Route
        path="/products"
        element={
          <DashboardLayout>
            <Products />
          </DashboardLayout>
        }
      />

      {/* Inventory */}
      <Route
        path="/inventory"
        element={
          <DashboardLayout>
            <Inventory />
          </DashboardLayout>
        }
      />

      {/* Purchases */}
      <Route
        path="/purchases"
        element={
          <DashboardLayout>
            <Purchases />
          </DashboardLayout>
        }
      />

      {/* Orders */}
      <Route
        path="/orders"
        element={
          <DashboardLayout>
            <Orders />
          </DashboardLayout>
        }
      />

      {/* Billing */}
      <Route
        path="/billing"
        element={
          <DashboardLayout>
            <Billing />
          </DashboardLayout>
        }
      />

      {/* Suppliers */}
      <Route
        path="/suppliers"
        element={
          <DashboardLayout>
            <Suppliers />
          </DashboardLayout>
        }
      />

      {/* Payments */}
      <Route
        path="/payments"
        element={
          <DashboardLayout>
            <Payments />
          </DashboardLayout>
        }
      />

      {/* Returns */}
      <Route
        path="/returns"
        element={
          <DashboardLayout>
            <Returns />
          </DashboardLayout>
        }
      />

      {/* Reports */}
      <Route
        path="/reports"
        element={
          <DashboardLayout>
            <Reports />
          </DashboardLayout>
        }
      />

      {/* Notifications */}
      <Route
        path="/notifications"
        element={
          <DashboardLayout>
            <Notifications />
          </DashboardLayout>
        }
      />

      {/* Settings */}
      <Route
        path="/settings"
        element={
          <DashboardLayout>
            <Settings />
          </DashboardLayout>
        }
      />

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />

    </Routes>
  );
};

export default AppRoutes;