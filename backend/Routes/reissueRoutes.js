import express from "express";
import { upload } from "../Middleware/upload.js";

import {
  submitReissueForm,
  getAllReissueForms,
  deleteReissueForm,
} from "../Controllers/reissueController.js";

const router = express.Router();

// Multer Upload Fields
const reissueUpload = upload.fields([
  { name: "idProof", maxCount: 1 },
  { name: "oldCertificate", maxCount: 1 },
  { name: "affidavit", maxCount: 1 },
  { name: "photo", maxCount: 1 },
  { name: "receipt", maxCount: 1 },
  { name: "signature", maxCount: 1 },
]);

// ROUTES
router.post("/reissue-form", reissueUpload, submitReissueForm);
router.get("/reissue-form", getAllReissueForms);
router.delete("/reissue-form/:id", deleteReissueForm);

export default router;
