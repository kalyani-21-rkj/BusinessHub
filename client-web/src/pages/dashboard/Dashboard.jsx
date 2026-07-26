import {
  FaUsers,
  FaUserTie,
  FaBoxOpen,
  FaMoneyBillWave,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { getDashboard } from "../../services/dashboardService";

// Dashboard Components
import WelcomeBanner from "../../components/dashboard/WelcomeBanner";
import StatCard from "../../components/dashboard/StatsCard";
import BusinessWorkflow from "../../components/dashboard/BusinessWorkflow";
import RecentCustomers from "../../components/dashboard/RecentCustomers";
import ProductsOverview from "../../components/dashboard/ProductsOverview";

// Charts
import SalesChart from "../../components/charts/SalesChart";
import RevenueChart from "../../components/charts/RevenueChart";

const Dashboard = () => {
 const [dashboard, setDashboard] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await getDashboard();

        setDashboard(res.data.dashboard);
        console.log("Dashboard State:", res.data.dashboard);
      } catch (err) {
        console.error("Dashboard Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);
  
  

  console.log("Rendering Dashboard", dashboard);

  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>
    <div className="max-w-[1600px] mx-auto flex flex-col gap-8 p-2 md:p-0">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesChart />
        <RevenueChart />
      </div>

      {/* Business Workflow */}
      <BusinessWorkflow />

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentCustomers
    customers={dashboard?.recentCustomers || []}
/>

        <ProductsOverview  products={dashboard?.productStock || []}/>
      </div>
    </div>
  </div>
  );
};

export default Dashboard;