import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../api/axiosInstance";
import { FaDownload, FaFileAlt, FaFileSignature } from "react-icons/fa";

export default function DownloadsSection() {
  const { id } = useParams();
  const [brochures, setBrochures] = useState([]);

  useEffect(() => {
    const fetchBrochures = async () => {
      try {
        const res = await axiosInstance.get(`/student-programs/${id}`);
        setBrochures(res.data.brochures || []);
      } catch (error) {
        console.error("Error fetching brochures:", error);
      }
    };
    fetchBrochures();
  }, [id]);

  // ✅ Corrected download handler
  const handleDownload = async (file) => {
    try {
      const baseURL = import.meta.env.VITE_API_BASE_URL || "https://api.iisd.io";
      const fileURL = `${baseURL}/uploads/brochures/${file}`; // ✅ Corrected path

      console.log("📥 Downloading from:", fileURL);

      const response = await axiosInstance.get(fileURL, { responseType: "blob" });
      const blob = new Blob([response.data], { type: "application/pdf" });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = file; // Use original filename
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("❌ Error downloading brochure:", error);
      alert("Failed to download the brochure. Please try again.");
    }
  };

  return (
    <section className="bg-[#f9fafc] py-10 px-6 md:px-12">
      <div className="max-w-5xl mx-auto text-center space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1a4e92]">
          Downloads & Forms
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Access important documents, admission and examination forms, and official brochures below.
        </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mt-8">

  {/* Brochure Download Buttons */}
  {brochures.length > 0 ? (
    brochures.map((file, index) => (
      <button
        key={index}
        onClick={() => handleDownload(file)}
        className="bg-[#1a4e92] text-white py-6 px-5 rounded-2xl shadow-md 
                   hover:shadow-lg hover:scale-[1.03] transition-transform 
                   flex flex-col items-center justify-center gap-3"
      >
        <FaDownload className="text-2xl" />
        <span className="font-semibold text-lg">Download Brochure</span>
      </button>
    ))
  ) : (
    <p className="text-gray-500 col-span-4">No brochures available for this program.</p>
  )}

  {/* Static Buttons with Correct Icons */}

  <a
    href="/admission-form"
    className="bg-[#16437d] text-white py-6 px-5 rounded-2xl shadow-md hover:shadow-lg 
               hover:scale-[1.03] transition-transform flex flex-col items-center 
               justify-center gap-3"
  >
    <FaFileSignature className="text-2xl" />
    <span className="font-semibold text-lg">Student Admission Form</span>
  </a>

  <a
    href="/examination-form"
    className="bg-[#123764] text-white py-6 px-5 rounded-2xl shadow-md hover:shadow-lg 
               hover:scale-[1.03] transition-transform flex flex-col items-center 
               justify-center gap-3"
  >
    <FaFileAlt className="text-2xl" />
    <span className="font-semibold text-lg">Exam Form</span>
  </a>

  <a
    href="/self-declaration-form"
    className="bg-[#123764] text-white py-6 px-5 rounded-2xl shadow-md hover:shadow-lg 
               hover:scale-[1.03] transition-transform flex flex-col items-center 
               justify-center gap-3"
  >
    <FaFileAlt className="text-2xl" />
    <span className="font-semibold text-lg">Self Declaration</span>
  </a>

  <a
    href="/certificate-reissue-form"
    className="bg-[#123764] text-white py-6 px-5 rounded-2xl shadow-md hover:shadow-lg 
               hover:scale-[1.03] transition-transform flex flex-col items-center 
               justify-center gap-3"
  >
    <FaFileAlt className="text-2xl" />
    <span className="font-semibold text-lg">Certificate Reissue Form</span>
  </a>

  <a
    href="/intership-form"
    className="bg-[#123764] text-white py-6 px-5 rounded-2xl shadow-md hover:shadow-lg 
               hover:scale-[1.03] transition-transform flex flex-col items-center 
               justify-center gap-3"
  >
    <FaFileAlt className="text-2xl" />
    <span className="font-semibold text-lg">Internship Form</span>
  </a>

  <a
    href="/medium-of-instruction-form"
    className="bg-[#123764] text-white py-6 px-5 rounded-2xl shadow-md hover:shadow-lg 
               hover:scale-[1.03] transition-transform flex flex-col items-center 
               justify-center gap-3"
  >
    <FaFileAlt className="text-2xl" />
    <span className="font-semibold text-lg">Instruction Form</span>
  </a>

  <a
    href="/download-form"
    className="bg-[#123764] text-white py-6 px-5 rounded-2xl shadow-md hover:shadow-lg 
               hover:scale-[1.03] transition-transform flex flex-col items-center 
               justify-center gap-3"
  >
    <FaDownload className="text-2xl" />
    <span className="font-semibold text-lg">Download All Form PDFs</span>
  </a>
</div>

      </div>
    </section>
  );
}      