import ReissueForm from "../Models/reissueModel.js";

// ========================
// SUBMIT FORM (POST)
// ========================
export const submitReissueForm = async (req, res) => {
  try {
    const data = req.body;
    const files = req.files;

    const newForm = new ReissueForm({
      ...data,
      idProof: files?.idProof?.[0]?.filename || null,
      oldCertificate: files?.oldCertificate?.[0]?.filename || null,
      affidavit: files?.affidavit?.[0]?.filename || null,
      photo: files?.photo?.[0]?.filename || null,
      receipt: files?.receipt?.[0]?.filename || null,
      signature: files?.signature?.[0]?.filename || null,
    });

    await newForm.save();

    res.status(201).json({
      success: true,
      message: "Reissue form submitted successfully!",
      data: newForm,
    });
  } catch (error) {
    console.log("Reissue form error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ========================
// GET ALL FORMS (GET)
// ========================
export const getAllReissueForms = async (req, res) => {
  try {
    const forms = await ReissueForm.find().sort({ createdAt: -1 });
    res.json({ success: true, data: forms });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ========================
// DELETE FORM (DELETE)
// ========================
export const deleteReissueForm = async (req, res) => {
  try {
    await ReissueForm.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};
