const ProductFilters = ({
  category,
  setCategory,
  brand,
  setBrand,
  sort,
  setSort,
}) => {
  return (
    <>
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="h-8 bg-white px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">Category</option>
        <option value="Laptop">Laptop</option>
        <option value="Mobile">Mobile</option>
        <option value="Tablet">Tablet</option>
        <option value="Accessories">Accessories</option>
      </select>

      <select
        value={brand}
        onChange={(e) => setBrand(e.target.value)}
        className="h-8 bg-white px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">Brand</option>
        <option value="Apple">Apple</option>
        <option value="Samsung">Samsung</option>
        <option value="Dell">Dell</option>
        <option value="HP">HP</option>
        <option value="Lenovo">Lenovo</option>
        <option value="Asus">Asus</option>
        <option value="Acer">Acer</option>
      </select>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="h-8 bg-white px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none"
      >
        <option value="">Sort By</option>
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
        <option value="priceLow">Price : Low → High</option>
        <option value="priceHigh">Price : High → Low</option>
        <option value="stockLow">Stock : Low → High</option>
        <option value="stockHigh">Stock : High → Low</option>
      </select>
    </>
  );
};

export default ProductFilters;