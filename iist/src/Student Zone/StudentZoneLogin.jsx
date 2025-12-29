import React, { useState } from "react";
import logo from "../images/IISD.855d404de3a326ca6293.webp";

export default function StudentZoneLogin() {
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setProgress(0);

    let value = 0;
    const interval = setInterval(() => {
      value += 2;
      setProgress(value);
      if (value >= 100) clearInterval(interval);
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setLoading(false);

      if (studentId.trim() && password.trim()) {
        setStudentData({
          name: "Student",
          username: studentId,
          role: "Student",
          session: password,
        });
      } else {
        setError("Please enter Student ID and Password");
      }
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-start items-center bg-white px-4 sm:px-6 lg:px-8 relative pt-16">
      {loading && (
        <div className="absolute inset-0 bg-white/80 flex flex-col items-center justify-center z-50">
          <p className="text-lg font-semibold text-gray-800 mb-4">Logging in...</p>
          <div className="flex space-x-2 mb-6">
            <span className="w-3 h-3 bg-orange-500 rounded-full animate-bounce"></span>
            <span className="w-3 h-3 bg-orange-500 rounded-full [animation-delay:200ms]"></span>
            <span className="w-3 h-3 bg-orange-500 rounded-full [animation-delay:400ms]"></span>
          </div>
          <div className="w-64 max-w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="mt-2 text-sm font-medium text-gray-700">{progress}%</p>
        </div>
      )}

      {!studentData ? (
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-lg">
          <div className="text-center mb-6 px-2 sm:px-0">
            <img src={logo} alt="IIST Logo" className="mx-auto w-24 sm:w-28 h-24 sm:h-28 mb-4" />
            <h1 className="text-base sm:text-xl md:text-2xl lg:text-2xl font-semibold text-gray-800 text-center whitespace-normal md:whitespace-nowrap">
              INDIAN INSTITUTE OF SKILLS TRAINING
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium mt-1">
               भारतीय कौशल प्रशिक्षण संस्थान
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold text-black mt-3 tracking-wide">
              STUDENT LOGIN
            </h2>
          </div>

          <form
            onSubmit={handleLogin}
            className="bg-[#002b6b] rounded-3xl p-6 sm:p-8 shadow-2xl sm:shadow-3xl"
          >
            {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

            <div className="mb-4">
              <label className="block text-white font-semibold mb-2">Student ID</label>
              <input
                type="text"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value)}
                placeholder="Enter Student ID"
                className="w-full bg-white px-4 py-2 rounded-full border border-gray-300 focus:outline-none text-gray-700 text-sm sm:text-base"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-white font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full bg-white px-4 py-2 rounded-full border border-gray-300 focus:outline-none text-gray-700 text-sm sm:text-base"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-1/2 sm:w-2/3 mx-auto block ${
                loading ? "bg-gray-400" : "bg-orange-500 hover:bg-orange-600"
              } text-white py-2 rounded-full font-semibold transition`}
            >
              {loading ? "Processing..." : "Login"}
            </button>
          </form>

          {/* Links outside form */}
          <div className="mt-4 mb-6 flex justify-center items-center space-x-3 sm:space-x-6">
            <a href="#" className="text-base sm:text-lg text-black hover:text-orange-800">
              Forgot Your Password?
            </a>
            <span className="w-px h-5 bg-gray-400 hidden sm:block"></span>
            <a href="/application-form" className="text-base sm:text-lg text-black hover:text-orange-800">
              Apply For Franchise
            </a>
          </div>
        </div>
      ) : (
        <div className="text-center mt-6">
          <h2 className="text-xl font-bold text-gray-800">Welcome, {studentData.username}!</h2>
          <p className="text-gray-700 mt-2">You are logged in as a Student</p>
        </div>
      )}
    </div>
  );
}
