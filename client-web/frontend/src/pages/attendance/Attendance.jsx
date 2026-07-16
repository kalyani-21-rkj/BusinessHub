import { useState } from "react";

import AttendanceStats from "../../components/attendance/AttendanceStats";
import AttendanceFilters from "../../components/attendance/AttendanceFilters";
import AttendanceTable from "../../components/attendance/AttendanceTable";
import AttendanceModal from "../../components/attendance/AttendanceModal";

const Attendance = () => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>

      {/* Dashboard Cards */}
      <AttendanceStats />

      {/* Search + Filters */}
      <AttendanceFilters
        onMarkAttendance={() => setOpenModal(true)}
      />

      {/* Attendance Table */}
      <AttendanceTable
        onView={setSelectedEmployee}
      />

      {/* View Attendance */}
      {selectedEmployee && (
        <AttendanceModal
          employee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}

      {/* Mark Attendance */}
      {openModal && (
        <AttendanceModal
          onClose={() => setOpenModal(false)}
        />
      )}

    </div>
  );
};

export default Attendance;