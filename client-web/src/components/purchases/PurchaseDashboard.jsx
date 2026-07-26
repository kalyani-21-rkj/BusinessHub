/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import {
  FaShoppingCart,
  FaTruckLoading,
  FaClock,
  FaCheckCircle,
  FaRupeeSign,
} from "react-icons/fa";

import { getPurchaseStats } from "../../services/purchaseService";

const PurchaseDashboard = () => {
  const [stats, setStats] = useState({
    totalPurchases: 0,
    pending: 0,
    ordered: 0,
    received: 0,
    totalAmount: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await getPurchaseStats();

      setStats(
        res.data.stats || {
          totalPurchases: 0,
          pending: 0,
          ordered: 0,
          received: 0,
          totalAmount: 0,
        }
      );
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
      title: "Purchase Orders",
      value: stats.totalPurchases,
      icon: <FaShoppingCart />,
      color: "bg-blue-500",
    },
    {
      title: "Ordered",
      value: stats.ordered,
      icon: <FaTruckLoading />,
      color: "bg-yellow-500",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock />,
      color: "bg-orange-500",
    },
    {
      title: "Received",
      value: stats.received,
      icon: <FaCheckCircle />,
      color: "bg-green-500",
    },
    {
      title: "Purchase Cost",
      value: `₹${Number(
        stats.totalAmount || 0
      ).toLocaleString("en-IN")}`,
      icon: <FaRupeeSign />,
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
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-8">
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

export default PurchaseDashboard;