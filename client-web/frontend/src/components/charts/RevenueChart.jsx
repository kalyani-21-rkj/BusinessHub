import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const data = [
  { month: "Jan", revenue: 2000 },
  { month: "Feb", revenue: 3500 },
  { month: "Mar", revenue: 4200 },
  { month: "Apr", revenue: 3800 },
  { month: "May", revenue: 5200 },
  { month: "Jun", revenue: 6100 },
];

const RevenueChart = () => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 h-[320px] ">
      <h2 className="text-xl font-semibold mb-6">
        Monthly Revenue
      </h2>

      <ResponsiveContainer width="100%" height="85%">
        
       <BarChart data={data} margin={{ top: 20, right: 10, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="revenue"
            fill="#2563EB"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;