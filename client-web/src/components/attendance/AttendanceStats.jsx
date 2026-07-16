import {
  FaUserCheck,
  FaUserTimes,
  FaClock,
  FaUmbrellaBeach,
} from "react-icons/fa";

const stats = [
  {
    title: "Present",
    value: 228,
    icon: <FaUserCheck size={28} />,
    bg: "bg-green-100",
    text: "text-green-600",
  },
  {
    title: "Absent",
    value: 12,
    icon: <FaUserTimes size={28} />,
    bg: "bg-red-100",
    text: "text-red-600",
  },
  {
    title: "Late",
    value: 9,
    icon: <FaClock size={28} />,
    bg: "bg-yellow-100",
    text: "text-yellow-600",
  },
  {
    title: "On Leave",
    value: 7,
    icon: <FaUmbrellaBeach size={28} />,
    bg: "bg-blue-100",
    text: "text-blue-600",
  },
];

const AttendanceStats = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6 flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-slate-500">{item.title}</p>

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