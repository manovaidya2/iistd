import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function ExaminationData() {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    loadForms();
  }, []);

  const loadForms = async () => {
    try {
      const res = await axiosInstance.get("/examination");
      if (res.data.success) setForms(res.data.data);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const approveForm = async (id) => {
    await axiosInstance.patch(`/examination/${id}/approve`);
    loadForms();
  };

  const rollbackForm = async (id) => {
    await axiosInstance.patch(`/examination/${id}/rollback`);
    loadForms();
  };

  const deleteForm = async (id) => {
    if (!confirm("Are you sure you want to delete this record?")) return;
    await axiosInstance.delete(`/examination/${id}`);
    loadForms();
  };

  const downloadBase64 = (base64, filename) => {
    const link = document.createElement("a");
    link.href = base64;
    link.download = filename;
    link.click();
  };

  const downloadFile = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
  };

  if (loading)
    return <p className="text-center p-10 text-xl">Loading...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Examination Form Submissions
      </h1>

      {/* TABLE */}
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="min-w-full border text-sm">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">Student</th>
              <th className="border p-2">Course</th>
              <th className="border p-2">Contact</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {forms.map((form, index) => (
              <tr key={form._id} className="border hover:bg-gray-50">
                <td className="border p-2 text-center">{index + 1}</td>

                <td className="border p-2">{form.fullName}</td>

                <td className="border p-2">
                  {form.courseName} <br />
                  <span className="text-xs text-gray-600">
                    {form.examSession}
                  </span>
                </td>

                <td className="border p-2">
                  {form.contactNumber} <br />
                  <span className="text-xs">{form.email}</span>
                </td>

                <td className="border p-2 text-center">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      form.status === "Approved"
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    }`}
                  >
                    {form.status}
                  </span>
                </td>

                <td className="border p-2 flex gap-2 justify-center">
                  <button
                    onClick={() => {
                      setSelected(form);
                      setShowModal(true);
                    }}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                  >
                    View
                  </button>

                  {form.status === "Pending" && (
                    <button
                      onClick={() => approveForm(form._id)}
                      className="px-3 py-1 bg-green-600 text-white rounded"
                    >
                      Approve
                    </button>
                  )}

                  {form.status === "Approved" && (
                    <button
                      onClick={() => rollbackForm(form._id)}
                      className="px-3 py-1 bg-yellow-600 text-white rounded"
                    >
                      Rollback
                    </button>
                  )}

                  <button
                    onClick={() => deleteForm(form._id)}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {showModal && selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
          <div className="bg-white w-4/5 max-h-[85vh] overflow-y-auto p-6 rounded-lg shadow-xl">

            <h2 className="text-2xl font-bold mb-4">
              Examination Form - {selected.fullName}
            </h2>

            {/* SECTION A */}
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">
                Section A – Exam Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p><b>Session:</b> {selected.examSession}</p>
                <p><b>Course:</b> {selected.courseName}</p>
                <p><b>Semester:</b> {selected.semester}</p>
                <p><b>Exam Type:</b> {selected.examType}</p>
                <p><b>Enrollment No:</b> {selected.enrollmentNo}</p>
                <p><b>Roll No:</b> {selected.rollNo}</p>
              </div>
            </div>

            {/* SECTION B */}
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">
                Section B – Personal Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <p><b>Name:</b> {selected.fullName}</p>
                <p><b>Father Name:</b> {selected.fatherName}</p>
                <p><b>DOB:</b> {selected.dob}</p>
                <p><b>Gender:</b> {selected.gender}</p>
                <p><b>Category:</b> {selected.category}</p>
                <p><b>Contact:</b> {selected.contactNumber}</p>
                <p><b>Email:</b> {selected.email}</p>
              </div>
            </div>

            {/* SECTION C */}
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">
                Section C – Address
              </h3>
              <p><b>Present Address:</b> {selected.presentAddress}</p>
              <p><b>Permanent Address:</b> {selected.permanentAddress}</p>
              <p><b>Emergency Contact:</b> {selected.emergencyContact}</p>
            </div>

            {/* SECTION D */}
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">
                Section D – Subjects
              </h3>

              <table className="w-full border text-sm">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border p-2">Code</th>
                    <th className="border p-2">Name</th>
                    <th className="border p-2">Type</th>
                    <th className="border p-2">Mode</th>
                  </tr>
                </thead>
                <tbody>
                  {selected.subjects?.map((sub, i) => (
                    <tr key={i}>
                      <td className="border p-2">{sub.code}</td>
                      <td className="border p-2">{sub.name}</td>
                      <td className="border p-2">{sub.type}</td>
                      <td className="border p-2">{sub.mode}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* SIGNATURES */}
            <div className="mb-4">
              <h3 className="font-bold text-lg mb-2">Signatures</h3>

              <div className="flex gap-10">
                <div>
                  <p className="font-semibold">Uploaded Signature</p>
                  {selected.uploadSign ? (
                    <>
                      <img
                        src={`https://api.iist.ind.in/${selected.uploadSign}`}
                        className="w-40 h-20 border rounded object-contain"
                      />

                      <button
                        onClick={() =>
                          downloadFile(
                            `https://api.iist.ind.in/${selected.uploadSign}`,
                            "uploaded-signature.png"
                          )
                        }
                        className="mt-2 px-3 py-1 bg-black text-white rounded text-sm"
                      >
                        Download
                      </button>
                    </>
                  ) : (
                    <p>No Signature Uploaded</p>
                  )}
                </div>

                <div>
                  <p className="font-semibold">Digital Signature</p>
                  {selected.digitalSignature ? (
                    <>
                      <img
                        src={selected.digitalSignature}
                        className="w-40 h-20 border rounded bg-white object-contain"
                      />

                      <button
                        onClick={() =>
                          downloadBase64(
                            selected.digitalSignature,
                            "digital-signature.png"
                          )
                        }
                        className="mt-2 px-3 py-1 bg-black text-white rounded text-sm"
                      >
                        Download
                      </button>
                    </>
                  ) : (
                    <p>No Digital Signature</p>
                  )}
                </div>
              </div>
            </div>

            {/* DATE */}
            <div className="mt-4">
              <p><b>Date:</b> {selected.date}</p>
              <p><b>Place:</b> {selected.place}</p>
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 px-5 py-2 bg-black text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
