import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";


const SkillProgramDetails = () => {
  /* ================= EXISTING PROGRAMS ================= */
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
  axiosInstance
    .get("/skill-programs") // ✅ CORRECT ENDPOINT
    .then((res) => {
      setPrograms(res.data);
    })
    .catch((err) => {
      console.error("Failed to fetch programs", err);
    });
}, []);


  /* ================= MANUAL ADD ================= */
  const [manualPrograms, setManualPrograms] = useState([
    {
      title: "",
      visible: true,
      placeholder: "Certificate Course",
      courses: [{ name: "", level: "", duration: "" }],
    },
    {
      title: "",
      visible: false,
      placeholder: "Diploma Course",
      courses: [{ name: "", level: "", duration: "" }],
    },
    {
      title: "",
      visible: false,
      placeholder: "Advanced Diploma Course",
      courses: [{ name: "", level: "", duration: "" }],
    },
  ]);

  const handleProgramTitle = (p, value) => {
    const updated = [...manualPrograms];
    updated[p].title = value;
    setManualPrograms(updated);
  };

  const handleCourseChange = (p, c, field, value) => {
    const updated = [...manualPrograms];
    updated[p].courses[c][field] = value;
    setManualPrograms(updated);
  };

  const addMoreCourse = (p) => {
    const updated = [...manualPrograms];
    updated[p].courses.push({ name: "", level: "", duration: "" });
    setManualPrograms(updated);
  };

  const showNextProgram = (p) => {
    const updated = [...manualPrograms];
    if (updated[p + 1]) updated[p + 1].visible = true;
    setManualPrograms(updated);
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
  if (!selectedProgram?._id) {
    alert("Please select program");
    return;
  }

  const payload = {
    certificate: manualPrograms[0].courses.filter(c => c.name),
    diploma: manualPrograms[1].courses.filter(c => c.name),
    advancedDiploma: manualPrograms[2].courses.filter(c => c.name),
  };

  try {
    setLoading(true);
    await axiosInstance.post(
      `/skillprogramdetails/${selectedProgram._id}/courses`,
      payload
    );
    alert("Courses saved successfully");
  } catch (err) {
    alert("Failed to save courses");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-8">
<div className="flex justify-start mb-4">
  <button
    onClick={() => navigate("/program-course")}
    className="bg-gray-800 text-white px-4 py-2 rounded text-sm hover:bg-gray-900"
  >
    ← View Program Courses
  </button>
</div>

        {/* ================= SELECT PROGRAM ================= */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-lg font-semibold mb-3">
            Select Existing Skill Program
          </h2>

          <select
            onChange={(e) =>
              setSelectedProgram(
                programs.find((p) => p._id === e.target.value)
              )
            }
            className="w-full border rounded px-3 py-2 text-sm"
          >
            <option value="">-- Select Program --</option>
            {programs.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          {selectedProgram && (
            <div className="mt-3 text-sm text-gray-600">
              <b>{selectedProgram.title}</b> <br />
              Level: {selectedProgram.level} | Duration:{" "}
              {selectedProgram.duration}
            </div>
          )}
        </div>

        {/* ================= MANUAL ADD ================= */}
        <div>
          <h2 className="text-xl font-semibold mb-4">
            Add Courses to Selected Program
          </h2>

          {manualPrograms.map(
            (program, pIndex) =>
              program.visible && (
                <div
                  key={pIndex}
                  className="bg-white rounded-lg shadow p-4 mb-6"
                >
                  <input
                    type="text"
                    placeholder={program.placeholder}
                    value={program.title}
                    onChange={(e) =>
                      handleProgramTitle(pIndex, e.target.value)
                    }
                    className="w-full mb-3 border rounded px-3 py-2 text-sm font-medium"
                  />

                  {program.courses.map((course, cIndex) => (
                    <div
                      key={cIndex}
                      className="grid sm:grid-cols-3 gap-3 mb-3"
                    >
                      <input
                        placeholder="Course Name"
                        value={course.name}
                        onChange={(e) =>
                          handleCourseChange(
                            pIndex,
                            cIndex,
                            "name",
                            e.target.value
                          )
                        }
                        className="border rounded px-3 py-2 text-sm"
                      />
                      <input
                        placeholder="Level"
                        value={course.level}
                        onChange={(e) =>
                          handleCourseChange(
                            pIndex,
                            cIndex,
                            "level",
                            e.target.value
                          )
                        }
                        className="border rounded px-3 py-2 text-sm"
                      />
                      <input
                        placeholder="Duration"
                        value={course.duration}
                        onChange={(e) =>
                          handleCourseChange(
                            pIndex,
                            cIndex,
                            "duration",
                            e.target.value
                          )
                        }
                        className="border rounded px-3 py-2 text-sm"
                      />
                    </div>
                  ))}

                  <div className="flex gap-4 text-sm">
                    <button
                      onClick={() => addMoreCourse(pIndex)}
                      className="text-indigo-600"
                    >
                      + Add Course
                    </button>

                    {manualPrograms[pIndex + 1] &&
                      !manualPrograms[pIndex + 1].visible && (
                        <button
                          onClick={() => showNextProgram(pIndex)}
                          className="text-green-600"
                        >
                          + Add Next Program
                        </button>
                      )}
                  </div>
                </div>
              )
          )}
        </div>

        {/* ================= SAVE BUTTON ================= */}
        <div className="text-center">
          <button
            onClick={handleSave}
            disabled={loading}
            className="bg-indigo-600 text-white px-6 py-2 rounded text-sm hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Saving..." : "Save Courses"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SkillProgramDetails;
