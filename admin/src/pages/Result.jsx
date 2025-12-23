import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export default function Result() {
     const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    result: {
      course: "",
      name: "",
      rollNo: "",
      enrollmentNo: "",
      fatherName: "",
      srNo: "",
      session: "",
      subjects: [],
      totalFull: "",
      totalPass: "",
      totalObt: "",
      remarks: "",
      percentage: "",
      grade: "",
      status: "",
      place: "",
    },
  });

  const [subject, setSubject] = useState({
    sno: "",
    name: "",
    full: "",
    pass: "",
    obtained: "",
  });

  // Add subject
  // Add subject
const addSubject = () => {
  if (!subject.name || !subject.full || !subject.obtained) {
    toast.error("Please fill subject details before adding.");
    return;
  }
  setForm({
    ...form,
    result: {
      ...form.result,
      subjects: [...form.result.subjects, subject],
    },
  });
  setSubject({ sno: "", name: "", full: "", pass: "", obtained: "" });
  toast.success("Subject added successfully!");
};

// Submit form
const handleSubmit = async (e) => {
  e.preventDefault();

  // Basic validations
  if (!form.username.trim()) {
    toast.error("Username (Roll No) is required");
    return;
  }
  if (!form.result.session.trim()) {
    toast.error("Session is required");
    return;
  }
  if (!form.result.name.trim()) {
    toast.error("Student name is required");
    return;
  }
  if (!form.result.rollNo.trim()) {
    toast.error("Roll number is required");
    return;
  }
  if (!form.result.course.trim()) {
    toast.error("Course is required");
    return;
  }
  if (form.result.subjects.length === 0) {
    toast.error("Please add at least one subject");
    return;
  }

  // Optional: Validate each subject
  for (let i = 0; i < form.result.subjects.length; i++) {
    const sub = form.result.subjects[i];
    if (!sub.name || !sub.full || !sub.obtained) {
      toast.error(`Subject ${i + 1} is incomplete`);
      return;
    }
  }

  try {
    await axios.post("https://api.iist.ind.in/api/students/upload", form);
    toast.success("Result uploaded successfully!");

    // Reset form
    setForm({
      username: "",
      result: {
        course: "",
        name: "",
        rollNo: "",
        enrollmentNo: "",
        fatherName: "",
        srNo: "",
        session: "",
        subjects: [],
        totalFull: "",
        totalPass: "",
        totalObt: "",
        remarks: "",
        percentage: "",
        grade: "",
        status: "",
        place: "",
      },
    });
  } catch (err) {
    console.error(err);
    toast.error("Failed to upload result. Please try again.");
  }
};


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center ">
        <ToastContainer position="top-right" autoClose={3000} />
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-indigo-800">
            Admin - Upload Student Result
          </h2>
          <button
            onClick={() => navigate("/view-results")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow-md transition"
          >
            View Results
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Student Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Username (Roll No)"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Session Year (Password)"
              value={form.result.session}
              onChange={(e) =>
                setForm({ ...form, result: { ...form.result, session: e.target.value } })
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Course"
              value={form.result.course}
              onChange={(e) =>
                setForm({ ...form, result: { ...form.result, course: e.target.value } })
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Student Name"
              value={form.result.name}
              onChange={(e) =>
                setForm({ ...form, result: { ...form.result, name: e.target.value } })
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Roll No"
              value={form.result.rollNo}
              onChange={(e) =>
                setForm({ ...form, result: { ...form.result, rollNo: e.target.value } })
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Father's Name"
              value={form.result.fatherName}
              onChange={(e) =>
                setForm({ ...form, result: { ...form.result, fatherName: e.target.value } })
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Enrollment No"
              value={form.result.enrollmentNo}
              onChange={(e) =>
                setForm({ ...form, result: { ...form.result, enrollmentNo: e.target.value } })
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Sr. No"
              value={form.result.srNo}
              onChange={(e) =>
                setForm({ ...form, result: { ...form.result, srNo: e.target.value } })
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* Subject Add Section */}
          <div className="border rounded-lg p-4 bg-gray-50 shadow-sm">
            <h4 className="font-semibold text-indigo-700 mb-3">Add Subject</h4>
            <div className="flex flex-wrap gap-2 mb-3">
              <input
                placeholder="S.No"
                value={subject.sno}
                onChange={(e) => setSubject({ ...subject, sno: e.target.value })}
                className="border px-2 py-1 rounded-md w-16 focus:ring-2 focus:ring-indigo-400"
              />
              <input
                placeholder="Name"
                value={subject.name}
                onChange={(e) => setSubject({ ...subject, name: e.target.value })}
                className="border px-2 py-1 rounded-md flex-1 focus:ring-2 focus:ring-indigo-400"
              />
              <input
                placeholder="Full Marks"
                value={subject.full}
                onChange={(e) => setSubject({ ...subject, full: e.target.value })}
                className="border px-2 py-1 rounded-md w-24 focus:ring-2 focus:ring-indigo-400"
              />
              <input
                placeholder="Pass Marks"
                value={subject.pass}
                onChange={(e) => setSubject({ ...subject, pass: e.target.value })}
                className="border px-2 py-1 rounded-md w-24 focus:ring-2 focus:ring-indigo-400"
              />
              <input
                placeholder="Obtained"
                value={subject.obtained}
                onChange={(e) => setSubject({ ...subject, obtained: e.target.value })}
                className="border px-2 py-1 rounded-md w-24 focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="button"
                onClick={addSubject}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded-md transition"
              >
                Add
              </button>
            </div>

            {form.result.subjects.length > 0 && (
              <table className="w-full border rounded-md overflow-hidden text-sm shadow-sm">
                <thead>
                  <tr className="bg-indigo-100 text-indigo-800">
                    <th className="border px-2 py-1">S.No</th>
                    <th className="border px-2 py-1">Subject</th>
                    <th className="border px-2 py-1">Full</th>
                    <th className="border px-2 py-1">Pass</th>
                    <th className="border px-2 py-1">Obtained</th>
                  </tr>
                </thead>
                <tbody>
                  {form.result.subjects.map((subj, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="border px-2 py-1">{subj.sno}</td>
                      <td className="border px-2 py-1">{subj.name}</td>
                      <td className="border px-2 py-1">{subj.full}</td>
                      <td className="border px-2 py-1">{subj.pass}</td>
                      <td className="border px-2 py-1">{subj.obtained}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* Totals & Result */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              placeholder="Total Full Marks"
              value={form.result.totalFull}
              onChange={(e) =>
                setForm({ ...form, result: { ...form.result, totalFull: e.target.value } })
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Total Pass Marks"
              value={form.result.totalPass}
              onChange={(e) =>
                setForm({ ...form, result: { ...form.result, totalPass: e.target.value } })
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Total Obtained Marks"
              value={form.result.totalObt}
              onChange={(e) =>
                setForm({ ...form, result: { ...form.result, totalObt: e.target.value } })
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Remarks (e.g. 73%)"
              value={form.result.remarks}
              onChange={(e) =>
                setForm({ ...form, result: { ...form.result, remarks: e.target.value } })
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Percentage"
              value={form.result.percentage}
              onChange={(e) =>
                setForm({ ...form, result: { ...form.result, percentage: e.target.value } })
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Grade"
              value={form.result.grade}
              onChange={(e) =>
                setForm({ ...form, result: { ...form.result, grade: e.target.value } })
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Result Status (PASS/FAIL)"
              value={form.result.status}
              onChange={(e) =>
                setForm({ ...form, result: { ...form.result, status: e.target.value } })
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
            <input
              placeholder="Place"
              value={form.result.place}
              onChange={(e) =>
                setForm({ ...form, result: { ...form.result, place: e.target.value } })
              }
              className="w-full border px-3 py-2 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="text-center">
            <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow-md transition">
              Upload Result
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
