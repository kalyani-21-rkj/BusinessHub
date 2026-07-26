import {
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const BillingTable = ({
  invoices = [],
  loading,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="text-center py-16 text-slate-500">
        Loading Invoices...
      </div>
    );
  }

  if (invoices.length === 0) {
    return (
      <div className="text-center py-16 text-slate-500">
        No Invoices Found
      </div>
    );
  }

  return (
    <>
      {/* ================= MOBILE ================= */}

      <div className="lg:hidden flex flex-col gap-6 px-1">
        {invoices.map((invoice) => (
          <div
            key={invoice._id}
            className="bg-white border border-slate-200 rounded-2xl shadow-md p-5"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-blue-600">
                  {invoice.invoiceNo}
                </h3>

                <p className="text-sm text-slate-500 mt-1">
                  {invoice.customerName}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  invoice.status === "Paid"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {invoice.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5 text-sm">
              <div>
                <p className="text-slate-500">
                  Amount
                </p>

                <p className="font-semibold">
                  ₹
                  {Number(
                    invoice.totalAmount || 0
                  ).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-slate-500">
                  Date
                </p>

                <p className="font-semibold">
                  {invoice.createdAt
                    ? new Date(
                        invoice.createdAt
                      ).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-5 border-t pt-4">
              

              <button
                onClick={() => onEdit(invoice)}
                className="w-10 h-10 rounded-xl text-blue-600 hover:bg-blue-100 flex items-center justify-center transition"
              >
                <FaEdit />
              </button>

              <button
                onClick={() =>
                  onDelete(invoice._id)
                }
                className="w-10 h-10 rounded-xl text-red-600 hover:bg-red-100 flex items-center justify-center transition"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= DESKTOP ================= */}

      <div className="hidden lg:block overflow-x-auto bg-white rounded-2xl shadow-sm border border-slate-200">
        <table className="w-full">
          <thead className="bg-slate-50 border-b">
            <tr className="text-left text-sm text-slate-600">
              <th className="px-6 py-4">
                Invoice No
              </th>

              <th className="px-6 py-4">
                Customer
              </th>

              <th className="px-6 py-4">
                Amount
              </th>

              <th className="px-6 py-4">
                Date
              </th>

              <th className="px-6 py-4">
                Status
              </th>

              <th className="px-6 py-4 text-right">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((invoice) => (
              <tr
                key={invoice._id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="px-6 py-5 font-semibold text-blue-600">
                  {invoice.invoiceNo}
                </td>

                <td className="px-6 py-5">
                  {invoice.customerName}
                </td>

                <td className="px-6 py-5 font-semibold">
                  ₹
                  {Number(
                    invoice.totalAmount || 0
                  ).toLocaleString()}
                </td>

                <td className="px-6 py-5">
                  {invoice.createdAt
                    ? new Date(
                        invoice.createdAt
                      ).toLocaleDateString()
                    : "-"}
                </td>

                <td className="px-6 py-5">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      invoice.status === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {invoice.status}
                  </span>
                </td>

                <td className="px-6 py-5">
                  <div className="flex justify-end gap-2">
                    

                    <button
                      onClick={() =>
                        onEdit(invoice)
                      }
                      className="w-10 h-10 rounded-xl text-blue-600 hover:bg-blue-100 flex items-center justify-center transition"
                    >
                      <FaEdit />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(invoice._id)
                      }
                      className="w-10 h-10 rounded-xl text-red-600 hover:bg-red-100 flex items-center justify-center transition"
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
    </>
  );
};

export default BillingTable;