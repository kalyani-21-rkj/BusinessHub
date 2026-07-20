/* eslint-disable react-hooks/set-state-in-effect */
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import ProductStats from "../../components/products/ProductStats";
import ProductFilters from "../../components/products/ProductFilters";
import ProductGrid from "../../components/products/ProductGrid";
import ProductModal from "../../components/products/ProductModal";

import {
  getProducts,
  deleteProduct,
} from "../../services/productService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");

  const [keyword, setKeyword] = useState("");
  const [viewOnly, setViewOnly] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const fetchProducts = async () => {
  try {
    setLoading(true);

    const res = await getProducts(
      1,
      keyword,
      category,
      brand,
      sort
    );

    setProducts(res.data.products || []);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
  fetchProducts();
}, []);

  useEffect(() => {
  const timer = setTimeout(() => {
    fetchProducts();
  }, 400);

  return () => clearTimeout(timer);
}, [keyword, category, brand, sort]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      alert("Product Deleted Successfully");

      fetchProducts();
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Unable to delete product"
      );
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"></div>

      <div className="w-full">
        <ProductStats />
      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">

          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={keyword}
              onChange={(e) =>
                setKeyword(e.target.value)
              }
              className="w-full sm:w-80 h-8 pl-4 pr-4 rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>

          <ProductFilters
            category={category}
            setCategory={setCategory}
            brand={brand}
            setBrand={setBrand}
            sort={sort}
            setSort={setSort}
            />

        </div>

        <button
          onClick={() => { 
            setSelectedProduct(null);
            console.log("Button Clicked");
            setOpenModal(true);
          }}
          className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition-all active:scale-[0.99]"
        >
          <Plus
            size={18}
            className="stroke-[2.5]"
          />
          Add Product
        </button>

      </div>

      <div className="w-full">
        <ProductGrid
        products={products}
        loading={loading}
        onView={(product) => {
       console.log("View clicked", product);

        setSelectedProduct(product);
         setViewOnly(true);
        setOpenModal(true);
  }}
          onEdit={(product) => {
            setSelectedProduct(product);
            setOpenModal(true);
            setViewOnly(false);
          }}
          onDelete={handleDelete}
        />
      </div>

      <ProductModal
        open={openModal}
        product={selectedProduct}
        viewOnly={viewOnly}
  onClose={() => {
    setOpenModal(false);
    setSelectedProduct(null);
    setViewOnly(false);
        }}
        onSuccess={() =>
          fetchProducts()
        }
      />

    </div>
  );
};

export default Products;