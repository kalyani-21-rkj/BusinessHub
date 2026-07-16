import {
  FaShoppingCart,
  FaClock,
  FaCheckCircle,
  FaRupeeSign,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Purchases",
    value: "145",
    icon: <FaShoppingCart />,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Pending",
    value: "18",
    icon: <FaClock />,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    title: "Received",
    value: "127",
    icon: <FaCheckCircle />,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "Total Amount",
    value: "₹18.5L",
    icon: <FaRupeeSign />,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
];

const PurchaseStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((item) => (

        <div
          key={item.title}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6"
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm text-slate-500">
                {item.title}
              </p>

              <h2 className="text-3xl font-bold mt-2">
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

export default PurchaseStats;