import {
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
} from "react-icons/fa";

import { downloadPayslip } from "../../services/payrollService";

const PayrollTable = ({
  payrolls = [],
  onView,
  onEdit,
  onDelete,
}) => {

  const handleDownload = async (id) => {
    try {
      const res = await downloadPayslip(id);

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = "Payslip.pdf";

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {
      console.error(err);
      alert("Unable to download payslip");
    }
  };

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

            {payrolls.length === 0 ? (

              <tr>

                <td
                  colSpan="9"
                  className="text-center py-8 text-slate-500"
                >
                  No Payroll Found
                </td>

              </tr>

            ) : (

              payrolls.map((payroll) => (

                <tr
                  key={payroll._id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                        {payroll.employee?.fullName?.charAt(0)}
                      </div>

                      <span className="font-semibold">
                        {payroll.employee?.fullName}
                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-5">
                    {payroll.employee?.department}
                  </td>

                  <td className="px-6 py-5 font-medium">
                    ₹{payroll.basicSalary}
                  </td>

                  <td className="px-6 py-5 text-green-600 font-medium">
                    ₹{payroll.bonus}
                  </td>

                  <td className="px-6 py-5 text-red-600 font-medium">
                    ₹{payroll.deduction}
                  </td>

                  <td className="px-6 py-5 font-bold text-blue-600">
                    ₹{payroll.netSalary}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        payroll.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payroll.paymentStatus}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-center">

                      <button
                        onClick={() => handleDownload(payroll._id)}
                        className="p-2 rounded-lg hover:bg-slate-100 text-blue-600"
                      >
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

                      <button
                        onClick={() => onEdit(payroll)}
                        className="p-2 rounded-lg hover:bg-blue-100 text-blue-600"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => onDelete(payroll._id)}
                        className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                      >
                        <FaTrash />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PayrollTable;