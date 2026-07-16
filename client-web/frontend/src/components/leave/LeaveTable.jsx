import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

const leaveData = [
  {
    id: 1,
    employee: "Rahul Sharma",
    department: "Sales",
    type: "Casual Leave",
    from: "15 Jul 2026",
    to: "17 Jul 2026",
    days: 3,
    status: "Pending",
  },
  {
    id: 2,
    employee: "Priya Verma",
    department: "HR",
    type: "Sick Leave",
    from: "12 Jul 2026",
    to: "13 Jul 2026",
    days: 2,
    status: "Approved",
  },
  {
    id: 3,
    employee: "Amit Kumar",
    department: "Inventory",
    type: "Paid Leave",
    from: "20 Jul 2026",
    to: "22 Jul 2026",
    days: 3,
    status: "Rejected",
  },
];

const LeaveTable = ({ onView }) => {
  return (
    <div className="bg-white rounded-1xl shadow-sm border border-slate-200 overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr className="text-left text-sm text-slate-600">

              <th className="px-6 py-4">Employee</th>
              <th className="px-6 py-4">Department</th>
              <th className="px-6 py-4">Leave Type</th>
              <th className="px-6 py-4">From</th>
              <th className="px-6 py-4">To</th>
              <th className="px-6 py-4">Days</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-center">Approval</th>
              <th className="px-6 py-4 text-right">Actions</th>

            </tr>

          </thead>

          <tbody>

            {leaveData.map((leave) => (

              <tr
                key={leave.id}
                className="border-t hover:bg-slate-50 transition"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                      {leave.employee.charAt(0)}
                    </div>

                    <span className="font-semibold">
                      {leave.employee}
                    </span>

                  </div>

                </td>

                <td className="px-6 py-5">
                  {leave.department}
                </td>

                <td className="px-6 py-5">
                  {leave.type}
                </td>

                <td className="px-6 py-5">
                  {leave.from}
                </td>

                <td className="px-6 py-5">
                  {leave.to}
                </td>

                <td className="px-6 py-5 font-semibold">
                  {leave.days}
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      leave.status === "Approved"
                        ? "bg-green-100 text-green-700"
                        : leave.status === "Rejected"
                        ? "bg-red-100 text-red-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {leave.status}
                  </span>

                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-center gap-2">

                    <button className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200">
                      <FaCheck />
                    </button>

                    <button className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200">
                      <FaTimes />
                    </button>

                  </div>

                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => onView(leave)}
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

export default LeaveTable;