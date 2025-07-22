import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BsBarChart, BsPeople, BsBoxArrowLeft, BsGear, BsPersonCheck,
  BsPersonLinesFill, BsCalendar2Check, BsColumnsGap,
  BsChevronLeft, BsChevronRight
} from "react-icons/bs";
import { FaVoteYea } from "react-icons/fa";

const menuItems = [
  { name: "Dashboard", icon: <BsColumnsGap />, path: "/admin" },
  { name: "Manage Agents", icon: <BsPersonCheck />, path: "/admin/agents" },
  { name: "Manage Elections", icon: <BsCalendar2Check />, path: "/admin/elections" },
  { name: "Manage Candidates", icon: <BsPersonLinesFill />, path: "/admin/candidates" },
  { name: "Voter List", icon: <BsPeople />, path: "/admin/voters" },
  { name: "Results & Analysis", icon: <BsBarChart />, path: "/admin/results" },
  { name: "Settings", icon: <BsGear />, path: "/admin/settings" },
  { name: "Logout", icon: <BsBoxArrowLeft />, path: "/" },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();

  return (
    <div className={`h-screen bg-gray-900 text-white shadow-md transition-all duration-300 flex flex-col ${collapsed ? "w-16" : "w-64"}`}>
      {/* Logo and Toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {!collapsed ? (
          <div className="flex items-center gap-2 font-bold text-xl text-white">
            <FaVoteYea className="text-blue-400" />
            <span>eVote</span>
          </div>
        ) : (
          <FaVoteYea className="text-blue-400 text-2xl" />
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 text-white hover:scale-110 transition"
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? <BsChevronRight /> : <BsChevronLeft />}
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 mt-4 space-y-5">
        {menuItems.map((item) => (
          <Link
            to={item.path}
            key={item.name}
            className={`flex items-center gap-3 px-4 py-3 hover:bg-blue-900 rounded-md transition ${pathname === item.path ? "bg-blue-600" : ""}`}
          >
            <div className="text-xl">{item.icon}</div>
            {!collapsed && <span className="text-sm">{item.name}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
}
