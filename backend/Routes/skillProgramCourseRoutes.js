import express from "express";
import {
  addCoursesToProgram,
  getCoursesByProgram,
  updateCourse,
  deleteCourse,
} from "../Controllers/skillProgramCourseController.js";

const router = express.Router();

// ADD courses
router.post("/:programId/courses", addCoursesToProgram);

// GET courses by program
router.get("/:programId/courses", getCoursesByProgram);
router.put("/:programId/courses/:category/:index", updateCourse);
router.delete("/:programId/courses/:category/:index", deleteCourse);

export default router;
