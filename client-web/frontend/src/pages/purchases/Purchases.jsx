import { useState } from "react";

import PurchaseDashboard from "../../components/purchases/PurchaseDashboard";
import PurchaseOrderTable from "../../components/purchases/PurchaseOrderTable";
import PurchaseDetailsModal from "../../components/purchases/PurchaseDetailsModal";
import CreatePurchaseModal from "../../components/purchases/CreatePurchaseModal";

const Purchases = () => {
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>
      <PurchaseDashboard />

      {/* Search + Filters + Button */}
      <div className="bg-none rounded-2xl shadow-sm border border-slate-200 p-5">

        <div className="flex flex-wrap items-center gap-4">

          {/* Search */}
          <div className="flex-1 min-w-[320px]">
            <input
              type="text"
              placeholder="Search Purchase Order..."
              className="bg-white w-full h-8 rounded-xl border border-slate-300 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Supplier */}
          <select className="bg-white h-8 min-w-[180px] rounded-xl border border-slate-300 px-4">
            <option>All Suppliers</option>
            <option>Apple India</option>
            <option>Dell India</option>
            <option>Samsung</option>
          </select>

          {/* Warehouse */}
          <select className="bg-white h-8 min-w-[180px] rounded-xl border border-slate-300 px-4">
            <option>All Warehouses</option>
            <option>Mumbai</option>
            <option>Pune</option>
            <option>Delhi</option>
          </select>

          {/* Status */}
          <select className="bg-white h-8 min-w-[160px] rounded-xl border border-slate-300 px-4">
            <option>All Status</option>
            <option>Receiving</option>
            <option>Pending</option>
            <option>Completed</option>
          </select>

          {/* Button */}
          <button
            onClick={() => setOpenCreateModal(true)}
            className="h-8 px-6 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold whitespace-nowrap"
          >
            + Create Purchase Order
          </button>

        </div>

      </div>

      {/* Purchase Table */}
      <PurchaseOrderTable onView={setSelectedPurchase} />

      {/* Details Modal */}
      {selectedPurchase && (
        <PurchaseDetailsModal
          purchase={selectedPurchase}
          onClose={() => setSelectedPurchase(null)}
        />
      )}

      {/* Create Modal */}
      {openCreateModal && (
        <CreatePurchaseModal
          onClose={() => setOpenCreateModal(false)}
        />
      )}

    </div>
  );
};

export default Purchases;