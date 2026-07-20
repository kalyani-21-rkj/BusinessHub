/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import InventoryStats from "../../components/inventory/InventoryStats";
import InventoryFilters from "../../components/inventory/InventoryFilters";
import InventoryTable from "../../components/inventory/InventoryTable";
import AddStockModal from "../../components/inventory/AddStockModal";
import ProductModal from "../../components/products/ProductModal";

import {
  getInventory,
  addStock,
} from "../../services/inventoryService";

import { deleteProduct } from "../../services/productService";

const Inventory = () => {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("");

  const [selectedProduct, setSelectedProduct] = useState(null);

  const [viewOnly, setViewOnly] = useState(false);

  const [openProductModal, setOpenProductModal] =
    useState(false);

  const [openStockModal, setOpenStockModal] =
    useState(false);

  const fetchInventory = async () => {
    try {
      setLoading(true);

      const res = await getInventory(
        1,
        keyword,
        category
      );

      setInventory(res.data.products || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInventory();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInventory();
    }, 300);

    return () => clearTimeout(timer);
  }, [keyword, category]);

  // ---------------- VIEW ----------------

  const handleView = (product) => {
    setSelectedProduct(product);
    setViewOnly(true);
    setOpenProductModal(true);
  };

  // ---------------- EDIT ----------------

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setViewOnly(false);
    setOpenProductModal(true);
  };

  // ---------------- DELETE ----------------

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await deleteProduct(id);

      alert("Product Deleted Successfully");

      fetchInventory();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to Delete Product"
      );
    }
  };

  // ---------------- OPEN ADD STOCK ----------------

  const handleOpenAddStock = (product) => {
    setSelectedProduct(product);
    setOpenStockModal(true);
  };

  // ---------------- SAVE STOCK ----------------

  const handleAddStock = async (data) => {
    try {
      await addStock(selectedProduct._id, {
        quantity: data.quantity,
      });

      alert("Stock Added Successfully");

      setOpenStockModal(false);

      setSelectedProduct(null);

      fetchInventory();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to Add Stock"
      );
    }
  };

  return (
    <div className="flex flex-col gap-6 p-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      </div>

      <div className="flex flex-col gap-6">

        <InventoryStats />

        <InventoryFilters
          keyword={keyword}
          setKeyword={setKeyword}
          category={category}
          setCategory={setCategory}
          onAddStock={() => {
            setSelectedProduct(null);
            setOpenStockModal(true);
          }}
        />

        <div className="bg-white rounded-1xl border border-slate-200 shadow-sm overflow-hidden">

          <InventoryTable
            inventory={inventory}
            loading={loading}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onAddStock={handleOpenAddStock}
          />

        </div>

      </div>

      {/* Product Modal */}

      <ProductModal
        open={openProductModal}
        product={selectedProduct}
        viewOnly={viewOnly}
        onClose={() => {
          setOpenProductModal(false);
          setSelectedProduct(null);
          setViewOnly(false);
        }}
        onSuccess={fetchInventory}
      />

      {/* Add Stock Modal */}

      <AddStockModal
        open={openStockModal}
        product={selectedProduct}
        inventory={inventory}
        onClose={() => {
          setOpenStockModal(false);
          setSelectedProduct(null);
        }}
        onSave={handleAddStock}
      />

    </div>
  );
};

export default Inventory;