import { FaTimes, FaPrint, FaTruck } from "react-icons/fa";

const OrderDetailsModal = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">

      <div className="bg-white rounded-2xl w-full max-w-4xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="flex justify-between items-center border-b px-8 py-5">

          <div>

            <h2 className="text-2xl font-bold">
              {order.orderNo}
            </h2>

            <p className="text-slate-500 mt-1">
              Customer Order Details
            </p>

          </div>

          <button
            onClick={onClose}
            className="p-3 rounded-lg hover:bg-slate-100"
          >
            <FaTimes />
          </button>

        </div>

        {/* Body */}

        <div className="grid lg:grid-cols-2 gap-8 p-8">

          {/* Left */}

          <div className="space-y-6">

            <div>

              <h3 className="font-semibold text-slate-800 mb-3">
                Customer
              </h3>

              <div className="bg-slate-50 rounded-xl p-5">

                <p className="font-semibold">
                  {order.customer}
                </p>

                <p className="text-slate-500">
                  customer@gmail.com
                </p>

                <p className="text-slate-500">
                  +91 9876543210
                </p>

              </div>

            </div>

            <div>

              <h3 className="font-semibold mb-3">
                Shipping Address
              </h3>

              <div className="bg-slate-50 rounded-xl p-5">

                221 Business Street

                <br />

                Pune, Maharashtra

                <br />

                India

              </div>

            </div>

            <div>

              <h3 className="font-semibold mb-3">
                Courier
              </h3>

              <div className="bg-slate-50 rounded-xl p-5 flex items-center gap-3">

                <FaTruck className="text-blue-600" />

                <div>

                  <p className="font-medium">
                    {order.courier}
                  </p>

                  <p className="text-sm text-slate-500">
                    Tracking : {order.tracking}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* Right */}

          <div className="space-y-6">

            <div>

              <h3 className="font-semibold mb-3">
                Products
              </h3>

              <div className="rounded-xl border divide-y">

                <div className="p-4 flex justify-between">

                  <span>MacBook Pro M3</span>

                  <span>x1</span>

                </div>

                <div className="p-4 flex justify-between">

                  <span>Wireless Mouse</span>

                  <span>x2</span>

                </div>

              </div>

            </div>

            <div>

              <h3 className="font-semibold mb-3">
                Payment Summary
              </h3>

              <div className="rounded-xl bg-slate-50 p-5 space-y-3">

                <div className="flex justify-between">

                  <span>Subtotal</span>

                  <span>₹1,40,000</span>

                </div>

                <div className="flex justify-between">

                  <span>GST</span>

                  <span>₹9,999</span>

                </div>

                <div className="border-t pt-3 flex justify-between font-bold text-lg">

                  <span>Total</span>

                  <span>{order.amount}</span>

                </div>

              </div>

            </div>

            {/* Timeline */}

            <div>

              <h3 className="font-semibold mb-3">
                Delivery Timeline
              </h3>

              <div className="bg-slate-50 rounded-xl p-5 space-y-4">

                <div>✅ Order Confirmed</div>

                <div>✅ Packed</div>

                <div>🚚 Shipped</div>

                <div>📍 Out for Delivery</div>

                <div>🎉 Delivered</div>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="border-t px-8 py-5 flex justify-end gap-4">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border hover:bg-slate-100"
          >
            Close
          </button>

          <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">

            <FaPrint />

            Print Invoice

          </button>

        </div>

      </div>

    </div>
  );
};

export default OrderDetailsModal;