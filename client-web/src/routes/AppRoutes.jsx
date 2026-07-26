import { Navigate, Route, Routes } from "react-router-dom";

import DashboardLayout from "../layouts/DashboardLayout";

// Auth
import Login from "../pages/auth/Login";

// Dashboard
import Dashboard from "../pages/dashboard/Dashboard";
import Register from "../pages/auth/Register";
import ProtectedRoute from "../components/auth/ProtectedRoute";


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

      {/* Customers */}
      <Route
        path="/customers"
        element={
          <DashboardLayout>
            <Customers />
          </DashboardLayout>
        }
      />

      <Route
  path="/dashboard"
  element={
    <ProtectedRoute roles={["admin", "hr", "customer"]}>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/employees"
  element={
    <ProtectedRoute roles={["admin", "hr"]}>
      <DashboardLayout>
        <Employees />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

      {/* HR */}

      <Route
  path="/attendance"
  element={
    <ProtectedRoute roles={["admin", "hr"]}>
      <DashboardLayout>
        <Attendance />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

      <Route
  path="/leave"
  element={
    <ProtectedRoute roles={["admin", "hr"]}>
      <DashboardLayout>
        <Leave />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

      <Route
  path="/payroll"
  element={
    <ProtectedRoute roles={["admin", "hr"]}>
      <DashboardLayout>
        <Payroll />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

      {/* Products */}
      <Route
  path="/products"
  element={
    <ProtectedRoute roles={["admin"]}>
      <DashboardLayout>
        <Products />
      </DashboardLayout>
    </ProtectedRoute>
  }
/>

      {/* Inventory */}
      <Route
        path="/inventory"
        element={
          <ProtectedRoute roles={["admin", "customer"]}>
          <DashboardLayout>
            <Inventory />
          </DashboardLayout>
        </ProtectedRoute>
  }
/>

      {/* Purchases */}
      <Route
        path="/purchases"
        element={
          <ProtectedRoute roles={["admin"]}>
          <DashboardLayout>
            <Purchases />
          </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Orders */}
      <Route
        path="/orders"
        element={
          <ProtectedRoute roles={["admin"]}>
          <DashboardLayout>
            <Orders />
          </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Billing */}
      <Route
        path="/billing"
        element={
          <ProtectedRoute roles={["admin"]}>
          <DashboardLayout>
            <Billing />
          </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Suppliers */}
      <Route
        path="/suppliers"
        element={
          <ProtectedRoute roles={["admin"]}>
          <DashboardLayout>
            <Suppliers />
          </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Payments */}
      <Route
        path="/payments"
        element={
          <ProtectedRoute roles={["admin"]}>
          <DashboardLayout>
            <Payments />
          </DashboardLayout>
          </ProtectedRoute>
        }
      />

      {/* Returns */}
      <Route
        path="/returns"
        element={
          <ProtectedRoute roles={["admin"]}>
          <DashboardLayout>
            <Returns />
          </DashboardLayout>
          </ProtectedRoute>
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
      <Route
  path="/register"
  element={<Register />}
/>
<Route path="/register" element={<Register />} />

      {/* Default */}
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
      
    </Routes>
  );
};

export default AppRoutes;