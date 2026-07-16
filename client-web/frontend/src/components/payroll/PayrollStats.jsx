import {
  FaMoneyBillWave,
  FaCheckCircle,
  FaClock,
  FaUsers,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Payroll",
    value: "₹24.8L",
    icon: <FaMoneyBillWave size={28} />,
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
  {
    title: "Paid",
    value: "182",
    icon: <FaCheckCircle size={28} />,
    bg: "bg-green-100",
    text: "text-green-600",
  },
  {
    title: "Pending",
    value: "18",
    icon: <FaClock size={28} />,
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
  {
    title: "Employees",
    value: "200",
    icon: <FaUsers size={28} />,
    bg: "bg-purple-100",
    text: "text-purple-600",
  },
];

const PayrollStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">

      {stats.map((item) => (

        <div
          key={item.title}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition p-6 flex justify-between items-center"
        >

          <div>

            <p className="text-sm text-slate-500">
              {item.title}
            </p>

            <h2 className="text-3xl font-bold mt-2 text-slate-800">
              {item.value}
            </h2>

          </div>

          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.bg} ${item.text}`}
          >
            {item.icon}
          </div>

        </div>

      ))}

    </div>
  );
};

export default PayrollStats;