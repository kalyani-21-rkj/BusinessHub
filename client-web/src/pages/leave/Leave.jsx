import { useState } from "react";

import LeaveStats from "../../components/leave/LeaveStats";
import LeaveFilters from "../../components/leave/LeaveFilters";
import LeaveTable from "../../components/leave/LeaveTable";
import LeaveModal from "../../components/leave/LeaveModal";

const Leave = () => {
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>
      <LeaveStats />

      {/* Filters */}
      <LeaveFilters
        onApplyLeave={() => setOpenModal(true)}
      />

      {/* Leave Table */}
      <LeaveTable
        onView={setSelectedLeave}
      />

      {/* View Leave */}
      {selectedLeave && (
        <LeaveModal
          leave={selectedLeave}
          onClose={() => setSelectedLeave(null)}
        />
      )}

      {/* Apply Leave */}
      {openModal && (
        <LeaveModal
          onClose={() => setOpenModal(false)}
        />
      )}

    </div>
  );
};

export default Leave;