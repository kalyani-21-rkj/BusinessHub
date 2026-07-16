import { Search } from "lucide-react";
import { FaPlus } from "react-icons/fa";

const PurchaseFilters = () => {
  return (
    <div className="bg-none rounded-2xl border border-slate-200  p-5">

      <div className="flex flex-col lg:flex-row gap-4 justify-between">

        <div className="flex flex-1 flex-col md:flex-row gap-4">


          <div className="relative flex-1">

            <Search
              className="absolute left-70 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search Purchase..."
              className="w-full sm:w-80 h-8 pl-4 pr-4 rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />

          </div>

          {/* Supplier */}

          <select className="bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">

            <option>All Suppliers</option>

            <option>Dell India</option>

            <option>Apple India</option>

            <option>Samsung</option>

          </select>

          {/* Status */}

          <select className="bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500">

            <option>All Status</option>

            <option>Pending</option>

            <option>Received</option>

            <option>Cancelled</option>

          </select>

        </div>

        {/* Button */}

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition">

          <FaPlus />

          New Purchase

        </button>

      </div>

    </div>
  );
};

export default PurchaseFilters;