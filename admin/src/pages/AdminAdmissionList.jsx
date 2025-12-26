import React, { useEffect, useState } from "react";
import axios from "../api/axiosInstance";

export default function AdminAdmissionList() {
  const [admissions, setAdmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAdmission, setSelectedAdmission] = useState(null); // selected admission for view
  const [showDetail, setShowDetail] = useState(false);

  const fetchAdmissions = async () => {
    try {
      const res = await axios.get("/admission");
      setAdmissions(res.data.admissions);
    } catch (err) {
      console.error("Fetch Admissions Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissions();
  }, []);

  if (loading) return <p className="text-center p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admission Applications</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg">
        <table className="w-full border">
          <thead>
            <tr className="bg-gray-200 text-sm text-left">
              <th className="p-3 border">Photo</th>
              <th className="p-3 border">Student Name</th>
              <th className="p-3 border">Course</th>
              <th className="p-3 border">Mobile</th>
              <th className="p-3 border">Documents</th>
              <th className="p-3 border">Signatures</th>
              <th className="p-3 border">Date</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {admissions.map((item) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="p-3 border">
                  {item.photo ? (
                    <img
                      src={`https://api.iist.ind.in/uploads/${item.photo}`}
                      alt="student"
                      className="w-14 h-14 rounded object-cover border"
                    />
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="p-3 border text-sm">
                  <b>{item.fullName}</b>
                  <div className="text-gray-600 text-xs">{item.email}</div>
                </td>
                <td className="p-3 border text-sm">
                  {item.programType} <br />
                  <span className="text-xs text-blue-700">{item.courseName}</span>
                </td>
                <td className="p-3 border">{item.mobile}</td>
                <td className="p-3 border text-xs space-y-1">
                  {item.idProof && (
                    <a
                      href={`https://api.iist.ind.in/uploads/${item.idProof}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline block"
                    >
                      ID Proof
                    </a>
                  )}
                  {item.addressProof && (
                    <a
                      href={`https://api.iist.ind.in/uploads/${item.addressProof}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline block"
                    >
                      Address Proof
                    </a>
                  )}
                </td>
                <td className="p-3 border text-xs">
                  {item.uploadSign && (
                    <a
                      href={`https://api.iist.ind.in/uploads/${item.uploadSign}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-red-600 underline block"
                    >
                      Uploaded Sign
                    </a>
                  )}
                  {item.digitalStudentSignature && (
                    <img
                      src={item.digitalStudentSignature}
                      className="w-28 border rounded mt-1"
                      alt="Digital Signature"
                    />
                  )}
                </td>
                <td className="p-3 border text-sm">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="p-3 border">
                  <button
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    onClick={() => {
                      setSelectedAdmission(item);
                      setShowDetail(true);
                    }}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Full Detail Modal / Page */}
      {showDetail && selectedAdmission && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start overflow-auto p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl p-6 relative">
            <button
              className="absolute top-2 right-2 text-red-600 font-bold"
              onClick={() => setShowDetail(false)}
            >
              X
            </button>

            <h2 className="text-2xl font-bold mb-4">Admission Details</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <b>Full Name:</b> {selectedAdmission.fullName}
              </div>
              <div>
                <b>Father Name:</b> {selectedAdmission.fatherName}
              </div>
              <div>
                <b>Mother Name:</b> {selectedAdmission.motherName}
              </div>
              <div>
                <b>Gender:</b> {selectedAdmission.gender}
              </div>
              <div>
                <b>Date of Birth:</b> {selectedAdmission.dob}
              </div>
              <div>
                <b>Blood Group:</b> {selectedAdmission.bloodGroup}
              </div>
              <div>
                <b>Nationality:</b> {selectedAdmission.nationality}
              </div>
              <div>
                <b>Category:</b> {selectedAdmission.category}
              </div>
              <div>
                <b>Marital Status:</b> {selectedAdmission.maritalStatus}
              </div>
              <div>
                <b>Mobile:</b> {selectedAdmission.mobile}
              </div>
              <div>
                <b>Alternate Mobile:</b> {selectedAdmission.altMobile}</div>
              <div>
                <b>Email:</b> {selectedAdmission.email}</div>
              <div>
                <b>Emergency Contact:</b> {selectedAdmission.emergencyPerson} - {selectedAdmission.emergencyNumber}</div>
              <div>
                <b>Present Address:</b> {selectedAdmission.presentAddress}</div>
              <div>
                <b>Permanent Address:</b> {selectedAdmission.permanentAddress}</div>
              <div>
                <b>Program Type:</b> {selectedAdmission.programType}</div>
              <div>
                <b>Course Name:</b> {selectedAdmission.courseName}</div>
              <div>
                <b>Batch:</b> {selectedAdmission.batch}</div>
              <div>
                <b>Counsellor:</b> {selectedAdmission.counsellor}</div>

              <div>
                <b>Photo:</b>
                {selectedAdmission.photo && (
                  <img
                    src={`https://api.iist.ind.in/uploads/${selectedAdmission.photo}`}
                    alt="Student"
                    className="w-40 h-40 object-cover border rounded mt-1"
                  />
                )}
              </div>

              <div>
                <b>ID Proof:</b>
                {selectedAdmission.idProof && (
                  <a
                    href={`https://api.iist.ind.in/uploads/${selectedAdmission.idProof}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline block"
                  >
                    View ID Proof
                  </a>
                )}
              </div>

              <div>
                <b>Address Proof:</b>
                {selectedAdmission.addressProof && (
                  <a
                    href={`https://api.iist.ind.in/uploads/${selectedAdmission.addressProof}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline block"
                  >
                    View Address Proof
                  </a>
                )}
              </div>

              <div>
                <b>Uploaded Signature:</b>
                {selectedAdmission.uploadSign && (
                  <a
                    href={`https://api.iist.ind.in/uploads/${selectedAdmission.uploadSign}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 underline block"
                  >
                    View Upload Sign
                  </a>
                )}
              </div>

              <div>
                <b>Digital Signature:</b>
                {selectedAdmission.digitalStudentSignature && (
                  <img
                    src={selectedAdmission.digitalStudentSignature}
                    alt="Digital Signature"
                    className="w-56 h-56 border rounded mt-1"
                  />
                )}
              </div>

              <div>
                <b>Created At:</b>{" "}
                {new Date(selectedAdmission.createdAt).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
