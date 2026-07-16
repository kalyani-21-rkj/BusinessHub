import InventoryStats from "../../components/inventory/InventoryStats";
import InventoryFilters from "../../components/inventory/InventoryFilters";
import InventoryTable from "../../components/inventory/InventoryTable";

const Inventory = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>

      {/* Main Content Layout with explicit spacing */}
      <div className="flex flex-col gap-6">
        <InventoryStats />
        
        <InventoryFilters />

        <div className="bg-white rounded-1xl border border-slate-200 shadow-sm overflow-hidden">
          <InventoryTable />
        </div>
      </div>
    </div>
  );
};

export default Inventory;