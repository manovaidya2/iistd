import React, { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

// Default export React component — drop this file in your components folder and import where needed
export default function FormDownloadComponent() {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    fetchFiles();
  }, []);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/forms");
      const payload = res.data || {};
      const list = payload.forms || payload.data || payload || [];
      setFiles(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Failed to fetch forms:", err);
      setFiles([]);
    } finally {
      setLoading(false);
    }
  };

  const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename || "download.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const handleDownload = async (item) => {
    setDownloadingId(item._id || item.pdfFile);
    try {
      try {
        const attempt = await axiosInstance.get(`/forms/${item._id}/download`, {
          responseType: "blob",
        });
        const disposition = attempt.headers?.["content-disposition"] || "";
        let filename = item.pdfFile || item.formName || "file.pdf";
        const match = /filename\*=UTF-8''(.+)$/.exec(disposition) || /filename="?([^";]+)"?/.exec(disposition);
        if (match && match[1]) filename = decodeURIComponent(match[1]);
        downloadBlob(attempt.data, filename);
        setDownloadingId(null);
        return;
      } catch (err) {
        console.debug("Blob endpoint failed, falling back", err);
      }

      const base = (axiosInstance.defaults && axiosInstance.defaults.baseURL) || process.env.REACT_APP_API_URL || window.location.origin;
      let apiBase = base.replace(/\/?api\/?$/, "");

      if (!item.pdfFile) {
        const openUrl = `${apiBase}/api/forms/${item._id}/download`;
        window.open(openUrl, "_blank");
        setDownloadingId(null);
        return;
      }

      const fileUrl = `${apiBase}/uploads/${item.pdfFile}`;
      window.open(fileUrl, "_blank");
    } catch (error) {
      console.error("Download failed", error);
      alert("Download failed. Check console for details.");
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <header className="mb-6 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-extrabold mb-2">Download Form</h1>
        <p className="text-xs sm:text-sm opacity-80">Tap download to get the PDF.</p>
      </header>

      <div className="bg-gradient-to-r from-white to-gray-50 rounded-2xl p-4 sm:p-6 shadow-lg">
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : files.length === 0 ? (
          <div className="text-center py-12">No forms found.</div>
        ) : (
          <ul className="space-y-4">
            {files.map((item) => (
              <li
                key={item._id || item.pdfFile}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border"
              >
                <div className="flex-1 text-center sm:text-left">
                  <div className="font-semibold text-base sm:text-lg">{item.formName || item.title || item.pdfFile}</div>
                  <div className="text-xs opacity-70 mt-1">Uploaded: {new Date(item.createdAt || item.created_at || item.updatedAt || Date.now()).toLocaleString()}</div>
                </div>

                <div className="flex items-center justify-center sm:justify-end gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => handleDownload(item)}
                    className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-white font-medium shadow-lg transform transition-all focus:outline-none focus:ring-4 focus:ring-opacity-30 w-full sm:w-auto justify-center ${
                      downloadingId === (item._id || item.pdfFile)
                        ? "opacity-80 scale-95"
                        : "hover:-translate-y-0.5"
                    }`}
                    style={{
                      background: "#1a4e92",
                    }}
                  >
                    {downloadingId === (item._id || item.pdfFile) ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582M20 20v-5h-.581M4 20l16-16" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v12m0 0l-4-4m4 4l4-4" />
                      </svg>
                    )}

                    <span>{downloadingId === (item._id || item.pdfFile) ? "Downloading..." : "Download"}</span>
                  </button>

                  <a
                    href={item.pdfFile ? `/uploads/${item.pdfFile}` : `#`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm opacity-80 underline hidden sm:inline"
                    onClick={(e) => {
                      if (item.pdfFile) {
                        e.preventDefault();
                        const base = (axiosInstance.defaults && axiosInstance.defaults.baseURL) || process.env.REACT_APP_API_URL || window.location.origin;
                        const apiBase = base.replace(/\/?api\/?$/, "");
                        window.open(`${apiBase}/uploads/${item.pdfFile}`, "_blank");
                      }
                    }}
                  >
                    Preview
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <footer className="mt-6 text-center sm:text-left text-xs opacity-70">If downloads don't work in development, ensure your backend serves uploads publicly.</footer>
    </div>
  );
}