/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import {
  generatePayroll,
  updatePayroll,
} from "../../services/payrollService";

import { getEmployees } from "../../services/employeeService";

const PayrollModal = ({
  open,
  payroll,
  onClose,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [formData, setFormData] = useState({
  employee:"",
  month:"",
  year:new Date().getFullYear(),
  basicSalary:"",
  hra:"",
  da:"",
  bonus:"",
  deduction:"",
  netSalary:"",
  paymentStatus:"Pending",
  paymentMethod:"Bank Transfer",
});

  useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data.employees || []);
    } catch (err) {
      console.log(err);
    }
  };

  fetchEmployees();
}, []);

  useEffect(() => {
    if (payroll) {
      setFormData({
        employee:
          payroll.employee?._id || payroll.employee || "",
        department: payroll.department || "",
        basicSalary: payroll.basicSalary || "",
        bonus: payroll.bonus || "",
        deduction: payroll.deduction || "",
        netSalary: payroll.netSalary || "",
        paymentStatus:
          payroll.paymentStatus || "Pending",
        paymentMethod:
          payroll.paymentMethod || "Bank Transfer",
          month: payroll.month || "",
        year: payroll.year || new Date().getFullYear(),
        hra: payroll.hra || "",
        da: payroll.da || "",
          
      });
    } else {
      setFormData({
        employee: "",
        department: "",
        basicSalary: "",
        bonus: "",
        deduction: "",
        netSalary: "",
        paymentStatus: "Pending",
        paymentMethod: "Bank Transfer",
      });
    }
  }, [payroll]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updated = {
      ...formData,
      [name]: value,
    };

    const basic = Number(updated.basicSalary) || 0;
    const hra = Number(updated.hra) || 0;
    const da = Number(updated.da) || 0;
    const bonus = Number(updated.bonus) || 0;
    const deduction = Number(updated.deduction) || 0;

    updated.netSalary =
      basic + hra + da + bonus - deduction;

    setFormData(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (payroll?._id) {
        await updatePayroll(
          payroll._id,
          formData
        );

        alert("Payroll Updated Successfully");
      } else {
        await generatePayroll(formData);

        alert("Payroll Generated Successfully");
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to Save Payroll"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-slate-800">
            {payroll
              ? "Payroll Details"
              : "Generate Payroll"}
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
    <option value="">Select Employee</option>

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
    Month
  </label>
  

  <input
    type="month"
    name="month"
    value={formData.month}
    onChange={handleChange}
    className="w-full border rounded-xl px-4 py-3"
  />
</div>   
            <div>
  <label className="block mb-2 font-medium">
    Year
  </label>

  <input
    type="number"
    name="year"
    value={formData.year}
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
                Basic Salary
              </label>

              <input
                type="number"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
                placeholder="₹ 45,000"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
  <label className="block mb-2 font-medium">
    HRA
  </label>

  <input
    type="number"
    name="hra"
    value={formData.hra}
    onChange={handleChange}
    placeholder="₹ 5,000"
    className="w-full border rounded-xl px-4 py-3"
  />
</div>

<div>
  <label className="block mb-2 font-medium">
    DA
  </label>

  <input
    type="number"
    name="da"
    value={formData.da}
    onChange={handleChange}
    placeholder="₹ 2,000"
    className="w-full border rounded-xl px-4 py-3"
  />
</div>

            <div>
              <label className="block mb-2 font-medium">
                Bonus
              </label>

              <input
                type="number"
                name="bonus"
                value={formData.bonus}
                onChange={handleChange}
                placeholder="₹ 5,000"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Deduction
              </label>

              <input
                type="number"
                name="deduction"
                value={formData.deduction}
                onChange={handleChange}
                placeholder="₹ 2,000"
                className="w-full border rounded-xl px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Net Salary
              </label>

              <input
                type="number"
                name="netSalary"
                value={formData.netSalary}
                readOnly
                className="w-full border rounded-xl px-4 py-3 bg-slate-100"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Payment Status
              </label>

              <select
                name="paymentStatus"
                value={formData.paymentStatus}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option>Pending</option>
                <option>Paid</option>
              </select>
            </div>

            <div>
              <label className="block mb-2 font-medium">
                Payment Method
              </label>

              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleChange}
                className="w-full border rounded-xl px-4 py-3"
              >
                <option>Bank Transfer</option>
                <option>UPI</option>
                <option>Cash</option>
                <option>Cheque</option>
              </select>
            </div>

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
              className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading
                ? "Saving..."
                : payroll
                ? "Update Payroll"
                : "Generate Payroll"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
};

export default PayrollModal;