/* eslint-disable react-hooks/set-state-in-effect */

import { Search, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeModal from "../../components/employees/EmployeeModal";

import { getEmployees,deleteEmployee } from "../../services/employeeService";

const Employees = () => {

  const [employees, setEmployees] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [openModal, setOpenModal] = useState(false);

  const fetchEmployees = async (search = "") => {
    try {

      setLoading(true);

      const res = await getEmployees(1, search);

      setEmployees(res.data.employees || []);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {

    const timer = setTimeout(() => {

      fetchEmployees(keyword);

    }, 400);

    return () => clearTimeout(timer);

  }, [keyword]);

  const handleDelete = async (id) => {

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this employee?"
  );

  if (!confirmDelete) return;

  try {

    await deleteEmployee(id);

    fetchEmployees(keyword);

    alert("Employee Deleted Successfully");

  } catch (error) {

    console.error(error);

    alert("Unable to delete employee");

  }

};

  return (

    <div className="flex flex-col gap-8 p-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">

        <div className="relative w-full md:w-96">

          <Search
            className="absolute left-70 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search employee..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full sm:w-80 h-8 pl-4 pr-4 rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
          />

        </div>

        <button
          onClick={() => setOpenModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >

          <Plus size={18} />

          Add Employee

        </button>

      </div>

      {/* Employee Table */}

      <div className="bg-white rounded-xl shadow border overflow-hidden">

        <EmployeeTable
  employees={employees}
  loading={loading}
  onEdit={(employee) => {
    setSelectedEmployee(employee);
    setOpenModal(true);
  }}
  onDelete={handleDelete}
 />

      </div>

      {/* Employee Modal */}

      <EmployeeModal
  open={openModal}
  employee={selectedEmployee}
  onClose={() => {
    setOpenModal(false);
    setSelectedEmployee(null);
  }}
  onSuccess={() => fetchEmployees(keyword)}
/>

    </div>

  );

};

export default Employees;