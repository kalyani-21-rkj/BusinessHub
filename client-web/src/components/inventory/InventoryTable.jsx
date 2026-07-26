import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPlusCircle,
} from "react-icons/fa";

import EmptyProducts from "../products/EmptyProducts";

const InventoryTable = ({
  inventory = [],
  loading,
  onView,
  onEdit,
  onDelete,
  onAddStock,
}) => {
  if (loading) {
    return (
      <div className="text-center py-10 text-slate-500">
        Loading Inventory...
      </div>
    );
  }

  if (inventory.length === 0) {
    return (
      <EmptyProducts />
    );
  }

  return (
    <>
      {/* ================= MOBILE VIEW ================= */}

      <div className="lg:hidden flex flex-col gap-6 px-2 py-2">

        {inventory.map((item) => (

          <div
            key={item._id}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mx-1"
          >

            {/* Image */}

            <div className="relative">

              <img
                src={
                  item.image && item.image.trim() !== ""
                    ? item.image
                    : "/no-image.png"
                }
                alt={item.name}
                className="w-full h-44 object-cover"
                onError={(e) => {
                  e.target.src = "/no-image.png";
                }}
              />

              <span
                className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${
                  item.stock === 0
                    ? "bg-red-100 text-red-700"
                    : item.stock <= 5
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {item.stock === 0
                  ? "Out of Stock"
                  : item.stock <= 5
                  ? "Low Stock"
                  : "In Stock"}
              </span>

            </div>

            {/* Body */}

            <div className="p-5">

              <h3 className="text-lg font-bold text-slate-800">
                {item.name}
              </h3>

              <p className="text-sm text-slate-500 mt-1">
                {item.category}
              </p>

              <div className="grid grid-cols-2 gap-4 mt-5 text-sm">

                <div>
                  <p className="text-slate-400">
                    SKU
                  </p>

                  <p className="font-semibold">
                    {item.sku}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">
                    Warehouse
                  </p>

                  <p className="font-semibold">
                    {item.warehouse || "Main"}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">
                    Stock
                  </p>

                  <p className="font-semibold">
                    {item.stock}
                  </p>
                </div>

                <div>
                  <p className="text-slate-400">
                    Category
                  </p>

                  <p className="font-semibold">
                    {item.category}
                  </p>
                </div>

              </div>

              {/* Actions */}

              <div className="flex justify-end mt-6 border-t pt-4">

                <button
                  onClick={() => onView(item)}
                  className="w-11 h-11 rounded-xl  hover:bg-slate-200 flex items-center justify-center"
                >
                  <FaEye />
                </button>

                <button
                  onClick={() => onEdit(item)}
                  className="w-11 h-11 rounded-xl  text-blue-600 hover:bg-blue-100 flex items-center justify-center"
                >
                  <FaEdit />
                </button>

                <button
                  onClick={() => onAddStock(item)}
                  className="w-11 h-11 rounded-xl  text-green-600 hover:bg-green-100 flex items-center justify-center"
                >
                  <FaPlusCircle />
                </button>

                <button
                  onClick={() => onDelete(item._id)}
                  className="w-11 h-11 rounded-xl  text-red-600 hover:bg-red-100 flex items-center justify-center"
                >
                  <FaTrash />
                </button>

              </div>

            </div>

          </div>

        ))}

      </div>

      {/* ================= DESKTOP VIEW ================= */}

      <div className="hidden lg:block overflow-x-auto">
                <table className="w-full">

          <thead className="bg-slate-50 border-b">

            <tr className="text-left text-sm font-semibold text-slate-600">

              <th className="px-6 py-4">Product</th>

              <th className="px-6 py-4">SKU</th>

              <th className="px-6 py-4">Category</th>

              <th className="px-6 py-4">Warehouse</th>

              <th className="px-6 py-4">Stock</th>

              <th className="px-6 py-4">Status</th>

              <th className="px-6 py-4 text-right">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {inventory.map((item) => (

              <tr
                key={item._id}
                className="border-b hover:bg-slate-50 transition"
              >

                {/* Product */}

                <td className="px-6 py-4">

                  <div className="flex items-center mt-2 mb-2 gap-4">

                    <img
                      src={
                        item.image &&
                        item.image.trim() !== ""
                          ? item.image
                          : "/no-image.png"
                      }
                      alt={item.name}
                      className="w-15 h-15 rounded-xl object-cover border"
                      onError={(e) => {
                        e.target.src =
                          "/no-image.png";
                      }}
                    />

                    <div>

                      <p className="font-semibold text-slate-800">
                        {item.name}
                      </p>

                    </div>

                  </div>

                </td>

                {/* SKU */}

                <td className="px-6 py-4">
                  {item.sku}
                </td>

                {/* Category */}

                <td className="px-6 py-4">
                  {item.category}
                </td>

                {/* Warehouse */}

                <td className="px-6 py-4">
                  {item.warehouse ||
                    "Main Warehouse"}
                </td>

                {/* Stock */}

                <td className="px-6 py-4 font-semibold">
                  {item.stock}
                </td>

                {/* Status */}

                <td className="px-6 py-4">

                  {item.stock === 0 ? (

                    <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-semibold">
                      Out of Stock
                    </span>

                  ) : item.stock <= 5 ? (

                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-semibold">
                      Low Stock
                    </span>

                  ) : (

                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-semibold">
                      In Stock
                    </span>

                  )}

                </td>

                {/* Actions */}

                <td className="px-6 py-4">

                  <div className="flex justify-end gap-2">

                    <button
                      title="View"
                      onClick={() =>
                        onView(item)
                      }
                      className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition"
                    >
                      <FaEye />
                    </button>

                    <button
                      title="Edit"
                      onClick={() =>
                        onEdit(item)
                      }
                      className="w-10 h-10 rounded-xl text-blue-600 hover:bg-blue-100 flex items-center justify-center transition"
                    >
                      <FaEdit />
                    </button>

                    <button
                      title="Add Stock"
                      onClick={() =>
                        onAddStock(item)
                      }
                      className="w-10 h-10 rounded-xl text-green-600 hover:bg-green-100 flex items-center justify-center transition"
                    >
                      <FaPlusCircle />
                    </button>

                    <button
                      title="Delete"
                      onClick={() =>
                        onDelete(item._id)
                      }
                      className="w-10 h-10 rounded-xl text-red-600 hover:bg-red-100 flex items-center justify-center transition"
                    >
                      <FaTrash />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </>
  );
};

export default InventoryTable;
      