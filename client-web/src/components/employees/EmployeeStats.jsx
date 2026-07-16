import { useEffect, useState } from "react";
import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaBuilding,
} from "react-icons/fa";

import { getEmployeeStats } from "../../services/employeeService";

const EmployeeStats = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    activeEmployees: 0,
    inactiveEmployees: 0,
    totalDepartments: 0,
  });

  const [loading, setLoading] = useState(true);

  // Declare FIRST
  const fetchStats = async () => {
    try {
      const res = await getEmployeeStats();
      setStats(res.data.stats);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Then use it
  useEffect(() => {
    fetchStats();
  }, []);

  const cards = [
    {
      title: "Total Employees",
      value: loading ? "..." : stats.totalEmployees,
      color: "bg-blue-600",
      icon: <FaUsers />,
    },
    {
      title: "Active",
      value: loading ? "..." : stats.activeEmployees,
      color: "bg-green-600",
      icon: <FaUserCheck />,
    },
    {
      title: "Inactive",
      value: loading ? "..." : stats.inactiveEmployees,
      color: "bg-yellow-500",
      icon: <FaUserClock />,
    },
    {
      title: "Departments",
      value: loading ? "..." : stats.totalDepartments,
      color: "bg-purple-600",
      icon: <FaBuilding />,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">
      {cards.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center"
        >
          <div>
            <p className="text-slate-500 text-sm">{item.title}</p>

            <h2 className="text-3xl font-bold mt-2">{item.value}</h2>
          </div>

          <div
            className={`w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl ${item.color}`}
          >
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeStats;