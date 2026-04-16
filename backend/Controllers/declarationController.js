    import Declaration from "../Models/DeclarationModel.js";
    import fs from "fs";

    export const submitDeclaration = async (req, res) => {
    try {
        console.log("✅ Files received:", req.files);

        const {
        fullName,
        guardianName,
        dob,
        gender,
        mobile,
        email,
        aadhaar,
        address,
        courseName,
        levelModule,
        enrollmentNumber,
        modeOfLearning,
        preparedForOnDemand,
        examDate,
        place,
        declarationAccepted,
        declarationText,
        } = req.body;

        const files = req.files;

        const newDeclaration = new Declaration({
        fullName,
        guardianName,
        dob,
        gender,
        mobile,
        email,
        aadhaar,
        address,
        courseName,
        levelModule,
        enrollmentNumber,
        modeOfLearning,
        preparedForOnDemand,
        examDate,
        place,
        declarationAccepted: declarationAccepted === "true",
        declarationText,
        idFile: files?.idFile?.[0]?.path || null,
        photoFile: files?.photoFile?.[0]?.path || null,
        experienceFile: files?.experienceFile?.[0]?.path || null,
        drawnSignature: files?.drawnSignature?.[0]?.path || null,
        uploadedSignature: files?.uploadedSignature?.[0]?.path || null,
        });

        await newDeclaration.save();

        res.status(200).json({ success: true, message: "Declaration submitted successfully" });
    } catch (err) {
        console.error("❌ Declaration save error:", err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
    };


    export const getAllDeclarations = async (req, res) => {
  try {
    const declarations = await Declaration.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, declarations });
  } catch (err) {
    console.error("❌ Fetch error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};


export const deleteDeclaration = async (req, res) => {
  try {
    const { id } = req.params;

    const declaration = await Declaration.findById(id);
    if (!declaration) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    // ✅ Delete files if exist
    const filesToDelete = [
      declaration.idFile,
      declaration.photoFile,
      declaration.experienceFile,
      declaration.uploadedSignature,
      declaration.drawnSignature,
    ];

    filesToDelete.forEach((filePath) => {
      if (filePath && fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) console.log("File delete error:", err);
        });
      }
    });

    await Declaration.findByIdAndDelete(id);

    res.status(200).json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    console.error("❌ Delete error:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};