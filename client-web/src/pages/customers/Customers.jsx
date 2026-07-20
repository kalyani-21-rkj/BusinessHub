/* eslint-disable react-hooks/set-state-in-effect */

import { Search, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import CustomerTable from "../../components/customers/CustomerTable";
import CustomerModal from "../../components/customers/CustomerModal";

import { getCustomers } from "../../services/customerService";

const Customers = () => {

  const [customers, setCustomers] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const fetchCustomers = async (search = "") => {

    try {

      setLoading(true);

      const res = await getCustomers(1, search);

      setCustomers(res.data.customers || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchCustomers();

  }, []);

  useEffect(() => {

    const timer = setTimeout(() => {

      fetchCustomers(keyword);

    }, 400);

    return () => clearTimeout(timer);

  }, [keyword]);

  return (

    <div className="flex flex-col gap-8 p-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
    
      </div>

      <div className="flex justify-between items-center w-full">

        <div className="relative w-[480px]">

          <Search className="absolute left-70 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />

          <input
            type="text"
            placeholder="Search customers..."
            value={keyword}
            onChange={(e)=>setKeyword(e.target.value)}
            className="w-full sm:w-80 h-8 pl-4 pr-4 rounded-xl border border-slate-200 bg-white placeholder-slate-400 text-slate-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-sm"
          />

        </div>

        <button
          onClick={()=>{
            setSelectedCustomer(null);
            setOpenModal(true);
          }}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl"
        >

          <Plus size={20} />

          Add Customer

        </button>

      </div>

      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">

        <CustomerTable
          customers={customers}
          loading={loading}
          onEdit={(customer)=>{
            setSelectedCustomer(customer);
            setOpenModal(true);
          }}
          refreshCustomers={()=>fetchCustomers(keyword)}
        />

      </div>

      <CustomerModal
        open={openModal}
        onClose={()=>setOpenModal(false)}
        customer={selectedCustomer}
        onSuccess={()=>fetchCustomers(keyword)}
      />

    </div>

  );

};

export default Customers;