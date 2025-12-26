import express from "express";
import { upload } from "../Middleware/upload.js";
import {
  createExaminationForm,
  getExaminationForms,
  approveExaminationForm,
  deleteExaminationForm,
    rollbackApprove,
} from "../Controllers/examinationController.js";

const router = express.Router();

// Upload field name must match frontend "uploadSign"
router.post(
  "/examination",
  upload.fields([{ name: "uploadSign", maxCount: 1 }]),
  createExaminationForm
);

router.get("/examination", getExaminationForms);
router.patch("/examination/:id/approve", approveExaminationForm);
router.delete("/examination/:id", deleteExaminationForm);
router.patch("/examination/:id/rollback", rollbackApprove);


export default router;
