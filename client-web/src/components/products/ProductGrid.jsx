import {
  FaEdit,
  FaTrash,
  FaEye,
  FaShoppingCart,
  FaHeart,
  FaStar,
} from "react-icons/fa";

const products = [
  {
    id: 1,
    name: "MacBook Pro M3 (14-inch, 8GB Unified Memory, 512GB SSD) - Space Grey",
    brand: "Apple",
    category: "Laptop",
    supplier: "Apple India",
    sku: "APL-MBP-M3-001",
    price: "1,49,999",
    originalPrice: "1,69,900",
    discount: "11% off",
    rating: 4.9,
    reviews: 285,
    stock: 25,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 2,
    name: "Galaxy S24 Ultra AI Smartphone (Titanium Gray, 12GB RAM, 256GB Storage)",
    brand: "Samsung",
    category: "Mobile",
    supplier: "Samsung Electronics",
    sku: "SMS-S24U-002",
    price: "1,19,999",
    originalPrice: "1,34,999",
    discount: "11% off",
    rating: 4.8,
    reviews: 412,
    stock: 4,
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: 3,
    name: "Dell XPS 15 Laptop (Intel Core i7, 16GB RAM, 512GB SSD, NVIDIA GTX)",
    brand: "Dell",
    category: "Laptop",
    supplier: "Dell India",
    sku: "DEL-XPS15-003",
    price: "1,35,000",
    originalPrice: "1,55,000",
    discount: "13% off",
    rating: 4.7,
    reviews: 198,
    stock: 8,
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=500&q=80",
  },
];

const ProductGrid = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-1">
      {products.map((product) => (
        <div
          key={product.id}
          className="group flex flex-col min-h-[450px] bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden"
        >
          {/* Image */}
          <div className="relative h-56 overflow-hidden bg-slate-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />

            {/* Wishlist */}
            <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow hover:text-red-500 transition">
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
                ₹{product.price}
              </span>

              <span className="line-through text-slate-400 text-sm">
                ₹{product.originalPrice}
              </span>

              <span className="text-green-600 text-sm font-semibold">
                {product.discount}
              </span>
            </div>

            {/* Save */}
            <div className="mt-2">
              <span className="inline-block bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                💰 Save ₹20,000
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
                  ₹25,000
                </span>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-auto pt-5 border-t border-slate-100 flex items-center gap-2">
              <button
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold transition"
              >
                <FaShoppingCart />
                Add to Cart
              </button>

              <button
                title="View"
                className="p-3 rounded-xl bg-slate-50 hover:bg-slate-100"
              >
                <FaEye />
              </button>

              <button
                title="Edit"
                className="p-3 rounded-xl bg-slate-50 hover:bg-blue-50 hover:text-blue-600"
              >
                <FaEdit />
              </button>

              <button
                title="Delete"
                className="p-3 rounded-xl bg-slate-50 hover:bg-red-50 hover:text-red-600"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;