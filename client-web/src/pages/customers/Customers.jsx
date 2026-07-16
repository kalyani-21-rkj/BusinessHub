import { Search, Plus } from "lucide-react";
import CustomerTable from "../../components/customers/CustomerTable";

const Customers = () => {
  return (
    <div className="p-8 flex flex-col gap-6 w-full">

      {/* Top Action Bar Container */}
      <div className="flex justify-between items-center w-full">

        {/* Scaled-up Search Input Wrapper */}
        <div className="relative w-[480px]">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search customers..."
            className="w-full pl-12 pr-4 py-3 text-base rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-800 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>

        {/* Balanced Pro-Tier Action Button */}
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.99] text-white font-semibold text-base px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all">
          <Plus size={20} className="stroke-[2.5]" />
          Add Customer
        </button>

      </div>

      {/* Table Solid Card Wrapper */}
      <div className="bg-white rounded-1xl shadow-sm border border-slate-100 overflow-hidden w-full">
        <CustomerTable />
      </div>

    </div>
  );
};

export default Customers;