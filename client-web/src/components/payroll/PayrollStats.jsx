/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaUsers,
} from "react-icons/fa";

import { getPayrollStats } from "../../services/payrollService";

const PayrollStats = () => {
  const [stats, setStats] = useState({
    totalPayrolls: 0,
    paid: 0,
    pending: 0,
    totalSalary: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await getPayrollStats();

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
      title: "Total Payroll",
      value: `₹${Number(
        stats.totalSalary || 0
      ).toLocaleString("en-IN")}`,
      icon: <FaMoneyBillWave />,
      color: "bg-blue-500",
    },
    {
      title: "Paid",
      value: stats.paid,
      icon: <FaCheckCircle />,
      color: "bg-green-500",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock />,
      color: "bg-yellow-500",
    },
    {
      title: "Employees",
      value: stats.totalPayrolls,
      icon: <FaUsers />,
      color: "bg-purple-500",
    },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        Loading Statistics...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white mb-10 rounded-2xl shadow-sm p-6 h-32 flex justify-between items-center hover:shadow-xl transition-all duration-300"
        >
          <div>
            <p className="text-gray-500 text-sm">
              {card.title}
            </p>

            <h2 className="text-3xl font-bold mt-2 text-gray-800">
              {card.value}
            </h2>
          </div>

          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl ${card.color}`}
          >
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PayrollStats;