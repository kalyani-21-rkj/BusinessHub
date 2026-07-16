import { useState } from "react";

const LeaveModal = ({ leave, onClose }) => {
  const [formData, setFormData] = useState({
    employee: leave?.employee || "",
    department: leave?.department || "",
    type: leave?.type || "Casual Leave",
    from: leave?.from || "",
    to: leave?.to || "",
    status: leave?.status || "Pending",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-slate-800">
            {leave ? "Leave Details" : "Apply Leave"}
          </h2>

          <button
            onClick={onClose}
            className="text-2xl hover:text-red-600"
          >
            ×
          </button>

        </div>

        {/* Form */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 font-medium">
              Employee
            </label>

            <input
              type="text"
              name="employee"
              value={formData.employee}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Department
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>HR</option>
              <option>Sales</option>
              <option>Finance</option>
              <option>Inventory</option>
              <option>IT</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Leave Type
            </label>

            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>Casual Leave</option>
              <option>Sick Leave</option>
              <option>Paid Leave</option>
              <option>Maternity Leave</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Status
            </label>

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            >
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              From Date
            </label>

            <input
              type="date"
              name="from"
              value={formData.from}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              To Date
            </label>

            <input
              type="date"
              name="to"
              value={formData.to}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

        </div>

        {/* Reason */}

        <div className="mt-5">

          <label className="block mb-2 font-medium">
            Reason
          </label>

          <textarea
            rows="4"
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            placeholder="Enter leave reason..."
            className="w-full border rounded-xl px-4 py-3 resize-none"
          />

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-6 py-3 border rounded-xl hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          >
            Submit
          </button>

        </div>

      </div>

    </div>
  );
};

export default LeaveModal;