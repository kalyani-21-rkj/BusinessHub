/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";

import PayrollStats from "../../components/payroll/PayrollStats";
import PayrollFilters from "../../components/payroll/PayrollFilters";
import PayrollTable from "../../components/payroll/PayrollTable";
import PayrollModal from "../../components/payroll/PayrollModal";

import {
  getPayrolls,
  deletePayroll,
} from "../../services/payrollService";

const Payroll = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");
  const [month, setMonth] = useState("");
  const [status, setStatus] = useState("");

  // Modal
  const [selectedPayroll, setSelectedPayroll] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  // Fetch Payrolls
  const fetchPayrolls = async () => {
    try {
      setLoading(true);

      const res = await getPayrolls(
        1,
        search,
        department,
        month,
        status
      );

      setPayrolls(res.data.payrolls || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPayrolls();
    }, 400);

    return () => clearTimeout(timer);
  }, [search, department, month, status]);

  // Delete Payroll
  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this payroll?"
      );

      if (!confirmDelete) return;

      await deletePayroll(id);

      alert("Payroll Deleted Successfully");

      fetchPayrolls();
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Unable to Delete Payroll"
      );
    }
  };

  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"></div>

      {/* Stats */}
      <PayrollStats />

      {/* Filters */}
      <PayrollFilters
        search={search}
        setSearch={setSearch}
        department={department}
        setDepartment={setDepartment}
        month={month}
        setMonth={setMonth}
        status={status}
        setStatus={setStatus}
        onCreatePayroll={() => {
          setSelectedPayroll(null);
          setOpenModal(true);
        }}
      />

      {/* Table */}
      <PayrollTable
        payrolls={payrolls}
        loading={loading}
        onView={(payroll) => {
          setSelectedPayroll(payroll);
          setOpenModal(true);
        }}
        onEdit={(payroll) => {
          setSelectedPayroll(payroll);
          setOpenModal(true);
        }}
        onDelete={handleDelete}
      />

      {/* Modal */}
      <PayrollModal
        open={openModal}
        payroll={selectedPayroll}
        onClose={() => {
          setOpenModal(false);
          setSelectedPayroll(null);
        }}
        onSuccess={fetchPayrolls}
      />

    </div>
  );
};

export default Payroll;