/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import BillingTable from "../../components/billing/BillingTable";

import {
  Paper,
  TextField,
  Button,
  MenuItem,
  InputAdornment,
} from "@mui/material";

import {
  Search,
  Add,
} from "@mui/icons-material";

import {
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaClock,
  FaRupeeSign,
} from "react-icons/fa";

import CreateInvoiceModal from "../../components/billing/CreateInvoiceModal";

import {
  getBills,
  createBill,
  // eslint-disable-next-line no-unused-vars
  deleteBill,
} from "../../services/billingService";

const Billing = () => {

  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const fetchBills = async () => {
    try {
      setLoading(true);

      const res = await getBills();

      setInvoices(res.data.bills || []);

    } catch (err) {

      console.log(err);
      setInvoices([]);

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handleCreateInvoice = async (data) => {
    try {

      await createBill(data);

      alert("Invoice Created Successfully");

      setOpenCreateModal(false);

      fetchBills();

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Failed to create invoice"
      );

    }
  };

  const filteredInvoices = invoices.filter((invoice) => {

    const matchSearch =
      (invoice.invoiceNo || "")
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchStatus =
      statusFilter === ""
        ? true
        : invoice.status === statusFilter;

    return matchSearch && matchStatus;

  });

  const totalRevenue = invoices.reduce(
    (sum, item) => sum + (item.totalAmount || 0),
    0
  );

  const paidCount = invoices.filter(
    (item) => item.status === "Paid"
  ).length;

  const pendingCount = invoices.filter(
    (item) => item.status === "Pending"
  ).length;

  const cards = [
    {
      title: "Total Invoices",
      value: invoices.length,
      icon: <FaFileInvoiceDollar />,
      color: "bg-blue-500",
    },
    {
      title: "Paid",
      value: paidCount,
      icon: <FaCheckCircle />,
      color: "bg-green-500",
    },
    {
      title: "Pending",
      value: pendingCount,
      icon: <FaClock />,
      color: "bg-yellow-500",
    },
    {
      title: "Revenue",
      value: `₹${Number(totalRevenue).toLocaleString("en-IN")}`,
      icon: <FaRupeeSign />,
      color: "bg-purple-500",
    },
  ];

  return (

    <div className="flex flex-col gap-8 p-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"></div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-4">

        {cards.map((card) => (

          <div
            key={card.title}
            className="bg-white rounded-2xl shadow-sm p-6 h-32 flex justify-between items-center hover:shadow-xl transition-all duration-300"
          >

            <div>

              <p className="text-gray-500 text-sm">
                {card.title}
              </p>

              <h2 className="text-3xl font-bold mt-2 text-gray-800">
                {card.value}
              </h2>

            </div>

            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl ${card.color}`}
            >
              {card.icon}
            </div>

          </div>

        ))}

      </div>

      {/* Filters */}

      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 2,
          boxShadow: "0 8px 24px rgba(37,99,235,.06)",
        }}
      >

        <TextField
          placeholder="Search Invoice..."
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          sx={{
            width: {
              xs: "100%",
              sm: 300,
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          select
          size="small"
          label="Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 180 }}
        >
          <MenuItem value="">
            All Status
          </MenuItem>

          <MenuItem value="Paid">
            Paid
          </MenuItem>

          <MenuItem value="Pending">
            Pending
          </MenuItem>

        </TextField>

        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => {
            setSelectedInvoice(null);
            setOpenCreateModal(true);
          }}
          sx={{
            bgcolor: "#2563EB",
            borderRadius: 3,
            px: 3,
            py: 1.2,
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              bgcolor: "#1D4ED8",
            },
          }}
        >
          Create Invoice
        </Button>

      </Paper>
          {/* Invoice Table */}

<BillingTable
    invoices={filteredInvoices}
    loading={loading}
    onView={setSelectedInvoice}
    onEdit={(invoice) => {
        setSelectedInvoice(invoice);
        setOpenCreateModal(true);
    }}
    onDelete={() => {}}
/>
            {/* Create Invoice Modal */}

      {openCreateModal && (
        <CreateInvoiceModal
          invoice={selectedInvoice}
          onClose={() => {
            setOpenCreateModal(false);
            setSelectedInvoice(null);
          }}
          onSave={handleCreateInvoice}
        />
      )}

    </div>
  );
};

export default Billing;