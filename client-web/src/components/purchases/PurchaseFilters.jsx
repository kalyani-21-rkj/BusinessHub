import { Search } from "lucide-react";
import { FaPlus } from "react-icons/fa";

const PurchaseFilters = ({
  keyword,
  setKeyword,
  supplier,
  setSupplier,
  warehouse,
  setWarehouse,
  status,
  setStatus,
  onCreate,
}) => {
  return (
    <div className="bg-none rounded-2xl border border-slate-200 p-5">
      <div className="flex flex-col lg:flex-row gap-4 justify-between">
        <div className="flex flex-1 flex-col md:flex-row gap-4">

          {/* Search */}
          <div className="relative flex-1">
            <Search
              className="absolute left-70 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search Purchase..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full sm:w-80 h-8 pl-4 pr-4 rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>

          {/* Supplier */}
          <select
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Suppliers</option>
            <option value="Dell India">Dell India</option>
            <option value="Apple India">Apple India</option>
            <option value="Samsung">Samsung</option>
          </select>

          {/* Warehouse */}
          <select
            value={warehouse}
            onChange={(e) => setWarehouse(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Warehouses</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
          </select>

          {/* Status */}
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="bg-white border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Receiving">Receiving</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <button
          onClick={onCreate}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition"
        >
          <FaPlus />
          New Purchase
        </button>
      </div>
    </div>
  );
};

export default PurchaseFilters;