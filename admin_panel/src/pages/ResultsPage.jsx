import React, { useState, useRef, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as ChartTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";
import { Tooltip } from "react-tooltip";
import Sidebar from "../components/Sidebar";
import TopBar from "../components/TopBar";
import { 
  FaUsers, 
  FaUserCheck, 
  FaUserTimes, 
  FaEnvelope,
  FaChartLine,
  FaChartPie,
  FaChartBar,
  FaDownload,
  FaTable,
  FaVoteYea
} from "react-icons/fa";
import { MdHowToVote, MdPoll, MdOutlineAnalytics, MdEmail } from "react-icons/md";
import { IoMdTime } from "react-icons/io";
import { useLocation, useNavigate } from "react-router-dom";

const ResultsPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedElection, setSelectedElection] = useState("SRC");
  const [reportType, setReportType] = useState("Summary");
  const [format, setFormat] = useState("PDF");
  const [activeTab, setActiveTab] = useState(location.hash.substring(1) || "overview");
  const [showEmailModal, setShowEmailModal] = useState(false);
  // const controls = useAnimation();
  // const ref = useRef();
  // const inView = useInView(ref);

  // useEffect(() => {
  //   if (inView) {
  //     controls.start("visible");
  //   }
  // }, [controls, inView]);

useEffect(() => {
  const hash = location.hash.substring(1);
  const validTabs = ["overview", "detailed", "participation", "trends"];
  
  if (validTabs.includes(hash)) {
    setActiveTab(hash);
  } else {
    setActiveTab("overview");
    navigate("#overview", { replace: true });
  }
}, [location.hash, navigate]);

  // Quick Stats Data
  const quickStats = [
    { 
      icon: <FaUsers className="text-2xl" />, 
      label: "Total Voters", 
      value: 532, 
      change: "+12% from last election",
      bgColor: "bg-blue-100",
      textColor: "text-blue-600"
    },
    { 
      icon: <FaUserCheck className="text-2xl" />, 
      label: "Voted", 
      value: 421, 
      percentage: "79.1%",
      bgColor: "bg-green-100",
      textColor: "text-green-600"
    },
    { 
      icon: <FaUserTimes className="text-2xl" />, 
      label: "Not Voted", 
      value: 111, 
      percentage: "20.9%",
      bgColor: "bg-amber-100",
      textColor: "text-amber-600"
    },
  ];

  // Voting Participation Data
  const pieData = [
    { name: "Voted", value: 421 },
    { name: "Not Voted", value: 111 },
  ];
  const COLORS = ["#10b981", "#f59e0b"];

  // Election Results Data
  const electionResults = [
    { 
      position: "President", 
      totalVotes: 420,
      candidates: [
        { name: "Dev Anthony", votes: 215, percentage: 51.2 },
        { name: "Jane Smith", votes: 185, percentage: 44.0 },
        { name: "Muniru Nihad", votes: 20, percentage: 4.8 }
      ]
    },
    { 
      position: "Vice President", 
      totalVotes: 420,
      candidates: [
        { name: "Osman Faruk", votes: 198, percentage: 47.1 },
        { name: "Sarah Kofi", votes: 210, percentage: 50.0 },
        { name: "Abu Nawaf", votes: 371, percentage: 89.3 }
      ]
    },
    { 
      position: "Secretary", 
      totalVotes: 420,
      candidates: [
        { name: "Michael Brown", votes: 230, percentage: 54.8 },
        { name: "Emily Davis", votes: 175, percentage: 41.7 },
        { name: "Manaf ", votes: 65, percentage: 3.6 }
      ]
    }
  ];

  // Voting timeline from 7:00 AM to 5:00 PM
  const votingTimeline = [
    { time: "7:00 AM", votes: 15 },
    { time: "8:00 AM", votes: 65 },
    { time: "9:00 AM", votes: 120 },
    { time: "10:00 AM", votes: 210 },
    { time: "11:00 AM", votes: 280 },
    { time: "12:00 PM", votes: 340 },
    { time: "1:00 PM", votes: 380 },
    { time: "2:00 PM", votes: 400 },
    { time: "3:00 PM", votes: 415 },
    { time: "4:00 PM", votes: 420 },
    { time: "5:00 PM", votes: 420 }
  ];

  
  // Live participation data for trends tab
  const liveData = [
    { time: "8:00", participation: 65 },
    { time: "9:00", participation: 120 },
    { time: "10:00", participation: 210 },
    { time: "11:00", participation: 280 },
    { time: "12:00", participation: 340 },
    { time: "13:00", participation: 380 },
    { time: "14:00", participation: 400 },
    { time: "15:00", participation: 415 },
    { time: "16:00", participation: 420 },
    { time: "17:00", participation: 420 }
  ];

  // Polling Stations Data
  const pollingStations = [
    { name: "Main Campus Hall", voters: 150, voted: 132, percentage: 88.0 },
    { name: "Science Building", voters: 120, voted: 95, percentage: 79.2 },
    { name: "Library", voters: 90, voted: 68, percentage: 75.6 },
    { name: "Sports Complex", voters: 80, voted: 62, percentage: 77.5 },
    { name: "Auditorium", voters: 92, voted: 64, percentage: 69.6 },
  ];

  // Level Participation Data
  const levelData = [
    { level: "100", voters: 150, voted: 120, percentage: 80.0 },
    { level: "200", voters: 160, voted: 160, percentage: 100.0 },
    { level: "300", voters: 110, voted: 90, percentage: 81.8 },
    { level: "400", voters: 112, voted: 51, percentage: 45.5 },
  ];

  const handleGenerateReport = () => {
    setShowEmailModal(true);
  };

  const handleGenerateOnly = () => {
    alert(`Generating ${reportType} report in ${format} format...`);
    setShowEmailModal(false);
  };

  const handleSendEmails = () => {
    alert(`Sending ${reportType} report in ${format} format to all voters...`);
    setShowEmailModal(false);
  };
