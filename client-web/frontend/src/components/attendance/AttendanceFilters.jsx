import { FaSearch, FaPlus } from "react-icons/fa";

const AttendanceFilters = ({ onMarkAttendance }) => {
  return (
    <div className="bg-none rounded-1xl  border border-slate-200 p-5">
      <div className="flex flex-wrap items-center gap-4">

        {/* Search */}
        <div className="relative flex-1 min-w-[280px]">
          <FaSearch className="absolute left-70 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search Employee..."
            className="w-full sm:w-80 h-8 pl-4 pr-4 rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
          />
        </div>

        {/* Department */}
        <select className="h-8 min-w-[180px] rounded-xl border border-slate-300 px-4 bg-white">
          <option>All Departments</option>
          <option>HR</option>
          <option>Sales</option>
          <option>Inventory</option>
          <option>Finance</option>
          <option>IT</option>
        </select>

        {/* Date */}
        <input
          type="date"
          className="h-8 min-w-[170px] rounded-xl border border-slate-300 px-4 bg-white"
        />

        {/* Status */}
        <select className="h-8 min-w-[170px] rounded-xl border border-slate-300 px-4 bg-white">
          <option>All Status</option>
          <option>Present</option>
          <option>Absent</option>
          <option>Late</option>
          <option>Leave</option>
        </select>

        {/* Button */}
        <button
          onClick={onMarkAttendance}
          className="h-8 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-2 transition"
        >
          <FaPlus />
          Mark Attendance
        </button>

      </div>
    </div>
  );
};

export default AttendanceFilters;