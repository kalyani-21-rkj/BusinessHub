import { FaBoxOpen } from "react-icons/fa";

const EmptyProducts = () => {
  return (
    <div className="bg-white rounded-2xl border shadow-sm h-96 flex flex-col justify-center items-center">

      <FaBoxOpen
        className="text-gray-300 mb-5"
        size={70}
      />

      <h2 className="text-2xl font-bold">
        No Products Found
      </h2>

      <p className="text-gray-500 mt-2">
        Click Add Product to start selling.
      </p>

    </div>
  );
};

export default EmptyProducts;