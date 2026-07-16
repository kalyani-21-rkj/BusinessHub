import { FaUserCircle } from "react-icons/fa";

const customers = [
  { name: "Rahul Sharma", email: "rahul@gmail.com" },
  { name: "Kalyani Ramayane", email: "kalyani@gmail.com" },
  { name: "Sneha Patil", email: "sneha@gmail.com" },
  { name: "Amit Joshi", email: "amit@gmail.com" },
];

const RecentCustomers = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between h-full">
      {/* Header Container */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
          Recent Customers
        </h2>
        <button className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors">
          View All
        </button>
      </div>

      {/* Main List Layout */}
      <div className="divide-y divide-slate-50">
        {customers.map((customer, index) => (
          <div
            key={index}
            className="flex items-center gap-4 py-3 first:pt-0 last:pb-0 group"
          >
            {/* Styled Profile Container */}
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-100 transition-colors">
              <FaUserCircle className="text-2xl" />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-slate-800 truncate">
                {customer.name}
              </h3>
              <p className="text-xs text-slate-400 truncate mt-0.5">
                {customer.email}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCustomers;