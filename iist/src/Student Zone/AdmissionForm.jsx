import React, { useState, useRef } from "react";
import axios from "../api/axiosInstance";
import SignatureCanvas from "react-signature-canvas";

export default function AdmissionForm() {
  const [formData, setFormData] = useState({});
  const [uploadSign, setUploadSign] = useState(null);
  const studentSignRef = useRef(null);

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle file uploads
  const handleFile = (e, field) => {
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const fd = new FormData();

      // Append all text inputs
    Object.entries(formData).forEach(([key, value]) => {
  if (
    key !== "photo" &&
    key !== "idProof" &&
    key !== "addressProof" &&
    key !== "uploadSign"
  ) {
    fd.append(key, value);
  }
});


      if (formData.photo) fd.append("photo", formData.photo);
if (formData.idProof) fd.append("idProof", formData.idProof);
if (formData.addressProof) fd.append("addressProof", formData.addressProof);
if (uploadSign) fd.append("uploadSign", uploadSign);

// Digital signature
const digitalSign = studentSignRef.current.toDataURL("image/png");
fd.append("digitalStudentSignature", digitalSign);

      // Send request
      const res = await axios.post("/admission", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("Form Submitted Successfully!");
      } else {
        alert("Submission Failed!");
      }
    } catch (err) {
      console.error("Form Submit Error:", err);
      alert("Server Error — Form Not Submitted!");
    }
  };

  return (
  <div className="p-8 max-w-5xl mx-auto my-10 bg-white shadow-2xl rounded-2xl border">

      <h1 className="text-4xl font-bold mb-6 text-center text-blue-700">
        IISD – Student Admission Form
      </h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* ======================== SECTION A ======================== */}
        <h2 className="col-span-full text-2xl font-semibold mt-4 border-b pb-2">
          A. Course Details
        </h2>

        {[
          ["Program Type", "programType"],
          ["Course Name", "courseName"],
          ["Batch / Session", "batch"],
          ["Counsellor Name / Ref ID", "counsellor"],
        ].map(([label, name]) => (
          <div key={name} className="flex flex-col">
            <label className="font-medium">{label}</label>
            <input
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              name={name}
              onChange={handleChange}
            />
          </div>
        ))}

        {/* ======================== SECTION B ======================== */}
        <h2 className="col-span-full text-2xl font-semibold mt-4 border-b pb-2">
          B. Personal Information
        </h2>

        {[
          ["Full Name", "fullName"],
          ["Father's Name", "fatherName"],
          ["Mother's Name", "motherName"],
          ["Gender", "gender"],
          ["Date of Birth", "dob"],
          ["Blood Group", "bloodGroup"],
          ["Nationality", "nationality"],
          ["Category", "category"],
          ["Marital Status", "maritalStatus"],
        ].map(([label, name]) => (
          <div key={name} className="flex flex-col">
            <label className="font-medium">{label}</label>
            <input
              className="border p-3 rounded-lg focus:ring-2 focus:ring-blue-500"
              name={name}
              onChange={handleChange}
            />
          </div>
        ))}

        {/* ======================== SECTION C ======================== */}
        <h2 className="col-span-full text-2xl font-semibold mt-4 border-b pb-2">
          C. Contact Information
        </h2>

        {[
          ["Mobile Number", "mobile"],
          ["Alternate Mobile Number", "altMobile"],
          ["Email", "email"],
          ["Emergency Contact Person", "emergencyPerson"],
          ["Emergency Contact Number", "emergencyNumber"],
        ].map(([label, name]) => (
          <div key={name} className="flex flex-col">
            <label>{label}</label>
            <input className="border p-3 rounded-lg" name={name} onChange={handleChange} />
          </div>
        ))}

        <div className="col-span-full flex flex-col">
          <label>Present Address</label>
          <input className="border p-3 rounded-lg" name="presentAddress" onChange={handleChange} />
        </div>

        <div className="col-span-full flex flex-col">
          <label>Permanent Address</label>
          <input className="border p-3 rounded-lg" name="permanentAddress" onChange={handleChange} />
        </div>

        {/* ======================== DOCUMENT UPLOAD ======================== */}
        <h2 className="col-span-full text-2xl font-semibold mt-4 border-b pb-2">
          D. Upload Documents
        </h2>

        {[
          ["Passport Size Photo", "photo"],
          ["ID Proof (PDF / Image)", "idProof"],
          ["Address Proof (PDF / Image)", "addressProof"],
        ].map(([label, name]) => (
          <div key={name} className="flex flex-col">
            <label>{label}</label>
            <input
              type="file"
              className="border p-3 rounded-lg"
              onChange={(e) => handleFile(e, name)}
            />
          </div>
        ))}

        {/* ======================== SIGNATURE ======================== */}
        <h2 className="col-span-full text-2xl font-semibold mt-4 border-b pb-2">
          E. Student Signature
        </h2>

        <div className="col-span-full flex flex-col">
          <label>Upload Signature (PDF / Image)</label>
          <input
            type="file"
            className="border p-3 rounded-lg"
            onChange={(e) => setUploadSign(e.target.files[0])}
          />
        </div>

        <div className="col-span-full mt-4">
          <label>Digital Signature</label>

          <div className="w-full border-2 rounded-xl mt-2 bg-gray-50 overflow-hidden">
            <SignatureCanvas
              ref={studentSignRef}
              penColor="black"
              canvasProps={{ className: "w-full h-40" }}
            />
          </div>

          <button
            type="button"
            className="mt-3 bg-red-500 text-white px-5 py-2 rounded-lg"
            onClick={() => studentSignRef.current.clear()}
          >
            Clear Signature
          </button>
        </div>

        <button className="col-span-full mt-6 bg-blue-600 text-white p-4 rounded-lg">
          Submit Form
        </button>
      </form>
    </div>
  );
}
