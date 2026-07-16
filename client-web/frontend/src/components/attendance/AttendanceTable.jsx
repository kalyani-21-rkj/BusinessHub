import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const attendanceData = [
  {
    id: 1,
    employee: "Rahul Sharma",
    department: "Sales",
    checkIn: "09:02 AM",
    checkOut: "06:12 PM",
    hours: "9h 10m",
    status: "Present",
  },
  {
    id: 2,
    employee: "Priya Verma",
    department: "HR",
    checkIn: "09:28 AM",
    checkOut: "06:05 PM",
    hours: "8h 37m",
    status: "Late",
  },
  {
    id: 3,
    employee: "Amit Kumar",
    department: "Inventory",
    checkIn: "--",
    checkOut: "--",
    hours: "--",
    status: "Leave",
  },
  {
    id: 4,
    employee: "Sneha Patil",
    department: "Finance",
    checkIn: "--",
    checkOut: "--",
    hours: "--",
    status: "Absent",
  },
];

const AttendanceTable = ({ onView }) => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr className="text-left text-sm text-slate-600">

              <th className="px-6 py-4">Employee</th>

              <th className="px-6 py-4">Department</th>

              <th className="px-6 py-4">Check In</th>

              <th className="px-6 py-4">Check Out</th>

              <th className="px-6 py-4">Working Hours</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4 text-right">Actions</th>

            </tr>

          </thead>

          <tbody>

            {attendanceData.map((employee) => (

              <tr
                key={employee.id}
                className="border-t hover:bg-slate-50 transition"
              >

                <td className="px-6 py-5">

                  <div className="flex items-center gap-3">

                    <div className="h-10 w-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">
                      {employee.employee.charAt(0)}
                    </div>

                    <div>

                      <h4 className="font-semibold text-slate-800">
                        {employee.employee}
                      </h4>

                    </div>

                  </div>

                </td>

                <td className="px-6 py-5">
                  {employee.department}
                </td>

                <td className="px-6 py-5">
                  {employee.checkIn}
                </td>

                <td className="px-6 py-5">
                  {employee.checkOut}
                </td>

                <td className="px-6 py-5 font-medium">
                  {employee.hours}
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      employee.status === "Present"
                        ? "bg-green-100 text-green-700"
                        : employee.status === "Late"
                        ? "bg-yellow-100 text-yellow-700"
                        : employee.status === "Leave"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {employee.status}
                  </span>

                </td>

                <td className="px-6 py-5">

                  <div className="flex justify-end gap-2">

                    <button
                      onClick={() => onView(employee)}
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

export default AttendanceTable;