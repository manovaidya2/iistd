import React, { useState, useRef, useEffect } from "react";
import { Plus, Minus } from "lucide-react";
import SignaturePad from "signature_pad";
import axiosInstance from "../api/axiosInstance";

export default function ExaminationForm() {
  // ==============================
  // SECTION STATES (TOP LEVEL)
  // ==============================

  // Section A
  const [examSession, setExamSession] = useState("");
  const [courseName, setCourseName] = useState("");
  const [semester, setSemester] = useState("");
  const [examType, setExamType] = useState("");
  const [enrollmentNo, setEnrollmentNo] = useState("");
  const [rollNo, setRollNo] = useState("");

  // Section B
  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [category, setCategory] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  // Section C
  const [presentAddress, setPresentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");

  // Section D - Subjects
  const [subjects, setSubjects] = useState([
    { code: "", name: "", type: "", mode: "" },
  ]);

  // Section G
  const [agreed, setAgreed] = useState(false);

  // Date & Place
  const [date, setDate] = useState("");
  const [place, setPlace] = useState("");

  // SignaturePad
  const canvasRef = useRef(null);
  const signatureRef = useRef(null);
  const fileInputRef = useRef(null);

  // ==============================
  // SIGNATURE PAD SETUP
  // ==============================
  useEffect(() => {
    const canvas = canvasRef.current;

    const signaturePad = new SignaturePad(canvas, {
      backgroundColor: "#ffffff",
      penColor: "black",
      minWidth: 1,
      maxWidth: 2.5,
      throttle: 10,
    });

    signatureRef.current = signaturePad;

    const resizeCanvas = () => {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      const width = canvas.parentNode.offsetWidth;
      const height = 200;

      canvas.width = width * ratio;
      canvas.height = height * ratio;

      canvas.style.width = "100%";
      canvas.style.height = `${height}px`;

      canvas.getContext("2d").scale(ratio, ratio);
      signaturePad.clear();
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  const clearSignature = () => signatureRef.current.clear();

  // ==============================
  // SUBJECT ROW HANDLERS
  // ==============================
  const addRow = () =>
    setSubjects([...subjects, { code: "", name: "", type: "", mode: "" }]);

  const removeRow = (index) =>
    setSubjects(subjects.filter((_, i) => i !== index));

  const updateRow = (i, field, value) => {
    const updated = [...subjects];
    updated[i][field] = value;
    setSubjects(updated);
  };

  // ==============================
  // SUBMIT HANDLER
  // ==============================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!agreed) return alert("Please agree the declaration.");
    if (signatureRef.current.isEmpty())
      return alert("Please add digital signature.");

    const digitalSignature = signatureRef.current.toDataURL("image/png");

    const formData = new FormData();

    // Section A
    formData.append("examSession", examSession);
    formData.append("courseName", courseName);
    formData.append("semester", semester);
    formData.append("examType", examType);
    formData.append("enrollmentNo", enrollmentNo);
    formData.append("rollNo", rollNo);

    // Section B
    formData.append("fullName", fullName);
    formData.append("fatherName", fatherName);
    formData.append("dob", dob);
    formData.append("gender", gender);
    formData.append("category", category);
    formData.append("contactNumber", contactNumber);
    formData.append("email", email);

    // Section C
    formData.append("presentAddress", presentAddress);
    formData.append("permanentAddress", permanentAddress);
    formData.append("emergencyContact", emergencyContact);

    // Subjects
    formData.append("subjects", JSON.stringify(subjects));

    // File Upload
    if (fileInputRef.current.files[0]) {
      formData.append("uploadSign", fileInputRef.current.files[0]);
    }

    // Digital Signature
    formData.append("digitalSignature", digitalSignature);

    // Date
    formData.append("date", date);
    formData.append("place", place);

    try {
      const res = await axiosInstance.post("/examination", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Form submitted successfully!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Error submitting form!");
    }
  };

  // ==============================
  // UI / DESIGN SAME AS YOURS
  // ==============================
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-4xl mx-auto p-6 bg-white shadow-xl rounded-2xl border"
    >
      <h1 className="text-3xl font-bold text-center mb-6">
        IISD – Examination Form
      </h1>

      {/* Section A */}
      <h2 className="text-xl font-semibold mt-6 mb-2">A. Examination Details</h2>
      <table className="w-full border mb-4">
        <tbody>
          <tr>
            <td className="p-2 border font-medium">Exam Session / Year:</td>
            <td className="p-2 border">
              <input
                value={examSession}
                onChange={(e) => setExamSession(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>

          <tr>
            <td className="p-2 border font-medium">Course Name:</td>
            <td className="p-2 border">
              <input
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>

          <tr>
            <td className="p-2 border font-medium">Semester / Level:</td>
            <td className="p-2 border">
              <input
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>

          <tr>
            <td className="p-2 border font-medium">Exam Type:</td>
            <td className="p-2 border">
              <input
                value={examType}
                onChange={(e) => setExamType(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>

          <tr>
            <td className="p-2 border font-medium">Enrollment No:</td>
            <td className="p-2 border">
              <input
                value={enrollmentNo}
                onChange={(e) => setEnrollmentNo(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>

          <tr>
            <td className="p-2 border font-medium">Roll No:</td>
            <td className="p-2 border">
              <input
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* Section B */}
      <h2 className="text-xl font-semibold mt-6 mb-2">
        B. Student Personal Information
      </h2>
      <table className="w-full border mb-4">
        <tbody>
          <tr>
            <td className="p-2 border font-medium">Full Name:</td>
            <td className="p-2 border">
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>

          <tr>
            <td className="p-2 border font-medium">Father Name:</td>
            <td className="p-2 border">
              <input
                value={fatherName}
                onChange={(e) => setFatherName(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>

          <tr>
            <td className="p-2 border font-medium">Date of Birth:</td>
            <td className="p-2 border">
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>

          <tr>
            <td className="p-2 border font-medium">Gender:</td>
            <td className="p-2 border">
              <input
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>

          <tr>
            <td className="p-2 border font-medium">Category:</td>
            <td className="p-2 border">
              <input
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>

          <tr>
            <td className="p-2 border font-medium">Contact Number:</td>
            <td className="p-2 border">
              <input
                value={contactNumber}
                onChange={(e) => setContactNumber(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>

          <tr>
            <td className="p-2 border font-medium">Email ID:</td>
            <td className="p-2 border">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* Section C */}
      <h2 className="text-xl font-semibold mt-6 mb-2">
        C. Communication Information
      </h2>
      <table className="w-full border mb-4">
        <tbody>
          <tr>
            <td className="p-2 border font-medium">Present Address:</td>
            <td className="p-2 border">
              <input
                value={presentAddress}
                onChange={(e) => setPresentAddress(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>

          <tr>
            <td className="p-2 border font-medium">Permanent Address:</td>
            <td className="p-2 border">
              <input
                value={permanentAddress}
                onChange={(e) => setPermanentAddress(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>

          <tr>
            <td className="p-2 border font-medium">
              Emergency Contact Person & Number:
            </td>
            <td className="p-2 border">
              <input
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                className="w-full border p-1 rounded"
              />
            </td>
          </tr>
        </tbody>
      </table>

      {/* Section D - Subjects */}
      <h2 className="text-xl font-semibold mt-6 mb-2">
  D. Subjects Applied for Examination
</h2>

<div className="overflow-x-auto md:overflow-visible">
  <table className="w-full border mb-2 min-w-[700px]">
    <thead>
      <tr className="bg-gray-200 border">
        <th className="p-2 border">Sr.</th>
        <th className="p-2 border">Subject Code</th>
        <th className="p-2 border">Subject Name</th>
        <th className="p-2 border">Theory/Practical</th>
        <th className="p-2 border">Regular/Reappear</th>
        <th className="p-2 border">Action</th>
      </tr>
    </thead>

    <tbody>
      {subjects.map((row, i) => (
        <tr key={i} className="border">
          <td className="p-2 border text-center">{i + 1}</td>

          <td className="p-2 border">
            <input
              className="w-full border p-1"
              value={row.code}
              onChange={(e) => updateRow(i, "code", e.target.value)}
            />
          </td>

          <td className="p-2 border">
            <input
              className="w-full border p-1"
              value={row.name}
              onChange={(e) => updateRow(i, "name", e.target.value)}
            />
          </td>

          <td className="p-2 border">
            <input
              className="w-full border p-1"
              value={row.type}
              onChange={(e) => updateRow(i, "type", e.target.value)}
            />
          </td>

          <td className="p-2 border">
            <input
              className="w-full border p-1"
              value={row.mode}
              onChange={(e) => updateRow(i, "mode", e.target.value)}
            />
          </td>

          <td className="p-2 border text-center">
            {i === subjects.length - 1 ? (
              <button type="button" onClick={addRow} className="text-green-600">
                <Plus />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => removeRow(i)}
                className="text-red-600"
              >
                <Minus />
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      <button
        type="button"
        onClick={addRow}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-6"
      >
        + Add More Subject
      </button>

      {/* Upload Signature */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Upload Signature</h2>
      <label className="w-full border-dashed border-2 border-gray-400 p-4 rounded cursor-pointer flex items-center justify-center bg-gray-50">
        <input type="file" ref={fileInputRef} className="hidden" />
        <span className="text-gray-600">Click to Upload Signature</span>
      </label>

      {/* Digital Signature */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Digital Signature</h2>
      <div className="w-full border rounded p-2 bg-gray-50">
        <canvas
          ref={canvasRef}
          className="border w-full h-[200px] bg-white rounded-xl"
          style={{ touchAction: "none" }}
        ></canvas>

        <button
          type="button"
          onClick={clearSignature}
          className="mt-3 px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Clear Signature
        </button>
      </div>

      {/* Date & Place */}
      <h2 className="text-xl font-semibold mt-6 mb-2">Date & Place</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <input
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-2 rounded w-full"
          type="date"
        />
        <input
          placeholder="Place"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Declaration */}
      <h2 className="text-xl font-semibold mt-6 mb-2">G. Declaration</h2>

      <label className="flex items-start gap-2 mb-4">
        <input
          type="checkbox"
          className="mt-1"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <p>
          I hereby declare that all information provided is true. I have fulfilled
          the eligibility criteria for the examination. I agree to follow all
          examination rules of IISD.
        </p>
      </label>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        className="w-full bg-[#1a4e92] hover:bg-[#1a4e92] text-white font-semibold py-3 rounded-lg text-lg mt-4"
      >
        Submit Form
      </button>
    </form>
  );
}
