const ProductFilters = () => {
  return (
    <>
      <select className="h-8 bg-white px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none">
        <option>Category</option>
      </select>

      <select className="h-8 bg-white px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none">
        <option>Brand</option>
      </select>

      <select className=" h-8 bg-white px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none">
        <option>Sort By</option>
      </select>
    </>
  );
};

export default ProductFilters;