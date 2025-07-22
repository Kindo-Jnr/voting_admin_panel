import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import StatCard from "../components/StatCard";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  BsPeopleFill,
  BsCheckCircleFill,
  BsPersonCheckFill,
  BsCalendar2CheckFill,
} from "react-icons/bs";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const participationData = [
  { name: "08:00", Voted: 50, Total: 120 },
  { name: "09:00", Voted: 180, Total: 250 },
  { name: "10:00", Voted: 400, Total: 550 },
  { name: "11:00", Voted: 650, Total: 800 },
  { name: "12:00", Voted: 800, Total: 1000 },
  { name: "13:00", Voted: 980, Total: 1250 },
];

export default function Dashboard() {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-gray-50 text-gray-800">
        <Topbar />
        <div className="p-6 flex-1 overflow-auto space-y-8">

          {/* Welcome & Stats */}
          <div data-aos="fade-up" className="flex justify-between items-center flex-wrap gap-4">
            <h2 className="text-lg font-bold p-4 rounded-sm shadow-lg text-white bg-gradient-to-tr from-gray-900 to-indigo-500">Welcome🤝</h2>
            <div className="text-sm bg-green-100 text-green-700 px-4 py-1 rounded-full font-medium">
              🟢 Polls are currently ACTIVE
            </div>
          </div>

          {/* Stats Cards */}
          <div data-aos="fade-up" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard icon={BsPeopleFill} label="Total Voters" value="1,250" color="border-blue-500" />
            <StatCard icon={BsCheckCircleFill} label="Voted" value="980" color="border-gray-900" />
            <StatCard icon={BsPersonCheckFill} label="Agents" value="32" color="border-purple-500" />
            <StatCard icon={BsCalendar2CheckFill} label="Active Polls" value="3" color="border-orange-400" />
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Recent Activity */}
            <div data-aos="fade-right" className="col-span-2 bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white mb-4 bg-gradient-to-tr from-gray-900 to-indigo-500">Recent Activity</h3>
              <ul className="text-lg space-y-3">
                <li>✅ New agent <strong>David K.</strong> added</li>
                <li>📝 Poll <strong>2025 SRC Elections</strong> created</li>
                <li>👤 Voter <strong>Linda T.</strong> registered</li>
                <li>⚙️ Settings updated by Admin</li>
              </ul>
            </div>

            {/* Election Progress */}
            <div data-aos="fade-left" className="col-span-2 bg-white p-5 rounded-xl shadow-md">
              <h3 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white mb-4 bg-gradient-to-tr from-gray-900 to-indigo-500">Current Election Progress</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <p>Registered Voters: <strong>1,250</strong></p>
                  <p className="text-green-600">Completed: 68.4%</p>
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div className="bg-green-300 h-full w-[68%] rounded-full"></div>
                  </div>
                </div>
                <div>
                  <p>Vote Turnout Goal: <strong>89%</strong></p>
                  <p className="text-blue-600">Almost there</p>
                  <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div className="bg-blue-500 h-full w-[89%] rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          
     {/* Live Participation Chart Section */}
<div className="bg-white p-6 rounded-xl shadow-md" style={{ height: "400px" }}>
  <h3 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white mb-4 bg-gradient-to-tr from-gray-900 to-indigo-500">
    Live Participation Chart
  </h3>
  <div style={{ width: "100%", height: "90%" }}>
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={[
          { name: "07:00", Voted: 10, Total: 100 },
          { name: "08:00", Voted: 50, Total: 120 },
          { name: "09:00", Voted: 180, Total: 250 },
          { name: "10:00", Voted: 400, Total: 550 },
          { name: "11:00", Voted: 650, Total: 800 },
          { name: "12:00", Voted: 800, Total: 1000 },
          { name: "13:00", Voted: 980, Total: 1250 },
          { name: "14:00", Voted: 1020, Total: 1300 },
          { name: "15:00", Voted: 1080, Total: 1400 },
          { name: "16:00", Voted: 1150, Total: 1500 },
          { name: "17:00", Voted: 1225, Total: 1600 },
        ]}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip
          contentStyle={{ borderRadius: "8px", background: "#f9fafb", borderColor: "#e5e7eb" }}
          cursor={{ stroke: "#d1d5db", strokeWidth: 1 }}
        />
        <Legend />
        <Line type="monotone" dataKey="Voted" stroke="#10B981" strokeWidth={3} dot={{ r: 4 }} />
        <Line
          type="monotone"
          dataKey="Total"
          stroke="#3B82F6"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 3 }}
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
</div>

        </div>
      </div>
    </div>
  );
}
