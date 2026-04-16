import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../public/IISD.855d404de3a326ca6293.webp";
import {
  FaTachometerAlt,
  FaBook,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaFileAlt,
  FaCalendarAlt,
  FaUsers,
  FaChevronDown,
  FaChevronUp,
  FaWpforms,
  FaCog,
  FaSignOutAlt,
  FaClipboardList,
  FaRegClock,
  FaAward,
  FaCertificate,
  FaBriefcase,
  FaRegFileAlt,
  FaChartLine,
  FaBell,
  FaQuestionCircle,
  FaStar,
  FaGraduationCap,
  FaUserCog,
  FaLayerGroup,
} from "react-icons/fa";
import { IoSettingsSharp, IoDocumentText } from "react-icons/io5";
import { MdSpaceDashboard, MdOutlineAdminPanelSettings } from "react-icons/md";

const Sidebar = () => {
  const [openForms, setOpenForms] = useState(false);
  const [openAcademics, setOpenAcademics] = useState(false);
  const [openAdminPanel, setOpenAdminPanel] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="relative h-full">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 opacity-95 rounded-2xl shadow-2xl" />
      
      <div className="relative z-10 w-72 bg-gray-900/80 backdrop-blur-sm text-white h-full p-5 flex flex-col border-r border-gray-700/50 shadow-xl">
        {/* Logo Section with Animation */}
        <div className="flex items-center gap-3 mb-8 pb-2 border-b border-gray-700/50 group">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500 rounded-full blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300" />
            <img 
              src={logo} 
              alt="IIST Logo" 
              className="relative w-11 h-11 object-contain rounded-full bg-gray-800 p-1.5 shadow-lg" 
            />
          </div>
          <div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              IIST
            </span>
            <p className="text-[10px] text-gray-400 -mt-1">Indian Institute of Science & Technology</p>
          </div>
        </div>

        {/* User Profile Summary */}
       
      

        <div className="flex-1 overflow-y-auto custom-scrollbar pr-1">
          {/* ================= STUDENT SECTION ================= */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3 px-2">
              <FaGraduationCap className="text-blue-400 text-sm" />
              <h3 className="text-gray-300 font-semibold text-xs uppercase tracking-wider">
                Student Portal
              </h3>
            </div>

            <ul className="space-y-1.5">
              {/* Dashboard */}
              <li>
                <Link
                  to="#"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive("/dashboard")
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/20"
                      : "hover:bg-gray-800/60 hover:translate-x-1"
                  }`}
                >
                  <MdSpaceDashboard className={`text-lg ${isActive("/dashboard") ? "text-white" : "text-gray-400 group-hover:text-blue-400"}`} />
                  <span className="text-sm font-medium">Dashboard</span>
                </Link>
              </li>

              {/* Results */}
              <li>
                <Link
                  to="/results"
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
                    isActive("/results")
                      ? "bg-gradient-to-r from-blue-600 to-blue-700 shadow-lg shadow-blue-500/20"
                      : "hover:bg-gray-800/60 hover:translate-x-1"
                  }`}
                >
                  <FaChartLine className={`text-lg ${isActive("/results") ? "text-white" : "text-gray-400 group-hover:text-blue-400"}`} />
                  <span className="text-sm font-medium">Results & Analysis</span>
                </Link>
              </li>

              {/* Academics Dropdown */}
              <li>
                <button
                  onClick={() => setOpenAcademics(!openAcademics)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-gray-800/60 group"
                >
                  <div className="flex items-center gap-3">
                    <FaBook className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                    <span className="text-sm font-medium">Academics</span>
                  </div>
                  <div className={`transform transition-transform duration-200 ${openAcademics ? "rotate-180" : ""}`}>
                    <FaChevronDown className="text-gray-400 text-xs" />
                  </div>
                </button>

                {openAcademics && (
                  <ul className="ml-8 mt-2 space-y-1.5 border-l border-gray-700 pl-3">
                    <li><Link to="/courses" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800/40">📚 My Courses</Link></li>
                    <li><Link to="/attendance" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800/40"><FaRegClock /> Attendance</Link></li>
                    <li><Link to="/timetable" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800/40"><FaCalendarAlt /> Timetable</Link></li>
                    <li><Link to="/assignments" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800/40"><IoDocumentText /> Assignments</Link></li>
                  </ul>
                )}
              </li>

              {/* Forms Dropdown */}
              <li>
                <button
                  onClick={() => setOpenForms(!openForms)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-gray-800/60 group"
                >
                  <div className="flex items-center gap-3">
                    <FaWpforms className="text-gray-400 group-hover:text-blue-400 transition-colors" />
                    <span className="text-sm font-medium">Forms & Applications</span>
                  </div>
                  <div className={`transform transition-transform duration-200 ${openForms ? "rotate-180" : ""}`}>
                    <FaChevronDown className="text-gray-400 text-xs" />
                  </div>
                </button>

                {openForms && (
                  <ul className="ml-8 mt-2 space-y-1.5 border-l border-gray-700 pl-3">
                    <li><Link to="/admin-admission-list" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800/40">📝 Student Admission Form</Link></li>
                    <li><Link to="/examination-data" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800/40">📋 Examination Form</Link></li>
                    <li><Link to="/declaration-list" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800/40">✅ Self Declaration</Link></li>
                    <li><Link to="/reissue-form" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800/40">🔄 Certificate Reissue</Link></li>
                    <li><Link to="/internship-form" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800/40">💼 Internship Application</Link></li>
                    <li><Link to="/instruction-form" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-800/40">📖 Instruction Form</Link></li>
                    <li><a href="/form-upload" target="_blank" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-green-400 transition-colors rounded-lg hover:bg-gray-800/40">📤 Upload Documents</a></li>
                  </ul>
                )}
              </li>

              {/* Achievements */}
              <li>
                <Link
                  to="/achievements"
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-gray-800/60 hover:translate-x-1 group"
                >
                  <FaStar className="text-gray-400 group-hover:text-yellow-400 transition-colors" />
                  <span className="text-sm font-medium">Achievements</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= ADMIN SECTION ================= */}
          <div className="mb-6 pt-2">
            <div className="flex items-center gap-2 mb-3 px-2">
              <MdOutlineAdminPanelSettings className="text-purple-400 text-sm" />
              <h3 className="text-gray-300 font-semibold text-xs uppercase tracking-wider">
                Administration
              </h3>
            </div>

            <ul className="space-y-1.5">
              {/* Admin Panel Dropdown */}
              <li>
                <button
                  onClick={() => setOpenAdminPanel(!openAdminPanel)}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all duration-200 hover:bg-gray-800/60 group"
                >
                  <div className="flex items-center gap-3">
                    <FaUserCog className="text-gray-400 group-hover:text-purple-400 transition-colors" />
                    <span className="text-sm font-medium">Admin Controls</span>
                  </div>
                  <div className={`transform transition-transform duration-200 ${openAdminPanel ? "rotate-180" : ""}`}>
                    <FaChevronDown className="text-gray-400 text-xs" />
                  </div>
                </button>

                {openAdminPanel && (
                  <ul className="ml-8 mt-2 space-y-1.5 border-l border-gray-700 pl-3">
                    <li><Link to="/admin_skill" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-purple-400 transition-colors rounded-lg hover:bg-gray-800/40">🎯 Skill Programs</Link></li>
                    <li><Link to="/skill-program-details" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-purple-400 transition-colors rounded-lg hover:bg-gray-800/40">📊 Program Details</Link></li>
                    <li><Link to="/admin-gallery" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-purple-400 transition-colors rounded-lg hover:bg-gray-800/40">🖼️ Gallery Manager</Link></li>
                    <li><Link to="/contact-list" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-purple-400 transition-colors rounded-lg hover:bg-gray-800/40">📞 Contact Queries</Link></li>
                    <li><Link to="/user-management" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-purple-400 transition-colors rounded-lg hover:bg-gray-800/40">👥 User Management</Link></li>
                    <li><Link to="/system-logs" className="flex items-center gap-2 px-2 py-2 text-sm text-gray-300 hover:text-purple-400 transition-colors rounded-lg hover:bg-gray-800/40">📜 System Logs</Link></li>
                  </ul>
                )}
              </li>

              {/* Quick Stats */}
              <li className="mt-4 pt-2">
                <div className="px-3 py-3 rounded-xl bg-gray-800/40 border border-gray-700/30">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-2">Quick Stats</p>
                  <div className="flex justify-between text-xs">
                    <div>
                      <p className="text-gray-400">Pending</p>
                      <p className="font-semibold text-yellow-400">3 Forms</p>
                    </div>
                    <div>
                      <p className="text-gray-400">New</p>
                      <p className="font-semibold text-blue-400">5 Msgs</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Tasks</p>
                      <p className="font-semibold text-green-400">12</p>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}

      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(55, 65, 81, 0.3);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(59, 130, 246, 0.5);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(59, 130, 246, 0.8);
        }
      `}</style>
    </div>
  );
};

export default Sidebar;