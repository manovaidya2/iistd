import React, { useState, useRef, useEffect } from "react";
import { 
  FaBars, 
  FaUserCircle, 
  FaSignOutAlt, 
  FaCog, 
  FaBell, 
  FaChevronDown,
  FaEnvelope,
  FaMoon,
  FaSun,
  FaUserGraduate
} from "react-icons/fa";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  // Sample notification data
  const notifications = [
    { id: 1, title: "New Assignment Posted", message: "Data Structures assignment is due tomorrow", time: "5 min ago", read: false, icon: "📚" },
    { id: 2, title: "Exam Schedule Updated", message: "Mid-term exams schedule has been published", time: "1 hour ago", read: false, icon: "📅" },
    { id: 3, title: "Result Declared", message: "Your semester results are now available", time: "2 hours ago", read: true, icon: "📊" },
    { id: 4, title: "Fee Reminder", message: "Last date to pay semester fee is approaching", time: "1 day ago", read: true, icon: "💰" },
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900 text-white shadow-lg fixed top-0 left-0 right-0 z-40 backdrop-blur-sm">
        <div className="px-4 py-3 flex justify-between items-center">
          {/* Left Section - Menu & Logo */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-2xl hover:bg-white/10 p-2 rounded-lg transition-all duration-200 focus:outline-none"
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open menu"
            >
              <FaBars />
            </button>
            
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center gap-2">
              <div className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center">
                <FaUserGraduate className="text-blue-300" />
              </div>
              <span className="font-bold text-sm">IISD</span>
            </div>
          </div>

          {/* Center - Title (Desktop) */}
          <div className="hidden md:flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
              <FaUserGraduate className="text-xl" />
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-wide">INDIAN INSTITUTE OF SKILL DEVELOPMENT</h1>
              <p className="text-xs text-blue-200">Empowering Futures, Building Careers</p>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="hidden sm:flex p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <FaSun className="text-yellow-300" /> : <FaMoon className="text-gray-200" />}
            </button>

            {/* Notifications Dropdown */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none"
                aria-label="Notifications"
              >
                <IoMdNotificationsOutline className="text-2xl" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Panel */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                    <h3 className="font-semibold text-gray-800 dark:text-white">Notifications</h3>
                    <button className="text-xs text-blue-600 hover:text-blue-700">Mark all read</button>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notif) => (
                      <div
                        key={notif.id}
                        className={`p-3 border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors ${
                          !notif.read ? "bg-blue-50 dark:bg-blue-900/20" : ""
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className="text-2xl">{notif.icon}</div>
                          <div className="flex-1">
                            <p className={`text-sm ${!notif.read ? "font-semibold text-gray-800 dark:text-white" : "text-gray-600 dark:text-gray-300"}`}>
                              {notif.title}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{notif.message}</p>
                            <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{notif.time}</p>
                          </div>
                          {!notif.read && <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-gray-200 dark:border-gray-700">
                    <Link to="/notifications" className="text-xs text-blue-600 hover:text-blue-700">
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/10 transition-all duration-200 focus:outline-none"
                aria-label="Profile menu"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center shadow-md">
                  <FaUserCircle className="text-white text-xl" />
                </div>
                <span className="hidden md:inline text-sm font-medium">John Doe</span>
                <FaChevronDown className={`hidden md:inline text-xs transition-transform duration-200 ${isProfileOpen ? "rotate-180" : ""}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-2xl overflow-hidden z-50 border border-gray-200 dark:border-gray-700">
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <p className="font-semibold text-gray-800 dark:text-white">John Doe</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">john.doe@iisd.edu</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Student ID: IIST2024001</p>
                  </div>
                  <div className="py-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FaUserCircle className="text-gray-400" />
                      My Profile
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      <FaCog className="text-gray-400" />
                      Settings
                    </Link>
                    <hr className="my-1 border-gray-200 dark:border-gray-700" />
                    <button
                      className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      onClick={() => {
                        // Handle logout
                        setIsProfileOpen(false);
                      }}
                    >
                      <FaSignOutAlt />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Bar - Quick Stats (Optional) */}
       
      </nav>

      {/* Sidebar - Desktop */}
      <div className="hidden md:block fixed left-0 top-0 h-screen z-30">
        <Sidebar />
      </div>

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="h-full w-72">
            <Sidebar />
          </div>
          <div
            className="flex-1 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        </div>
      )}

      {/* Spacer for fixed navbar height */}
      <div className="h-16 md:h-20"></div>

      {/* Mobile Bottom Navigation Bar (Optional) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 shadow-lg border-t border-gray-200 dark:border-gray-700 z-40">
        <div className="flex justify-around py-2">
          <Link to="/" className="flex flex-col items-center p-2 text-blue-600">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/></svg>
            <span className="text-xs mt-1">Home</span>
          </Link>
          <Link to="/results" className="flex flex-col items-center p-2 text-gray-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/></svg>
            <span className="text-xs mt-1">Results</span>
          </Link>
          <Link to="/attendance" className="flex flex-col items-center p-2 text-gray-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"/><path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"/></svg>
            <span className="text-xs mt-1">Attendance</span>
          </Link>
          <Link to="/profile" className="flex flex-col items-center p-2 text-gray-500">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"/></svg>
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </div>
      </div>

      {/* Add padding for mobile bottom nav */}
      <div className="md:hidden h-14"></div>
    </>
  );
};

export default Navbar;