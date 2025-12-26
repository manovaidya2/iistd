import React, { useState } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaFacebookF,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { MdMenu, MdClose } from "react-icons/md";
import logo from "../images/logo transparent.webp";
import image1 from "../images/Azadi-Ka-Amrit.597390719c236104560f.webp";
import image2 from "../images/g20.719c747b9026a83a245b.webp";
import image3 from "../images/skill-india.496d43bf990bfdbf029b.webp";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
  <header>
  {/* ✅ Mobile Top Contact Bar (sabse upar) */}
  <div className="md:hidden bg-[#003366] text-white text-xs px-4 py-1 flex justify-between items-center">
    <span className="flex items-center gap-2">
      <FaPhoneAlt className="text-[10px]" /> +91-8130543714
    </span>
    <span className="flex items-center gap-2">
      <FaEnvelope className="text-[10px]" /> info@gmail.com
    </span>
  </div>
<div className="md:hidden bg-[#003366] text-white text-xs px-4 py-1 flex justify-between items-center">
    <div className="flex items-center gap-3 text-lg">
      <FaFacebookF />
      <FaTwitter />
      <FaYoutube />
    </div>
    <div className="flex items-center gap-4">
      <a href="#" className="hover:underline">Centre Login</a>
      <a href="/Results" className="hover:underline">Online Results</a>
    </div>
  </div>
  {/* 🔹 Top Bar */}
  <div className="bg-[#003366] text-white text-sm px-4 md:px-8 py-2 flex justify-between items-center">
    {/* ✅ Mobile: Logo + Name */}
    <div className="flex items-center gap-3 md:hidden">
      <img src={logo} alt="Logo" className="h-12 w-12 object-contain" />
      <div>
        <h1 className="text-sm font-bold leading-snug">
         INDIAN INSTITUTE OF SKILLS TRAINING
        </h1>
        <span className="block text-xs">
          भारतीय कौशल प्रशिक्षण संस्थान
        </span>
      </div>
    </div>

    {/* ✅ Mobile Menu */}
    <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
      {menuOpen ? <MdClose /> : <MdMenu />}
    </div>

    {/* ✅ Desktop Topbar (unchanged) */}
    <div className="hidden md:flex items-center gap-4 md:gap-6">
      <span className="flex items-center gap-2">
        <FaPhoneAlt /> +91-8130543714
      </span>
      <span className="flex items-center gap-2">
        <FaEnvelope /> info@gmail.com
      </span>
    </div>
    <div className="hidden md:flex items-center gap-4 text-lg">
      <FaFacebookF className="cursor-pointer hover:text-gray-300" />
      <FaTwitter className="cursor-pointer hover:text-gray-300" />
      <FaYoutube className="cursor-pointer hover:text-gray-300" />
    </div>
 <div className="hidden md:flex items-center gap-6">
  <a href="/center-login" className="font-semibold italic text-sm hover:text-blue-200 transition">
    Centre Login
  </a>
  <a href="/Results" className="font-semibold italic text-sm hover:text-blue-200 transition">
    Online Results
  </a>
