import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const PurchaseOrderTable = ({
  purchases,
  loading,
  onView,
  onEdit,
  onDelete,
}) => {
  if (loading) {
    return (
      <div className="p-10 text-center">
        Loading Purchase Orders...
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-50">

            <tr className="text-left text-sm font-semibold text-slate-600">

              <th className="px-6 py-4">PO No</th>
              <th className="px-6 py-4">Supplier</th>
              <th className="px-6 py-4">Warehouse</th>
              <th className="px-6 py-4">Items</th>
              <th className="px-6 py-4">Amount</th>
              <th className="px-6 py-4">Expected</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>

            </tr>

          </thead>

          <tbody>

            {purchases.length === 0 ? (

              <tr>

                <td
                  colSpan="8"
                  className="text-center py-10 text-slate-500"
                >
                  No Purchase Orders Found
                </td>

              </tr>

            ) : (

              purchases.map((order) => (

                <tr
                  key={order._id}
                  className="border-t hover:bg-slate-50 transition"
                >

                  <td className="px-6 py-5 font-semibold text-blue-600">
                    PO-{order._id.slice(-6).toUpperCase()}
                  </td>

                  <td className="px-6 py-5">
                    {order.supplier}
                  </td>

                  <td className="px-6 py-5">
                    {order.warehouse}
                  </td>

                  <td className="px-6 py-5">
                    {order.products?.length || 0}
                  </td>

                  <td className="px-6 py-5 font-semibold">
                    ₹{Number(order.totalAmount || 0).toLocaleString()}
                  </td>

                  <td className="px-6 py-5">
                    {order.expectedDate
                      ? new Date(
                          order.expectedDate
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="px-6 py-5">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Received"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Ordered"
                      ? "bg-blue-100 text-blue-700"
                    : "bg-yellow-100 text-yellow-700"
                  }`}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td className="px-6 py-5">

                    <div className="flex justify-end gap-2">

                      <button
                        onClick={() => onView(order)}
                        className="p-2 rounded-lg hover:bg-slate-100"
                      >
                        <FaEye />
                      </button>

                      <button
                        onClick={() => onEdit(order)}
                        className="p-2 rounded-lg hover:bg-blue-100 text-blue-600"
                      >
                        <FaEdit />
                      </button>

                      <button
                        onClick={() => onDelete(order._id)}
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

export default PurchaseOrderTable;