const handleTabClick = (tabId) => {
  setActiveTab(tabId);
  navigate(`#${tabId}`, { replace: true });
};
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title="Election Analytics Dashboard" />
        
        <div className="flex-1 overflow-y-auto p-6">
          {/* Header with Election Selector */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <motion.h2 
                className="text-lg font-bold p-3 rounded-sm shadow-lg text-white mb-1 bg-gradient-to-tr from-gray-900 to-indigo-500"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                Election Results Analysis
              </motion.h2>
              <p className="text-gray-500">Comprehensive analytics for Student Elections</p>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                <select
                  value={selectedElection}
                  onChange={(e) => setSelectedElection(e.target.value)}
                  className="px-4 py-2 rounded-lg bg-transparent text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-100 cursor-pointer"
                >
                  <option value="SRC">SRC Elections</option>
                  <option value="Faculty">Faculty Elections</option>
                  <option value="Department">Department Elections</option>
                </select>
              </div>
            </div>
          </div>

          {/* Quick Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
            {quickStats.map((stat, i) => (
              <motion.div
                key={i}
                className={`p-5 rounded-xl shadow-sm border border-gray-200 bg-white`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2, duration: 0.5 }}
              >
                <div className="flex items-start justify-between">
                  <div className={`p-3 rounded-lg ${stat.bgColor} ${stat.textColor}`}>
                    {stat.icon}
                  </div>
                  <div className="text-right">
                    {stat.change && (
                      <span className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-600">
                        {stat.change}
                      </span>
                    )}
                    {stat.percentage && (
                      <span className="text-xs font-medium">{stat.percentage}</span>
                    )}
                  </div>
                </div>
                <h3 className="text-lg font-medium text-gray-500 mt-3">{stat.label}</h3>
                <p className="text-2xl font-bold text-gray-800">{stat.value.toLocaleString()}</p>
              </motion.div>
            ))}
          </div>

          {/* Navigation Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <nav className="flex space-x-8 ">
              {[
                { id: "overview", label: "Overview", icon: <MdOutlineAnalytics className="mr-2" /> },
                { id: "detailed", label: "Detailed Results", icon: <FaTable className="mr-2" /> },
                { id: "participation", label: "Participation", icon: <FaChartPie className="mr-2" /> },
                { id: "trends", label: "Voting Trends", icon: <FaChartLine className="mr-2" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                 onClick={() => handleTabClick(tab.id)}
                  className={`py-3 px-1 font-medium text-lg cursor-pointer flex items-center border-2 transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div 
            
            className="space-y-6"
          >
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <>
                <motion.div 
                  variants={itemVariants}
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white bg-gradient-to-tr from-gray-900 to-indigo-500">Election Results by Position</h3>
                    <span className="text-sm text-gray-500">Total Votes: 1,260</span>
                  </div>

                  {/* Vertical Grouped Bar Chart with Tooltips */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {electionResults.map((position, posIndex) => (
                      <div key={posIndex}>
                        <h4 className="font-medium text-center text-gray-800 mb-3">{position.position}</h4>
                        <div className="space-y-3">
                          {position.candidates.filter(c => c.name !== 'Abstained').map((candidate, i) => (
                            <div key={`${position.position}-${i}`} className="group relative">
                              <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium text-gray-700">{candidate.name}</span>
                                <span className="text-sm text-gray-500">{candidate.votes} votes</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-3">
                                <motion.div
                                  className={`h-3 rounded-full ${
                                    posIndex === 0 ? 'bg-blue-500' : 
                                    posIndex === 1 ? 'bg-[#4ea674]' : 'bg-[#4b648d]'
                                  }`}
                                  initial={{ width: 0 }}
                                  animate={{
                                    width: `${(candidate.votes / position.totalVotes) * 100}%`,
                                    transition: { duration: 1.5 }
                                  }}
                                />
                              </div>
                              {/* Tooltip */}
                              <div className="absolute -top-8 right-0 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                {candidate.percentage}% of position votes
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45 -mb-1"></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Legend */}
                  <div className="mt-6 pt-4 border-t border-gray-200">
                    <div className="flex flex-wrap justify-center gap-4">
                      {electionResults.map((position, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${
                            i === 0 ? 'bg-blue-500' : 
                            i === 1 ? 'bg-green-500' : 'bg-[#4b648d]'
                          }`}></div>
                          <span className="text-xs text-gray-600">{position.position}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
                >
                  <h3 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white mb-4 bg-gradient-to-tr from-gray-900 to-indigo-500">Voting Timeline (7:00 AM - 5:00 PM)</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={votingTimeline}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip 
                          formatter={(value) => [`${value} votes`, "Votes"]}
                        />
                        <Bar 
                          dataKey="votes" 
                          animationBegin={0}
                          animationDuration={1500}
                        >
                          {votingTimeline.map((entry, index) => (
                            <Cell 
                              key={`cell-${index}`} 
                              fill={index === votingTimeline.length - 1 ? "#4f46e5" : "#a5b4fc"} 
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div 
                    variants={itemVariants}
                    className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
                  >
                    <h3 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white mb-4 bg-gradient-to-tr from-gray-900 to-indigo-500">Top Polling Stations</h3>
                    <div className="space-y-4">
                      {pollingStations.slice(0, 5).map((station, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                              <MdPoll className="text-xl" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-800">{station.name}</p>
                              <p className="text-sm text-gray-500">{station.voted}/{station.voters} voters</p>
                            </div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            station.percentage > 85 ? 'bg-green-50 text-green-600' : 
                            station.percentage > 70 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                          }`}>
                            {station.percentage}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div 
                    variants={itemVariants}
                    className="bg-white p-5 rounded-xl shadow-sm border border-gray-200"
                  >
                    <h3 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white mb-4 bg-gradient-to-tr from-gray-900 to-indigo-500">Participation by Level</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={levelData}>
                          <XAxis dataKey="level" />
                          <YAxis />
                          <ChartTooltip 
                            formatter={(value, name, props) => [
                              `${value} (${props.payload.percentage}%)`,
                              name === 'voted' ? 'Voted' : 'Voters'
                            ]}
                          />
                          <Bar 
                            dataKey="voted" 
                            name="Voted" 
                            fill="#10b981" 
                            radius={[4, 4, 0, 0]}
                            animationBegin={0}
                            animationDuration={1500}
                          />
                          <Bar 
                            dataKey="voters" 
                            name="Total Voters" 
                            fill="#4b648d" 
                            radius={[4, 4, 0, 0]}
                            animationBegin={0}
                            animationDuration={1500}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </motion.div>
                </div>
              </>
            )}

            {/* Detailed Results Tab */}
            {activeTab === "detailed" && (
              <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-800">Detailed Election Results</h3>
                  <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50">
                      <FaDownload /> Export
                    </button>
                  </div>
                </div>

                <div className="space-y-6">
                  {electionResults.map((position, i) => (
                    <div key={i} className="border border-gray-200 rounded-lg overflow-hidden">
                      <div className="bg-gradient-to-tr from-gray-900 to-indigo-500 px-4 py-3 border-b border-gray-200">
                        <h4 className="font-bold text-white">{position.position}</h4>
                        <p className="text-sm text-white">Total votes: {position.totalVotes}</p>
                      </div>
                      <div className="divide-y divide-gray-400">
                        {position.candidates.map((candidate, j) => (
                          <div key={j} className="grid grid-cols-12 items-center px-4 py-3 hover:bg-[#d7eae2]">
                            <div className="col-span-6 md:col-span-5">
                              <p className="font-medium text-gray-800">{candidate.name}</p>
                            </div>
                            <div className="col-span-3 md:col-span-2 text-right">
                              <motion.p 
                                className="text-gray-800"
                                initial={{ number: 0 }}
                                animate={{ number: candidate.votes }}
                                transition={{ duration: 1.5 }}
                              >
                                {({ number }) => Math.floor(number)}
                              </motion.p>
                            </div>
                            <div className="col-span-3 md:col-span-2 text-right">
                              <p className="text-gray-600">{candidate.percentage}%</p>
                            </div>
                            <div className="col-span-12 md:col-span-3 mt-2 md:mt-0">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <motion.div 
                                  className={`h-2 rounded-full ${
                                    candidate.name === 'Abstained' ? 'bg-gray-400' : 'bg-indigo-500'
                                  }`} 
                                  initial={{ width: 0 }}
                                  animate={{ 
                                    width: `${candidate.percentage}%`,
                                    transition: { duration: 1.5 }
                                  }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Participation Tab */}
            {activeTab === "participation" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white mb-4 bg-gradient-to-tr from-gray-900 to-indigo-500">Voting Participation</h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          innerRadius={50}
                          paddingAngle={5}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(1)}%`}
                          labelLine={false}
                          dataKey="value"
                          animationBegin={0}
                          animationDuration={1500}
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={index} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <ChartTooltip 
                          formatter={(value) => [`${value} voters`, ""]}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white mb-4 bg-gradient-to-tr from-gray-900 to-indigo-500">Polling Station Performance</h3>
                  <div className="space-y-4">
                    {pollingStations.map((station, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-gray-700">{station.name}</span>
                          <span className="text-sm text-gray-500">{station.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <motion.div 
                            className={`h-2 rounded-full ${
                              station.percentage > 85 ? 'bg-[#103c1f]' : 
                              station.percentage > 70 ? 'bg-[#d7bd88]' : 'bg-red-400'
                            }`}
                            initial={{ width: 0 }}
                            animate={{ 
                              width: `${station.percentage}%`,
                              transition: { duration: 1.5 }
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="md:col-span-2 bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white mb-4 bg-gradient-to-tr from-gray-900 to-indigo-500">Detailed Level Participation</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-300">
                      <thead className="bg-gray-50 ">
                        <tr>
                          <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Level</th>
                          <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Total Voters</th>
                          <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Voted</th>
                          <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Participation</th>
                          <th className="px-4 py-3 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {levelData.map((level, i) => (
                          <tr key={i} className="hover:bg-[#d7eae2]">
                            <td className="px-4 py-3 whitespace-nowrap font-medium text-gray-800">{level.level} Level</td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-700">{level.voters}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-gray-700">{level.voted}</td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-md font-medium ${
                                level.percentage > 85 ? 'bg-green-50 text-green-600' : 
                                level.percentage > 70 ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                              }`}>
                                {level.percentage}%
                              </span>
                            </td>
                            <td className="px-4 py-3 whitespace-nowrap">
                              {level.percentage > 85 ? (
                                <span className="text-green-500">▲ Outstanding</span>
                              ) : level.percentage > 70 ? (
                                <span className="text-amber-500">▶ Average</span>
                              ) : (
                                <span className="text-red-500">▼ Low</span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* Trends Tab */}
            {activeTab === "trends" && (
              <div className="space-y-6">
                <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white mb-4 bg-gradient-to-tr from-gray-900 to-indigo-500">Live Participation Trend</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={liveData}>
                        <XAxis dataKey="time" />
                        <YAxis />
                        <ChartTooltip 
                          formatter={(value) => [`${value} voters`, "Participation"]}
                          labelFormatter={(label) => `Time: ${label}`}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="participation" 
                          stroke="#6366f1" 
                          strokeWidth={2} 
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                          name="Voters"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white mb-4 bg-gradient-to-tr from-gray-900 to-indigo-500">Peak Voting Hours</h3>
                    <div className="space-y-3">
                      {[
                        { hour: "12:00 - 13:00", votes: 85, percentage: "20.2%" },
                        { hour: "10:00 - 11:00", votes: 75, percentage: "17.8%" },
                        { hour: "14:00 - 15:00", votes: 65, percentage: "15.4%" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600">
                            <IoMdTime className="text-xl" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-800">{item.hour}</p>
                            <p className="text-sm text-gray-500">{item.votes} votes ({item.percentage})</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white mb-4 bg-gradient-to-tr from-gray-900 to-indigo-500">Voting Rate</h3>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={[
                          { hour: "08:00-09:00", rate: 45 },
                          { hour: "09:00-10:00", rate: 55 },
                          { hour: "10:00-11:00", rate: 90 },
                          { hour: "11:00-12:00", rate: 85 },
                          { hour: "12:00-13:00", rate: 70 },
                          { hour: "13:00-14:00", rate: 60 },
                          { hour: "14:00-15:00", rate: 40 },
                        ]}>
                          <XAxis dataKey="hour" />
                          <YAxis />
                          <ChartTooltip 
                            formatter={(value) => [`${value} voters/hour`, "Rate"]}
                          />
                          <Bar dataKey="rate" name="Voters per hour" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Report Generation Section */}
          <div className="mt-8 bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white mb-4 bg-gradient-to-tr from-gray-900 to-indigo-500">Generate Election Report</h3>
                <p className="text-sm text-gray-500">Export detailed election results for analysis</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex items-center gap-2">
                  <select
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 cursor-pointer"
                  >
                    <option value="Summary">Summary Report</option>
                    <option value="Detailed">Detailed Report</option>
                    <option value="Statistical">Statistical Analysis</option>
                  </select>
                  <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:border-indigo-300 cursor-pointer"
                  >
                    <option value="PDF">PDF</option>
                    <option value="CSV">CSV</option>
                    <option value="Excel">Excel</option>
                  </select>
                </div>
                <button
                  onClick={handleGenerateReport}
                  className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-900 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium cursor-pointer"
                >
                  <FaDownload /> Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Email Modal */}
      {showEmailModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold p-3 rounded-sm shadow-lg text-white mb-4 bg-gradient-to-tr from-gray-900 to-indigo-500">Election Report Options</h3>
            <p className="mb-6">You're about to generate a {reportType} report in {format} format. Choose an option below:</p>
            <div className="flex flex-col gap-3">
              <button
                onClick={handleGenerateOnly}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-900 text-white cursor-pointer rounded-lg flex items-center justify-center gap-2"
              >
                <FaDownload /> Generate Report Only
              </button>
              <button
                onClick={handleSendEmails}
                className="px-4 py-2 bg-green-600 hover:bg-green-900 text-white cursor-pointer rounded-lg flex items-center justify-center gap-2"
              >
                <MdEmail /> Generate & Send Emails
              </button>
              <button
                onClick={() => setShowEmailModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-[#d7eae2]"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;