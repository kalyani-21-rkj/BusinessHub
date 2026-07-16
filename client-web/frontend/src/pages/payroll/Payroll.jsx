import { useState } from "react";

import PayrollStats from "../../components/payroll/PayrollStats";
import PayrollFilters from "../../components/payroll/PayrollFilters";
import PayrollTable from "../../components/payroll/PayrollTable";
import PayrollModal from "../../components/payroll/PayrollModal";

const Payroll = () => {
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>
      <PayrollStats />

      {/* Filters */}
      <PayrollFilters
        onCreatePayroll={() => setOpenModal(true)}
      />

      {/* Payroll Table */}
      <PayrollTable
        onView={setSelectedPayroll}
      />

      {/* View Payroll */}
      {selectedPayroll && (
        <PayrollModal
          payroll={selectedPayroll}
          onClose={() => setSelectedPayroll(null)}
        />
      )}

      {/* Create Payroll */}
      {openModal && (
        <PayrollModal
          onClose={() => setOpenModal(false)}
        />
      )}

    </div>
  );
};

export default Payroll;