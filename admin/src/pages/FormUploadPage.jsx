  import React, { useState, useEffect } from "react";
  import axiosInstance from "../api/axiosInstance";

  export default function FormUploadPage() {
    const [formName, setFormName] = useState("");
    const [pdf, setPdf] = useState(null);
    const [message, setMessage] = useState("");
    const [uploadedForms, setUploadedForms] = useState([]);
    const [editingId, setEditingId] = useState(null);

    // Fetch uploaded forms
    const fetchUploadedForms = async () => {
      try {
        const res = await axiosInstance.get("/forms");
        const forms = res.data.data || [];
        forms.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        setUploadedForms(forms);
      } catch (err) {
        console.error("Error fetching uploaded forms:", err);
      }
    };

    useEffect(() => {
      fetchUploadedForms();
    }, []);

    // Upload or Update PDF
    const handleUpload = async () => {
      if (!formName) return setMessage("Please enter form name.");
      if (!pdf && !editingId) return setMessage("Please upload a PDF file.");

      const fd = new FormData();
      fd.append("formName", formName);
      if (pdf) fd.append("pdf", pdf);

      try {
        if (editingId) {
          // UPDATE
          await axiosInstance.put(`/forms/${editingId}`, fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setMessage("Updated successfully!");
        } else {
          // CREATE
          await axiosInstance.post("/forms/upload", fd, {
            headers: { "Content-Type": "multipart/form-data" },
          });
          setMessage("Uploaded successfully!");
        }

        setFormName("");
        setPdf(null);
        setEditingId(null);
        fetchUploadedForms();
      } catch (err) {
        console.log(err);
        setMessage("Operation failed!");
      }
    };

    // Delete Form
    const handleDelete = async (id) => {
      if (!window.confirm("Are you sure you want to delete this PDF?")) return;

      try {
        await axiosInstance.delete(`/forms/${id}`);
        fetchUploadedForms();
      } catch (err) {
        console.log(err);
        alert("Delete failed!");
      }
    };

    // Set data for editing
    const handleEdit = (form) => {
      setEditingId(form._id);
      setFormName(form.formName);
      setPdf(null);
    };

    return (
      <div className="p-8 max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Form PDF Manager</h1>

        {/* Upload / Edit Form */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Form Name</label>
          <input
            type="text"
            placeholder="Enter Form Name"
            className="w-full p-3 border rounded bg-gray-100"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />

          <div className="my-4">
            <label className="block font-semibold mb-2">Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              className="w-full"
            />
          </div>

          <button
            onClick={handleUpload}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? "Update PDF" : "Upload PDF"}
          </button>

          {editingId && (
            <button
              onClick={() => {
                setEditingId(null);
                setFormName("");
                setPdf(null);
              }}
              className="ml-4 bg-gray-400 text-white px-6 py-2 rounded"
            >
              Cancel Edit
            </button>
          )}

          {message && <p className="mt-4 font-semibold">{message}</p>}
        </div>

        {/* Uploaded Forms Table */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Uploaded PDFs</h2>
          {uploadedForms.length > 0 ? (
            <table className="min-w-full table-auto border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border px-4 py-2">#</th>
                  <th className="border px-4 py-2">Form Name</th>
                  <th className="border px-4 py-2">File</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {uploadedForms.map((form, index) => (
                  <tr key={form._id} className="text-center">
                    <td className="border px-4 py-2">{index + 1}</td>
                    <td className="border px-4 py-2">{form.formName}</td>
                    <td className="border px-4 py-2">{form.pdfFile}</td>

                    <td className="border px-4 py-2 space-x-3">
                      <a
                        href={`https://api.iist.ind.in/uploads/forms/${form.pdfFile}`}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        Download
                      </a>

                      <button
                        onClick={() => handleEdit(form)}
                        className="text-yellow-600 font-semibold"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(form._id)}
                        className="text-red-600 font-semibold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No forms uploaded yet.</p>
          )}
        </div>
      </div>
    );
  }
