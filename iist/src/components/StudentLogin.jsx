import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import StudentResult from "./StudentResult";
import logo from "../images/IISD.855d404de3a326ca6293.webp";

export default function StudentLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0); // ✅ progress state

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setProgress(0);

    // 🚀 Progress bar auto increase
    let value = 0;
    const interval = setInterval(() => {
      value += 2; // 2% har 100ms -> 5 sec me 100%
      setProgress(value);
      if (value >= 100) {
        clearInterval(interval);
      }
    }, 100);

    try {
      const res = await axios.post("/students/login", { username, password });
      // ⏳ Delay 5 sec before showing result
      setTimeout(() => {
        setStudentData(res.data);
        setLoading(false);
      }, 5000);
    } catch {
      clearInterval(interval);
      setLoading(false);
      setError("Invalid username or password");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white px-4 relative">
      {/* ===== LOADER OVERLAY ===== */}
      {loading && (
        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-50">
          <p className="text-lg font-semibold text-gray-800 mb-4">
            Fetching Your Result
          </p>

          {/* Typing dots animation */}
          <div className="flex space-x-2 mb-6">
            <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></span>
            <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:200ms]"></span>
            <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce [animation-delay:400ms]"></span>
          </div>

          {/* Progress Bar */}
          <div className="w-64 h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-700">{progress}%</p>
        </div>
      )}

      {!studentData ? (
        <div className="w-full max-w-md">
          {/* ===== LOGO & HEADER ===== */}
          <div className="text-center mb-6">
            <img src={logo} alt="IIST Logo" className="mx-auto w-24 h-24 mb-3" />
            <h1 className="text-lg font-bold text-gray-800">
              INDIAN INSTITUTE OF SKILL DEVELOPMENT
            </h1>
            <p className="text-gray-700 font-medium">
              भारतीय कौशल विकास संस्थान
            </p>
            <h2 className="text-xl font-bold text-black mt-2">Exam Outcome</h2>
          </div>

          {/* ===== LOGIN FORM ===== */}
          <form
            onSubmit={handleLogin}
            className="bg-[#002b6b] rounded-2xl p-6 shadow-lg"
          >
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">
               Enrollment No / Roll No
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Your Student Code"
                className="w-full bg-white px-4 py-2 rounded-full border border-gray-300 focus:outline-none text-gray-700 text-sm"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">
                Session Year (e.g., 2001)
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Your Password"
                className="w-full bg-white px-4 py-2 rounded-full border border-gray-300 focus:outline-none text-gray-700 text-sm"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full ${
                loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
              } text-white py-2 rounded-full font-semibold transition`}
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </form>
        </div>
      ) : (
        <StudentResult studentData={studentData} />
      )}
    </div>
  );
}
