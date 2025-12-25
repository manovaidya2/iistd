import express from "express";
import {
  addCoursesToProgram,
  getCoursesByProgram,
} from "../Controllers/skillProgramCourseController.js";

const router = express.Router();

// ADD courses
router.post("/:programId/courses", addCoursesToProgram);

// GET courses by program
router.get("/:programId/courses", getCoursesByProgram);

export default router;
