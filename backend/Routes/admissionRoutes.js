    import express from "express";
    import { upload } from "../Middleware/upload.js";
    import Admission from "../Models/AdmissionModel.js";

    const router = express.Router();

    // ==============================
    //  POST — Submit Admission
    // ==============================
    router.post(
  "/admission",
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "idProof", maxCount: 1 },
    { name: "addressProof", maxCount: 1 },
    { name: "uploadSign", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const {
        programType,
        courseName,
        batch,
        counsellor,
        fullName,
        fatherName,
        motherName,
        gender,
        dob,
        bloodGroup,
        nationality,
        category,
        maritalStatus,
        mobile,
        altMobile,
        email,
        emergencyPerson,
        emergencyNumber,
        presentAddress,
        permanentAddress,
        digitalStudentSignature,
      } = req.body;

      const newStudent = new Admission({
        programType,
        courseName,
        batch,
        counsellor,
        fullName,
        fatherName,
        motherName,
        gender,
        dob,
        bloodGroup,
        nationality,
        category,
        maritalStatus,
        mobile,
        altMobile,
        email,
        emergencyPerson,
        emergencyNumber,
        presentAddress,
        permanentAddress,

        // Save file names correctly
        photo: req.files?.photo?.[0]?.filename || null,
        idProof: req.files?.idProof?.[0]?.filename || null,
        addressProof: req.files?.addressProof?.[0]?.filename || null,
        uploadSign: req.files?.uploadSign?.[0]?.filename || null, // ✅ match frontend

        // Save Base64 Signature
        digitalStudentSignature,
      });

      await newStudent.save();

      res.json({ success: true, data: newStudent });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  }
);


    // ==============================
    //  GET — Fetch ALL Admissions
    // ==============================
    router.get("/admission", async (req, res) => {
    try {
        const data = await Admission.find().sort({ createdAt: -1 });

        res.json({
        success: true,
        count: data.length,
        admissions: data,
        });
    } catch (err) {
        console.error("Fetch Error:", err);
        res.status(500).json({ success: false, message: err.message });
    }
    });

    export default router;
