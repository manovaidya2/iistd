import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  code: String,
  name: String,
  type: String,
  mode: String,
});

const examinationSchema = new mongoose.Schema(
  {
    // Section A
    examSession: String,
    courseName: String,
    semester: String,
    examType: String,
    enrollmentNo: String,
    rollNo: String,

    // Section B
    fullName: String,
    fatherName: String,
    dob: String,
    gender: String,
    category: String,
    contactNumber: String,
    email: String,

    // Section C
    presentAddress: String,
    permanentAddress: String,
    emergencyContact: String,

    // Section D
    subjects: [subjectSchema],

    // Signature Upload (Multer)
    uploadSign: String,

    // Signature Pad (Base64)
    digitalSignature: String,

    // Date & Place
    date: String,
    place: String,
    status: {
      type: String,
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("ExaminationForm", examinationSchema);
