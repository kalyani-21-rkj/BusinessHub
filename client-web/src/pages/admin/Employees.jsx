/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import EmployeeTable from "../../components/employees/EmployeeTable";
import EmployeeModal from "../../components/employees/EmployeeModal";
import EmployeeStats from "../../components/employees/EmployeeStats";

import { Search, Plus } from "lucide-react";

import { getEmployees } from "../../services/employeeService";

const Employees = () => {

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState(null);

  // Fetch Employees
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

  // Initial Load
  useEffect(() => {

    fetchEmployees();

  }, []);

  // Search
  useEffect(() => {

    const timer = setTimeout(() => {

      fetchEmployees(keyword);

    }, 400);

    return () => clearTimeout(timer);

  }, [keyword]);

  return (

    <div className="flex flex-col gap-8 p-6 w-full">

      {/* Stats */}

      <EmployeeStats />

      {/* Search + Button */}

      <div className="flex flex-col lg:flex-row justify-between items-center gap-4">

        <div className="relative w-full lg:w-96">

          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search Employee..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border rounded-xl py-3 pl-11 pr-4"
          />

        </div>

        <button
          onClick={() => {

            setSelectedEmployee(null);

            setOpenModal(true);

          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >

          <Plus size={18} />

          Add Employee

        </button>

      </div>

      {/* Table */}

      <div className="bg-white rounded-xl shadow border overflow-hidden">

        <EmployeeTable
          employees={employees}
          loading={loading}
          refreshEmployees={fetchEmployees}
          onEdit={(employee) => {

            setSelectedEmployee(employee);

            setOpenModal(true);

          }}
        />

      </div>

      {/* Modal */}

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