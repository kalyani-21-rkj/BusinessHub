/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";

import PurchaseDashboard from "../../components/purchases/PurchaseDashboard";
import PurchaseOrderTable from "../../components/purchases/PurchaseOrderTable";
import PurchaseDetailsModal from "../../components/purchases/PurchaseDetailsModal";
import CreatePurchaseModal from "../../components/purchases/CreatePurchaseModal";
import PurchaseFilters from "../../components/purchases/PurchaseFilters";

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

      <PurchaseFilters
    keyword={keyword}
    setKeyword={setKeyword}
    supplier={supplier}
    setSupplier={setSupplier}
    warehouse={warehouse}
    setWarehouse={setWarehouse}
    status={status}
    setStatus={setStatus}
    onCreatePurchase={() => {
        setSelectedPurchase(null);
        setOpenCreateModal(true);
    }}
/>

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