import { FaEdit, FaTrash, FaUserCircle } from "react-icons/fa";

import { deleteCustomer } from "../../services/customerService";

const CustomerTable = ({
  customers,
  loading,
  onEdit,
  refreshCustomers,
}) => {

  const handleDelete = async(id)=>{

    if(!window.confirm("Delete Customer?")) return;

    try{

      await deleteCustomer(id);

      refreshCustomers();

    }catch(err){

      console.log(err);

    }

  };

  if(loading){

    return <div className="p-10 text-center">Loading...</div>;

  }

  return (

    <div className="overflow-x-auto">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr className="text-left text-slate-600 text-sm uppercase">

            <th className="px-6 py-4">Customer</th>

            <th className="px-6 py-4">Phone</th>

            <th className="px-6 py-4">Status</th>

            <th className="px-6 py-4 text-center">Actions</th>

          </tr>

        </thead>

        <tbody>

          {customers.map((customer)=>(

            <tr
              key={customer._id}
              className="border-b hover:bg-slate-50"
            >

              <td className="px-6 py-5">

                <div className="flex items-center gap-4">

                  <FaUserCircle className="text-4xl text-blue-600"/>

                  <div>

                    <h3 className="font-semibold">

                      {customer.fullName}

                    </h3>

                    <p className="text-sm text-slate-500">

                      {customer.email}

                    </p>

                  </div>

                </div>

              </td>

              <td className="px-6 py-5">

                {customer.phone}

              </td>

              <td className="px-6 py-5">

                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  customer.status==="Customer"
                  ?"bg-green-100 text-green-700"
                  :customer.status==="Lead"
                  ?"bg-yellow-100 text-yellow-700"
                  :"bg-red-100 text-red-700"
                }`}>

                  {customer.status}

                </span>

              </td>

              <td className="px-6 py-5">

                <div className="flex justify-center gap-3">

                  <button
                    onClick={()=>onEdit(customer)}
                    className="text-blue-600 hover:text-blue-800"
                  >

                    <FaEdit/>

                  </button>

                  <button
                    onClick={()=>handleDelete(customer._id)}
                    className="text-red-600 hover:text-red-800"
                  >

                    <FaTrash/>

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

export default CustomerTable;