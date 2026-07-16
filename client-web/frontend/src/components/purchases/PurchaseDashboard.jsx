import {
  FaShoppingCart,
  FaTruckLoading,
  FaClock,
  FaCheckCircle,
  FaRupeeSign,
} from "react-icons/fa";

const cards = [
  {
    title: "Purchase Orders",
    value: "284",
    icon: <FaShoppingCart />,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Receiving",
    value: "42",
    icon: <FaTruckLoading />,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    title: "Pending Approval",
    value: "18",
    icon: <FaClock />,
    bg: "bg-orange-100",
    color: "text-orange-600",
  },
  {
    title: "Completed",
    value: "224",
    icon: <FaCheckCircle />,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "Purchase Cost",
    value: "₹2.45 Cr",
    icon: <FaRupeeSign />,
    bg: "bg-purple-100",
    color: "text-purple-600",
  },
];

const PurchaseDashboard = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition p-6"
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="text-sm text-slate-500">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-3 text-slate-800">
                {card.value}
              </h2>

            </div>

            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${card.bg} ${card.color}`}
            >
              {card.icon}
            </div>

          </div>
        </div>

      ))}

    </div>
  );
};

export default PurchaseDashboard;