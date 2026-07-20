import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPlusCircle,
} from "react-icons/fa";

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
      <div className="text-center py-10 text-slate-500">
        No Products Found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-slate-50 border-b">

          <tr className="text-left text-sm text-slate-600">

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

              <td className="px-6 py-4">

                <div className="flex items-center gap-4">

                  <img
                    src={
                      item.image && item.image.trim() !== ""
                        ? item.image
                        : "/no-image.png"
                    }
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover border"
                    onError={(e) => {
                      e.target.src = "/no-image.png";
                    }}
                  />

                  <div>

                    <p className="font-semibold text-slate-800">
                      {item.name}
                    </p>

                  </div>

                </div>

              </td>

              <td className="px-6 py-4">
                {item.sku}
              </td>

              <td className="px-6 py-4">
                {item.category}
              </td>

              <td className="px-6 py-4">
                {item.warehouse || "Main Warehouse"}
              </td>

              <td className="px-6 py-4 font-semibold">
                {item.stock}
              </td>

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

              <td className="px-6 py-4">

                <div className="flex justify-end gap-2">

                  <button
                    onClick={() => onView(item)}
                    className="p-2 rounded-lg hover:bg-slate-100"
                  >
                    <FaEye />
                  </button>

                  <button
                    onClick={() => onEdit(item)}
                    className="p-2 rounded-lg hover:bg-blue-100 text-blue-600"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() => onAddStock(item)}
                    className="p-2 rounded-lg hover:bg-green-100 text-green-600"
                  >
                    <FaPlusCircle />
                  </button>

                  <button
                    onClick={() => onDelete(item._id)}
                    className="p-2 rounded-lg hover:bg-red-100 text-red-600"
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
  );
};

export default InventoryTable;