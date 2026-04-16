import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function AdminDeclarationList() {
  const [declarations, setDeclarations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null); // ✅ For popup modal

  const fetchDeclarations = async () => {
    try {
      const res = await axios.get("/declarations");
      setDeclarations(res.data.declarations);
    } catch (err) {
      console.error("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeclarations();
  }, []);
const handleDelete = async (id) => {
  if (!window.confirm("Are you sure you want to delete this entry?")) return;

  try {
    await axios.delete(`/declaration/${id}`);
    setDeclarations((prev) => prev.filter((item) => item._id !== id));
    setSelectedItem(null);
  } catch (err) {
    console.error("Delete Error:", err);
    alert("Failed to delete.");
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-blue-700">
        📝 Self Declaration Submissions
      </h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : declarations.length === 0 ? (
        <p className="text-gray-600">No submissions found</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
          <table className="w-full border-collapse">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="p-3 text-left">Full Name</th>
                <th className="p-3 text-left">Mobile</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Course</th>
                <th className="p-3 text-left">Exam Date</th>
                <th className="p-3 text-center">Signature</th>
                <th className="p-3 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {declarations.map((item, index) => (
                <tr
                  key={item._id}
                  className={`hover:bg-blue-50 transition ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-50"
                  }`}
                >
                  <td className="p-3">{item.fullName}</td>
                  <td className="p-3">{item.mobile}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.courseName}</td>
                  <td className="p-3">{item.examDate}</td>
                  <td className="p-3 text-center">
                    {item.uploadedSignature ? (
                      <img
                        src={`https://api.iist.ind.in/${item.uploadedSignature}`}
                        className="h-12 mx-auto rounded shadow"
                      />
                    ) : item.drawnSignature ? (
                      <img
                        src={`https://api.iist.ind.in/${item.drawnSignature}`}
                        className="h-12 mx-auto rounded shadow"
                      />
                    ) : (
                      <span className="text-gray-500">No Signature</span>
                    )}
                  </td>
                 <td className="p-3 text-center flex gap-2 justify-center">
  <button
    onClick={() => setSelectedItem(item)}
    className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
  >
    View
  </button>

  <button
    onClick={() => handleDelete(item._id)}
    className="px-3 py-1 bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition"
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

      {/* ✅ POPUP MODAL */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl p-6 w-[600px] max-h-[90vh] overflow-y-auto shadow-2xl">
            <h3 className="text-xl font-bold mb-4 text-blue-700">
              Declaration Details
            </h3>

           <div className="space-y-2">
  {/* TEXT FIELDS */}
  {Object.entries(selectedItem).map(([key, value]) => (
    key !== "uploadedSignature" &&
    key !== "drawnSignature" &&
    key !== "idFile" &&
    key !== "photoFile" &&
    key !== "experienceFile" &&
    key !== "__v" &&
    key !== "createdAt" &&
    key !== "updatedAt" &&
    key !== "_id" && (
      <p key={key}>
        <strong className="capitalize">{key.replace(/([A-Z])/g, " $1")}:</strong> {value}
      </p>
    )
  ))}

  {/* ✅ ID FILE PREVIEW / DOWNLOAD */}
  {selectedItem.idFile && (
    <div className="mt-3">
      <strong>ID File:</strong><br />
      {selectedItem.idFile.endsWith(".jpg") ||
      selectedItem.idFile.endsWith(".png") ||
      selectedItem.idFile.endsWith(".jpeg") ? (
        <img
          src={`https://api.iist.ind.in/${selectedItem.idFile}`}
          className="h-28 mt-2 rounded shadow"
        />
      ) : (
        <a
          href={`https://api.iist.ind.in/${selectedItem.idFile}`}
          download
          className="text-blue-600 underline"
        >
          Download ID File
        </a>
      )}
    </div>
  )}

  {/* ✅ PHOTO FILE PREVIEW */}
  {selectedItem.photoFile && (
    <div className="mt-3">
      <strong>Photo File:</strong><br />
      <img
        src={`https://api.iist.ind.in/${selectedItem.photoFile}`}
        className="h-28 mt-2 rounded shadow"
      />
    </div>
  )}

  {/* ✅ EXPERIENCE FILE DOWNLOAD */}
  {selectedItem.experienceFile && (
    <div className="mt-3">
      <strong>Experience File:</strong><br />
      <a
        href={`https://api.iist.ind.in/${selectedItem.experienceFile}`}
        download
        className="text-blue-600 underline"
      >
        Download Experience Document
      </a>
    </div>
  )}

  {/* ✅ SIGNATURE */}
  <div className="mt-4">
    <strong>Signature:</strong><br />
    {selectedItem.uploadedSignature ? (
      <img
        src={`https://api.iist.ind.in/${selectedItem.uploadedSignature}`}
        className="h-24 mt-2 rounded shadow"
      />
    ) : selectedItem.drawnSignature ? (
      <img
        src={`https://api.iist.ind.in/${selectedItem.drawnSignature}`}
        className="h-24 mt-2 rounded shadow"
      />
    ) : (
      "No Signature"
    )}
  </div>
</div>


            <button
              onClick={() => setSelectedItem(null)}
              className="mt-6 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
