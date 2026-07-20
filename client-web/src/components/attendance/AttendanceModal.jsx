/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import {
  markAttendance,
  updateAttendance,
} from "../../services/attendanceService";

import { getEmployees } from "../../services/employeeService";

const AttendanceModal = ({
  open,
  onClose,
  attendance,
  onSuccess,
}) => {
  const [employees, setEmployees] = useState([]);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    employee: "",
    date: "",
    checkIn: "",
    checkOut: "",
    status: "Present",
    remarks: "",
  });

  useEffect(() => {
    if (!open) return;

    const loadEmployees = async () => {
      try {
        const res = await getEmployees();
        setEmployees(res.data.employees || []);
      } catch (err) {
        console.log(err);
      }
    };

    loadEmployees();
  }, [open]);

  useEffect(() => {
    if (!open) return;

    if (attendance) {
      setFormData({
        employee:
          attendance.employee?._id || attendance.employee || "",
        date: attendance.date
          ? attendance.date.substring(0, 10)
          : "",
        checkIn: attendance.checkIn || "",
        checkOut: attendance.checkOut || "",
        status: attendance.status || "Present",
        remarks: attendance.remarks || "",
      });
    } else {
      setFormData({
        employee: "",
        date: new Date().toISOString().split("T")[0],
        checkIn: "",
        checkOut: "",
        status: "Present",
        remarks: "",
      });
    }
  }, [attendance, open]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (attendance) {
        await updateAttendance(
          attendance._id,
          formData
        );

        alert("Attendance Updated Successfully");
      } else {
        await markAttendance(formData);

        alert("Attendance Marked Successfully");
      }

      onSuccess();

      onClose();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to Save Attendance"
      );
    } finally {
      setLoading(false);
    }
  };
    return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white rounded-2xl w-full max-w-2xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          {attendance ? "Update Attendance" : "Mark Attendance"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5"
        >

          {/* Employee */}

          <select
            name="employee"
            value={formData.employee}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          >

            <option value="">
              Select Employee
            </option>

            {employees.map((emp) => (

              <option
                key={emp._id}
                value={emp._id}
              >

                {emp.fullName}

              </option>

            ))}

          </select>

          {/* Date */}

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          {/* Check In */}

          <input
            type="time"
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          {/* Check Out */}

          <input
            type="time"
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          {/* Status */}

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >

            <option value="Present">
              Present
            </option>

            <option value="Absent">
              Absent
            </option>

            <option value="Half Day">
              Half Day
            </option>

            <option value="Leave">
              Leave
            </option>

          </select>

          <div></div>

          {/* Remarks */}

          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Remarks"
            rows="4"
            className="border rounded-lg p-3 col-span-2"
          />

          {/* Buttons */}

          <div className="col-span-2 flex justify-end gap-4">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 rounded-lg border"
            >

              Cancel

            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 rounded-lg bg-blue-600 text-white"
            >

              {loading
                ? "Saving..."
                : attendance
                ? "Update Attendance"
                : "Save Attendance"}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AttendanceModal;

