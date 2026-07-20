import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaShoppingCart,
  FaHeart,
  FaStar,
} from "react-icons/fa";
import EmptyProducts from "./EmptyProducts";



const ProductGrid = ({
  products = [],
  loading,
  onView,
  onEdit,
  onDelete,
}) => {

  const [likedProducts, setLikedProducts] = useState([]);

const toggleLike = (id) => {
  setLikedProducts((prev) =>
    prev.includes(id)
      ? prev.filter((item) => item !== id)
      : [...prev, id]
  );
};
  if (loading) {
  return (
    <div className="text-center py-20 text-slate-500">
      Loading Products...
    </div>
  );
}
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-1">
      {products.length === 0 ? (
  <div className="col-span-full">
    <EmptyProducts />
  </div>
) : (
      products.map((product) => (
        <div
          key={product._id}
          className="group flex flex-col min-h-[450px] bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
        >
          {/* Image */}
          <div className="relative h-56 overflow-hidden bg-slate-50">
            <img
            src={
            product.image && product.image.trim() !== ""
            ? product.image
          : "/no-image.png"
            }
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          onError={(e) => {
          e.target.src = "/no-image.png";
          }}
          />
            {/* Wishlist */}
            <button
  onClick={() => toggleLike(product._id)}
  className={`absolute top-3 right-3 bg-white p-2 rounded-full shadow transition ${
    likedProducts.includes(product._id)
      ? "text-red-500"
      : "text-gray-500 hover:text-red-500"
  }`}
>
  <FaHeart />
</button>

            {/* Stock */}
            <span
              className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                product.stock <= 5
                  ? "bg-orange-100 text-orange-700"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {product.stock <= 5
                ? `🔥 Only ${product.stock} Left`
                : "✅ In Stock"}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-grow p-5">
            {/* Brand */}
            <span className="text-xs font-bold uppercase text-blue-600 tracking-wider">
              {product.brand}
            </span>

            {/* Category */}
            <span className="text-xs text-slate-400 mt-1">
              {product.category}
            </span>

            {/* Product */}
            <h3 className="mt-2 text-sm font-medium text-slate-800 line-clamp-2 min-h-[42px] group-hover:text-blue-600 transition">
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
                <FaStar size={10} />
                {product.rating}
              </span>

              <span className="text-xs text-slate-500">
                ({product.reviews} Reviews)
              </span>
            </div>

            {/* Price */}
            <div className="mt-4 flex items-center gap-2 flex-wrap">
              <span className="text-2xl font-bold text-slate-900">
                ₹{product.sellingPrice}
              </span>

              <span className="line-through text-slate-400 text-sm">
                ₹{product.purchasePrice}
              </span>

              <span className="text-green-600 text-sm font-semibold">
                {product.sellingPrice > 0
              ? Math.round(
              (((product.sellingPrice || 0) -
              (product.purchasePrice || 0)) /
              product.sellingPrice) *
              100
             )
          : 0}
          % Margin
              </span>
            </div>

            {/* Save */}
            <div className="mt-2">
              <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                💰 Profit ₹
                {(product.sellingPrice || 0) -
                (product.purchasePrice || 0)}
              </span>
            </div>

            {/* ERP Info */}
            <div className="mt-4 space-y-1 text-xs text-slate-500">
              <div>
                <span className="font-semibold">SKU :</span>{" "}
                {product.sku}
              </div>

              <div>
                <span className="font-semibold">Supplier :</span>{" "}
                {product.supplier}
              </div>

              <div>
                <span className="font-semibold">Profit :</span>{" "}
                <span className="text-green-600 font-semibold">
                  ₹
                  {product.sellingPrice -
                  product.purchasePrice}
                </span>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-auto pt-5 border-t border-slate-100 flex items-center gap-2">
              <button
  onClick={() => alert("Cart Module Coming Soon")}
  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
>
  <FaShoppingCart />
  Add to Cart
</button>

              <button
               title="View"
               onClick={() => onView(product)}
               className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100"
>
                <FaEye />
              </button>

              <button
                title="Edit"
                onClick={() => onEdit(product)}
                className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600"
              >
                <FaEdit />
              </button>

              <button
                title="Delete"
                 onClick={() => onDelete(product._id)}
                className="p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
          ))
)}
    </div>
  );
};

export default ProductGrid;