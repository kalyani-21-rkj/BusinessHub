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
      image: product.image || "", // ✅ Load existing image URL
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
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800">
  {viewOnly
    ? "Product Details"
    : product
    ? "Update Product"
    : "Add Product"}
</h2>

        <button
          onClick={onClose}
          className="text-2xl hover:text-red-600"
        >
          ×
        </button>
      </div>

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Product Name */}
          <div>
            <label className="block mb-2 font-medium">
              Product Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
               disabled={viewOnly}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="MacBook Pro M3"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block mb-2 font-medium">
              Category
            </label>

            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3"
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
            <label className="block mb-2 font-medium">
              Brand
            </label>

            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
               disabled={viewOnly}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="Apple"
            />
          </div>

          {/* SKU */}
          <div>
            <label className="block mb-2 font-medium">
              SKU
            </label>

            <input
              type="text"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
               disabled={viewOnly}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="APL-001"
            />
          </div>

          {/* Purchase Price */}
          <div>
            <label className="block mb-2 font-medium">
              Purchase Price
            </label>

            <input
              type="number"
              name="purchasePrice"
              value={formData.purchasePrice}
              onChange={handleChange}
               disabled={viewOnly}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Selling Price */}
          <div>
            <label className="block mb-2 font-medium">
              Selling Price
            </label>

            <input
              type="number"
              name="sellingPrice"
              value={formData.sellingPrice}
              onChange={handleChange}
               disabled={viewOnly}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Stock */}
          <div>
            <label className="block mb-2 font-medium">
              Stock
            </label>

            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
               disabled={viewOnly}
              className="w-full border rounded-xl px-4 py-3"
            />
          </div>

          {/* Supplier */}
          <div>
            <label className="block mb-2 font-medium">
              Supplier
            </label>

            <input
              type="text"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
               disabled={viewOnly}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="ABC Pvt Ltd"
            />
          </div>

          {/* Image URL */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Image URL
            </label>

            <input
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
               disabled={viewOnly}
              className="w-full border rounded-xl px-4 py-3"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
            <div className="md:col-span-2 mt-2">
            <img
      src={formData.image}
      alt="Preview"
      className="w-40 h-40 object-cover rounded-xl border"
      onError={(e) => {
        e.target.src = "/no-image.png";
      }}
    
    />
  </div>
)}
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <label className="block mb-2 font-medium">
              Description
            </label>

            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-xl px-4 py-3 resize-none"
            />
          </div>

        </div>

        <div className="flex justify-end gap-3 mt-8">

          <button
            type="button"
            onClick={onClose}
            className="px-6 py-3 border rounded-xl hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
          >
            {loading
              ? "Saving..."
              : product
              ? "Update Product"
              : "Add Product"}
          </button>

        </div>

      </form>

    </div>
  </div>
);

};

export default ProductModal;