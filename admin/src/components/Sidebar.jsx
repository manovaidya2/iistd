import React from "react";
import { Link } from "react-router-dom";
import logo from "../../public/IISD.855d404de3a326ca6293.webp"; // Replace with your logo path
import {
  FaTachometerAlt,
  FaBook,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaFileAlt,
  FaCalendarAlt,
  FaUsers,
} from "react-icons/fa";

const Sidebar = () => {
  const sections = [
    {
      title: "Student",
      links: [
        { name: "Dashboard", icon: <FaTachometerAlt />, path: "#" },
        { name: "Result", icon: <FaBook />, path: "/results" },
        { name: "Courses", icon: <FaFileAlt />, path: "/courses" },
        { name: "Assignments", icon: <FaBook />, path: "#" },
      ],
    },
    {
      title: "Admin",
      links: [
        { name: "Dashboard", icon: <FaTachometerAlt />, path: "#" },
        { name: "Skill Program", icon: <FaUserGraduate />, path: "/admin_skill" },
        { name: "Skill Program Details", icon: <FaUserGraduate />, path: "/skill-program-details" },
        { name: "Gallery", icon: <FaChalkboardTeacher />, path: "/admin-gallery" },
        { name: "Contact", icon: <FaFileAlt />, path: "/contact-list" },
        { name: "Timetable", icon: <FaCalendarAlt />, path: "#" },
        { name: "Users", icon: <FaUsers />, path: "#" },
      ],
    },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4 flex flex-col">
      {/* Logo + Name */}
     <div className="flex items-center mb-6">
  <img
    src={logo} // Replace with your logo path
    alt="IIST Logo"
    className="w-10 h-10 object-contain" // Adjust size as needed
  />
  <span className="ml-3 text-xl font-bold">IIST</span>
</div>


      {/* Sections */}
      <div className="flex-1 overflow-y-auto">
        {sections.map((section, idx) => (
          <div key={idx} className="mb-6">
            <h3 className="text-gray-400 font-semibold mb-2 border-b border-gray-600 pb-1">
              {section.title}
            </h3>
            <ul>
              {section.links.map((link, i) => (
                <li key={i} className="mb-2">
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-700 transition"
                  >
                    <span>{link.icon}</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
