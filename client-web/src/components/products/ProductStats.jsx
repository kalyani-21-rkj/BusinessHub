import {
  FaBoxOpen,
  FaWarehouse,
  FaExclamationTriangle,
  FaRupeeSign,
} from "react-icons/fa";

import { useEffect, useState } from "react";
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
      setLoading(true);

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
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const statsData = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: <FaBoxOpen />,
      color: "bg-blue-200",
    },
    {
      title: "In Stock",
      value: stats.inStock,
      icon: <FaWarehouse />,
      color: "bg-green-200",
    },
    {
      title: "Low Stock",
      value: stats.lowStock,
      icon: <FaExclamationTriangle />,
      color: "bg-orange-200",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue}`,
      icon: <FaRupeeSign />,
      color: "bg-purple-200",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full h-auto">
      {statsData.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl border-none shadow-sm border p-6 flex justify-between items-center hover:shadow-lg transition"
        >
          <div>
            <p className="text-gray-500">{item.title}</p>

            <h2 className="text-3xl font-bold mt-2">
              {loading ? "..." : item.value}
            </h2>
          </div>

          <div
            className={`${item.color} h-16 w-16 rounded-2xl flex items-center justify-center text-white text-3xl`}
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductStats;