/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { FaTimes, FaPlus, FaTrash } from "react-icons/fa";

import { getProducts } from "../../services/productService";

const suppliers = [
  "Apple India",
  "Dell India",
  "Samsung",
  "HP India",
];

const warehouses = [
  "Mumbai",
  "Pune",
  "Delhi",
];

const CreatePurchaseModal = ({
  onClose,
  onSave,
  purchase,
}) => {

  const [form, setForm] = useState({
    supplier: purchase?.supplier || "",
    warehouse: purchase?.warehouse || "",
    expectedDate: purchase?.expectedDate
      ? purchase.expectedDate.slice(0, 10)
      : "",
    notes: purchase?.notes || "",
  });

  const [productList, setProductList] = useState([]);

  const [products, setProducts] = useState(
    purchase?.products?.length
      ? purchase.products.map((item) => ({
          product: item.product?._id || item.product,
          quantity: item.quantity,
          purchasePrice: item.purchasePrice,
          gst: item.gst || 18,
        }))
      : [
          {
            product: "",
            quantity: "",
            purchasePrice: "",
            gst: 18,
          },
        ]
  );

  const [errors, setErrors] = useState({});

  const fetchProducts = async () => {
  try {
    const res = await getProducts();
    console.log("Full Response:", res);
    console.log("Response Data:", res.data);
    console.log("Products:", res.data.products);
    setProductList(res.data.products || []);
  } catch (err) {
    console.log(err);
  }
};

useEffect(() => {
  fetchProducts();
}, []);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProductChange = (
    index,
    field,
    value
  ) => {
    const temp = [...products];

    temp[index][field] = value;

    setProducts(temp);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        product: "",
        quantity: "",
        purchasePrice: "",
        gst: 18,
      },
    ]);
  };

  const removeProduct = (index) => {
    if (products.length === 1) return;

    setProducts(
      products.filter((_, i) => i !== index)
    );
  };

  const validate = () => {
    let newErrors = {};

    if (!form.supplier)
      newErrors.supplier = "Supplier required";

    if (!form.warehouse)
      newErrors.warehouse = "Warehouse required";

    if (!form.expectedDate)
      newErrors.expectedDate =
        "Expected Date required";

    products.forEach((item, index) => {

      if (!item.product)
        newErrors[`product${index}`] =
          "Required";

      if (
        !item.quantity ||
        Number(item.quantity) <= 0
      )
        newErrors[`quantity${index}`] =
          "Invalid";

      if (
        !item.purchasePrice ||
        Number(item.purchasePrice) <= 0
      )
        newErrors[`purchasePrice${index}`] =
          "Invalid";
    });

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {

    if (!validate()) return;

    onSave({
      supplier: form.supplier,
      warehouse: form.warehouse,
      expectedDate: form.expectedDate,
      notes: form.notes,
      status: purchase?.status || "Pending",
      products,
    });

  };

  return (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50 p-5">
    <div className="bg-white rounded-2xl w-full max-w-5xl shadow-xl overflow-hidden">

      {/* Header */}

      <div className="flex justify-between items-center border-b px-8 py-5">
        <h2 className="text-2xl font-bold">
          {purchase ? "Edit Purchase Order" : "Create Purchase Order"}
        </h2>

        <button
          type="button"
          onClick={onClose}
          className="p-3 rounded-lg hover:bg-slate-100"
        >
          <FaTimes />
        </button>
      </div>

      {/* Body */}

      <div className="p-8 space-y-8">

        {/* Supplier */}

        <div className="grid md:grid-cols-3 gap-5">

          <div>
            <label className="font-medium">
              Supplier
            </label>

            <select
              name="supplier"
              value={form.supplier}
              onChange={handleChange}
              className={`mt-2 w-full border rounded-xl p-3 ${
                errors.supplier ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Supplier</option>

              {suppliers.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {errors.supplier && (
              <p className="text-red-500 text-sm mt-1">
                {errors.supplier}
              </p>
            )}
          </div>

          <div>
            <label className="font-medium">
              Warehouse
            </label>

            <select
              name="warehouse"
              value={form.warehouse}
              onChange={handleChange}
              className={`mt-2 w-full border rounded-xl p-3 ${
                errors.warehouse ? "border-red-500" : ""
              }`}
            >
              <option value="">Select Warehouse</option>

              {warehouses.map((w) => (
                <option key={w} value={w}>
                  {w}
                </option>
              ))}
            </select>

            {errors.warehouse && (
              <p className="text-red-500 text-sm mt-1">
                {errors.warehouse}
              </p>
            )}
          </div>

          <div>
            <label className="font-medium">
              Expected Date
            </label>

            <input
              type="date"
              name="expectedDate"
              value={form.expectedDate}
              onChange={handleChange}
              className={`mt-2 w-full border rounded-xl p-3 ${
                errors.expectedDate ? "border-red-500" : ""
              }`}
            />

            {errors.expectedDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.expectedDate}
              </p>
            )}
          </div>

        </div>

        {/* Products */}

        <div>

          <div className="flex justify-between items-center mb-5">

            <h3 className="text-lg font-bold">
              Products
            </h3>

            <button
              type="button"
              onClick={addProduct}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex gap-2 items-center"
            >
              <FaPlus />
              Add Product
            </button>

          </div>

          <div className="space-y-4">

            {products.map((item, index) => (

              <div
                key={index}
                className="grid md:grid-cols-5 gap-4"
              >

                {/* Product */}

                <select
                  value={item.product}
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "product",
                      e.target.value
                    )
                  }
                  className={`border rounded-xl p-3 ${
                    errors[`product${index}`]
                      ? "border-red-500"
                      : ""
                  }`}
                >
                  <option value="">
                    Select Product
                  </option>

                  {productList.map((product) => (
                 <option
                key={product._id}
                value={product._id}
                >
                {product.name}
              </option>
              ))}
                </select>

                {/* Quantity */}

                <input
                  type="number"
                  placeholder="Qty"
                  value={item.quantity}
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "quantity",
                      e.target.value
                    )
                  }
                  className={`border rounded-xl p-3 ${
                    errors[`quantity${index}`]
                      ? "border-red-500"
                      : ""
                  }`}
                />

                {/* Purchase Price */}

                <input
                  type="number"
                  placeholder="Price"
                  value={item.purchasePrice}
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "purchasePrice",
                      e.target.value
                    )
                  }
                  className={`border rounded-xl p-3 ${
                    errors[`purchasePrice${index}`]
                      ? "border-red-500"
                      : ""
                  }`}
                />

                {/* GST */}

                <input
                  type="number"
                  value={item.gst}
                  onChange={(e) =>
                    handleProductChange(
                      index,
                      "gst",
                      e.target.value
                    )
                  }
                  className="border rounded-xl p-3"
                />

                {/* Delete */}

                <button
                  type="button"
                  onClick={() => removeProduct(index)}
                  className="bg-red-100 text-red-600 rounded-xl"
                >
                  <FaTrash className="mx-auto" />
                </button>

              </div>

            ))}

          </div>

        </div>

        {/* Invoice */}

        <div>

          <label className="font-medium">
            Upload Invoice
          </label>

          <input
            type="file"
            className="mt-2 w-full border rounded-xl p-3"
          />

        </div>

        {/* Notes */}

        <div>

          <label className="font-medium">
            Notes
          </label>

          <textarea
            rows="4"
            name="notes"
            value={form.notes}
            onChange={handleChange}
            className="mt-2 w-full border rounded-xl p-3"
          />

        </div>

      </div>

      {/* Footer */}

      <div className="border-t flex justify-end gap-4 px-8 py-5">

        <button
          type="button"
          onClick={onClose}
          className="px-6 py-3 border rounded-xl"
        >
          Cancel
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
        >
          {purchase ? "Update Purchase Order" : "Create Purchase Order"}
        </button>

      </div>

    </div>
  </div>
)};
export default CreatePurchaseModal;