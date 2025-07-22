import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaClock, FaBell, FaCog, FaShieldAlt } from "react-icons/fa";
import { Switch } from "@headlessui/react";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
  });

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Fixed Sidebar */}
      <div className="w-64 fixed top-0 left-0 bottom-0 z-20">
        <Sidebar />
      </div>

      {/* Main content container (after sidebar width) */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Fixed Topbar */}
        <div className="sticky top-0 z-10">
          <Topbar />
        </div>

        {/* Scrollable Settings Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-4xl mx-auto space-y-6"
          >
            {/* Page Header */}
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
                <FaCog className="text-indigo-500 animate-spin-slow" />
               Systems Settings
              </h1>
            </div>

            {/* ==== Account Settings Section ==== */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold flex items-center gap-3 text-gray-800">
                    <FaShieldAlt className="text-indigo-500" /> 
                    Account Security
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Manage your account credentials and security
                  </p>
                </div>
                <button className="bg-gradient-to-tr from-gray-900 to-indigo-500 hover:from-indigo-600 hover:to-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200">
                  Save Changes
                </button>
              </div>
              
              <div className="mt-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaEnvelope className="text-gray-400" />
                    </div>
                    <input 
                      type="email" 
                      placeholder="your@email.com" 
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FaLock className="text-gray-400" />
                    </div>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="pl-10 w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                    />
                  </div>
                </div>
              </div>
            </motion.section>

            {/* ==== System Settings Section ==== */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold flex items-center gap-3 text-gray-800">
                    <FaClock className="text-amber-500" /> 
                    System Configuration
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Configure system timing and default values
                  </p>
                </div>
                <button className="bg-gradient-to-tr from-gray-900 to-indigo-500 hover:from-indigo-600 hover:to-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200">
                  Save Changes
                </button>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Voting Start Time</label>
                  <input 
                    type="time" 
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Voting End Time</label>
                  <input 
                    type="time" 
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">OTP Expiration (minutes)</label>
                  <input 
                    type="number" 
                    placeholder="5" 
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Default Election Year</label>
                  <input 
                    type="text" 
                    placeholder="2023" 
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                  />
                </div>
              </div>
            </motion.section>

            {/* ==== Notification Settings ==== */}
            <motion.section 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-semibold flex items-center gap-3 text-gray-800">
                    <FaBell className="text-green-500" /> 
                    Notification Preferences
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Choose how you want to receive notifications
                  </p>
                </div>
                <button className="bg-gradient-to-tr from-gray-900 to-indigo-500 hover:from-indigo-600 hover:to-blue-700 text-white px-5 py-2 rounded-lg shadow-md transition-all duration-200 ">
                  Save Changes
                </button>
              </div>
              
              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">Email Notifications</h3>
                    <p className="text-xs text-gray-500">Receive important updates via email</p>
                  </div>
                  <Switch
                    checked={notifications.email}
                    onChange={() => setNotifications(prev => ({ ...prev, email: !prev.email }))}
                    className={`${
                      notifications.email ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                  >
                    <span
                      className={`${
                        notifications.email ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <div>
                    <h3 className="text-sm font-medium text-gray-800">SMS Notifications</h3>
                    <p className="text-xs text-gray-500">Get text message alerts</p>
                  </div>
                  <Switch
                    checked={notifications.sms}
                    onChange={() => setNotifications(prev => ({ ...prev, sms: !prev.sms }))}
                    className={`${
                      notifications.sms ? 'bg-indigo-600' : 'bg-gray-200'
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors`}
                  >
                    <span
                      className={`${
                        notifications.sms ? 'translate-x-6' : 'translate-x-1'
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Sender Email</label>
                  <input 
                    type="email" 
                    placeholder="noreply@example.com" 
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all" 
                  />
                </div>
              </div>
            </motion.section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Settings;