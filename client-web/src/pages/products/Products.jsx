import { Plus } from "lucide-react";
import ProductStats from "../../components/products/ProductStats";
import ProductFilters from "../../components/products/ProductFilters";
import ProductGrid from "../../components/products/ProductGrid";

const Products = () => {
  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>
      <div className="w-full ">
        <ProductStats />
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 flex-1">

          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full sm:w-80 h-8 pl-4 pr-4 rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
            />
          </div>
          <ProductFilters />

        </div>
        <button className="w-full md:w-auto flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm transition-all active:scale-[0.99]">
          <Plus size={18} className="stroke-[2.5]" />
          Add Product
        </button>

      </div>
      <div className="w-full">
        <ProductGrid />
      </div>

    </div>
  );
};

export default Products;