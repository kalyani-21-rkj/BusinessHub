import {

  FaCheckCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";

const notifications = [
  {
    id: 1,
    title: "New Order Received",
    message: "Order #ORD-1005 has been placed successfully.",
    time: "5 mins ago",
    type: "success",
  },
  {
    id: 2,
    title: "Low Stock Alert",
    message: "MacBook Pro stock is below minimum level.",
    time: "20 mins ago",
    type: "warning",
  },
  {
    id: 3,
    title: "Payroll Generated",
    message: "July payroll has been generated successfully.",
    time: "1 hour ago",
    type: "info",
  },
  {
    id: 4,
    title: "Leave Request",
    message: "Rahul Sharma applied for leave.",
    time: "2 hours ago",
    type: "info",
  },
  {
    id: 5,
    title: "Payment Received",
    message: "₹45,000 received from ABC Pvt Ltd.",
    time: "Yesterday",
    type: "success",
  },
];

const Notifications = () => {
  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>

      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          
        </h1>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
          Mark All Read
        </button>

      </div>

      {/* Cards */}

      <div className="grid md:grid-cols-3 gap-5">

        <div className="bg-white rounded-2xl shadow p-5">
          <p>Total Notifications</p>
          <h2 className="text-3xl font-bold mt-2">45</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p>Unread</p>
          <h2 className="text-3xl font-bold text-yellow-600 mt-2">8</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-5">
          <p>Read</p>
          <h2 className="text-3xl font-bold text-green-600 mt-2">37</h2>
        </div>

      </div>

      {/* Notification List */}

      <div className="bg-white rounded-2xl shadow divide-y">

        {notifications.map((item) => (

          <div
            key={item.id}
            className="flex items-start gap-4 p-5 hover:bg-slate-50 transition"
          >

            <div className="mt-1">

              {item.type === "success" && (
                <FaCheckCircle className="text-green-600 text-xl" />
              )}

              {item.type === "warning" && (
                <FaExclamationTriangle className="text-yellow-500 text-xl" />
              )}

              {item.type === "info" && (
                <FaInfoCircle className="text-blue-600 text-xl" />
              )}

            </div>

            <div className="flex-1">

              <h3 className="font-semibold text-slate-800">
                {item.title}
              </h3>

              <p className="text-slate-500 mt-1">
                {item.message}
              </p>

            </div>

            <div className="text-sm text-slate-400">
              {item.time}
            </div>

          </div>

        ))}

      </div>

    </div>
  );
};

export default Notifications;