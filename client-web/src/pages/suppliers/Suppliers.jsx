import { FaSearch } from "react-icons/fa";

const suppliers = [
  {
    id: "SUP-001",
    name: "Apple India",
    email: "apple@gmail.com",
    phone: "+91 9876543210",
    city: "Mumbai",
    status: "Active",
  },
  {
    id: "SUP-002",
    name: "Dell India",
    email: "dell@gmail.com",
    phone: "+91 9876501234",
    city: "Pune",
    status: "Active",
  },
  {
    id: "SUP-003",
    name: "Samsung",
    email: "samsung@gmail.com",
    phone: "+91 9876511111",
    city: "Delhi",
    status: "Inactive",
  },
];

const Suppliers = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>
      {/* Stats */}
      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl shadow p-5">
          <p>Total Suppliers</p>
          <h2 className="text-3xl font-bold mt-2">58</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p>Active</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">52</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p>Inactive</p>
          <h2 className="text-3xl font-bold text-red-600 mt-2">6</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p>Cities</p>
          <h2 className="text-3xl font-bold text-blue-600 mt-2">14</h2>
        </div>

      </div>

      {/* Search */}
      <div className="bg-none rounded-2xl ">

        <div className="relative">

          <FaSearch className="absolute left-70 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search Supplier..."
            className="bg-white w-full sm:w-80 h-8 pl-4 pr-4 rounded-xl placeholder-slate-400 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
          />
          <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold"></h1>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
          + Add Supplier
        </button>
      </div>

        </div>

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Supplier ID</th>
              <th className="p-4 text-left">Supplier</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Phone</th>
              <th className="p-4 text-left">City</th>
              <th className="p-4 text-left">Status</th>

            </tr>

          </thead>

          <tbody>

            {suppliers.map((supplier) => (

              <tr key={supplier.id} className="border-t">

                <td className="p-4 font-semibold text-blue-600">
                  {supplier.id}
                </td>

                <td className="p-4">{supplier.name}</td>

                <td className="p-4">{supplier.email}</td>

                <td className="p-4">{supplier.phone}</td>

                <td className="p-4">{supplier.city}</td>

                <td className="p-4">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      supplier.status === "Active"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {supplier.status}
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

export default Suppliers;