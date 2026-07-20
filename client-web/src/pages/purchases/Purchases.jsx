/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import PurchaseDashboard from "../../components/purchases/PurchaseDashboard";
import PurchaseOrderTable from "../../components/purchases/PurchaseOrderTable";
import PurchaseDetailsModal from "../../components/purchases/PurchaseDetailsModal";
import CreatePurchaseModal from "../../components/purchases/CreatePurchaseModal";

import {
  getPurchases,
  addPurchase,
  updatePurchase,
   deletePurchase,
} from "../../services/purchaseService";

const Purchases = () => {
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [supplier, setSupplier] = useState("");
  const [warehouse, setWarehouse] = useState("");
  const [status, setStatus] = useState("");

  const fetchPurchases = async () => {
    try {
      setLoading(true);

      const res = await getPurchases(
        1,
        keyword,
        supplier,
        warehouse,
        status
      );

      setPurchases(res.data.purchases || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPurchases();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPurchases();
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword, supplier, warehouse, status]);

  const handleCreatePurchase = async (data) => {
  try {

    if (selectedPurchase) {

      await updatePurchase(
        selectedPurchase._id,
        data
      );

      alert("Purchase Updated Successfully");

    } else {

      await addPurchase(data);

      alert("Purchase Created Successfully");

    }

    setOpenCreateModal(false);
    setSelectedPurchase(null);

    fetchPurchases();

  } catch (err) {

    console.log(err);

    alert(
      err.response?.data?.message ||
      "Operation Failed"
    );

  }
};
const handleDeletePurchase = async (id) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this Purchase Order?"
  );

  if (!confirmDelete) return;

  try {
    await deletePurchase(id);

    alert("Purchase Deleted Successfully");

    fetchPurchases();
  } catch (err) {
    console.log(err);

    alert(
      err.response?.data?.message ||
      "Unable to Delete Purchase"
    );
  }
};

  return (
    <div className="flex flex-col gap-6 p-6">

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      </div>

      <PurchaseDashboard />

      <div className="bg-none rounded-2xl  border-slate-200 p-5">

        <div className="flex flex-wrap items-center gap-4">

          <div className="flex-1 min-w-[320px]">

            <input
              type="text"
              placeholder="Search Purchase Order..."
              value={keyword}
              onChange={(e) =>
                setKeyword(e.target.value)
              }
              className="bg-white w-full h-7 rounded-xl px-4  focus:ring-2 focus:ring-blue-500"
            />

          </div>

          <select
            value={supplier}
            onChange={(e) =>
              setSupplier(e.target.value)
            }
            className="bg-white h-7 min-w-[180px] rounded-xl border border-slate-300 px-4"
          >
            <option value="">All Suppliers</option>
            <option>Apple India</option>
            <option>Dell India</option>
            <option>Samsung</option>
          </select>

          <select
            value={warehouse}
            onChange={(e) =>
              setWarehouse(e.target.value)
            }
            className="bg-white h-7 min-w-[180px] rounded-xl border border-slate-300 px-4"
          >
            <option value="">All Warehouses</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Delhi</option>
          </select>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="bg-white h-7 min-w-[160px] rounded-xl border border-slate-300 px-4"
          >
            <option value="">All Status</option>
            <option>Receiving</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>

          <button
            onClick={() =>
              setOpenCreateModal(true)
            }
            className="h-7 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold whitespace-nowrap"
          >
            + Create Purchase Order
          </button>

        </div>

      </div>

      <PurchaseOrderTable
        purchases={purchases}
        loading={loading}
        onView={setSelectedPurchase}
        onEdit={(purchase) => {
        setSelectedPurchase(purchase);
        setOpenCreateModal(true);
    }}
    onDelete={handleDeletePurchase}
    
    />

      {selectedPurchase && (
        <PurchaseDetailsModal
          purchase={selectedPurchase}
          onClose={() =>
            setSelectedPurchase(null)
          }
        />
      )}


      {openCreateModal && (
        <CreatePurchaseModal
  purchase={selectedPurchase}
  onClose={() => {
    setOpenCreateModal(false);
    setSelectedPurchase(null);
  }}
  onSave={handleCreatePurchase}
/>
      )}

    </div>
  );
};

export default Purchases;