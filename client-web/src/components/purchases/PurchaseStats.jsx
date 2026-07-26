/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import {
  FaShoppingCart,
  FaClock,
  FaCheckCircle,
  FaRupeeSign,
} from "react-icons/fa";

import { getPurchases } from "../../services/purchaseService";

const PurchaseStats = () => {
  const [stats, setStats] = useState({
    totalPurchases: 0,
    pending: 0,
    received: 0,
    amount: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await getPurchases();

      const purchases = res.data.purchases || [];

      const pending = purchases.filter(
        (p) =>
          p.status === "Pending" ||
          p.status === "Receiving"
      ).length;

      const received = purchases.filter(
        (p) =>
          p.status === "Received" ||
          p.status === "Completed"
      ).length;

      const amount = purchases.reduce(
        (sum, item) =>
          sum + Number(item.totalAmount || 0),
        0
      );

      setStats({
        totalPurchases: purchases.length,
        pending,
        received,
        amount,
      });
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
      title: "Total Purchases",
      value: stats.totalPurchases,
      icon: <FaShoppingCart />,
      color: "bg-blue-500",
    },
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaClock />,
      color: "bg-yellow-500",
    },
    {
      title: "Received",
      value: stats.received,
      icon: <FaCheckCircle />,
      color: "bg-green-500",
    },
    {
      title: "Total Amount",
      value: `₹${Number(stats.amount).toLocaleString(
        "en-IN"
      )}`,
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

export default PurchaseStats;