import { Search, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import EmployeeTable from "../../components/employees/EmployeeTable";
import { getEmployees } from "../../services/employeeService";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
  try {
    const res = await getEmployees(1, keyword);

    console.log("FULL RESPONSE:", res);
    console.log("DATA:", res.data);

    setEmployees(res.data.employees || []);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
};
 fetchEmployees(); // <-- This line is required

}, []);

  return (
    <div className="p-8 flex flex-col gap-6 w-full">

      {/* Search + Add Button */}

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="relative w-full md:w-96">

          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />

          <input
            type="text"
            placeholder="Search employee..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-300 bg-white"
          />

        </div>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2">

          <Plus size={18} />

          Add Employee

        </button>

      </div>

      {/* Employee Table */}

      <div className="bg-white rounded-xl shadow border overflow-hidden">

        <EmployeeTable
          employees={employees}
          loading={loading}
        />

      </div>

    </div>
  );
};

export default Employees;