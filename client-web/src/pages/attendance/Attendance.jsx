/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import AttendanceTable from "../../components/attendance/AttendanceTable";
import AttendanceStats from "../../components/attendance/AttendanceStats";
import AttendanceModal from "../../components/attendance/AttendanceModal";
import AttendanceFilters from "../../components/attendance/AttendanceFilters";

import { getAttendance } from "../../services/attendanceService";

const Attendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [date, setDate] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedAttendance, setSelectedAttendance] = useState(null);

  const fetchAttendance = async (search = "") => {
    try {
      setLoading(true);

      const res = await getAttendance(1, search);

      let records = res.data.attendance || [];

      // Department Filter
      if (department) {
        records = records.filter(
          (item) => item.employee?.department === department
        );
      }

      // Status Filter
      if (status) {
        records = records.filter(
          (item) => item.status === status
        );
      }

      // Date Filter
      if (date) {
        records = records.filter(
          (item) =>
            new Date(item.date).toISOString().split("T")[0] === date
        );
      }

      setAttendance(records);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchAttendance();
  }, []);

  // Search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAttendance(keyword);
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword]);

  // Refresh Filters
  useEffect(() => {
    fetchAttendance(keyword);
  }, [status, department, date]);

  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"></div>

      {/* Statistics */}
      <AttendanceStats />

      {/* Filters */}
      <AttendanceFilters
        keyword={keyword}
        setKeyword={setKeyword}
        status={status}
        setStatus={setStatus}
        department={department}
        setDepartment={setDepartment}
        date={date}
        setDate={setDate}
        onMarkAttendance={() => {
          setSelectedAttendance(null);
          setOpenModal(true);
        }}
      />

      {/* Table */}
      <div className="bg-white rounded-xl shadow border overflow-hidden">

        <AttendanceTable
          attendance={attendance}
          loading={loading}
          refreshAttendance={() => fetchAttendance(keyword)}
          onEdit={(record) => {
            setSelectedAttendance(record);
            setOpenModal(true);
          }}
        />

      </div>

      {/* Modal */}
      <AttendanceModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedAttendance(null);
        }}
        attendance={selectedAttendance}
        onSuccess={() => fetchAttendance(keyword)}
      />

    </div>
  );
};

export default Attendance;