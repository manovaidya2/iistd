import React, { useState } from "react";
import axiosInstance from "../api/axiosInstance";

export default function SelfDeclarationForm() {
  const [form, setForm] = useState({
    fullName: "",
    guardianName: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    aadhaar: "",
    address: "",
    courseName: "",
    levelModule: "",
    enrollmentNumber: "",
    modeOfLearning: "",
    preparedForOnDemand: "",
    examDate: "",
    place: "",
    declarationAccepted: false,
  });

  const [photoFile, setPhotoFile] = useState(null);
  const [idFile, setIdFile] = useState(null);
  const [experienceFile, setExperienceFile] = useState(null);
  const [uploadedSignature, setUploadedSignature] = useState(null);

  /* ---------------- HANDLERS ---------------- */
  function handleFileInput(e, setter) {
    const file = e.target.files[0];
    if (file) setter(file);
  }

  function handleSignatureUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedSignature({ file, url });
  }

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((s) => ({
      ...s,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  /* ---------------- SUBMIT FORM ---------------- */
  async function handleSubmit() {
    // Required validations
    const requiredFields = [
      "fullName",
      "guardianName",
      "dob",
      "gender",
      "mobile",
      "email",
      "address",
      "courseName",
      "levelModule",
      "enrollmentNumber",
      "modeOfLearning",
      "preparedForOnDemand",
    ];

    for (let key of requiredFields) {
      if (!form[key]) {
        alert(`Please fill: ${key}`);
        return;
      }
    }

    if (!photoFile) return alert("Passport photo is required.");
    if (!idFile) return alert("Government ID proof is required.");
    if (!uploadedSignature) return alert("Signature upload is required.");
    if (!form.declarationAccepted)
      return alert("Please accept the declaration.");

    const fd = new FormData();

    Object.keys(form).forEach((key) => fd.append(key, form[key]));
    fd.set("declarationAccepted", form.declarationAccepted ? "true" : "false");

    // Files
    fd.append("idFile", idFile);
    fd.append("photoFile", photoFile);
    if (experienceFile) fd.append("experienceFile", experienceFile); // optional
    fd.append("uploadedSignature", uploadedSignature.file);

    // Declaration text
    fd.append(
      "declarationText",
      "I hereby declare that I possess the necessary knowledge, skill, and competency required for the On-Demand Examination. I confirm that all information is true, and I accept IISD examination rules."
    );

    try {
      const res = await axiosInstance.post("/submit", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        alert("Form submitted successfully!");
      } else {
        alert("Error: " + res.data.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-start justify-center">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-extrabold text-gray-900">
          Self Declaration Form
        </h1>
        <p className="text-sm text-gray-500 mt-1">For On-Demand Examination</p>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          {/* A. PERSONAL DETAILS */}
          <section>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              A. Personal Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-md mb-1">Full Name *</label>
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-md mb-1">
                  Father's / Guardian's Name *
                </label>
                <input
                  name="guardianName"
                  value={form.guardianName}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-md mb-1">Date of Birth *</label>
                <input
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-md mb-1">Gender *</label>
                <select
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2"
                >
                  <option value="">Select</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-md mb-1">Mobile Number *</label>
                <input
                  name="mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-md mb-1">Email *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-md mb-1">Aadhaar Number (Optional)</label>
                <input
                  name="aadhaar"
                  value={form.aadhaar}
                  onChange={handleChange}
                  className="w-full border rounded-xl px-4 py-2"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-md mb-1">Address *</label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2"
                />
              </div>
            </div>
          </section>

          {/* COURSE DETAILS */}
          <section>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              B. Course & Examination Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-md mb-1">
                  Course Name / Skill Area *
                </label>
                <input
                  name="courseName"
                  value={form.courseName}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-md mb-1">Level / Module *</label>
                <input
                  name="levelModule"
                  value={form.levelModule}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-md mb-1">Enrollment Number *</label>
                <input
                  name="enrollmentNumber"
                  value={form.enrollmentNumber}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-md mb-1">Mode of Learning *</label>
                <input
                  name="modeOfLearning"
                  value={form.modeOfLearning}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-md mb-1">
                  Prepared for On-Demand Exam *
                </label>
                <select
                  name="preparedForOnDemand"
                  value={form.preparedForOnDemand}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-xl px-4 py-2"
                >
                  <option value="">Select</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
          </section>

          {/* SIGNATURE UPLOAD ONLY */}
          <section>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              C. Student Signature (Upload Only)
            </h2>

            <div className="border rounded-xl p-4">
              <label className="text-md">Upload Signature *</label>
              <input type="file" accept="image/*" onChange={handleSignatureUpload} required />

              {uploadedSignature && (
                <div className="mt-3">
                  <div className="text-xs">Preview:</div>
                  <img
                    src={uploadedSignature.url}
                    className="border rounded max-h-28"
                  />
                </div>
              )}
            </div>
          </section>

          {/* DOCUMENTS */}
          <section>
            <h2 className="text-sm font-semibold text-gray-700 mb-3">
              D. Documents Upload
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-md">Government ID Proof *</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileInput(e, setIdFile)}
                  required
                />
                {idFile && <p className="text-xs">{idFile.name}</p>}
              </div>

              <div>
                <label className="text-md">Passport Photo *</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileInput(e, setPhotoFile)}
                  required
                />
                {photoFile && <p className="text-xs">{photoFile.name}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="text-md">Experience Proof (Optional)</label>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => handleFileInput(e, setExperienceFile)}
                />
                {experienceFile && (
                  <p className="text-xs">{experienceFile.name}</p>
                )}
              </div>
            </div>
          </section>

          {/* DECLARATION */}
          <section className="pt-3">
            <div className="flex gap-3">
              <input
                type="checkbox"
                name="declarationAccepted"
                checked={form.declarationAccepted}
                onChange={handleChange}
                className="mt-1 h-4 w-4"
              />

              <p className="text-sm text-gray-600 leading-relaxed">
                I hereby declare that I possess the necessary knowledge,
                skill, and competency required for the On-Demand Examination.
                I confirm that all information is true, and I accept IISD
                examination rules.
              </p>
            </div>
          </section>

          {/* SUBMIT */}
          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-2 bg-indigo-600 text-white rounded-xl mt-4"
          >
            Submit Form
          </button>
        </form>
      </div>
    </div>
  );
}
