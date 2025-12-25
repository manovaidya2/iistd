import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  programId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SkillProgram",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    default: "ISC Level",
  },
  duration: {
    type: String,
    default: "1-3",
  },
});

export default mongoose.model("Course", courseSchema);
