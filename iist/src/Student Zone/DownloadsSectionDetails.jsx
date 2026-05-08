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
      const baseURL =
        import.meta.env.VITE_API_BASE_URL || "https://api.iisd.io";

      const fileURL = `${baseURL}/uploads/brochures/${file}`; // ✅ Corrected path

      console.log("📥 Downloading from:", fileURL);

      const response = await axiosInstance.get(fileURL, {
        responseType: "blob",
      });

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
    <section className="bg-[#f9fafc] py-8 sm:py-10 md:py-12 px-4 sm:px-6 md:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto text-center space-y-6 sm:space-y-8 md:space-y-10">

        <div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#1a4e92] leading-tight">
            Downloads & Forms
          </h2>

          <p className="mt-3 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed px-1">
            Access important documents, admission and examination forms, and
            official brochures below.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 mt-6 sm:mt-8">

          {/* Brochure Download Buttons */}
          {brochures.length > 0 ? (
            brochures.map((file, index) => (
              <button
                key={index}
                onClick={() => handleDownload(file)}
                className="w-full min-h-[118px] sm:min-h-[140px] md:min-h-[155px] bg-[#1a4e92] text-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 text-center"
              >
                <FaDownload className="text-xl sm:text-2xl shrink-0" />

                <span className="font-semibold text-xs sm:text-base md:text-lg leading-snug break-words">
                  Download Brochure
                </span>
              </button>
            ))
          ) : (
            <p className="text-gray-500 text-sm sm:text-base col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-4">
              No brochures available for this program.
            </p>
          )}

          {/* Static Buttons with Correct Icons */}

          <a
            href="/admission-form"
            className="w-full min-h-[118px] sm:min-h-[140px] md:min-h-[155px] bg-[#16437d] text-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 text-center"
          >
            <FaFileSignature className="text-xl sm:text-2xl shrink-0" />

            <span className="font-semibold text-xs sm:text-base md:text-lg leading-snug break-words">
              Student Admission Form
            </span>
          </a>

          <a
            href="/examination-form"
            className="w-full min-h-[118px] sm:min-h-[140px] md:min-h-[155px] bg-[#123764] text-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 text-center"
          >
            <FaFileAlt className="text-xl sm:text-2xl shrink-0" />

            <span className="font-semibold text-xs sm:text-base md:text-lg leading-snug break-words">
              Exam Form
            </span>
          </a>

          <a
            href="/self-declaration-form"
            className="w-full min-h-[118px] sm:min-h-[140px] md:min-h-[155px] bg-[#123764] text-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 text-center"
          >
            <FaFileAlt className="text-xl sm:text-2xl shrink-0" />

            <span className="font-semibold text-xs sm:text-base md:text-lg leading-snug break-words">
              Self Declaration
            </span>
          </a>

          <a
            href="/certificate-reissue-form"
            className="w-full min-h-[118px] sm:min-h-[140px] md:min-h-[155px] bg-[#123764] text-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 text-center"
          >
            <FaFileAlt className="text-xl sm:text-2xl shrink-0" />

            <span className="font-semibold text-xs sm:text-base md:text-lg leading-snug break-words">
              Certificate Reissue Form
            </span>
          </a>

          <a
            href="/intership-form"
            className="w-full min-h-[118px] sm:min-h-[140px] md:min-h-[155px] bg-[#123764] text-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 text-center"
          >
            <FaFileAlt className="text-xl sm:text-2xl shrink-0" />

            <span className="font-semibold text-xs sm:text-base md:text-lg leading-snug break-words">
              Internship Form
            </span>
          </a>

          <a
            href="/medium-of-instruction-form"
            className="w-full min-h-[118px] sm:min-h-[140px] md:min-h-[155px] bg-[#123764] text-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 text-center"
          >
            <FaFileAlt className="text-xl sm:text-2xl shrink-0" />

            <span className="font-semibold text-xs sm:text-base md:text-lg leading-snug break-words">
              Instruction Form
            </span>
          </a>

          <a
            href="/form-download"
            className="w-full min-h-[118px] sm:min-h-[140px] md:min-h-[155px] bg-[#123764] text-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 text-center"
          >
            <FaDownload className="text-xl sm:text-2xl shrink-0" />

            <span className="font-semibold text-xs sm:text-base md:text-lg leading-snug break-words">
              Download All Form PDFs
            </span>
          </a>

        </div>
      </div>
    </section>
  );
}