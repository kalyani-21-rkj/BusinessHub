import {
  FaTimes,
  FaPrint,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const PurchaseDetailsModal = ({ purchase, onClose }) => {
  if (!purchase) return null;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="flex justify-between items-center px-8 py-5 border-b">

          <div>

            <h2 className="text-2xl font-bold">
              {purchase.poNo}
            </h2>

            <p className="text-slate-500">
              Purchase Order Details
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

          {/* LEFT */}

          <div className="space-y-6">

            <div>

              <h3 className="font-semibold mb-3">
                Supplier Information
              </h3>

              <div className="bg-slate-50 rounded-xl p-5 space-y-2">

                <p className="font-semibold">
                  {purchase.supplier}
                </p>

                <p>GST : 27ABCDE1234F1Z5</p>

                <p>Email : supplier@gmail.com</p>

                <p>Phone : +91 9876543210</p>

              </div>

            </div>

            <div>

              <h3 className="font-semibold mb-3">
                Warehouse
              </h3>

              <div className="bg-slate-50 rounded-xl p-5">

                <p className="font-medium">
                  {purchase.warehouse} Warehouse
                </p>

                <p className="text-slate-500 mt-1">
                  Expected Delivery :
                  {" "}
                  {purchase.expected}
                </p>

              </div>

            </div>

            <div>

              <h3 className="font-semibold mb-3">
                Invoice
              </h3>

              <div className="bg-slate-50 rounded-xl p-5">

                Invoice No :
                <span className="font-semibold ml-2">
                  INV-45896
                </span>

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="space-y-6">

            <div>

              <h3 className="font-semibold mb-3">
                Products
              </h3>

              <div className="border rounded-xl divide-y">

                <div className="flex justify-between p-4">

                  <span>MacBook Pro</span>

                  <span>x15</span>

                </div>

                <div className="flex justify-between p-4">

                  <span>Magic Mouse</span>

                  <span>x20</span>

                </div>

                <div className="flex justify-between p-4">

                  <span>Magic Keyboard</span>

                  <span>x10</span>

                </div>

              </div>

            </div>

            <div>

              <h3 className="font-semibold mb-3">
                Amount Summary
              </h3>

              <div className="bg-slate-50 rounded-xl p-5 space-y-3">

                <div className="flex justify-between">

                  <span>Subtotal</span>

                  <span>₹10,60,000</span>

                </div>

                <div className="flex justify-between">

                  <span>GST (18%)</span>

                  <span>₹1,90,800</span>

                </div>

                <div className="flex justify-between">

                  <span>Shipping</span>

                  <span>₹5,000</span>

                </div>

                <hr />

                <div className="flex justify-between font-bold text-lg">

                  <span>Total</span>

                  <span>{purchase.amount}</span>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Timeline */}

        <div className="px-8">

          <h3 className="font-semibold mb-4">
            Purchase Timeline
          </h3>

          <div className="grid md:grid-cols-4 gap-4">

            <div className="bg-green-50 rounded-xl p-4 text-center">

              <FaCheckCircle className="mx-auto text-green-600 text-xl mb-2" />

              Created

            </div>

            <div className="bg-green-50 rounded-xl p-4 text-center">

              <FaCheckCircle className="mx-auto text-green-600 text-xl mb-2" />

              Approved

            </div>

            <div className="bg-blue-50 rounded-xl p-4 text-center">

              <FaTruck className="mx-auto text-blue-600 text-xl mb-2" />

              Supplier Shipped

            </div>

            <div className="bg-yellow-50 rounded-xl p-4 text-center">

              Warehouse Receiving

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="flex justify-end gap-4 px-8 py-6 border-t mt-8">

          <button
            onClick={onClose}
            className="px-6 py-3 rounded-xl border hover:bg-slate-100"
          >
            Close
          </button>

          <button className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white">

            Receive Stock

          </button>

          <button className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">

            <FaPrint />

            Print PO

          </button>

        </div>

      </div>

    </div>
  );
};

export default PurchaseDetailsModal;