/* eslint-disable react-hooks/set-state-in-effect */

import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
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

  const filteredInvoices = invoices.filter((invoice) =>
    (invoice.invoiceNo || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

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

  return (
    <div className="flex flex-col gap-6 p-6">

      {/* Header */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"></div>

      {/* Cards */}

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white p-5 rounded-2xl shadow">
          <p>Total Invoices</p>
          <h2 className="text-3xl font-bold mt-2">
            {invoices.length}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p>Paid</p>
          <h2 className="text-3xl font-bold mt-2 text-green-600">
            {paidCount}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p>Pending</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-600">
            {pendingCount}
          </h2>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p>Total Revenue</p>
          <h2 className="text-3xl font-bold mt-2 text-blue-600">
            ₹{totalRevenue.toLocaleString()}
          </h2>
        </div>

      </div>

      {/* Search and Action Row */}

      <div className="bg-none rounded-2xl">

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">

          <div className="flex flex-wrap items-center gap-4 flex-1 w-full">

            <div className="relative w-full sm:w-80">

              <input
                placeholder="Search Invoice..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full h-10 pl-4 pr-10 rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
              />

              <FaSearch className="absolute right-4 top-3 text-gray-400" />

            </div>

            <select className="border border-slate-200 rounded-xl px-4 h-10 bg-white text-slate-700 outline-none shadow-sm">
              <option>All Status</option>
              <option>Paid</option>
              <option>Pending</option>
            </select>

          </div>

          <button
            onClick={() => {
              setSelectedInvoice(null);
              setOpenCreateModal(true);
            }}
            className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition-all active:scale-[0.99]"
          >
            + Create Invoice
          </button>

        </div>

      </div>

      {/* Table */}

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-4 text-left">Invoice</th>
              <th className="p-4 text-left">Customer</th>
              <th className="p-4 text-left">Amount</th>
              <th className="p-4 text-left">Date</th>
              <th className="p-4 text-left">Status</th>
            </tr>

          </thead>

          <tbody>

            {loading ? (

              <tr>
                <td colSpan="5" className="text-center p-8">
                  Loading...
                </td>
              </tr>

            ) : filteredInvoices.length === 0 ? (

              <tr>
                <td colSpan="5" className="text-center p-8">
                  No Invoices Found
                </td>
              </tr>

            ) : (

              filteredInvoices.map((invoice) => (

                <tr
                  key={invoice._id}
                  className="border-t"
                >

                  <td className="p-4 font-semibold text-blue-600">
                    {invoice.invoiceNo}
                  </td>

                  <td className="p-4">
                    {invoice.customerName}
                  </td>

                  <td className="p-4 font-semibold">
                    ₹{invoice.totalAmount}
                  </td>

                  <td className="p-4">
                    {invoice.createdAt
                      ? new Date(
                          invoice.createdAt
                        ).toLocaleDateString()
                      : "-"}
                  </td>

                  <td className="p-4">

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        invoice.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {invoice.status}
                    </span>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>
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