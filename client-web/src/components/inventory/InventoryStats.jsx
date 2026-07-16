import {
  FaBoxes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaTimesCircle,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Products",
    value: "125",
    icon: <FaBoxes />,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "In Stock",
    value: "108",
    icon: <FaCheckCircle />,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "Low Stock",
    value: "12",
    icon: <FaExclamationTriangle />,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    title: "Out of Stock",
    value: "5",
    icon: <FaTimesCircle />,
    bg: "bg-red-100",
    color: "text-red-600",
  },
];

const InventoryStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 hover:shadow-lg transition"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-500 text-sm">{item.title}</p>

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