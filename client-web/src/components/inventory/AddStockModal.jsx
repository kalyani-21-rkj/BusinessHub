/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

const AddStockModal = ({
  open,
  onClose,
  inventory,
  onSave,
}) => {
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [supplier, setSupplier] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");

  useEffect(() => {
    if (!open) {
      setProductId("");
      setQuantity("");
      setSupplier("");
      setPurchasePrice("");
    }
  }, [open]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    onSave({
      productId,
      quantity: Number(quantity),
      supplier,
      purchasePrice: Number(purchasePrice),
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6">

        <div className="flex justify-between items-center mb-6">

          <h2 className="text-2xl font-bold">
            Add Stock
          </h2>

          <button
            onClick={onClose}
            className="text-2xl"
          >
            ×
          </button>

        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>

            <label className="block mb-2 font-medium">
              Product
            </label>

            <select
              value={productId}
              onChange={(e) =>
                setProductId(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3"
              required
            >
              <option value="">
                Select Product
              </option>

              {inventory.map((item) => (
                <option
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </option>
              ))}

            </select>

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Quantity
            </label>

            <input
              type="number"
              value={quantity}
              onChange={(e) =>
                setQuantity(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3"
              required
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Supplier
            </label>

            <input
              type="text"
              value={supplier}
              onChange={(e) =>
                setSupplier(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          <div>

            <label className="block mb-2 font-medium">
              Purchase Price
            </label>

            <input
              type="number"
              value={purchasePrice}
              onChange={(e) =>
                setPurchasePrice(e.target.value)
              }
              className="w-full border rounded-xl px-4 py-3"
            />

          </div>

          <div className="flex justify-end gap-3">

            <button
              type="button"
              onClick={onClose}
              className="px-6 py-3 border rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-xl"
            >
              Add Stock
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddStockModal;