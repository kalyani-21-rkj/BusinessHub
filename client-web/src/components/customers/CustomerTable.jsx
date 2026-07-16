import { FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";

const customers = [
  { id: 1, name: "Rahul Sharma", email: "rahul@gmail.com", phone: "9876543210", status: "Active" },
  { id: 2, name: "Kalyani Ramayane", email: "kalyani@gmail.com", phone: "9123456789", status: "Active" },
  { id: 3, name: "Sneha Patil", email: "sneha@gmail.com", phone: "9988776655", status: "Inactive" },
  { id: 4, name: "Amit Joshi", email: "amit@gmail.com", phone: "9012345678", status: "Active" },
  { id: 5, name: "Priya Deshmukh", email: "priya@gmail.com", phone: "9876512345", status: "Inactive" },
];

const CustomerTable = () => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        
        {/* Table Header - Styled exactly like Employee Table */}
        <thead className="bg-slate-100">
          <tr className="text-left text-slate-600 text-sm uppercase">
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Phone</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-center">Actions</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-b hover:bg-slate-50 transition"
            >
              {/* Customer Column with Profile Avatar and Text Details */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                  <FaUserCircle className="text-4xl text-blue-600" />
                  <div>
                    <h3 className="font-semibold">{customer.name}</h3>
                    <p className="text-sm text-slate-500">{customer.email}</p>
                  </div>
                </div>
              </td>

              {/* Phone Info Row Field */}
              <td className="px-6 py-5 text-slate-600">
                {customer.phone}
              </td>

              {/* Status Pill Badge Element matching Employee Status Structure */}
              <td className="px-6 py-5">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    customer.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {customer.status}
                </span>
              </td>

              {/* Action Grid Buttons - Center-aligned with original button tags */}
              <td className="px-6 py-5">
                <div className="flex justify-center gap-3">
                  <button className="text-blue-600 hover:text-blue-800">
                    <FaEdit />
                  </button>
                  <button className="text-red-600 hover:text-red-800">
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

export default CustomerTable;