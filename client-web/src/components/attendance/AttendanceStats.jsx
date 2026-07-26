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
      icon: <FaUserCheck />,
      color: "bg-green-500",
    },
    {
      title: "Absent",
      value: stats.absent,
      icon: <FaUserTimes />,
      color: "bg-red-500",
    },
    {
      title: "Half Day",
      value: stats.halfDay,
      icon: <FaClock />,
      color: "bg-yellow-500",
    },
    {
      title: "Leave",
      value: stats.leave,
      icon: <FaUmbrellaBeach />,
      color: "bg-blue-500",
    },
  ];

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
        Loading Statistics...
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-white mb-10 rounded-2xl shadow-sm p-6 h-32 flex justify-between items-center hover:shadow-xl transition-all duration-300"
        >
          <div>
            <p className="text-gray-500 text-sm">
              {card.title}
            </p>

            <h2 className="text-3xl font-bold mt-2 text-gray-800">
              {card.value}
            </h2>
          </div>

          <div
            className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl ${card.color}`}
          >
            {card.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceStats;