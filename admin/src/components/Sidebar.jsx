import React, { useState } from "react";
import { Link } from "react-router-dom";
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
} from "react-icons/fa";

const Sidebar = () => {
  const [openForms, setOpenForms] = useState(false);

  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4 flex flex-col">
      {/* Logo */}
      <div className="flex items-center mb-6">
        <img src={logo} alt="IIST Logo" className="w-10 h-10 object-contain" />
        <span className="ml-3 text-xl font-bold">IIST</span>
      </div>

      <div className="flex-1 overflow-y-auto">

        {/* ================= STUDENT ================= */}
        <div className="mb-6">
          <h3 className="text-gray-400 font-semibold mb-2 border-b border-gray-600 pb-1">
            Student
          </h3>

          <ul>
            <li className="mb-2">
              <Link to="#" className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-700">
                <FaTachometerAlt /> Dashboard
              </Link>
            </li>

            <li className="mb-2">
              <Link to="/results" className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-700">
                <FaBook /> Result
              </Link>
            </li>

            {/* 🔽 FORMS DROPDOWN */}
            <li>
              <button
                onClick={() => setOpenForms(!openForms)}
                className="w-full flex items-center justify-between px-2 py-2 rounded hover:bg-gray-700"
              >
                <div className="flex items-center gap-2">
                  <FaWpforms />
                  <span>Forms</span>
                </div>
                {openForms ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {openForms && (
                <ul className="ml-6 mt-2 space-y-2 text-sm">
                  <li><Link to="/admin-admission-list" className="block hover:text-blue-400">Student Admission Form</Link></li>
                  <li><Link to="/exam-form" className="block hover:text-blue-400">Exam Form</Link></li>
                  <li><Link to="/self-declaration" className="block hover:text-blue-400">Self Declaration</Link></li>
                  <li><Link to="/certificate-reissue" className="block hover:text-blue-400">Certificate Reissue Form</Link></li>
                  <li><Link to="/internship-form" className="block hover:text-blue-400">Internship Form</Link></li>
                  <li><Link to="/instruction-form" className="block hover:text-blue-400">Instruction Form</Link></li>
                  <li>
                    <a
                      href="/forms/all-forms.pdf"
                      target="_blank"
                      className="block hover:text-green-400"
                    >
                      Download All Form PDFs
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </div>

        {/* ================= ADMIN ================= */}
        <div className="mb-6">
          <h3 className="text-gray-400 font-semibold mb-2 border-b border-gray-600 pb-1">
            Admin
          </h3>

          <ul>
            <li className="mb-2">
              <Link to="/admin_skill" className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-700">
                <FaUserGraduate /> Skill Program
              </Link>
            </li>

            <li className="mb-2">
              <Link to="/skill-program-details" className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-700">
                <FaUserGraduate /> Skill Program Details
              </Link>
            </li>

            <li className="mb-2">
              <Link to="/admin-gallery" className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-700">
                <FaChalkboardTeacher /> Gallery
              </Link>
            </li>

            <li className="mb-2">
              <Link to="/contact-list" className="flex items-center gap-2 px-2 py-2 rounded hover:bg-gray-700">
                <FaFileAlt /> Contact
              </Link>
            </li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Sidebar;
