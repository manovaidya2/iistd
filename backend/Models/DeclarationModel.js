import mongoose from "mongoose";

const DeclarationSchema = new mongoose.Schema(
  {
    fullName: String,
    guardianName: String,
    dob: String,
    gender: String,
    mobile: String,
    email: String,
    aadhaar: String,
    address: String,
    courseName: String,
    levelModule: String,
    enrollmentNumber: String,
    modeOfLearning: String,
    preparedForOnDemand: String,
    examDate: String,
    place: String,

    declarationAccepted: { type: Boolean, required: true },
    declarationText: { type: String, required: true },

    idFile: String,
    photoFile: String,
    experienceFile: String,

    uploadedSignature: String,
    drawnSignature: String,
  },
  { timestamps: true }
);

export default mongoose.model("Declaration", DeclarationSchema);
