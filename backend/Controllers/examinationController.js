import ExaminationForm from "../Models/examinationModel.js";

export const createExaminationForm = async (req, res) => {
  try {
    const {
      examSession,
      courseName,
      semester,
      examType,
      enrollmentNo,
      rollNo,
      fullName,
      fatherName,
      dob,
      gender,
      category,
      contactNumber,
      email,
      presentAddress,
      permanentAddress,
      emergencyContact,
      subjects,
      digitalSignature,
      date,
      place,
    } = req.body;

    const signatureFile = req.files?.uploadSign?.[0]?.path || "";

    const newForm = new ExaminationForm({
      examSession,
      courseName,
      semester,
      examType,
      enrollmentNo,
      rollNo,
      fullName,
      fatherName,
      dob,
      gender,
      category,
      contactNumber,
      email,
      presentAddress,
      permanentAddress,
      emergencyContact,
      subjects: JSON.parse(subjects),
      uploadSign: signatureFile,
      digitalSignature,
      date,
      place,
    });

    await newForm.save();

    res.status(201).json({
      success: true,
      message: "Examination Form Submitted Successfully!",
      data: newForm,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getExaminationForms = async (req, res) => {
  try {
    const forms = await ExaminationForm.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      total: forms.length,
      data: forms,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveExaminationForm = async (req, res) => {
  try {
    const updated = await ExaminationForm.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );

    res.json({ success: true, message: "Form Approved", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteExaminationForm = async (req, res) => {
  try {
    await ExaminationForm.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const rollbackApprove = async (req, res) => {
  try {
    const updated = await ExaminationForm.findByIdAndUpdate(
      req.params.id,
      { status: "Pending" },
      { new: true }
    );

    res.json({ success: true, message: "Status reverted to Pending", data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
