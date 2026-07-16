import {
  FaBoxOpen,
  FaWarehouse,
  FaExclamationTriangle,
  FaRupeeSign,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Products",
    value: "125",
    icon: <FaBoxOpen />,
    color: "bg-blue-200",
    
  },
  {
    title: "In Stock",
    value: "98",
    icon: <FaWarehouse />,
    color: "bg-green-200",
  },
  {
    title: "Low Stock",
    value: "18",
    icon: <FaExclamationTriangle />,
    color: "bg-orange-200",
  },
  {
    title: "Revenue",
    value: "₹3.8L",
    icon: <FaRupeeSign />,
    color: "bg-purple-200",
  },
];

const ProductStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full h-auto ">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl border-none shadow-sm border p-6 flex justify-between items-center hover:shadow-lg transition"
        >
          <div>
            <p className="text-gray-500">{item.title}</p>

            <h2 className="text-3xl font-bold mt-2">
              {item.value}
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