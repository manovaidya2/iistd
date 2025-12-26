import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function ProgramListWithCourses() {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [courses, setCourses] = useState(null);
  const [loading, setLoading] = useState(false);

  // Edit state
  const [editing, setEditing] = useState(null); // { category, index }
  const [form, setForm] = useState({
    name: "",
    level: "",
    duration: "",
  });

  /* ================= FETCH PROGRAMS ================= */
  const fetchPrograms = async () => {
    const res = await axios.get("/skill-programs");
    setPrograms(res.data);
  };

  /* ================= FETCH COURSES ================= */
  const fetchCourses = async (programId) => {
    setLoading(true);
    const res = await axios.get(
      `/skillprogramdetails/${programId}/courses`
    );
    setCourses(res.data.courses || {});
    setLoading(false);
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  /* ================= MODAL ================= */
  const openModal = (program) => {
    setSelectedProgram(program);
    fetchCourses(program._id);
  };

  const closeModal = () => {
    setSelectedProgram(null);
    setCourses(null);
    setEditing(null);
  };

  /* ================= EDIT ================= */
  const startEdit = (category, index, course) => {
    setEditing({ category, index });
    setForm(course);
  };

  const updateCourse = async () => {
    const { category, index } = editing;

    await axios.put(
      `/skillprogramdetails/${selectedProgram._id}/courses/${category}/${index}`,
      form
    );

    await fetchCourses(selectedProgram._id);
    setEditing(null);
  };

  /* ================= DELETE ================= */
  const deleteCourse = async (category, index) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    await axios.delete(
      `/skillprogramdetails/${selectedProgram._id}/courses/${category}/${index}`
    );

    fetchCourses(selectedProgram._id);
  };

  /* ================= TABLE RENDER ================= */
  const renderCourseTable = (title, category, data = []) => (
    <div className="mb-6">
      <h3 className="font-semibold mb-2">{title}</h3>

      {data.length === 0 ? (
        <p className="text-sm text-gray-500">No courses</p>
      ) : (
        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Level</th>
              <th className="border p-2">Duration</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((c, i) => (
              <tr key={i}>
                <td className="border p-2">{c.name}</td>
                <td className="border p-2">{c.level}</td>
                <td className="border p-2">{c.duration}</td>
                <td className="border p-2 flex gap-2">
                  <button
                    onClick={() => startEdit(category, i, c)}
                    className="px-2 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteCourse(category, i)}
                    className="px-2 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );

  /* ================= JSX ================= */
  return (
    <div className="max-w-5xl mx-auto py-10">
      <h2 className="text-xl font-bold mb-5">Skill Programs</h2>

      {/* PROGRAM LIST */}
      <table className="w-full border mb-10">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Program Name</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {programs.map((p) => (
            <tr key={p._id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">
                <button
                  onClick={() => openModal(p)}
                  className="px-4 py-1 bg-blue-600 text-white rounded"
                >
                  View Courses
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* MODAL */}
      {selectedProgram && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999]">
          <div className="bg-white w-[90%] max-w-4xl p-6 rounded shadow-lg overflow-y-auto max-h-[90vh]">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">
                {selectedProgram.name} – Courses
              </h2>
              <button
                onClick={closeModal}
                className="text-red-600 font-bold"
              >
                ✕
              </button>
            </div>

            {loading ? (
              <p>Loading courses...</p>
            ) : (
              <>
                {renderCourseTable(
                  "Certificate Courses",
                  "certificate",
                  courses?.certificate
                )}
                {renderCourseTable(
                  "Diploma Courses",
                  "diploma",
                  courses?.diploma
                )}
                {renderCourseTable(
                  "Advanced Diploma Courses",
                  "advancedDiploma",
                  courses?.advancedDiploma
                )}
              </>
            )}

            {/* EDIT FORM */}
            {editing && (
              <div className="border p-4 mt-6 rounded bg-gray-50">
                <h4 className="font-semibold mb-3">Edit Course</h4>

                <input
                  className="border p-2 w-full mb-2"
                  placeholder="Course Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <input
                  className="border p-2 w-full mb-2"
                  placeholder="Level"
                  value={form.level}
                  onChange={(e) =>
                    setForm({ ...form, level: e.target.value })
                  }
                />

                <input
                  className="border p-2 w-full mb-3"
                  placeholder="Duration"
                  value={form.duration}
                  onChange={(e) =>
                    setForm({ ...form, duration: e.target.value })
                  }
                />

                <div className="flex gap-2">
                  <button
                    onClick={updateCourse}
                    className="bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => setEditing(null)}
                    className="bg-gray-400 px-4 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
