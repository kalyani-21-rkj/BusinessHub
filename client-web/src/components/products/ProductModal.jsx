/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import {
  createProduct,
  updateProduct,
} from "../../services/productService";

const ProductModal = ({
  open,
  product,
  onClose,
  onSuccess,
  viewOnly,
}) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    supplier: "",
    sku: "",
    purchasePrice: "",
    sellingPrice: "",
    stock: "",
    description: "",
    image: "",
  });

  // eslint-disable-next-line no-unused-vars
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        brand: product.brand || "",
        category: product.category || "",
        supplier: product.supplier || "",
        sku: product.sku || "",
        purchasePrice: product.purchasePrice || "",
        sellingPrice: product.sellingPrice || "",
        stock: product.stock || "",
        description: product.description || "",
        image: product.image || "",
      });

      setPreview(product.image || "");
    } else {
      setFormData({
        name: "",
        brand: "",
        category: "",
        supplier: "",
        sku: "",
        purchasePrice: "",
        sellingPrice: "",
        stock: "",
        description: "",
        image: "",
      });

      setPreview("");
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "image") {
      setPreview(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      if (product?._id) {
        await updateProduct(product._id, formData);
        alert("Product Updated Successfully");
      } else {
        await createProduct(formData);
        alert("Product Added Successfully");
      }

      onSuccess();
      onClose();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to Save Product"
      );
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center   z-50 px-4">

      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl flex flex-col max-h-[92vh]">

        {/* Header */}

        <div className="bg-blue-600 flex items-center justify-between px-8 py-5 flex-shrink-0">

          <div className=" ">
    <h2 className="text-4xl font-bold text-white">
        {viewOnly
            ? "Product Details"
            : product
            ? "Update Product"
            : "Add Product"}
    </h2>

    <p className="text-blue-100 mt-2 text-lg">
        Fill product details
    </p>
</div>

          <button
            onClick={onClose}
            className="text-4xl text-white hover:text-red-200 transition">
            ×
          </button>

        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden"
          >

          <div className="flex-1 overflow-y-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Product Name */}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                disabled={viewOnly}
                placeholder="MacBook Pro M3"
                required
                className="w-full h-14 rounded-2xl border border-gray-300 px-5 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Category */}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={viewOnly}
                className="w-full h-14 rounded-2xl border border-gray-300 px-5 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              >
                <option value="">Select Category</option>
                <option value="Laptop">Laptop</option>
                <option value="Mobile">Mobile</option>
                <option value="Tablet">Tablet</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            {/* Brand */}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                disabled={viewOnly}
                placeholder="Apple"
                className="w-full h-14 rounded-2xl border border-gray-300 px-5 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* SKU */}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                SKU
              </label>

              <input
                type="text"
                name="sku"
                value={formData.sku}
                onChange={handleChange}
                disabled={viewOnly}
                placeholder="APL-001"
                className="w-full h-14 rounded-2xl border border-gray-300 px-5 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Purchase Price */}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Purchase Price
              </label>

              <input
                type="number"
                name="purchasePrice"
                value={formData.purchasePrice}
                onChange={handleChange}
                disabled={viewOnly}
                className="w-full h-14 rounded-2xl border border-gray-300 px-5 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>

            {/* Selling Price */}

            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                Selling Price
              </label>

              <input
                type="number"
                name="sellingPrice"
                value={formData.sellingPrice}
                onChange={handleChange}
                disabled={viewOnly}
                className="w-full h-14 rounded-2xl border border-gray-300 px-5 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            {/* Stock */}

<div>
  <label className="block text-sm font-medium text-gray-600 mb-2">
    Stock
  </label>

  <input
    type="number"
    name="stock"
    value={formData.stock}
    onChange={handleChange}
    disabled={viewOnly}
    placeholder="100"
    className="w-full h-14 rounded-2xl border border-gray-300 px-5 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
  />
</div>

{/* Supplier */}

<div>
  <label className="block text-sm font-medium text-gray-600 mb-2">
    Supplier
  </label>

  <input
    type="text"
    name="supplier"
    value={formData.supplier}
    onChange={handleChange}
    disabled={viewOnly}
    placeholder="ABC Pvt Ltd"
    className="w-full h-14 rounded-2xl border border-gray-300 px-5 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
  />
</div>

{/* Image URL */}

<div className="md:col-span-2">
  <label className="block text-sm font-medium text-gray-600 mb-2">
    Image URL
  </label>

  <input
    type="text"
    name="image"
    value={formData.image}
    onChange={handleChange}
    disabled={viewOnly}
    placeholder="https://example.com/product.jpg"
    className="w-full h-14 rounded-2xl border border-gray-300 px-5 text-lg focus:ring-2 focus:ring-blue-500 outline-none"
  />
</div>

{/* Image Preview */}

{preview && (
  <div className="md:col-span-2 flex justify-center">

    <div className="rounded-2xl border border-slate-300 bg-slate-50 p-4 shadow-sm">

      <img
        src={preview}
        alt="Preview"
        className="w-36 h-36 rounded-xl object-cover"
        onError={(e) => {
          e.target.src = "/no-image.png";
        }}
      />

    </div>

  </div>
)}



                      {/* Description */}

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              disabled={viewOnly}
              placeholder="Enter product description..."
              className={`w-full rounded-xl border px-4 py-3 outline-none transition resize-none ${
                viewOnly
                  ? "bg-slate-100 text-slate-600 cursor-not-allowed"
                  : "bg-white border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              }`}
            />
          </div>

        </div>
      </div>


        {/* Footer */}

<div className="sticky bottom-0 mb-5 bg-white border-t border-slate-200 px-10 py-8 flex justify-end gap-4 rounded-b-4xl">

  <button
    type="button"
    onClick={onClose}
    className="px-10 py-4 border border-slate-300 bg-white text-slate-700 font-semibold hover:bg-slate-100 transition-all duration-200"
  >
    Cancel
  </button>

  {!viewOnly ? (
    <button
      type="submit"
      disabled={loading}
      className="px-8 py-3  bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-60"
    >
      {loading
        ? "Saving..."
        : product
        ? "Update Product"
        : "Add Product"}
    </button>
  ) : (
    <button
      type="button"
      onClick={onClose}
      className="px-8 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
    >
      Close
    </button>
  )}

</div>
        

      </form>

    </div>
  </div>
);
};

export default ProductModal;