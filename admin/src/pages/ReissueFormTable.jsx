import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function ReissueFormTable() {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  // =========================
  // FETCH DATA
  // =========================
  const fetchData = async () => {
    try {
      const res = await axiosInstance.get("/reissue-form");
      if (res.data.success) {
        setData(res.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.log("Fetch Error:", error);
      setLoading(false);
    }
  };

  // =========================
  // DELETE ITEM
  // =========================
  const deleteItem = async (id) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      const res = await axiosInstance.delete(`/reissue-form/${id}`);

      if (res.data.success) {
        alert("Deleted Successfully!");
        fetchData();
      }
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Backend URL for file previews/downloads
 const fileUrl = (filename) =>
  filename ? `https://api.iist.ind.in/uploads/${filename}` : null;


  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Certificate Reissue Applications</h1>

      {loading ? (
        <div className="text-center text-xl font-semibold py-10">Loading...</div>
      ) : (
        <div className="overflow-x-auto shadow-lg border rounded-lg">
          <table className="table-auto w-full text-left">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Mobile</th>
                <th className="p-3">Course</th>
                <th className="p-3">Enrollment No.</th>
                <th className="p-3">Reason</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item) => (
                <tr
                  key={item._id}
                  className="border-b hover:bg-gray-100 transition"
                >
                  <td className="p-3">{item.fullName}</td>
                  <td className="p-3">{item.mobile}</td>
                  <td className="p-3">{item.courseName}</td>
                  <td className="p-3">{item.enrollmentNumber}</td>
                  <td className="p-3">{item.reason}</td>

                  <td className="p-3 flex gap-3 justify-center">
                    <button
                      className="bg-green-600 text-white px-4 py-1 rounded"
                      onClick={() => setSelected(item)}
                    >
                      View
                    </button>

                    <button
                      className="bg-red-600 text-white px-4 py-1 rounded"
                      onClick={() => deleteItem(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ============================
          VIEW POPUP
      ============================ */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-6 z-[9999]">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">

            <button
              className="absolute top-3 right-3 text-black text-2xl"
              onClick={() => setSelected(null)}
            >
              ✖
            </button>

            <h2 className="text-2xl font-bold mb-4">Reissue Form Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <p><b>Full Name:</b> {selected.fullName}</p>
              <p><b>Guardian:</b> {selected.guardianName}</p>
              <p><b>DOB:</b> {selected.dob}</p>
              <p><b>Mobile:</b> {selected.mobile}</p>
              <p><b>Email:</b> {selected.email}</p>
              <p><b>Aadhaar:</b> {selected.aadhaar}</p>
              <p><b>Address:</b> {selected.address}</p>
              <p><b>Course:</b> {selected.courseName}</p>
              <p><b>Level/Module:</b> {selected.levelModule}</p>
              <p><b>Enrollment No:</b> {selected.enrollmentNumber}</p>
              <p><b>Batch Session:</b> {selected.batchSession}</p>
              <p><b>Year of Passing:</b> {selected.yearOfPassing}</p>
              <p><b>Reason:</b> {selected.reason}</p>
              <p><b>Other Reason:</b> {selected.otherReason}</p>
              <p><b>Place:</b> {selected.place}</p>
              <p><b>Date:</b> {selected.date}</p>
            </div>

            {/* ============================
                FILE DOWNLOADS
            ============================ */}
            <h3 className="text-xl font-semibold mt-5">Uploaded Files</h3>

            <div className="grid grid-cols-2 gap-4 mt-3">
              {[
                "idProof",
                "oldCertificate",
                "affidavit",
                "photo",
                "receipt",
                "signature",
              ].map(
                (field) =>
                  selected[field] && (
                    <a
                      key={field}
                      href={fileUrl(selected[field])}
                      download
                      target="_blank"
                      className="bg-blue-600 text-white px-4 py-2 rounded text-center"
                    >
                      Download {field}
                    </a>
                  )
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
