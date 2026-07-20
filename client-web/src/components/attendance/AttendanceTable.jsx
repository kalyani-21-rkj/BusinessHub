import {
  FaEdit,
  FaTrash,
  FaUserCircle,
} from "react-icons/fa";

import { deleteAttendance } from "../../services/attendanceService";

const AttendanceTable = ({
  attendance = [],
  loading,
  refreshAttendance,
  onEdit,
}) => {

  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Delete this attendance record?"
    );

    if (!confirmDelete) return;

    try {

      await deleteAttendance(id);

      alert("Attendance Deleted Successfully");

      refreshAttendance();

    } catch (err) {

      console.log(err);

      alert("Unable to Delete Attendance");

    }

  };

  if (loading) {

    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );

  }

  if (attendance.length === 0) {

    return (
      <div className="p-10 text-center">
        No Attendance Found
      </div>
    );

  }

  return (

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr className="text-left text-sm uppercase text-slate-600">

            <th className="px-6 py-4">
              Employee
            </th>

            <th className="px-6 py-4">
              Department
            </th>

            <th className="px-6 py-4">
              Designation
            </th>

            <th className="px-6 py-4">
              Date
            </th>

            <th className="px-6 py-4">
              Check In
            </th>

            <th className="px-6 py-4">
              Check Out
            </th>

            <th className="px-6 py-4">
              Status
            </th>

            <th className="px-6 py-4">
              Remarks
            </th>

            <th className="px-6 py-4 text-center">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {attendance.map((record) => (

            <tr
              key={record._id}
              className="border-b hover:bg-slate-50"
            >

              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  <FaUserCircle className="text-4xl text-blue-600" />

                  <div>

                    <h3 className="font-semibold">

                      {record.employee?.fullName}

                    </h3>

                  </div>

                </div>

              </td>

              <td className="px-6 py-5">

                {record.employee?.department}

              </td>

              <td className="px-6 py-5">

                {record.employee?.designation}

              </td>

              <td className="px-6 py-5">

                {new Date(record.date).toLocaleDateString()}

              </td>

              <td className="px-6 py-5">

                {record.checkIn || "--"}

              </td>

              <td className="px-6 py-5">

                {record.checkOut || "--"}

              </td>

              <td className="px-6 py-5">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    record.status === "Present"
                      ? "bg-green-100 text-green-700"
                      : record.status === "Absent"
                      ? "bg-red-100 text-red-700"
                      : record.status === "Half Day"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >

                  {record.status}

                </span>

              </td>

              <td className="px-6 py-5">

                {record.remarks || "--"}

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  <button

                    onClick={() => onEdit(record)}

                    className="text-blue-600 hover:text-blue-800"

                  >

                    <FaEdit />

                  </button>

                  <button

                    onClick={() => handleDelete(record._id)}

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

export default AttendanceTable;