import React, { useEffect, useState } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import axios from "../api/axiosInstance";
import logo from "../images/logo transparent.webp";

export default function Footer() {
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get("/skill-programs");
        setPrograms(res.data || []);
      } catch (err) {
        console.error("Footer programs fetch error:", err);
      }
    };

    fetchPrograms();
  }, []);

  const footerLinkClass =
    "flex items-start gap-2 text-sm leading-6 text-white/90 hover:text-[#28c7ff] cursor-pointer transition-colors duration-300";

  return (
    <footer className="bg-[#003366] text-white">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          
          {/* LOGO + SOCIAL */}
          <div className="lg:col-span-3">
            <div className="flex flex-col items-center lg:items-start">
              <Link to="/">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-28 h-28 object-contain mb-6 cursor-pointer"
                />
              </Link>

              <p className="text-sm text-white/80 text-center lg:text-left leading-6 max-w-xs mb-6">
                Skill development, training programs and franchisee support.
              </p>

              <div className="flex items-center gap-3">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#00aced] flex items-center justify-center hover:bg-white hover:text-[#003366] transition-all duration-300"
                >
                  <FaFacebook className="text-lg" />
                </a>

                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#00aced] flex items-center justify-center hover:bg-white hover:text-[#003366] transition-all duration-300"
                >
                  <FaTwitter className="text-lg" />
                </a>

                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#00aced] flex items-center justify-center hover:bg-white hover:text-[#003366] transition-all duration-300"
                >
                  <FaLinkedin className="text-lg" />
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-[#00aced] flex items-center justify-center hover:bg-white hover:text-[#003366] transition-all duration-300"
                >
                  <FaInstagram className="text-lg" />
                </a>
              </div>
            </div>
          </div>

          {/* ABOUT + FRANCHISE */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
              
              {/* ABOUT */}
              <div>
                <h3 className="text-lg font-bold mb-4 pb-2 border-b border-white/20">
                  ABOUT US
                </h3>

                <ul className="space-y-2">
                  <li className={footerLinkClass}>
                    <span>➤</span>
                    <Link to="/about" className="hover:text-[#28c7ff] transition-colors">
                    Online Results
                    </Link>
                  </li>

                  <li className={footerLinkClass}>
                    <span>➤</span>
                    <Link to="/inspiration" className="hover:text-[#28c7ff] transition-colors">
                      Our Inspiration
                    </Link>
                  </li>

                  <li className={footerLinkClass}>
                    <span>➤</span>
                    <Link to="/skill-development" className="hover:text-[#28c7ff] transition-colors">
                      Skill Development
                    </Link>
                  </li>
                </ul>
              </div>

              {/* FRANCHISE */}
              <div>
                <h3 className="text-lg font-bold mb-4 pb-2 border-b border-white/20">
                  FRANCHISEE
                </h3>

                <ul className="space-y-2">
                  <li className={footerLinkClass}>
                    <span>➤</span>
                    <Link to="/franchisee" className="hover:text-[#28c7ff] transition-colors">
                      Program
                    </Link>
                  </li>

                  <li className={footerLinkClass}>
                    <span>➤</span>
                    <Link to="/franchisee/apply" className="hover:text-[#28c7ff] transition-colors">
                      Apply for Franchisee
                    </Link>
                  </li>

                  <li className={footerLinkClass}>
                    <span>➤</span>
                    <Link to="/contact-us" className="hover:text-[#28c7ff] transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* PROGRAMS */}
          <div className="lg:col-span-6">
            <h3 className="text-lg font-bold mb-4 pb-2 border-b border-white/20">
              SKILL TRAINING PROGRAMS
            </h3>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 max-h-[360px] overflow-y-auto pr-2">
              {programs.length > 0 ? (
                programs.map((program) => (
                  <li
                    key={program._id}
                    className={footerLinkClass}
                  >
                    <span>➤</span>
                    <Link 
                      to={`/skill-programs/${program._id}`}
                      className="hover:text-[#28c7ff] transition-colors"
                    >
                      {program.name || program.title}
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm text-white/70">
                  No programs found
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/15">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-white/75">
            © {new Date().getFullYear()} All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}