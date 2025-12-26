import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import React from "react";
import logo from "../images/logo transparent.webp"; // apna logo path daalna
export default function Footer() {
  return (
    <footer className="bg-[#003366] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        
        {/* Left Logo + Social Icons */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          {/* Logo */}
          <img
            src={logo}// apna logo path daalna
            alt="Logo"
            className="w-24 h-24"
          />

          {/* Social Icons */}
          <div className="flex space-x-4">
            <a href="#" className="bg-[#00aced] p-3 rounded-full">
              <FaFacebook className="text-white text-xl" />
            </a>
            <a href="#" className="bg-[#00aced] p-3 rounded-full">
              <FaTwitter className="text-white text-xl" />
            </a>
            <a href="#" className="bg-[#00aced] p-3 rounded-full">
              <FaLinkedin className="text-white text-xl" />
            </a>
            <a href="#" className="bg-[#00aced] p-3 rounded-full">
              <FaInstagram className="text-white text-xl" />
            </a>
          </div>
        </div>

        {/* About Us */}
        <div>
          <h3 className="text-xl font-bold mb-4">ABOUT US</h3>
          <ul className="space-y-2">
            <li>➤ Our Inspiration</li>
            <li>➤ Skill Development in India</li>
            <li>➤ Our Affilation</li>
          </ul>
        </div>

        {/* Skill Training Programs */}
        <div>
          <h3 className="text-xl font-bold mb-4">SKILL TRAINING PROGRAMS</h3>
          <ul className="space-y-2">
            <li>➤ Computer Science and IT</li>
            <li>➤ Teacher Training</li>
            <li>➤ Hospital and Health Management</li>
            <li>➤ Beauty, Wellness and Cosmetics</li>
            <li>➤ Arts and Paintings</li>
            <li>➤ Tailoring</li>
            <li>➤ Business Management</li>
            <li>➤ Safety Management</li>
            <li>➤ Industrial Trade Skills</li>
            <li>➤ Technical Trade Skills</li>
            <li>➤ Hotel, Hospitality, Tour and Travels</li>
            <li>➤ Designing</li>
          </ul>
        </div>

        {/* Franchisee */}
        <div>
          <h3 className="text-xl font-bold mb-4">FRANCHISEE</h3>
          <ul className="space-y-2">
            <li>➤ Apply for New Franchisee</li>
            <li>➤ Approval Process</li>
            <li>➤ Center Renewal</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
