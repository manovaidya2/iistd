import mongoose from "mongoose";

const reissueSchema = new mongoose.Schema(
  {
    fullName: String,
    guardianName: String,
    dob: String,
    mobile: String,
    email: String,
    aadhaar: String,
    address: String,

    courseName: String,
    levelModule: String,
    enrollmentNumber: String,
    batchSession: String,
    yearOfPassing: String,

    reason: String,
    otherReason: String,

    place: String,
    date: String,

    // FILES
    idProof: String,
    oldCertificate: String,
    affidavit: String,
    photo: String,
    receipt: String,
    signature: String,
  },
  { timestamps: true }
);

export default mongoose.model("ReissueForm", reissueSchema);
