import { useState } from "react";

const AttendanceModal = ({ employee, onClose }) => {
  const [formData, setFormData] = useState({
    employee: employee?.employee || "",
    department: employee?.department || "",
    date: new Date().toISOString().split("T")[0],
    checkIn: employee?.checkIn === "--" ? "" : employee?.checkIn || "",
    checkOut: employee?.checkOut === "--" ? "" : employee?.checkOut || "",
    status: employee?.status || "Present",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">

      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-slate-800">
            {employee ? "Attendance Details" : "Mark Attendance"}
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-red-600 text-2xl"
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
              placeholder="Employee Name"
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
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
              className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option>HR</option>
              <option>Sales</option>
              <option>Inventory</option>
              <option>Finance</option>
              <option>IT</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Date
            </label>

            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
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
              <option>Present</option>
              <option>Late</option>
              <option>Absent</option>
              <option>Leave</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Check In
            </label>

            <input
              type="time"
              name="checkIn"
              value={formData.checkIn}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Check Out
            </label>

            <input
              type="time"
              name="checkOut"
              value={formData.checkOut}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

        </div>

        {/* Notes */}

        <div className="mt-5">

          <label className="block mb-2 font-medium">
            Notes
          </label>

          <textarea
            rows="4"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Enter remarks..."
            className="w-full border rounded-xl px-4 py-3 resize-none"
          />

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
          >
            Save Attendance
          </button>

        </div>

      </div>

    </div>
  );
};

export default AttendanceModal;