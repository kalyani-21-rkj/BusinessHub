import {
  FaEye,
  FaEdit,
  FaTrash,
  FaPrint,
} from "react-icons/fa";

const orders = [
  {
    id: 1,
    orderNo: "#ORD-1001",
    customer: "Rahul Sharma",
    avatar: "R",
    items: 3,
    amount: "₹1,49,999",
    payment: "Paid",
    status: "Delivered",
    courier: "Blue Dart",
    tracking: "BD458923",
    date: "15 Jul 2026",
  },
  {
    id: 2,
    orderNo: "#ORD-1002",
    customer: "Kalyani Ramayane",
    avatar: "K",
    items: 2,
    amount: "₹78,000",
    payment: "Pending",
    status: "Processing",
    courier: "DTDC",
    tracking: "DT782311",
    date: "15 Jul 2026",
  },
  {
    id: 3,
    orderNo: "#ORD-1003",
    customer: "Sneha Patil",
    avatar: "S",
    items: 1,
    amount: "₹15,500",
    payment: "Paid",
    status: "Shipped",
    courier: "Delhivery",
    tracking: "DL985411",
    date: "14 Jul 2026",
  },
];

const OrderTable = ({ onView }) => {
  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-slate-50 border-b">

          <tr className="text-left text-xs uppercase tracking-wider text-slate-500">

            <th className="px-6 py-4">Order</th>

            <th className="px-6 py-4">Customer</th>

            <th className="px-6 py-4">Items</th>

            <th className="px-6 py-4">Amount</th>

            <th className="px-6 py-4">Payment</th>

            <th className="px-6 py-4">Shipping</th>

            <th className="px-6 py-4">Tracking</th>

            <th className="px-6 py-4">Status</th>

            <th className="px-6 py-4 text-right">
              Actions
            </th>

          </tr>

        </thead>

        <tbody className="divide-y divide-slate-100">

          {orders.map((order) => (

            <tr
              key={order.id}
              className="hover:bg-slate-50 transition"
            >

              <td className="px-6 py-5">

                <div>

                  <p className="font-semibold text-blue-600">
                    {order.orderNo}
                  </p>

                  <p className="text-xs text-slate-400">
                    {order.date}
                  </p>

                </div>

              </td>

              <td className="px-6 py-5">

                <div className="flex items-center gap-3">

                  <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">

                    {order.avatar}

                  </div>

                  <span className="font-medium">
                    {order.customer}
                  </span>

                </div>

              </td>

              <td className="px-6 py-5">

                {order.items} Items

              </td>

              <td className="px-6 py-5 font-semibold">

                {order.amount}

              </td>

              <td className="px-6 py-5">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.payment === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {order.payment}
                </span>

              </td>

              <td className="px-6 py-5">

                {order.courier}

              </td>

              <td className="px-6 py-5 font-mono text-blue-600">

                {order.tracking}

              </td>

              <td className="px-6 py-5">

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-100 text-green-700"
                      : order.status === "Processing"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-purple-100 text-purple-700"
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
                    title="View"
                  >
                    <FaEye />
                  </button>

                  <button
                    className="p-2 rounded-lg hover:bg-blue-100 text-blue-600"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>

                  <button
                    className="p-2 rounded-lg hover:bg-green-100 text-green-600"
                    title="Print Invoice"
                  >
                    <FaPrint />
                  </button>

                  <button
                    className="p-2 rounded-lg hover:bg-red-100 text-red-600"
                    title="Delete"
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
  );
};

export default OrderTable;