import {  FaSearch } from "react-icons/fa";

const invoices = [
  {
    id: "INV-1001",
    customer: "ABC Pvt Ltd",
    amount: "₹45,000",
    date: "12 Jul 2026",
    status: "Paid",
  },
  {
    id: "INV-1002",
    customer: "XYZ Industries",
    amount: "₹18,500",
    date: "13 Jul 2026",
    status: "Pending",
  },
  {
    id: "INV-1003",
    customer: "Samsung",
    amount: "₹82,000",
    date: "15 Jul 2026",
    status: "Paid",
  },
];

const Billing = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
         
        </h1>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
          + Create Invoice
        </button>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white p-5 rounded-2xl shadow">
          <p>Total Invoices</p>
          <h2 className="text-3xl font-bold mt-2">320</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p>Paid</p>
          <h2 className="text-3xl font-bold mt-2 text-green-600">280</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p>Pending</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-600">40</h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p>Total Revenue</p>
          <h2 className="text-3xl font-bold mt-2 text-blue-600">
            ₹2.8 Cr
          </h2>
        </div>

      </div>

      {/* Search */}

      <div className="bg-none rounded-2xl ">

        <div className="flex gap-4">

          <div className="relative flex-1">

            <FaSearch className="absolute left-70 top-4 text-gray-400"/>

            <input
              placeholder="Search Invoice..."
              className="bg-white w-full sm:w-80 h-8 pl-4 pr-4 rounded-xl  placeholder-slate-400 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />

          </div>

          <select className="border rounded-xl px-4">
            <option>All Status</option>
            <option>Paid</option>
            <option>Pending</option>
          </select>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Invoice</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {invoices.map((invoice) => (

              <tr key={invoice.id} className="border-t">

                <td className="p-4 font-semibold text-blue-600">
                  {invoice.id}
                </td>

                <td className="p-4">
                  {invoice.customer}
                </td>

                <td className="p-4 font-semibold">
                  {invoice.amount}
                </td>

                <td className="p-4">
                  {invoice.date}
                </td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      invoice.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {invoice.status}
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

export default Billing;