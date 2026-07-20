import {
  FaTimes,
  FaPrint,
  FaTruck,
  FaCheckCircle,
} from "react-icons/fa";

const PurchaseDetailsModal = ({ purchase, onClose }) => {
  if (!purchase) return null;

  const subtotal =
    purchase.products?.reduce(
      (sum, item) => sum + item.purchasePrice * item.quantity,
      0
    ) || 0;

  const gstAmount =
    purchase.products?.reduce(
      (sum, item) =>
        sum +
        (item.purchasePrice *
          item.quantity *
          (item.gst || 0)) /
          100,
      0
    ) || 0;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-6">

      <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="flex justify-between items-center px-8 py-5 border-b">

          <div>
            <h2 className="text-2xl font-bold">
              Purchase #{purchase._id?.slice(-6)}
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

                <p>
                  Warehouse : {purchase.warehouse}
                </p>

                <p>
                  Status : {purchase.status}
                </p>

                <p>
                  Expected :
                  {" "}
                  {purchase.expectedDate
                    ? new Date(
                        purchase.expectedDate
                      ).toLocaleDateString()
                    : "-"}
                </p>

              </div>

            </div>

            <div>

              <h3 className="font-semibold mb-3">
                Notes
              </h3>

              <div className="bg-slate-50 rounded-xl p-5">

                {purchase.notes || "No Notes"}

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

                {purchase.products?.length ? (

                  purchase.products.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="flex justify-between p-4"
                      >

                        <div>

                          <p className="font-semibold">
                            {item.product?.name}
                          </p>

                          <p className="text-sm text-slate-500">
                            ₹{item.purchasePrice} × {item.quantity}
                          </p>

                        </div>

                        <div className="text-right">

                          <p>
                            Qty : {item.quantity}
                          </p>

                          <p className="font-semibold">
                            ₹
                            {item.purchasePrice *
                              item.quantity}
                          </p>

                        </div>

                      </div>

                    )
                  )

                ) : (

                  <div className="p-4 text-slate-500">
                    No Products
                  </div>

                )}

              </div>

            </div>

            <div>

              <h3 className="font-semibold mb-3">
                Amount Summary
              </h3>

              <div className="bg-slate-50 rounded-xl p-5 space-y-3">

                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>

                <div className="flex justify-between">
                  <span>GST</span>
                  <span>₹{gstAmount}</span>
                </div>

                <hr />

                <div className="flex justify-between font-bold text-lg">

                  <span>Total</span>

                  <span>
                    ₹{purchase.totalAmount}
                  </span>

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
              {purchase.status}
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

          <button
            className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white"
          >
            Receive Stock
          </button>

          <button
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
          >
            <FaPrint />
            Print PO
          </button>

        </div>

      </div>

    </div>
  );
};

export default PurchaseDetailsModal;