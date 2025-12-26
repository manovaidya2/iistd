import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema(
  {
    // SECTION A
    programType: String,
    courseName: String,
    batch: String,
    counsellor: String,

    // SECTION B
    fullName: String,
    fatherName: String,
    motherName: String,
    gender: String,
    dob: String,
    bloodGroup: String,
    nationality: String,
    category: String,
    maritalStatus: String,

    // SECTION C
    mobile: String,
    altMobile: String,
    email: String,
    emergencyPerson: String,
    emergencyNumber: String,
    presentAddress: String,
    permanentAddress: String,

    // Documents
    photo: String,
    idProof: String,
    addressProof: String,

    // Signatures
    uploadSign: String, // uploaded sign
    digitalStudentSignature: String, // base64 string
  },
  { timestamps: true }
);

export default mongoose.model("Admission", admissionSchema);
