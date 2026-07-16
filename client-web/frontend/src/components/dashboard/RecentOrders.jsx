const orders = [
  { id: "#1001", customer: "Rahul Sharma", amount: "₹1,250", status: "Paid", date: "09 Jul" },
  { id: "#1002", customer: "Kalyani Ramayane", amount: "₹850", status: "Pending", date: "08 Jul" },
  { id: "#1003", customer: "Sneha Patil", amount: "₹2,450", status: "Paid", date: "08 Jul" },
  { id: "#1004", customer: "Amit Joshi", amount: "₹650", status: "Delivered", date: "07 Jul" },
];

const RecentOrders = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 flex flex-col justify-between h-full">
      {/* Header Container */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-slate-800 tracking-tight">
          Recent Orders
        </h2>
        <button className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors">
          View All
        </button>
      </div>

      {/* Table Element Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px]">
          <thead>
            <tr className="text-left text-xs font-semibold text-slate-400 border-b border-slate-100 uppercase tracking-wider">
              <th className="pb-3 font-semibold">Order ID</th>
              <th className="pb-3 font-semibold">Customer</th>
              <th className="pb-3 font-semibold">Amount</th>
              <th className="pb-3 font-semibold">Status</th>
              <th className="pb-3 font-semibold text-right">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-50">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                <td className="py-3.5 text-sm font-semibold text-slate-500">
                  {order.id}
                </td>
                <td className="py-3.5 text-sm font-medium text-slate-800">
                  {order.customer}
                </td>
                <td className="py-3.5 text-sm font-semibold text-slate-900">
                  {order.amount}
                </td>
                <td className="py-3.5">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${
                      order.status === "Paid"
                        ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/10"
                        : order.status === "Pending"
                        ? "bg-amber-50 text-amber-700 ring-1 ring-amber-600/10"
                        : "bg-blue-50 text-blue-700 ring-1 ring-blue-600/10"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-3.5 text-sm text-slate-400 font-medium text-right">
                  {order.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;