import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function SkillDevelopmentPrograms() {
  const [programs, setPrograms] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get("/skill-programs");
        setPrograms(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError("Failed to load programs. Please try again later.");
      }
    };
    fetchPrograms();
  }, []);

  return (
    <div className="bg-white py-10">
      {/* Section Title */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-blue-900 uppercase">
          Skill Development Programs
        </h2>
      </div>

      {error && (
        <p className="text-center text-red-600 font-medium mb-6">{error}</p>
      )}

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 md:px-16">
        {programs.map((program, index) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden shadow-md group"
          >
            <img
              src={`https://api.iist.ind.in/uploads/${program.image}`}
              alt={program.title}
              className="w-full h-52 object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute bottom-0 w-full bg-black bg-opacity-50 text-white text-center py-2 font-semibold">
              {program.title}
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-10">
        <button className="bg-blue-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-800 transition">
          Explore More
        </button>
      </div>
    </div>
  );
}
