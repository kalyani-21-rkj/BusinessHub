/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserPlus,
  FaUserCheck,
  FaUserTimes,
} from "react-icons/fa";

import { getCustomerStats } from "../../services/customerService";

const CustomerStats = () => {

  const [stats, setStats] = useState({
    totalCustomers: 0,
    totalLeads: 0,
    activeCustomers: 0,
    inactiveCustomers: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {

    try {

      const res = await getCustomerStats();

      setStats(res.data.stats);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchStats();

  }, []);

  const cards = [
    {
      title: "Total Customers",
      value: stats.totalCustomers,
      color: "bg-blue-600",
      icon: <FaUsers />,
    },
    {
      title: "Leads",
      value: stats.totalLeads,
      color: "bg-yellow-500",
      icon: <FaUserPlus />,
    },
    {
      title: "Customers",
      value: stats.activeCustomers,
      color: "bg-green-600",
      icon: <FaUserCheck />,
    },
    {
      title: "Inactive",
      value: stats.inactiveCustomers,
      color: "bg-red-600",
      icon: <FaUserTimes />,
    },
  ];

  return (

    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

      {cards.map((item) => (

        <div
          key={item.title}
          className="bg-white rounded-2xl shadow p-6 flex justify-between items-center"
        >

          <div>

            <p className="text-slate-500 text-sm">

              {item.title}

            </p>

            <h2 className="text-3xl font-bold mt-2">

              {loading ? "..." : item.value}

            </h2>

          </div>

          <div
            className={`w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl ${item.color}`}
          >

            {item.icon}

          </div>

        </div>

      ))}

    </div>

  );

};

export default CustomerStats;