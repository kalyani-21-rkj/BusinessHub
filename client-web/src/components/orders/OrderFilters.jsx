import { Search } from "lucide-react";
import { FaPlus } from "react-icons/fa";

const OrderFilters = () => {
  return (
    <div className="bg-none rounded-2xl border-none shadow-sm p-5">

      <div className="flex flex-col lg:flex-row gap-4 justify-between">

        <div className="flex flex-1 gap-4 flex-col md:flex-row">

          <div className="relative flex-1">

            <Search
              size={18}
              className="absolute left-70 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              placeholder="Search Orders..."
              className="w-full sm:w-80 h-8 pl-4 pr-4 rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />

          </div>

          <select className="bg-white border-none rounded-xl px-4 py-3">
            <option>All Status</option>
            <option>Pending</option>
            <option>Processing</option>
            <option>Delivered</option>
            <option>Cancelled</option>
          </select>

          <select className="bg-white border-none rounded-xl px-4 py-3">
            <option>Payment</option>
            <option>Paid</option>
            <option>Pending</option>
          </select>

        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2">

          <FaPlus />

          New Order

        </button>

      </div>

    </div>
  );
};

export default OrderFilters;