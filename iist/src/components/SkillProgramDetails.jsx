import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../api/axiosInstance";
import DownloadsSection from "../Student Zone/DownloadsSectionDetails";

/* ================= COURSE SECTION ================= */
const CourseSection = ({ title, courses }) => {
  if (!courses || courses.length === 0) return null;

  return (
    <div className="mb-12 flex justify-center">
      <div className="w-full max-w-4xl rounded-xl shadow-lg overflow-hidden bg-white">
        {/* Heading */}
        <div className="bg-[#003366] text-white px-6 py-4 text-lg font-semibold text-center">
          {title}
        </div>

        <table className="w-full">
          <thead className="bg-blue-100">
            <tr>
              <th className="px-6 py-3 text-left">Program Name</th>
            </tr>
          </thead>

          <tbody>
            {courses.map((course, index) => (
              <tr key={index} className="border-b">
                <td className="px-6 py-3 text-left">
                  🎓 {course.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* ================= MAIN COMPONENT ================= */
export default function SkillProgramDetails() {
  const { id } = useParams();

  const [program, setProgram] = useState(null);
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        /* 1️⃣ Fetch ALL programs & find selected one */
        const programRes = await axios.get("/skill-programs");
        const selectedProgram = programRes.data.find(
          (p) => p._id === id
        );
        setProgram(selectedProgram);

        /* 2️⃣ Fetch courses of selected program */
        const courseRes = await axios.get(
          `/skillprogramdetails/${id}/courses`
        );
        setCourses(courseRes.data.courses);

      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  /* ================= LOADING ================= */
  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  /* ================= UI ================= */
  return (
    <div>
      {/* ================= HERO ================= */}
      <div className="bg-[#003366] text-white py-16 mb-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4">
            {program?.name || "Skill Program"}
          </h1>

          <p className="text-sm sm:text-base max-w-3xl mx-auto opacity-90">
            Explore certificate, diploma and advanced diploma courses under{" "}
            <span className="font-semibold">
              {program?.name}
            </span>
          </p>
        </div>
      </div>

      {/* ================= COURSES ================= */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <CourseSection
          title="Certificate Courses"
          courses={courses?.certificate}
        />

        <CourseSection
          title="Diploma Courses"
          courses={courses?.diploma}
        />

        <CourseSection
          title="Advanced Diploma Courses"
          courses={courses?.advancedDiploma}
        />
      </div>
      <DownloadsSection />
    </div>
  );
}
