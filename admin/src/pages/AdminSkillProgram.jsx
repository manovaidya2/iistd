import React, { useState, useEffect } from "react";
import axios from "../api/axiosInstance";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
  

const AdminSkillProgram = () => {
  const [name, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // For Edit Mode
  const [editId, setEditId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  // Fetch existing programs
  const fetchPrograms = async () => {
    try {
      const res = await axios.get("/skill-programs");
      setPrograms(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch programs. Backend may be offline.");
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // Handle Add / Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (!name) {
      setError("Title is required");
      return;
    }

    const formData = new FormData();
    formData.append("title", name);
    if (image) formData.append("image", image);

// Inside handleSubmit
try {
  if (editId) {
    const res = await axios.put(`/skill-programs/${editId}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success(res.data.message || "Program updated successfully");
  } else {
    const res = await axios.post("/skill-programs/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    toast.success(res.data.message || "Program added successfully");
  }

  resetForm();
  fetchPrograms();
} catch (err) {
  console.error(err);
  toast.error("Error saving program. Backend may be offline.");
}

  };

  // Delete program
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this program?")) return;

    // Inside handleDelete
try {
  await axios.delete(`/skill-programs/${id}`);
  toast.success("Program deleted successfully");
  fetchPrograms();
} catch (err) {
  console.error(err);
  toast.error("Error deleting program");
}
  };


  // Edit program
  const handleEdit = (program) => {
    setEditId(program._id);
    setTitle(program.name);
    setPreviewImage(`https://api.iist.ind.in/uploads/${program.image}`);
    setImage(null);
  };

  // Reset form
  const resetForm = () => {
    setEditId(null);
    setTitle("");
    setImage(null);
    setPreviewImage(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
       <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold text-blue-900 mb-6 text-center">
          {editId ? "Edit Skill Program" : "Add Skill Program"}
        </h2>

        {message && (
          <p className="text-center text-sm text-green-600 mb-4">{message}</p>
        )}
        {error && (
          <p className="text-center text-sm text-red-600 mb-4">{error}</p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-8">
          <input
            type="text"
            placeholder="Program Title"
            value={name}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Show preview if editing */}
          {previewImage && !image && (
            <div className="flex items-center gap-4">
              <img
                src={previewImage}
                alt="Preview"
                className="w-24 h-16 object-cover rounded border"
              />
              <span className="text-gray-600 text-sm">Current Image</span>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-3">
            <button
              type="submit"
              className="bg-blue-900 text-white py-2 px-4 rounded hover:bg-blue-800 transition"
            >
              {editId ? "Update Program" : "Add Program"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Table */}
        <h3 className="text-xl font-semibold mb-4">Existing Programs</h3>

        {programs.length === 0 ? (
          <p className="text-gray-500">No programs found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-200 bg-white shadow rounded-lg">
              <thead className="bg-blue-900 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-medium">#</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Title</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Image</th>
                  <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {programs.map((p, index) => (
                  <tr
                    key={p._id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="px-4 py-3 text-sm text-gray-600">{index + 1}</td>
                    <td className="px-4 py-3 text-sm font-semibold text-blue-900">
                      {p.name}
                    </td>
                    <td className="px-4 py-3">
                      {p.image ? (
                        <img
                          src={`https://api.iist.ind.in/uploads/${p.image}`}
                          alt={p.title}
                          className="w-24 h-16 object-cover rounded border"
                        />
                      ) : (
                        <span className="text-gray-400 italic">No image</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleEdit(p)}
                        className="text-sm px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(p._id)}
                        className="text-sm px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
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
      </div>
    </div>
  );
};

export default AdminSkillProgram;
