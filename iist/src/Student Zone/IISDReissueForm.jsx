import React, { useRef, useState } from "react";
import axiosInstance from "../api/axiosInstance"; // ⬅ import your axios instance

export default function IISDReissueForm() {
  const [form, setForm] = useState({
    fullName: "",
    guardianName: "",
    dob: "",
    mobile: "",
    email: "",
    aadhaar: "",
    address: "",
    courseName: "",
    levelModule: "",
    enrollmentNumber: "",
    batchSession: "",
    yearOfPassing: "",
    reason: "Lost Certificate",
    otherReason: "",
    place: "",
    date: "",
  });

  const fileInputsRef = useRef({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // =============================
      // Create FormData for files
      // =============================
      const formData = new FormData();

      // append text fields
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });

      // append file fields
     // =============================
// Append file fields correctly
// =============================
const fileFields = [
  "idProof",
  "oldCertificate",
  "affidavit",
  "photo",
  "receipt",
  "signature"
];

fileFields.forEach((field) => {
  const fileInput = fileInputsRef.current[field];
  if (fileInput && fileInput.files && fileInput.files.length > 0) {
    formData.append(field, fileInput.files[0]);
  }
});

      // =============================
      // POST API with axiosInstance
      // =============================
      const res = await axiosInstance.post("/reissue-form", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Form submitted successfully!");
console.log("Response:", res.data);
window.location.reload();  // ⬅ Page auto refresh


    } catch (err) {
      console.error("Submit error:", err);
      alert("Submission failed. Check console.");
    }
  };

  const UploadBox = ({ label, name, required }) => (
  <label className="block">
    <span className="text-md font-medium text-gray-800">{label}</span>
    <input
      type="file"
      name={name}
      required={required}
      ref={(el) => (fileInputsRef.current[name] = el)}
      className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white"
    />
  </label>
);


  // -----------------------------------------
  // UI Section (same as before, only API fixed)
  // -----------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl p-6">

        <header className="pb-4 mb-6 border-b">
          <h1 className="text-2xl font-semibold text-gray-800">
            IISD — Certificate Re-Issue Form
          </h1>
          <p className="text-gray-600 text-sm">
            Fill the details below to request a re-issued certificate
          </p>
        </header>

        <form onSubmit={handleSubmit} className="grid gap-8">

          {/* STUDENT DETAILS */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              A. Student Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <label>
                <span className="text-md font-medium text-gray-800">Full Name</span>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </label>

              <label>
                <span className="text-md font-medium text-gray-800">Father/Guardian Name</span>
                <input
                  name="guardianName"
                  value={form.guardianName}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </label>

              <label>
                <span className="text-md font-medium text-gray-800">Date of Birth</span>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </label>

              <label>
                <span className="text-md font-medium text-gray-800">Mobile Number</span>
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="+91 9XXXXXXXXX"
                />
              </label>

              <label>
                <span className="text-md font-medium text-gray-800">Email ID</span>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </label>

              <label>
                <span className="text-md font-medium text-gray-800">Aadhaar (Optional)</span>
                <input
                  name="aadhaar"
                  value={form.aadhaar}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </label>

              <label className="md:col-span-2">
                <span className="text-md font-medium text-gray-800">Address</span>
                <textarea
                  name="address"
                  rows={3}
                  value={form.address}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                ></textarea>
              </label>
            </div>
          </section>

          {/* COURSE DETAILS */}
          <section>
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              B. Course Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

              <label>
                <span className="text-md font-medium text-gray-800">Course Name</span>
                <input
                  name="courseName"
                  value={form.courseName}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </label>

              <label>
                <span className="text-md font-medium text-gray-800">Level / Module</span>
                <input
                  name="levelModule"
                  value={form.levelModule}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </label>

              <label>
                <span className="text-md font-medium text-gray-800">Enrollment No.</span>
                <input
                  name="enrollmentNumber"
                  value={form.enrollmentNumber}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </label>

              <label>
                <span className="text-md font-medium text-gray-800">Batch / Session</span>
                <input
                  name="batchSession"
                  value={form.batchSession}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </label>

              <label>
                <span className="text-md font-medium text-gray-800">Year of Passing</span>
                <input
                  name="yearOfPassing"
                  value={form.yearOfPassing}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </label>
            </div>

            <div className="mt-4">
              <span className="text-md font-medium text-gray-800">
                C. Reason for Certificate Re-Issue
              </span>

              <select
                name="reason"
                value={form.reason}
                onChange={handleChange}
                className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option>Lost Certificate</option>
                <option>Damaged Certificate</option>
                <option>Name Correction</option>
                <option>Printing Error</option>
                <option>Others</option>
              </select>

              {form.reason === "Others" && (
                <input
                  name="otherReason"
                  value={form.otherReason}
                  onChange={handleChange}
                  placeholder="Specify other reason"
                  className="mt-2 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              )}
            </div>
          </section>

          {/* DECLARATION */}
          <section className="bg-gray-50 border rounded-lg p-4">

            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <UploadBox label="Upload Signature" name="signature" required />


              <label>
                <span className="text-md font-medium text-gray-800">Date</span>
                <input
                  type="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </label>

              <label>
                <span className="text-md font-medium text-gray-800">Place</span>
                <input
                  name="place"
                  value={form.place}
                  onChange={handleChange}
                  className="mt-1 w-full border border-gray-300 rounded-lg px-3 py-2"
                />
              </label>
            </div>
          </section>

          {/* DOCUMENT UPLOADS */}
          <section>
            <h3 className="text-md font-semibold text-gray-800 mb-2">
              D. Required Documents
            </h3>

            <div className="grid gap-3">
              <UploadBox label="ID Proof (Aadhaar / PAN / DL)" name="idProof" />
              <UploadBox label="Old Certificate (optional)" name="oldCertificate" />
              <UploadBox label="Affidavit (If certificate lost)" name="affidavit" />
              <UploadBox label="Passport Size Photo" name="photo" />
              <UploadBox label="Payment Receipt" name="receipt" />
            </div>
          </section>

          {/* SUBMIT */}
          <section>
            <h3 className="text-md font-medium text-gray-800 py-2">
              E. Self-Declaration
            </h3>

            <label className="inline-flex items-center">
              <input required type="checkbox" className="mr-2" />
              <span className="text-md font-medium text-gray-800">
                I hereby declare that the information provided above is true.
              </span>
            </label>

            <div className="mt-5">
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Submit Request
              </button>
            </div>
          </section>

        </form>
      </div>
    </div>
  );
}
