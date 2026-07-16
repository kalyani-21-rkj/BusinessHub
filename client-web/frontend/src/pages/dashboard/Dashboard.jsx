import {
  FaUsers,
  FaUserTie,
  FaBoxOpen,
  FaMoneyBillWave,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { getDashboard } from "../../services/dashboardService";

import StatCard from "../../components/dashboard/StatsCard";
import SalesChart from "../../components/charts/SalesChart";
import RevenueChart from "../../components/charts/RevenueChart";
import RecentOrders from "../../components/dashboard/RecentOrders";
import RecentCustomers from "../../components/dashboard/RecentCustomers";
import QuickActions from "../../components/dashboard/QuickActions";
import RecentActivity from "../../components/dashboard/RecentActivity";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    totalCustomers: 0,
    totalEmployees: 0,
    totalProducts: 0,
    totalRevenue: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboard();

        setDashboard(res.data.dashboard);
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="max-w-[1600px] mx-auto flex flex-col gap-10">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      </div>

      {/* Statistics Cards */}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

        <StatCard
          title="Customers"
          value={loading ? "..." : dashboard.totalCustomers}
          icon={<FaUsers />}
          color="bg-blue-600"
        />

        <StatCard
          title="Employees"
          value={loading ? "..." : dashboard.totalEmployees}
          icon={<FaUserTie />}
          color="bg-green-600"
        />

        <StatCard
          title="Products"
          value={loading ? "..." : dashboard.totalProducts}
          icon={<FaBoxOpen />}
          color="bg-orange-500"
        />

        <StatCard
          title="Revenue"
          value={
            loading
              ? "..."
              : `₹${dashboard.totalRevenue.toLocaleString()}`
          }
          icon={<FaMoneyBillWave />}
          color="bg-purple-600"
        />

      </div>

      {/* Charts */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <SalesChart />

        <RevenueChart />

      </div>

      {/* Bottom Widgets */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <RecentOrders />

        <RecentCustomers />

        <QuickActions />

        <RecentActivity />

      </div>

    </div>
  );
};

export default Dashboard;