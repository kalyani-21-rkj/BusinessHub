import {
  FaEye,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

const purchaseOrders = [
  {
    id: 1,
    poNo: "PO-1001",
    supplier: "Apple India",
    warehouse: "Mumbai",
    items: 25,
    amount: "₹12,50,000",
    expected: "18 Jul 2026",
    status: "Receiving",
  },
  {
    id: 2,
    poNo: "PO-1002",
    supplier: "Dell India",
    warehouse: "Pune",
    items: 18,
    amount: "₹8,40,000",
    expected: "20 Jul 2026",
    status: "Pending",
  },
  {
    id: 3,
    poNo: "PO-1003",
    supplier: "Samsung",
    warehouse: "Delhi",
    items: 35,
    amount: "₹18,20,000",
    expected: "16 Jul 2026",
    status: "Completed",
  },
];

const PurchaseOrderTable = ({ onView }) => {
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

            {purchaseOrders.map((order) => (

              <tr
                key={order.id}
                className="border-t hover:bg-slate-50 transition"
              >

                <td className="px-6 py-5 font-semibold text-blue-600">
                  {order.poNo}
                </td>

                <td className="px-6 py-5">
                  {order.supplier}
                </td>

                <td className="px-6 py-5">
                  {order.warehouse}
                </td>

                <td className="px-6 py-5">
                  {order.items}
                </td>

                <td className="px-6 py-5 font-semibold">
                  {order.amount}
                </td>

                <td className="px-6 py-5">
                  {order.expected}
                </td>

                <td className="px-6 py-5">

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : order.status === "Receiving"
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

                    <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600">
                      <FaEdit />
                    </button>

                    <button className="p-2 rounded-lg hover:bg-red-100 text-red-600">
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default PurchaseOrderTable;