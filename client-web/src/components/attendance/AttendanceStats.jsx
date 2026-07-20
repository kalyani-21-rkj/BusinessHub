/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  FaUserCheck,
  FaUserTimes,
  FaClock,
  FaUmbrellaBeach,
} from "react-icons/fa";

import { getAttendanceStats } from "../../services/attendanceService";

const AttendanceStats = () => {
  const [stats, setStats] = useState({
    totalAttendance: 0,
    present: 0,
    absent: 0,
    leave: 0,
    halfDay: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const res = await getAttendanceStats();

      setStats(res.data.stats);
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
      title: "Present",
      value: stats.present,
      icon: <FaUserCheck size={28} />,
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Absent",
      value: stats.absent,
      icon: <FaUserTimes size={28} />,
      bg: "bg-red-100",
      text: "text-red-600",
    },
    {
      title: "Half Day",
      value: stats.halfDay,
      icon: <FaClock size={28} />,
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
    {
      title: "Leave",
      value: stats.leave,
      icon: <FaUmbrellaBeach size={28} />,
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 text-center shadow">
        Loading Statistics...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {cards.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-slate-500">
              {item.title}
            </p>

            <h2 className="text-3xl font-bold mt-2 text-slate-800">
              {item.value}
            </h2>
          </div>

          <div
            className={`h-16 w-16 rounded-2xl flex items-center justify-center ${item.bg} ${item.text}`}
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStats;