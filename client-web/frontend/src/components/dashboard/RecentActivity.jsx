import {
  FaUserPlus,
  FaShoppingCart,
  FaBoxOpen,
  FaMoneyBillWave,
  FaUserTie,
} from "react-icons/fa";

const activities = [
  {
    icon: <FaUserPlus />,
    color: "bg-blue-50 text-blue-600 ring-4 ring-blue-50/50",
    title: "Rahul Sharma added as Customer",
    time: "2 min ago",
  },
  {
    icon: <FaShoppingCart />,
    color: "bg-emerald-50 text-emerald-600 ring-4 ring-emerald-50/50",
    title: "New Order #1005 Created",
    time: "10 min ago",
  },
  {
    icon: <FaBoxOpen />,
    color: "bg-amber-50 text-amber-600 ring-4 ring-amber-50/50",
    title: "Product Laptop Updated",
    time: "1 hour ago",
  },
  {
    icon: <FaUserTie />,
    color: "bg-purple-50 text-purple-600 ring-4 ring-purple-50/50",
    title: "Employee Sneha Joined",
    time: "Today",
  },
  {
    icon: <FaMoneyBillWave />,
    color: "bg-rose-50 text-rose-600 ring-4 ring-rose-50/50",
    title: "Bill #205 Generated",
    time: "Today",
  },
];

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 w-full">
      {/* Header */}
      <h2 className="text-lg font-bold text-slate-800 tracking-tight mb-6">
        Recent Activity
      </h2>

      {/* Timeline Wrapper */}
      <div className="relative pl-2">
        {/* Vertical Line Thread running behind the icons */}
        <div className="absolute top-3 bottom-3 left-[26px] w-[2px] bg-slate-100 z-0" />

        {/* Dynamic Activity List */}
        <div className="space-y-6">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="relative flex items-start gap-4 z-10 group"
            >
              {/* Dynamic Tonal Icon Ring */}
              <div
                className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center text-sm font-medium transition-transform duration-200 group-hover:scale-105 ${activity.color}`}
              >
                {activity.icon}
              </div>

              {/* Text Meta Container */}
              <div className="flex-1 min-w-0 pt-0.5">
                <h3 className="text-sm font-semibold text-slate-800 group-hover:text-slate-900 transition-colors">
                  {activity.title}
                </h3>
                <p className="text-xs text-slate-400 font-medium mt-0.5">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecentActivity;