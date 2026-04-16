import express from "express";
import { upload } from "../Middleware/upload.js";
import { submitDeclaration, getAllDeclarations,deleteDeclaration } from "../Controllers/declarationController.js";

const router = express.Router();

const uploadFields = upload.fields([
  { name: "idFile", maxCount: 1 },
  { name: "photoFile", maxCount: 1 },
  { name: "experienceFile", maxCount: 1 },
  { name: "uploadedSignature", maxCount: 1 },
  { name: "drawnSignature", maxCount: 1 },
]);

router.post("/submit", uploadFields, submitDeclaration);

// ✅ NEW GET ROUTE
router.get("/declarations", getAllDeclarations);
router.delete("/declaration/:id", deleteDeclaration);
export default router;
