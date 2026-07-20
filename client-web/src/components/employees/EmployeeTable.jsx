import { FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";

const EmployeeTable = ({
  employees,
  loading,
  onEdit,
  onDelete,
}) => {

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500">
        Loading Employees...
      </div>
    );
  }

  if (employees.length === 0) {
    return (
      <div className="p-10 text-center text-slate-500">
        No Employees Found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-slate-100">
          <tr className="text-left text-slate-600 text-sm uppercase">
            <th className="px-6 py-4">Employee</th>
            <th className="px-6 py-4">Department</th>
            <th className="px-6 py-4">Designation</th>
            <th className="px-6 py-4">Salary</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        <tbody>

          {employees.map((employee) => (

            <tr
              key={employee._id}
              className="border-b hover:bg-slate-50 transition"
            >

              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  <FaUserCircle className="text-4xl text-blue-600" />

                  <div>

                    <h3 className="font-semibold">
                      {employee.fullName}
                    </h3>

                    <p className="text-sm text-slate-500">
                      {employee.email}
                    </p>

                  </div>

                </div>

              </td>

              <td className="px-6 py-5">
                {employee.department}
              </td>

              <td className="px-6 py-5">
                {employee.designation}
              </td>

              <td className="px-6 py-5 font-semibold">
                ₹{employee.salary.toLocaleString()}
              </td>

              <td className="px-6 py-5">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    employee.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : employee.status === "Inactive"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {employee.status}
                </span>

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  <button
               onClick={() => onEdit(employee)}
              className="text-blue-600 hover:text-blue-800"
              >
             <FaEdit />
                 </button>

                 <button onClick={() => onDelete(employee._id)}
                  className="text-red-600 hover:text-red-800"
>
                  <FaTrash />
                </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
};

export default EmployeeTable;