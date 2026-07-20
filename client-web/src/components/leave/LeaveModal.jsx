/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import {
  applyLeave,
  updateLeave,
} from "../../services/leaveService";

import { getAllEmployees } from "../../services/employeeService";

const LeaveModal = ({
  open,
  leave,
  onClose,
  onSuccess,
}) => {

  const [loading, setLoading] = useState(false);

  const [employees, setEmployees] = useState([]);

  const [formData, setFormData] = useState({
    employee: "",
    department: "",
    type: "Casual",
    from: "",
    to: "",
    status: "Pending",
    reason: "",
  });

  useEffect(() => {

    const fetchEmployees = async () => {

      try {

        const res = await getAllEmployees();

        setEmployees(res.data.employees || []);

      } catch (err) {

        console.log(err);

      }

    };

    fetchEmployees();

  }, []);

  useEffect(() => {

    if (leave) {

      setFormData({

        employee:
          leave.employee?._id ||
          leave.employee ||
          "",

        department:
          leave.employee?.department ||
          leave.department ||
          "",

        type:
          leave.leaveType ||
          leave.type ||
          "Casual",

        from:
          leave.fromDate
            ? leave.fromDate.slice(0, 10)
            : leave.from || "",

        to:
          leave.toDate
            ? leave.toDate.slice(0, 10)
            : leave.to || "",

        status:
          leave.status || "Pending",

        reason:
          leave.reason || "",

      });

    } else {

      setFormData({
        employee: "",
        department: "",
        type: "Casual",
        from: "",
        to: "",
        status: "Pending",
        reason: "",
      });

    }

  }, [leave]);

  const handleChange = (e) => {

    const { name, value } = e.target;

    if (name === "employee") {

      const emp = employees.find(
        (e) => e._id === value
      );

      setFormData({
        ...formData,
        employee: value,
        department: emp?.department || "",
      });

      return;

    }

    setFormData({
      ...formData,
      [name]: value,
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const totalDays =
        Math.ceil(
          (new Date(formData.to) -
            new Date(formData.from)) /
            (1000 * 60 * 60 * 24)
        ) + 1;

      const payload = {

        employee: formData.employee,

        leaveType: formData.type,

        fromDate: formData.from,

        toDate: formData.to,

        totalDays,

        reason: formData.reason,

        status: formData.status,

      };

      if (leave?._id) {

        await updateLeave(
          leave._id,
          payload
        );

        alert("Leave Updated Successfully");

      } else {

        await applyLeave(payload);

        alert("Leave Applied Successfully");

      }

      onSuccess();

      onClose();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to Save Leave"
      );

    } finally {

      setLoading(false);

    }

  };

  if (!open) return null;

  return (

    <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6">

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

        <form onSubmit={handleSubmit}>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <div>

              <label className="block mb-2 font-medium">
                Employee
              </label>

              <select
                name="employee"
                value={formData.employee}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
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

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Department
              </label>

              <input
                type="text"
                value={formData.department}
                readOnly
                className="w-full border rounded-xl px-4 py-3 bg-slate-100"
              />

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

                <option>Casual</option>
                <option>Sick</option>
                <option>Paid</option>
                <option>Emergency</option>
                <option>Maternity</option>
                <option>Paternity</option>

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

          <div className="flex justify-end gap-3 mt-8">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border rounded-xl hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
            >

              {loading
                ? "Saving..."
                : leave
                ? "Update Leave"
                : "Apply Leave"}

            </button>

          </div>

        </form>

      </div>

    </div>

  );

};

export default LeaveModal;