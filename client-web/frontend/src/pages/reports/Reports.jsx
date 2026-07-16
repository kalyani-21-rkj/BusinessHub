import {
  FaUsers,
  FaMoneyBillWave,
  FaShoppingCart,
  FaBoxOpen,
} from "react-icons/fa";

const Reports = () => {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>
      <div className="flex justify-between items-center">

        <h1 className="text-3xl font-bold">
          Reports
        </h1>

        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl">
          Download Report
        </button>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-4 gap-5">

        <div className="bg-white rounded-2xl shadow p-6 flex justify-between">

          <div>
            <p className="text-slate-500">Revenue</p>
            <h2 className="text-3xl font-bold mt-2">₹2.8 Cr</h2>
          </div>

          <FaMoneyBillWave className="text-4xl text-blue-600" />

        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex justify-between">

          <div>
            <p className="text-slate-500">Orders</p>
            <h2 className="text-3xl font-bold mt-2">1,254</h2>
          </div>

          <FaShoppingCart className="text-4xl text-green-600" />

        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex justify-between">

          <div>
            <p className="text-slate-500">Products</p>
            <h2 className="text-3xl font-bold mt-2">542</h2>
          </div>

          <FaBoxOpen className="text-4xl text-orange-500" />

        </div>

        <div className="bg-white rounded-2xl shadow p-6 flex justify-between">

          <div>
            <p className="text-slate-500">Customers</p>
            <h2 className="text-3xl font-bold mt-2">842</h2>
          </div>

          <FaUsers className="text-4xl text-purple-600" />

        </div>

      </div>

      {/* Charts */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-semibold mb-6">
            Monthly Sales
          </h2>

          <div className="h-72 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
            Sales Chart
          </div>

        </div>

        <div className="bg-white rounded-2xl shadow p-6">

          <h2 className="text-xl font-semibold mb-6">
            Revenue Overview
          </h2>

          <div className="h-72 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
            Revenue Chart
          </div>

        </div>

      </div>

      {/* Top Products */}

      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-xl font-semibold mb-5">
          Top Selling Products
        </h2>

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Category</th>
              <th className="p-4 text-left">Sold</th>
              <th className="p-4 text-left">Revenue</th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-t">
              <td className="p-4">MacBook Pro</td>
              <td className="p-4">Laptop</td>
              <td className="p-4">180</td>
              <td className="p-4 font-semibold">₹3.2 Cr</td>
            </tr>

            <tr className="border-t">
              <td className="p-4">iPhone 16</td>
              <td className="p-4">Mobile</td>
              <td className="p-4">320</td>
              <td className="p-4 font-semibold">₹5.8 Cr</td>
            </tr>

            <tr className="border-t">
              <td className="p-4">Dell Monitor</td>
              <td className="p-4">Accessories</td>
              <td className="p-4">145</td>
              <td className="p-4 font-semibold">₹1.1 Cr</td>
            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default Reports;