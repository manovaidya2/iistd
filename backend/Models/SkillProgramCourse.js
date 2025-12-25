import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    level: String,
    duration: String,
  },
  { _id: false }
);

const skillProgramCourseSchema = new mongoose.Schema(
  {
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SkillProgram",
      required: true,
      unique: true,
    },

    courses: {
      certificate: { type: [courseSchema], default: [] },
      diploma: { type: [courseSchema], default: [] },
      advancedDiploma: { type: [courseSchema], default: [] },
    },
  },
  { timestamps: true }
);

skillProgramCourseSchema.index({ program: 1 }, { unique: true });

export default mongoose.model(
  "SkillProgramCourse",
  skillProgramCourseSchema
);
