import {
  FaUsers,
  FaUserCheck,
  FaUserClock,
  FaBuilding,
} from "react-icons/fa";

const stats = [
  {
    title: "Total Employees",
    value: "120",
    color: "bg-blue-600",
    icon: <FaUsers />,
  },
  {
    title: "Active",
    value: "112",
    color: "bg-green-600",
    icon: <FaUserCheck />,
  },
  {
    title: "On Leave",
    value: "5",
    color: "bg-yellow-500",
    icon: <FaUserClock />,
  },
  {
    title: "Departments",
    value: "8",
    color: "bg-purple-600",
    icon: <FaBuilding />,
  },
];

const EmployeeStats = () => {
  return (
    // Change ONLY the parent <div> return line inside EmployeeStats.jsx to look like this:
<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full">

      {stats.map((item) => (

        <div
          key={item.title}
          className="bg-white rounded-2xl shadow-md p-6 flex justify-between items-center"
        >

          <div>

            <p className="text-slate-500 text-sm">
              {item.title}
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {item.value}
            </h2>

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