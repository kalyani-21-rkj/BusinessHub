/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import {
  FaBoxOpen,
  FaWarehouse,
  FaExclamationTriangle,
  FaRupeeSign,
} from "react-icons/fa";

import { getProductStats } from "../../services/productService";

const ProductStats = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStock: 0,
    lowStock: 0,
    revenue: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await getProductStats();

      setStats(
        res.data.stats || {
          totalProducts: 0,
          inStock: 0,
          lowStock: 0,
          revenue: 0,
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
      title: "Total Products",
      value: stats.totalProducts,
      icon: <FaBoxOpen />,
      color: "bg-blue-500",
    },
    {
      title: "In Stock",
      value: stats.inStock,
      icon: <FaWarehouse />,
      color: "bg-green-500",
    },
    {
      title: "Low Stock",
      value: stats.lowStock,
      icon: <FaExclamationTriangle />,
      color: "bg-yellow-500",
    },
    {
      title: "Revenue",
      value: `₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`,
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
    <div className="grid grid-cols-1 mt-2 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
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

export default ProductStats;