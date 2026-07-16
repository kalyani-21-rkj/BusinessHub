import { useState } from "react";
import OrderStats from "../../components/orders/OrderStats";
import OrderFilters from "../../components/orders/OrderFilters";
import OrderTable from "../../components/orders/OrderTable";
import OrderDetailsModal from "../../components/orders/OrderDetailsModal";

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>


      <OrderStats />

      <OrderFilters />

      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        <OrderTable
          onView={setSelectedOrder}
        />

      </div>

      {selectedOrder && (
        <OrderDetailsModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

    </div>
  );
};

export default Orders;