import express from "express";
import upload from "../Middleware/upload.js";

import {
  uploadPDF,
  getForms,
  updatePDF,
  deletePDF,
} from "../Controllers/formController.js";

const router = express.Router();

// CREATE
router.post("/upload", upload.single("pdf"), uploadPDF);

// READ
router.get("/", getForms);

// UPDATE
router.put("/:id", upload.single("pdf"), updatePDF);

// DELETE
router.delete("/:id", deletePDF);

export default router;
