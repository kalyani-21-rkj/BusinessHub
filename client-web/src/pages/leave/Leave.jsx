/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import LeaveTable from "../../components/leave/LeaveTable";
import LeaveModal from "../../components/leave/LeaveModal";
import LeaveStats from "../../components/leave/LeaveStats";
import LeaveFilters from "../../components/leave/LeaveFilters";

import { getLeaves } from "../../services/leaveService";

const Leave = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");
  const [leaveType, setLeaveType] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);

  const fetchLeaves = async (search = "") => {
    try {
      setLoading(true);

      const res = await getLeaves(1, search);

      let records = res.data.leaves || [];

      // Department Filter
      if (department) {
        records = records.filter(
          (item) =>
            item.employee?.department === department
        );
      }

      // Leave Type Filter
      if (leaveType) {
        records = records.filter(
          (item) => item.leaveType === leaveType
        );
      }

      // Status Filter
      if (status) {
        records = records.filter(
          (item) => item.status === status
        );
      }

      setLeaves(records);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Initial Load
  useEffect(() => {
    fetchLeaves();
  }, []);

  // Search
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeaves(keyword);
    }, 400);

    return () => clearTimeout(timer);
  }, [keyword]);

  // Filters
  useEffect(() => {
    fetchLeaves(keyword);
  }, [status, department, leaveType]);

  return (
    <div className="flex flex-col gap-8 p-6 w-full">

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"></div>

      {/* Stats */}
      <LeaveStats />

      {/* Filters */}
      <LeaveFilters
        keyword={keyword}
        setKeyword={setKeyword}
        department={department}
        setDepartment={setDepartment}
        leaveType={leaveType}
        setLeaveType={setLeaveType}
        status={status}
        setStatus={setStatus}
        onApplyLeave={() => {
          setSelectedLeave(null);
          setOpenModal(true);
        }}
      />

      {/* Table */}
      <div className="bg-white rounded-2xl shadow border border-slate-200 overflow-hidden">

        <LeaveTable
          leaves={leaves}
          loading={loading}
          refreshLeaves={() => fetchLeaves(keyword)}
          onEdit={(leave) => {
            setSelectedLeave(leave);
            setOpenModal(true);
          }}
        />

      </div>

      {/* Modal */}
      <LeaveModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setSelectedLeave(null);
        }}
        leave={selectedLeave}
        onSuccess={() => fetchLeaves(keyword)}
      />

    </div>
  );
};

export default Leave;