/* eslint-disable react-hooks/set-state-in-effect */

import {
  FaBoxes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { getInventoryStats } from "../../services/inventoryService";

const InventoryStats = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStock: 0,
    lowStock: 0,
    outOfStock: 0,
  });

  const loadStats = async () => {
    try {
      const res = await getInventoryStats();

      const data = res.data.stats;

      setStats({
        totalProducts: data.totalProducts || 0,
        inStock: data.inStock || 0,
        lowStock: data.lowStock || 0,
        outOfStock:
          (data.totalProducts || 0) -
          (data.inStock || 0) -
          (data.lowStock || 0),
      });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadStats();
  }, []);

  const cards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <FaBoxes />,
      bg: "bg-blue-100",
      color: "text-blue-600",
    },
    {
      title: "In Stock",
      value: stats.inStock,
      icon: <FaCheckCircle />,
      bg: "bg-green-100",
      color: "text-green-600",
    },
    {
      title: "Low Stock",
      value: stats.lowStock,
      icon: <FaExclamationTriangle />,
      bg: "bg-yellow-100",
      color: "text-yellow-600",
    },
    {
      title: "Out of Stock",
      value: stats.outOfStock,
      icon: <FaTimesCircle />,
      bg: "bg-red-100",
      color: "text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold text-slate-800 mt-2">
                {item.value}
              </h2>
            </div>

            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${item.bg} ${item.color}`}
            >
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InventoryStats;