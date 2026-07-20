/* eslint-disable react-hooks/set-state-in-effect */import { useState, useEffect } from "react";
import {
  FaTimes,
  FaPlus,
  FaTrash,
} from "react-icons/fa";

import { getProducts } from "../../services/productService";

const CreateInvoiceModal = ({
  onClose,
  onSave,
  invoice,
}) => {

  const [productList, setProductList] = useState([]);

  const [form, setForm] = useState({
    customerName: invoice?.customerName || "",
    customerPhone: invoice?.customerPhone || "",
    customerEmail: invoice?.customerEmail || "",
    discount: invoice?.discount || 0,
    gst: invoice?.gst || 0,
    paymentMethod:
      invoice?.paymentMethod || "Cash",
    status: invoice?.status || "Paid",
  });

  const [products, setProducts] = useState(
    invoice?.products?.length
      ? invoice.products.map((item) => ({
          product:
            item.product?._id || item.product,
          quantity: item.quantity,
          sellingPrice: item.sellingPrice,
        }))
      : [
          {
            product: "",
            quantity: 1,
            sellingPrice: 0,
          },
        ]
  );

  // eslint-disable-next-line no-unused-vars
  const [errors, setErrors] = useState({});

  const fetchProducts = async () => {
    try {
      const res = await getProducts();

      setProductList(
        res.data.products || []
      );
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
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleProductChange = (
    index,
    field,
    value
  ) => {
    const temp = [...products];

    temp[index][field] = value;

    if (field === "product") {
      const selected =
        productList.find(
          (p) => p._id === value
        );

      if (selected) {
        temp[index].sellingPrice =
          selected.sellingPrice;
      }
    }

    setProducts(temp);
  };

  const addProduct = () => {
    setProducts([
      ...products,
      {
        product: "",
        quantity: 1,
        sellingPrice: 0,
      },
    ]);
  };

  const removeProduct = (index) => {
    if (products.length === 1) return;

    setProducts(
      products.filter(
        (_, i) => i !== index
      )
    );
  };

const subTotal = products.reduce((sum, item) => {
  return (
    sum +
    Number(item.quantity || 0) *
      Number(item.sellingPrice || 0)
  );
}, 0);

const discount = Number(form.discount || 0);

const gst = Number(form.gst || 0);

const totalAmount =
  subTotal - discount + gst;

const validate = () => {

  const temp = {};

  if (!form.customerName.trim()) {
    temp.customerName =
      "Customer Name is required";
  }

  if (products.length === 0) {
    temp.products =
      "Select at least one product";
  }

  products.forEach((item, index) => {

    if (!item.product) {
      temp[`product${index}`] =
        "Select Product";
    }

    if (
      !item.quantity ||
      item.quantity <= 0
    ) {
      temp[`quantity${index}`] =
        "Invalid Quantity";
    }

  });

  setErrors(temp);

  return Object.keys(temp).length === 0;
};

const handleSubmit = () => {

  if (!validate()) return;

  onSave({

    customerName: form.customerName,

    customerPhone:
      form.customerPhone,

    customerEmail:
      form.customerEmail,

    products: products.map((item) => ({
      product: item.product,
      quantity: Number(item.quantity),
      sellingPrice: Number(
        item.sellingPrice
      ),
    })),

    discount,

    gst,

    paymentMethod:
      form.paymentMethod,

    status: form.status,

    subTotal,

    totalAmount,

  });

};
return (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-6">

    <div className="bg-white rounded-2xl w-full max-w-5xl shadow-2xl">

      {/* Header */}
      <div className="flex justify-between items-center border-b p-6">

        <h2 className="text-2xl font-bold">
          {invoice ? "Update Invoice" : "Create Invoice"}
        </h2>

        <button
          onClick={onClose}
          className="p-2 hover:bg-slate-100 rounded-lg"
        >
          <FaTimes />
        </button>

      </div>

      {/* Body */}
      <div className="p-6 space-y-6">

        <div className="grid md:grid-cols-3 gap-4">

          <input
            type="text"
            name="customerName"
            placeholder="Customer Name"
            value={form.customerName}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="text"
            name="customerPhone"
            placeholder="Customer Phone"
            value={form.customerPhone}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="email"
            name="customerEmail"
            placeholder="Customer Email"
            value={form.customerEmail}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

        </div>

        {products.map((item, index) => (

          <div
            key={index}
            className="grid grid-cols-12 gap-3 items-center"
          >

            <select
              value={item.product}
              onChange={(e) =>
                handleProductChange(
                  index,
                  "product",
                  e.target.value
                )
              }
              className="col-span-5 border rounded-xl px-3 py-3"
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
              className="col-span-2 border rounded-xl px-3 py-3"
            />

            <input
              type="number"
              placeholder="Price"
              value={item.sellingPrice}
              onChange={(e) =>
                handleProductChange(
                  index,
                  "sellingPrice",
                  e.target.value
                )
              }
              className="col-span-3 border rounded-xl px-3 py-3"
            />

            <button
              type="button"
              onClick={() =>
                removeProduct(index)
              }
              className="col-span-2 text-red-600 hover:text-red-700"
            >
              <FaTrash />
            </button>

          </div>

        ))}

        <button
          type="button"
          onClick={addProduct}
          className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-xl"
        >
          <FaPlus />
          Add Product
        </button>

        {/* Discount / GST */}

        <div className="grid md:grid-cols-2 gap-4">

          <input
            type="number"
            name="discount"
            placeholder="Discount"
            value={form.discount}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

          <input
            type="number"
            name="gst"
            placeholder="GST"
            value={form.gst}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          />

        </div>

        {/* Payment */}

        <div className="grid md:grid-cols-2 gap-4">

          <select
            name="paymentMethod"
            value={form.paymentMethod}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          >
            <option>Cash</option>
            <option>UPI</option>
            <option>Card</option>
            <option>Bank Transfer</option>
          </select>

          <select
            name="status"
            value={form.status}
            onChange={handleChange}
            className="border rounded-xl px-4 py-3"
          >
            <option>Paid</option>
            <option>Pending</option>
          </select>

        </div>

        {/* Total */}

        <div className="bg-slate-50 rounded-xl p-5 text-right">

          <p>Subtotal : ₹{subTotal}</p>

          <p>Discount : ₹{discount}</p>

          <p>GST : ₹{gst}</p>

          <h2 className="text-2xl font-bold mt-3">
            Total : ₹{totalAmount}
          </h2>

        </div>

      </div>

      {/* Footer */}

      <div className="border-t p-6 flex justify-end gap-4">

        <button
          onClick={onClose}
          className="px-6 py-3 rounded-xl border"
        >
          Cancel
        </button>

        <button
          onClick={handleSubmit}
          className="px-6 py-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700"
        >
          {invoice ? "Update Invoice" : "Create Invoice"}
        </button>

      </div>

    </div>

  </div>
);
};

export default CreateInvoiceModal;