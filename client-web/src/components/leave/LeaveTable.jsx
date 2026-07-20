import {
  FaEye,
  FaEdit,
  FaTrash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";

import {
  approveLeave,
  rejectLeave,
  deleteLeave,
} from "../../services/leaveService";

const LeaveTable = ({
  leaves,
  loading,
  refreshLeaves,
  onEdit,
}) => {

  const handleApprove = async (id) => {
    try {
      await approveLeave(id);
      refreshLeaves();
    } catch (err) {
      console.log(err);
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectLeave(id);
      refreshLeaves();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {

    if (!window.confirm("Delete Leave?")) return;

    try {

      await deleteLeave(id);

      refreshLeaves();

    } catch (err) {

      console.log(err);

    }

  };

  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading...
      </div>
    );
  }

  return (

    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

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

            {leaves.length === 0 ? (

              <tr>

                <td
                  colSpan={9}
                  className="text-center py-10 text-slate-500"
                >
                  No Leave Records Found
                </td>

              </tr>

            ) : (

              leaves.map((leave) => (

                <tr
                  key={leave._id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="px-6 py-5">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-semibold">

                        {leave.employee?.fullName?.charAt(0)}

                      </div>

                      <span className="font-semibold">

                        {leave.employee?.fullName}

                      </span>

                    </div>

                  </td>

                  <td className="px-6 py-5">
                    {leave.employee?.department}
                  </td>

                  <td className="px-6 py-5">
                    {leave.leaveType}
                  </td>

                  <td className="px-6 py-5">
                    {new Date(
                      leave.fromDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5">
                    {new Date(
                      leave.toDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-5 font-semibold">
                    {leave.totalDays}
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

                      <button
                        onClick={() =>
                          handleApprove(leave._id)
                        }
                        className="p-2 rounded-lg bg-green-100 text-green-600 hover:bg-green-200"
                      >
                        <FaCheck />
                      </button>

                      <button
                        onClick={() =>
                          handleReject(leave._id)
                        }
                        className="p-2 rounded-lg bg-red-100 text-red-600 hover:bg-red-200"
                      >
                        <FaTimes />
                      </button>

                    </div>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() => onEdit(leave)}
                        className="p-2 rounded-lg hover:bg-slate-100"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => onEdit(leave)}
                        className="p-2 rounded-lg hover:bg-blue-100 text-blue-600"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(leave._id)
                        }
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

export default LeaveTable;