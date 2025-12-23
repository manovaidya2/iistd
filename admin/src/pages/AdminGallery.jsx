import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AdminGallery() {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const [items, setItems] = useState([]);

  const fetchGallery = async () => {
    try {
      const res = await fetch("https://api.iist.ind.in//api/gallery");
      const data = await res.json();
      setItems(data);
    } catch (err) {
      toast.error("Failed to fetch gallery");
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

const handleUpload = async (e) => {
  e.preventDefault();
  if (!title || !image) {
    toast.error("Please provide a title and an image");
    return;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("image", image);

  try {
    const res = await fetch("https://api.iist.ind.in/api/gallery", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");

    toast.success("Image uploaded successfully!");
    setTitle("");
    setImage(null);
    await fetchGallery(); // ensure toast shows before re-render
  } catch (err) {
    toast.error("Failed to upload image");
  }
};

const handleDelete = async (id) => {
  try {
    const res = await fetch(`https://api.iist.ind.in/api/gallery/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) throw new Error("Delete failed");

    toast.success("Image deleted successfully!");
    await fetchGallery(); // wait for re-render
  } catch (err) {
    toast.error("Failed to delete image");
  }
};

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Gallery Upload</h2>

      {/* Upload Form */}
      <form onSubmit={handleUpload} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border p-2 w-full"
          accept="image/*"
          required
        />
        <button className="bg-blue-900 text-white px-4 py-2 rounded">
          Upload
        </button>
      </form>

      {/* Uploaded Items */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item._id} className="relative border rounded shadow">
            <img
              src={`https://api.iist.ind.in${item.image}`}
              alt={item.title}
              className="w-full h-32 object-cover"
            />
            <p className="text-center p-2">{item.title}</p>
            <button
              onClick={() => handleDelete(item._id)}
              className="absolute top-1 right-1 bg-red-600 text-white px-2 py-1 text-xs rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
