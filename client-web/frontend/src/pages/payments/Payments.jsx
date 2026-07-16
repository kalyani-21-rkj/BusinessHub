import { FaSearch } from "react-icons/fa";

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
    <div className="p-6 space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">Payments</h1>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
          + Record Payment
        </button>

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

      <div className="bg-white rounded-2xl shadow p-5">

        <div className="relative">

          <FaSearch className="absolute left-4 top-4 text-gray-400"/>

          <input
            placeholder="Search Payment..."
            className="w-full border rounded-xl pl-11 pr-4 py-3"
          />

        </div>

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