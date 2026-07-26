import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaEye,
  FaHeart,
  FaStar,
  FaShoppingCart,
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
      <div className="text-center py-20 text-slate-500 text-lg">
        Loading Products...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">

      {products.length === 0 ? (
        <div className="col-span-full">
          <EmptyProducts />
        </div>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group"
          >
            {/* Product Image */}

            <div className="relative h-48 bg-slate-100 overflow-hidden">

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
                className={`absolute top-3 right-3 w-9 h-9 rounded-full bg-white shadow flex items-center justify-center transition ${
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
                  ? `Only ${product.stock} Left`
                  : "In Stock"}
              </span>
            </div>

            {/* Card Body */}

            <div className="p-4 flex flex-col h-[260px]">

              {/* Brand & Category */}

              <div className="flex items-center justify-between">

                <span className="text-[11px] uppercase font-bold text-blue-600">
                  {product.brand}
                </span>

                <span className="text-[11px] text-slate-500">
                  {product.category}
                </span>

              </div>

              {/* Product Name */}

              <h3 className="mt-2 text-base font-semibold text-slate-800 line-clamp-2 min-h-[46px]">
                {product.name}
              </h3>

              {/* Rating */}

              <div className="flex items-center gap-2 mt-2">

                <span className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded text-[11px]">
                  <FaStar size={9} />
                  {product.rating}
                </span>

                <span className="text-[11px] text-slate-500">
                  ({product.reviews})
                </span>

              </div>

              {/* Price */}

              <div className="mt-3">

                <div className="flex items-center gap-2">

                  <span className="text-xl font-bold text-slate-900">
                    ₹{product.sellingPrice}
                  </span>

                  <span className="line-through text-sm text-slate-400">
                    ₹{product.purchasePrice}
                  </span>

                </div>

                <span className="inline-block mt-2 bg-green-100 text-green-700 text-[11px] font-semibold px-3 py-1 rounded-full">
                  Profit ₹
                  {(product.sellingPrice || 0) -
                    (product.purchasePrice || 0)}
                </span>

              </div>

              {/* Details */}

              <div className="mt-3 space-y-1 text-xs text-slate-600">

                <div>
                  <span className="font-semibold">SKU :</span>{" "}
                  {product.sku}
                </div>

                <div>
                  <span className="font-semibold">Supplier :</span>{" "}
                  {product.supplier}
                </div>

                <div>
                  <span className="font-semibold">Stock :</span>{" "}
                  {product.stock}
                </div>

              </div>

              {/* Bottom */}

              <div className="mt-auto pt-4 border-t border-slate-100 flex items-center gap-2">

                {/* Add to Cart */}

                <button
                  onClick={() => alert("Cart Module Coming Soon")}
                  className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
                >
                  <FaShoppingCart size={13} />
                  Add Cart
                </button>

                {/* View */}

                <button
                  title="View"
                  onClick={() => onView(product)}
                  className="w-9 h-9 rounded-lg bg-slate-100 hover:bg-slate-100 flex items-center justify-center transition"
                >
                  <FaEye />
                </button>

                {/* Edit */}

                <button
                  title="Edit"
                  onClick={() => onEdit(product)}
                  className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition"
                >
                  <FaEdit />
                </button>

                {/* Delete */}

                <button
                  title="Delete"
                  onClick={() => onDelete(product._id)}
                  className="w-9 h-9 rounded-lg bg-red-50  text-red-600 hover:bg-red-100 flex items-center justify-center transition"
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