/* eslint-disable react-hooks/set-state-in-effect */

import { Search, Plus } from "lucide-react";
import { useEffect, useState } from "react";

import LeaveTable from "../../components/leave/LeaveTable";
import LeaveModal from "../../components/leave/LeaveModal";
import LeaveStats from "../../components/leave/LeaveStats";

import { getLeaves } from "../../services/leaveService";

const Leave = () => {

  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");

  const [openModal, setOpenModal] = useState(false);

  const [selectedLeave, setSelectedLeave] = useState(null);

  const fetchLeaves = async (search = "") => {

    try {

      setLoading(true);

      const res = await getLeaves(1, search);

      setLeaves(res.data.leaves || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchLeaves();

  }, []);

  useEffect(() => {

    const timer = setTimeout(() => {

      fetchLeaves(keyword);

    }, 400);

    return () => clearTimeout(timer);

  }, [keyword]);

  return (

   <div className="flex flex-col gap-8 p-6 w-full">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4"></div>

      <LeaveStats />

      <div className="flex justify-between items-center">

        <div className="relative w-96">

          <Search
            className="absolute left-80 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search Leave..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="w-full border rounded-xl py-3 pl-11 pr-4"
          />

        </div>

        <button
          onClick={() => {

            setSelectedLeave(null);

            setOpenModal(true);

          }}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl flex items-center gap-2"
        >

          <Plus size={18} />

          Apply Leave

        </button>

      </div>

      <div className="bg-white rounded-xl shadow border overflow-hidden">

        <LeaveTable
          leaves={leaves}
          loading={loading}
          refreshLeaves={fetchLeaves}
          onEdit={(leave) => {

            setSelectedLeave(leave);

            setOpenModal(true);

          }}
        />

      </div>

      <LeaveModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        leave={selectedLeave}
        onSuccess={fetchLeaves}
      />

    </div>

  );

};

export default Leave;