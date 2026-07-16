import { Search } from "lucide-react";
import { FaPlus } from "react-icons/fa";

const InventoryFilters = () => {
  return (
    <div className="bg-none rounded-2xl border border-slate-200 shadow-none p-5">

      <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">

        {/* Left Side */}
        <div className="flex flex-col md:flex-row gap-4 flex-1">

          {/* Search */}
          <div className="relative flex-1">

            <Search
              className="absolute left-70 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search products..."
              className="w-full sm:w-80 h-8 pl-4 pr-4 rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />

          </div>

          {/* Category */}
          <select
            className=" bg-white px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option>All Categories</option>
            <option>Laptops</option>
            <option>Mobiles</option>
            <option>Accessories</option>
          </select>

          {/* Warehouse */}
          <select
            className="bg-white px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option>All Warehouses</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Delhi</option>
          </select>

        </div>

        {/* Right Side */}

        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
        >
          <FaPlus />

          Add Stock

        </button>

      </div>

    </div>
  );
};

export default InventoryFilters;