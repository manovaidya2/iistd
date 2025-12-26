import Admission from "../Models/AdmissionModel.js";


// ================================
//  POST Admission
// ================================
export const submitAdmissionForm = async (req, res) => {
  try {
    const photo = req.files?.photo ? req.files.photo[0].filename : null;
    const idProof = req.files?.idProof ? req.files.idProof[0].filename : null;
    const addressProof = req.files?.addressProof ? req.files.addressProof[0].filename : null;
    const uploadSign = req.files?.uploadSign ? req.files.uploadSign[0].filename : null;

    const digitalStudentSignature = req.body.digitalStudentSignature;

    const admission = new Admission({
      ...req.body,
      photo,
      idProof,
      addressProof,
      uploadSign,
      digitalStudentSignature,
    });

    await admission.save();

    res.status(201).json({
      success: true,
      message: "Admission form submitted successfully",
      data: admission,
    });

  } catch (error) {
    console.error("Admission Form Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while submitting form",
      error: error.message,
    });
  }
};

// ================================
//  GET All Admissions
// ================================
export const getAllAdmissions = async (req, res) => {
  try {
    const data = await Admission.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: data.length,
      admissions: data,
    });
  } catch (error) {
    console.error("Fetch Admission Error:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching admission forms",
      error: error.message,
    });
  }
};