</div>


  </div>

  {/* ✅ Mobile Extra Row: Social + Links */}
  


      {/* 🔹 Middle Header (desktop only) */}
      <div className="hidden md:flex flex-col md:flex-row justify-between items-center px-4 md:px-8 py-4 gap-4 md:gap-0">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-20" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-black leading-snug">
             INDIAN INSTITUTE OF SKILLS TRAINING

            </h1>
            <span className="block text-base md:text-lg font-semibold text-gray-800">
             भारतीय कौशल प्रशिक्षण संस्थान
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-10 flex-wrap justify-center">
          <img src={image1} alt="Azadi" className="h-20 w-24 object-contain" />
          <img src={image2} alt="G20" className="h-20 w-24 object-contain" />
          <img src={image3} alt="Skill India" className="h-20 w-24 object-contain" />
        </div>
      </div>

      {/* 🔹 Navigation Bar */}
      <nav className="bg-[#003366] relative">
        {/* Desktop Menu */}
        <ul className="hidden md:flex justify-center gap-6 py-3 text-white font-semibold text-sm flex-wrap">
          <li><a href="/">Home</a></li>
          {/* About Us */}
          <li className="relative group">
            <a href="#" className="flex items-center gap-1">
              About Us <span className="text-xs">▼</span>
            </a>
            <ul className="absolute left-0 top-full bg-white text-black mt-0.5 rounded shadow-lg min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-50">
              <li className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100">
                <a href="/inspiration">Our Inspirations</a>
              </li>
              <li className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100">
                <a href="/skill-development">Skill Development in India</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <a href="/verifycentercode">Affiliations</a>
              </li>
            </ul>
          </li>
          <li><a href="/skilldevelopmentprogram">Programs</a></li>
          {/* Institute Zone */}
          <li className="relative group">
            <a href="#" className=" flex items-center gap-1">
              Institute Zone <span className="text-xs">▼</span>
            </a>
            <ul className="absolute left-0 top-full bg-white text-black mt-0.5 rounded shadow-lg min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-50">
              <li className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100">
                <a href="/center-login">Center Login</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <a href="/verifycentercode">Verify Your Center Code</a>
              </li>
            </ul>
          </li>
          {/* Student Zone */}
          <li className="relative group">
            <a href="#" className="flex items-center gap-1">
              Student Zone <span className="text-xs">▼</span>
            </a>
            <ul className="absolute left-0 top-full bg-white text-black mt-0.5 rounded shadow-lg min-w-[220px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
              <li className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100">
                <a href="/student-login">Student Login</a>
              </li>
              <li className="relative group/admissions">
                <a href="#" className="px-4 py-2 block hover:bg-gray-100 flex justify-between items-center">
                  Admissions <span className="text-xs">▶</span>
                </a>
                <ul className="absolute left-full top-0 bg-white text-black rounded shadow-lg min-w-[200px] opacity-0 invisible group-hover/admissions:opacity-100 group-hover/admissions:visible transition-all duration-200 z-50">
                  <li className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100">
                    <a href="/onDemand-registration">On-demand Admission Form</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="/Candidate-TrainingForm">General Admission Form</a>
                  </li>
                </ul>
              </li>
              <li className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100">
                <a href="#">Academic Calendar</a>
              </li>
              <li className="relative group/exam">
                <a href="#" className="px-4 py-2 block hover:bg-gray-100 flex justify-between items-center">
                  Examination <span className="text-xs">▶</span>
                </a>
                <ul className="absolute left-full top-0 bg-white text-black rounded shadow-lg min-w-[200px] opacity-0 invisible group-hover/exam:opacity-100 group-hover/exam:visible transition-all duration-200 z-50">
                  <li className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100">
                    <a href="/onDemand-registration">On-demand Examination Form</a>
                  </li>
                  <li className="px-4 py-2 hover:bg-gray-100">
                    <a href="#">Calendar Examination Form</a>
                  </li>
                </ul>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100 border-t border-gray-200">
                <a href="#">Advance Learning Management System</a>
              </li>
            </ul>
          </li>
          {/* Franchise */}
          <li className="relative group">
            <a href="#" className=" flex items-center gap-1">
              Franchise <span className="text-xs">▼</span>
            </a>
            <ul className="absolute left-0 top-full bg-white text-black mt-0.5 rounded shadow-lg min-w-[200px] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity duration-200 z-50">
              <li className="px-4 py-2 border-b border-gray-200 hover:bg-gray-100">
                <a href="/applyfranchisee">Apply for New Franchisee</a>
              </li>
              <li className="px-4 py-2 hover:bg-gray-100">
                <a href="#">Center Renewal</a>
              </li>
            </ul>
          </li>
          <li><a href="#" className="hover:">Internship</a></li>
          <li><a href="#" className="hover:">Training</a></li>
          <li><a href="#" className="hover:">Placement</a></li>
          <li><a href="#" className="hover:">Downloads</a></li>
          <li><a href="#" className="hover:">Notifications</a></li>
          <li><a href="/contact-us" className="hover:">Contact Us</a></li>
        </ul>

        {/* Mobile Sidebar */}
        <div className={`fixed top-0 left-0 h-full w-64 bg-[#003366] z-20 transform ${menuOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out md:hidden shadow-lg`}>
          <ul className="flex flex-col gap-3 py-8 px-6 text-white font-semibold text-sm">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Programs</a></li>
            <li><a href="#" className="hover:underline">Institute Zone</a></li>
            <li><a href="#" className="hover:underline">Student Zone</a></li>
            <li><a href="#" className="hover:underline">Franchise</a></li>
            <li><a href="#" className="hover:underline">Internship</a></li>
            <li><a href="#" className="hover:underline">Training</a></li>
            <li><a href="#" className="hover:underline">Placement</a></li>
            <li><a href="#" className="hover:underline">Downloads</a></li>
            <li><a href="#" className="hover:underline">Notifications</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
            <li className="flex items-center gap-4 mt-4">
              <FaFacebookF className="cursor-pointer hover:text-gray-300" />
              <FaTwitter className="cursor-pointer hover:text-gray-300" />
              <FaYoutube className="cursor-pointer hover:text-gray-300" />
            </li>
            <li className="mt-4"><a href="#" className="hover:underline">Centre Login</a></li>
            <li><a href="/Results" className="hover:underline">Online Results</a></li>
          </ul>
        </div>

        {/* Overlay */}
        {menuOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-30 z-10 md:hidden"
            onClick={toggleMenu}
          ></div>
        )}
      </nav>
    </header>
  );
};

export default Header;
