import { Search } from "lucide-react";
import { FaPlus } from "react-icons/fa";

const InventoryFilters = ({
  keyword,
  setKeyword,
  category,
  setCategory,
  onAddStock,
}) => {
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
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full sm:w-80 h-8 pl-4 pr-4 rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />

          </div>

          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="bg-white px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="">All Categories</option>
            <option value="Laptop">Laptop</option>
            <option value="Mobile">Mobile</option>
            <option value="Tablet">Tablet</option>
            <option value="Accessories">Accessories</option>
          </select>

          {/* Warehouse (Demo) */}
          <select
            className="bg-white px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option>All Warehouses</option>
            <option>Main Warehouse</option>
          </select>

        </div>

        {/* Right Side */}

        <button
          onClick={onAddStock}
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