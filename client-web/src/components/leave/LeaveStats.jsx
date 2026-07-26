/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  FaHourglassHalf,
  FaCheckCircle,
  FaTimesCircle,
  FaUmbrellaBeach,
} from "react-icons/fa";

import { getLeaveStats } from "../../services/leaveService";

const LeaveStats = () => {
  const [stats, setStats] = useState({
    pending: 0,
    approved: 0,
    rejected: 0,
    onLeaveToday: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await getLeaveStats();

      setStats({
        pending: res.data.stats.pendingLeaves,
        approved: res.data.stats.approvedLeaves,
        rejected: res.data.stats.rejectedLeaves,
        onLeaveToday: res.data.stats.totalLeaves,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Pending",
      value: stats.pending,
      icon: <FaHourglassHalf size={28} />,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      title: "Approved",
      value: stats.approved,
      icon: <FaCheckCircle size={28} />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Rejected",
      value: stats.rejected,
      icon: <FaTimesCircle size={28} />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "On Leave",
      value: stats.onLeaveToday,
      icon: <FaUmbrellaBeach size={28} />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow border p-6 text-center mb-6">
        Loading Statistics...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl shadow-lg p-6 h-32 flex justify-between items-center hover:shadow-xl transition-all"
        >
          <div>
            <p className="text-gray-500 text-sm">
              {item.title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {item.value}
            </h2>
          </div>

          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.bg} ${item.text}`}
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeaveStats;