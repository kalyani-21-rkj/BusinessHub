import CustomerTable from "../../components/customers/CustomerTable";
const Customers = () => {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-3xl font-bold text-slate-800">
            Customers
          </h1>

          <p className="text-slate-500 mt-1">
            Manage all your customers
          </p>
        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl font-medium transition">
          + Add Customer
        </button>

      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-lg p-5">

        <input
          type="text"
          placeholder="Search customer..."
          className="w-full md:w-96 border border-gray-300 rounded-xl px-4 py-3 outline-none focus:border-blue-600"
        />

      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl shadow-lg p-6">

        <CustomerTable />

      </div>

    </div>
  );
};

export default Customers;