import { useState } from "react";

const PayrollModal = ({ payroll, onClose }) => {
  const [formData, setFormData] = useState({
    employee: payroll?.employee || "",
    department: payroll?.department || "",
    basic: payroll?.basic || "",
    bonus: payroll?.bonus || "",
    deduction: payroll?.deduction || "",
    net: payroll?.net || "",
    status: payroll?.status || "Pending",
    paymentMethod: "Bank Transfer",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-6">

        {/* Header */}

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold text-slate-800">
            {payroll ? "Payroll Details" : "Generate Payroll"}
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
              Basic Salary
            </label>

            <input
              name="basic"
              value={formData.basic}
              onChange={handleChange}
              placeholder="₹ 45,000"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Bonus
            </label>

            <input
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
              name="net"
              value={formData.net}
              onChange={handleChange}
              placeholder="₹ 48,000"
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Payment Status
            </label>

            <select
              name="status"
              value={formData.status}
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

        {/* Footer */}

        <div className="flex justify-end gap-3 mt-8">

          <button
            onClick={onClose}
            className="px-6 py-3 border rounded-xl hover:bg-slate-100"
          >
            Cancel
          </button>

          <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white">
            Generate Payroll
          </button>

        </div>

      </div>

    </div>
  );
};

export default PayrollModal;