import {
  FaUserPlus,
  FaUserTie,
  FaBoxOpen,
  FaMoneyBillWave,
} from "react-icons/fa";

const actions = [
  {
    title: "Add Customer",
    icon: <FaUserPlus />,
    bgClass: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
  },
  {
    title: "Add Employee",
    icon: <FaUserTie />,
    bgClass: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white",
  },
  {
    title: "Add Product",
    icon: <FaBoxOpen />,
    bgClass: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white",
  },
  {
    title: "Create Bill",
    icon: <FaMoneyBillWave />,
    bgClass: "bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white",
  },
];

const QuickActions = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 w-full">
      {/* Section Header */}
      <h2 className="text-lg font-bold text-slate-800 tracking-tight mb-6">
        Quick Actions
      </h2>

      {/* Grid Layout Container */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {actions.map((action) => (
          <button
            key={action.title}
            className="group flex flex-col items-center justify-center h-32 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
          >
            {/* Dynamic, Interactive Icon Badge Container */}
            <div
              className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg transition-all duration-200 ease-in-out ${action.bgClass}`}
            >
              {action.icon}
            </div>

            {/* Typography Label */}
            <span className="mt-3.5 text-sm font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
              {action.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;