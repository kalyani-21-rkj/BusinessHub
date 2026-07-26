/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import {
  Box,
  Typography,
} from "@mui/material";

import AttendanceTable from "../../components/attendance/AttendanceTable";
import AttendanceStats from "../../components/attendance/AttendanceStats";
import AttendanceFilters from "../../components/attendance/AttendanceFilters";
import AttendanceModal from "../../components/attendance/AttendanceModal";

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

      if (department) {
        records = records.filter(
          (item) => item.employee?.department === department
        );
      }

      if (status) {
        records = records.filter(
          (item) => item.status === status
        );
      }

      if (date) {
        records = records.filter(
          (item) =>
            new Date(item.date)
              .toISOString()
              .split("T")[0] === date
        );
      }

      setAttendance(records);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchAttendance(keyword);
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword]);

  useEffect(() => {
    fetchAttendance(keyword);
  }, [status, department, date]);

  return (
    <Box sx={{ p: 3 }}>

      {/* Page Header */}

      

      {/* Statistics */}

      <AttendanceStats attendance={attendance} />

      {/* Search + Filters */}

      <AttendanceFilters
        keyword={keyword}
        setKeyword={setKeyword}
        department={department}
        setDepartment={setDepartment}
        status={status}
        setStatus={setStatus}
        date={date}
        setDate={setDate}
        onMarkAttendance={() => {
          setSelectedAttendance(null);
          setOpenModal(true);
        }}
      />

      {/* Attendance Table */}

      <AttendanceTable
        attendance={attendance}
        loading={loading}
        refreshAttendance={() =>
          fetchAttendance(keyword)
        }
        onEdit={(record) => {
          setSelectedAttendance(record);
          setOpenModal(true);
        }}
      />

      {/* Modal */}

      <AttendanceModal
        open={openModal}
        attendance={selectedAttendance}
        onClose={() => {
          setOpenModal(false);
          setSelectedAttendance(null);
        }}
        onSuccess={() =>
          fetchAttendance(keyword)
        }
      />

    </Box>
  );
};

export default Attendance;