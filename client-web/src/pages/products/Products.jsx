/* eslint-disable react-hooks/set-state-in-effect */

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

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [sort, setSort] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [viewOnly, setViewOnly] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  // Fetch Products
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

  // Delete Product
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
    
    <div className="flex flex-col gap-6 p-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      </div>

      {/* Stats */}

      <ProductStats />

      {/* Filters */}

      <ProductFilters
        keyword={keyword}
        setKeyword={setKeyword}
        category={category}
        setCategory={setCategory}
        brand={brand}
        setBrand={setBrand}
        sort={sort}
        setSort={setSort}
        onAddProduct={() => {
          setSelectedProduct(null);
          setViewOnly(false);
          setOpenModal(true);
        }}
      />

      {/* Grid */}

      <ProductGrid
        products={products}
        loading={loading}
        onView={(product) => {
          setSelectedProduct(product);
          setViewOnly(true);
          setOpenModal(true);
        }}
        onEdit={(product) => {
          setSelectedProduct(product);
          setViewOnly(false);
          setOpenModal(true);
        }}
        onDelete={handleDelete}
      />

      {/* Modal */}

      <ProductModal
        open={openModal}
        product={selectedProduct}
        viewOnly={viewOnly}
        onClose={() => {
          setOpenModal(false);
          setSelectedProduct(null);
          setViewOnly(false);
        }}
        onSuccess={fetchProducts}
      />

    </div>
  );
};

export default Products;