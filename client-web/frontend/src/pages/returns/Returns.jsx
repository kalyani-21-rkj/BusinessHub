import { FaSearch } from "react-icons/fa";

const returns = [
  {
    id: "RET-001",
    customer: "ABC Pvt Ltd",
    product: "MacBook Pro",
    qty: 2,
    reason: "Damaged",
    date: "16 Jul 2026",
    status: "Approved",
  },
  {
    id: "RET-002",
    customer: "XYZ Industries",
    product: "Dell Monitor",
    qty: 1,
    reason: "Wrong Item",
    date: "17 Jul 2026",
    status: "Pending",
  },
  {
    id: "RET-003",
    customer: "Samsung",
    product: "Galaxy Tab",
    qty: 4,
    reason: "Defective",
    date: "18 Jul 2026",
    status: "Rejected",
  },
];

const Returns = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>
      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          
        </h1>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
          + Create Return
        </button>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl shadow p-5">
          <p>Total Returns</p>
          <h2 className="text-3xl font-bold mt-2">84</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p>Approved</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">62</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p>Pending</p>
          <h2 className="text-3xl font-bold text-yellow-600 mt-2">15</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p>Rejected</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">7</h2>
        </div>

      </div>

      {/* Search */}

      <div className="bg-white rounded-1xl ">

        <div className="relative">

          <FaSearch className="absolute left-70 top-4 text-gray-400"/>

          <input
            placeholder="Search Return..."
            className="bg-white w-full h-8 rounded-xl px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          

        </div>
    

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Return ID</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Qty</th>
              <th className="p-4 text-left">Reason</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {returns.map((item) => (

              <tr key={item.id} className="border-t hover:bg-slate-50">

                <td className="p-4 font-semibold text-blue-600">
                  {item.id}
                </td>

                <td className="p-4">{item.customer}</td>

                <td className="p-4">{item.product}</td>

                <td className="p-4">{item.qty}</td>

                <td className="p-4">{item.reason}</td>

                <td className="p-4">{item.date}</td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : item.status === "Pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.status}
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

export default Returns;