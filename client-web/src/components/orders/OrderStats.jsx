import {
  FaShoppingBag,
  FaClock,
  FaTruck,
  FaTimesCircle,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Orders",
    value: "520",
    icon: <FaShoppingBag />,
    bg: "bg-blue-100",
    color: "text-blue-600",
  },
  {
    title: "Pending",
    value: "35",
    icon: <FaClock />,
    bg: "bg-yellow-100",
    color: "text-yellow-600",
  },
  {
    title: "Delivered",
    value: "460",
    icon: <FaTruck />,
    bg: "bg-green-100",
    color: "text-green-600",
  },
  {
    title: "Cancelled",
    value: "25",
    icon: <FaTimesCircle />,
    bg: "bg-red-100",
    color: "text-red-600",
  },
];

const OrderStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 ">

      {stats.map((item) => (

        <div
          key={item.title}
          className="bg-white border-none rounded-2xl shadow-sm p-6"
        >
          <div className="flex justify-between items-center">

            <div>

              <p className="text-slate-500 text-sm">
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

export default OrderStats;