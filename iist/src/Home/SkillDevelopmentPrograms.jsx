import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

export default function SkillDevelopmentPrograms() {
  const [programs, setPrograms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPrograms = async () => {
      try {
        const res = await axios.get("/skill-programs");
        setPrograms(res.data || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPrograms();
  }, []);

  return (
    <div className="bg-white py-10">
      <h2 className="text-3xl font-bold text-center text-blue-900 mb-10">
        Skill Development Programs
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 md:px-16">
        {programs.map((program) => (
          <div
            key={program._id}
            onClick={() => navigate(`/skill-programs/${program._id}`)}
            className="cursor-pointer rounded-xl overflow-hidden shadow-lg group"
          >
            <img
              src={`https://api.iist.ind.in/uploads/${program.image}`}
              alt={program.title}
              className="w-full h-52 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="bg-black bg-opacity-60 text-white text-center py-2 font-semibold">
              {program.name}
            </div>
          </div>  
        ))}
      </div>
    </div>
  );
}
