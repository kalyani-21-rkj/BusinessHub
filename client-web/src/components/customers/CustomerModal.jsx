/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  addCustomer,
  updateCustomer,
} from "../../services/customerService";

const CustomerModal = ({ open, onClose, onSuccess, customer }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    status: "Lead",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (customer) {
      setFormData({
        fullName: customer.fullName || "",
        email: customer.email || "",
        phone: customer.phone || "",
        company: customer.company || "",
        address: customer.address || "",
        status: customer.status || "Lead",
      });
    } else {
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        company: "",
        address: "",
        status: "Lead",
      });
    }
  }, [customer]);

  if (!open) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (customer) {
        await updateCustomer(customer._id, formData);
        alert("Customer Updated Successfully");
      } else {
        await addCustomer(formData);
        alert("Customer Added Successfully");
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      alert("Operation Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-full max-w-2xl p-8">

        <h2 className="text-2xl font-bold mb-6">
          {customer ? "Edit Customer" : "Add Customer"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-2 gap-5"
        >

          <input
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            className="border rounded-lg p-3"
            required
          />

          <input
            name="company"
            placeholder="Company"
            value={formData.company}
            onChange={handleChange}
            className="border rounded-lg p-3"
          />

          <input
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded-lg p-3 col-span-2"
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-lg p-3"
          >
            <option value="Lead">Lead</option>
            <option value="Customer">Customer</option>
            <option value="Inactive">Inactive</option>
          </select>

          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border rounded-lg"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg"
            >
              {loading
                ? "Saving..."
                : customer
                ? "Update Customer"
                : "Save Customer"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CustomerModal;