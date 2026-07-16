import {
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
} from "react-icons/fa";

const payrollData = [
  {
    id: 1,
    employee: "Rahul Sharma",
    department: "Sales",
    basic: "₹45,000",
    bonus: "₹5,000",
    deduction: "₹2,000",
    net: "₹48,000",
    status: "Paid",
  },
  {
    id: 2,
    employee: "Priya Verma",
    department: "HR",
    basic: "₹50,000",
    bonus: "₹3,000",
    deduction: "₹1,500",
    net: "₹51,500",
    status: "Pending",
  },
  {
    id: 3,
    employee: "Amit Kumar",
    department: "Inventory",
    basic: "₹40,000",
    bonus: "₹2,000",
    deduction: "₹500",
    net: "₹41,500",
    status: "Paid",
  },
];

const PayrollTable = ({ onView }) => {
  return (
    <div className="bg-white rounded-1xl shadow-sm border border-slate-200 overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr className="text-left text-sm text-slate-600">

              <th className="px-6 py-4">Employee</th>

              <th className="px-6 py-4">Department</th>

              <th className="px-6 py-4">Basic Salary</th>

              <th className="px-6 py-4">Bonus</th>

              <th className="px-6 py-4">Deduction</th>

              <th className="px-6 py-4">Net Salary</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4 text-center">
                Payslip
              </th>

              <th className="px-6 py-4 text-right">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {payrollData.map((payroll) => (

              <tr
                key={payroll.id}
                className="border-t hover:bg-slate-50 transition"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                      {payroll.employee.charAt(0)}
                    </div>

                    <span className="font-semibold">
                      {payroll.employee}
                    </span>

                  </div>

                </td>

                <td className="px-6 py-5">
                  {payroll.department}
                </td>

                <td className="px-6 py-5 font-medium">
                  {payroll.basic}
                </td>

                <td className="px-6 py-5 text-green-600 font-medium">
                  {payroll.bonus}
                </td>

                <td className="px-6 py-5 text-red-600 font-medium">
                  {payroll.deduction}
                </td>

                <td className="px-6 py-5 font-bold text-blue-600">
                  {payroll.net}
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      payroll.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {payroll.status}
                  </span>

                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-center">

                    <button className="p-2 rounded-lg hover:bg-slate-100 text-blue-600">
                      <FaDownload />
                    </button>

                  </div>

                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => onView(payroll)}
                      className="p-2 rounded-lg hover:bg-slate-100"
                    >
                      <FaEye />
                    </button>

                    <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600">
                      <FaEdit />
                    </button>

                    <button className="p-2 rounded-lg hover:bg-red-100 text-red-600">
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PayrollTable;