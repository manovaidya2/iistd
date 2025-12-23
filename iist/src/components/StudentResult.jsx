import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function StudentResult({ studentData }) {
  const resultRef = useRef();

  // ✅ PDF Download Function
 const handleDownloadPDF = async (id) => {
  try {
    const response = await fetch(`https://api.iist.ind.in/api/students/download/${id}`, {
      method: "GET",
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Result.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  } catch (err) {
    console.error("Error downloading PDF", err);
  }
};

  return (
    <div className="flex flex-col items-center mt-6 mb-6 w-full">
      <div
        ref={resultRef}
        className="bg-white border border-black w-full max-w-3xl"
      >
        {/* Top Blue Header */}
        <div className="bg-blue-600 text-white text-center py-2 px-2">
          <h2 className="font-bold text-base sm:text-lg">ONLINE RESULT</h2>
          <p className="text-xs sm:text-sm">
            range of programs and research opportunities across multiple
            campuses.
          </p>
        </div>

        <div className="p-4 sm:p-6">
          {/* Course Heading */}
          <h3 className="text-center font-semibold text-base sm:text-lg mb-6 mt-4">
            {studentData.result.course} - SEMESTER
          </h3>

          {/* Student Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 mb-6 text-sm">
            <p><strong>Name:</strong> {studentData.result.name}</p>
            <p><strong>Roll No:</strong> {studentData.result.rollNo}</p>
            <p><strong>Father's Name:</strong> {studentData.result.fatherName}</p>
            <p><strong>Enrollment No:</strong> {studentData.result.enrollmentNo}</p>
            <p><strong>Sr. No:</strong> {studentData.result.srNo}</p>
            <p><strong>Session:</strong> {studentData.result.session}</p>
          </div>

          {/* Subjects Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-xs sm:text-sm mb-6">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-2 py-1">S. No.</th>
                  <th className="border px-2 py-1">Subject</th>
                  <th className="border px-2 py-1">Full Marks</th>
                  <th className="border px-2 py-1">Passing Marks</th>
                  <th className="border px-2 py-1">Marks Obtained</th>
                </tr>
              </thead>
              <tbody>
                {studentData.result.subjects.map((s, i) => (
                  <tr key={i}>
                    <td className="border px-2 py-1 text-center">{s.sno}</td>
                    <td className="border px-2 py-1">{s.name}</td>
                    <td className="border px-2 py-1 text-center">{s.full}</td>
                    <td className="border px-2 py-1 text-center">{s.pass}</td>
                    <td className="border px-2 py-1 text-center">{s.obtained}</td>
                  </tr>
                ))}
                <tr className="font-bold bg-gray-50">
                  <td colSpan={2} className="border px-2 py-1 text-center">Total</td>
                  <td className="border px-2 py-1 text-center">{studentData.result.totalFull}</td>
                  <td className="border px-2 py-1 text-center">{studentData.result.totalPass}</td>
                  <td className="border px-2 py-1 text-center">{studentData.result.totalObt}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Result Box */}
          <div className="flex flex-wrap justify-end gap-2 sm:gap-4 mb-6">
            <div className="bg-red-100 text-red-600 px-4 py-2 rounded font-semibold text-xs sm:text-sm">
              RESULT
            </div>
            <div className="bg-blue-600 text-white px-4 py-2 rounded font-semibold text-xs sm:text-sm">
              {studentData.result.status}
            </div>
          </div>

          {/* Remarks */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-2 text-xs sm:text-sm font-semibold mb-6">
            <p>Percentage: {studentData.result.percentage}</p>
            <p>Result: {studentData.result.status}</p>
            <p>Grade: {studentData.result.grade}</p>
          </div>

          {/* Notes */}
          <div className="text-[10px] sm:text-xs text-gray-600 space-y-2">
            <p>
              B: 50% and above but below 60%, C: 40% and above but below 50%, 
              D: Below 40%, A++: 85% AND ABOVE, A+: 75% and above but below 85%, 
              A: 60% and above but below 75%
            </p>
            <p>
              Note: Delhi University will not be held accountable for any
              errors in the marks, even though they are submitted following
              verification. The Delhi University original grade report will
              be the final one.
            </p>
            <p>
              NOTE: For immediate assistance, please email us at{" "}
              <a href="mailto:digital@dgu.ac.in" className="text-blue-900 underline">
                digital@dgu.ac.in
              </a>{" "}
              OR{" "}
              <a href="mailto:dguniversityofficial@gmail.com" className="text-blue-900 underline">
                dguniversityofficial@gmail.com
              </a>.
            </p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
  onClick={() => handleDownloadPDF(studentData._id)}
  className="mt-4 px-6 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700 transition"
>
  Download PDF
</button>

    </div>
  );
}
