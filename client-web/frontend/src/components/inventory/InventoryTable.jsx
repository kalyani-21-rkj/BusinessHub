import {
  FaEdit,
  FaTrash,
  FaEye,
  FaPlusCircle,
} from "react-icons/fa";

const inventory = [
  {
    id: 1,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300",
    name: "MacBook Pro M3",
    sku: "APL-001",
    category: "Laptop",
    warehouse: "Mumbai",
    stock: 25,
  },
  {
    id: 2,
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300",
    name: "Samsung Galaxy S24",
    sku: "SAM-021",
    category: "Mobile",
    warehouse: "Pune",
    stock: 4,
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300",
    name: "Wireless Mouse",
    sku: "LOG-104",
    category: "Accessories",
    warehouse: "Delhi",
    stock: 0,
  },
  {
    id: 4,
    image:
      "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=300",
    name: "Dell XPS 15",
    sku: "DEL-302",
    category: "Laptop",
    warehouse: "Mumbai",
    stock: 12,
  },
];

const InventoryTable = () => {
  return (
    <div className="overflow-x-auto">

      <table className="w-full">

        {/* Header */}

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

        {/* Body */}

        <tbody>

          {inventory.map((item) => (

            <tr
              key={item.id}
              className="border-b hover:bg-slate-50 transition"
            >

              {/* Product */}

              <td className="px-6 py-4">

                <div className="flex items-center gap-4">

                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover border"
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
                {item.warehouse}
              </td>

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

                  <button className="p-2 rounded-lg hover:bg-slate-100">
                    <FaEye />
                  </button>

                  <button className="p-2 rounded-lg hover:bg-blue-100 text-blue-600">
                    <FaEdit />
                  </button>

                  <button className="p-2 rounded-lg hover:bg-green-100 text-green-600">
                    <FaPlusCircle />
                  </button>

                  <button className="p-2 rounded-lg hover:bg-red-100 text-red-600">
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