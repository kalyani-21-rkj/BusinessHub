import { FaPlus } from "react-icons/fa";

const payments = [
  {
    id: "PAY-001",
    customer: "ABC Pvt Ltd",
    amount: "₹45,000",
    method: "UPI",
    date: "15 Jul 2026",
    status: "Completed",
  },
  {
    id: "PAY-002",
    customer: "XYZ Industries",
    amount: "₹18,000",
    method: "Bank Transfer",
    date: "16 Jul 2026",
    status: "Pending",
  },
  {
    id: "PAY-003",
    customer: "Samsung",
    amount: "₹82,000",
    method: "Credit Card",
    date: "17 Jul 2026",
    status: "Completed",
  },
];

const Payments = () => {
  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl shadow p-5">
          <p>Total Payments</p>
          <h2 className="text-3xl font-bold mt-2">320</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p>Completed</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">280</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p>Pending</p>
          <h2 className="text-3xl font-bold text-yellow-600 mt-2">40</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p>Total Received</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">₹2.5 Cr</h2>
        </div>

      </div>

      {/* Search */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">

          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full sm:w-80 h-8 pl-4 pr-4 rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          

        </div>
        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition-all active:scale-[0.99]">
          <FaPlus size={18} className="stroke-[2.5]" />
          Add Product
        </button>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Payment ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Method</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {payments.map((payment) => (

              <tr key={payment.id} className="border-t">

                <td className="p-4 font-semibold text-blue-600">
                  {payment.id}
                </td>

                <td className="p-4">{payment.customer}</td>

                <td className="p-4 font-semibold">
                  {payment.amount}
                </td>

                <td className="p-4">{payment.method}</td>

                <td className="p-4">{payment.date}</td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      payment.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {payment.status}
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Payments;