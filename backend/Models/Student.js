import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  sno: Number,
  name: String,
  full: Number,
  pass: Number,
  obtained: Number,
});

const studentSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true }, // roll number
  result: {
    course: String,
    name: String,
     rollNo: { type: String, index: true },
 enrollmentNo: { type: String, index: true },
    fatherName: String,
    srNo: String,
    session: { type: String, required: true }, // session = password
    subjects: [subjectSchema],
    totalFull: Number,
    totalPass: Number,
    totalObt: Number, 
    remarks: String,
    percentage: String,
    grade: String,
    status: String,
  },
});

export default mongoose.model("Student", studentSchema);
