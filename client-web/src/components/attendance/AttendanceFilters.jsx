import { FaSearch, FaPlus } from "react-icons/fa";

const AttendanceFilters = ({
  keyword,
  setKeyword,
  status,
  setStatus,
  department,
  setDepartment,
  date,
  setDate,
  onMarkAttendance,
}) => {
  return (
    <div className=" rounded-xl p-5 ">

      <div className="flex flex-wrap gap-4 items-center">

        {/* Search */}

        <div className="relative">

          <FaSearch className="absolute left-65 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search Employee..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className=" bg-white w-72 h-7 pl-10 pr-4 py-2 rounded-xl border border-slate-300"
          />

        </div>

        {/* Department */}

        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className=" bg-white h-7 px-4 py-2 rounded-xl border border-slate-300"
        >

          <option value="">All Departments</option>

          <option value="HR">HR</option>

          <option value="Sales">Sales</option>

          <option value="Inventory">Inventory</option>

          <option value="Finance">Finance</option>

          <option value="IT">IT</option>

        </select>

        {/* Date */}

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className=" bg-white h-7 px-4 py-2 rounded-xl border border-slate-300"
        />

        {/* Status */}

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className=" bg-white px-4 py-2 h-7  rounded-xl border border-slate-300"
        >

          <option value="">All Status</option>

          <option value="Present">Present</option>

          <option value="Absent">Absent</option>

          <option value="Half Day">Half Day</option>

          <option value="Leave">Leave</option>

        </select>

        {/* Button */}

        <button
          onClick={onMarkAttendance}
          className="ml-auto flex items-center h-7 gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl"
        >

          <FaPlus />

          Mark Attendance

        </button>

      </div>

    </div>
  );
};

export default AttendanceFilters;