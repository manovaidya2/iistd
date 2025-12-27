import FormPdf from "../Models/FormPdfModel.js";
import fs from "fs";


export const uploadPDF = async (req, res) => {
  try {
    const { formName } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "PDF file missing" });
    }

    const pdfFile = req.file.filename;

    const saved = await FormPdf.create({ formName, pdfFile });

    return res.json({
      success: true,
      message: "PDF Uploaded Successfully",
      data: saved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


// ================================
//  NEW → GET ALL FORMS
// ================================
export const getForms = async (req, res) => {
  try {
    const forms = await FormPdf.find().sort({ createdAt: 1 }); 

    return res.json({
      success: true,
      message: "Forms fetched successfully",
      data: forms,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const updatePDF = async (req, res) => {
  try {
    const { id } = req.params;
    const { formName } = req.body;

    const form = await FormPdf.findById(id);
    if (!form) return res.status(404).json({ message: "Form not found" });

    // If new PDF uploaded → delete old file
    if (req.file) {
      const oldPath = `uploads/forms/${form.pdfFile}`;
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

      form.pdfFile = req.file.filename;
    }

    form.formName = formName || form.formName;
    await form.save();

    res.json({ success: true, message: "Form updated", data: form });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// DELETE PDF
export const deletePDF = async (req, res) => {
  try {
    const { id } = req.params;

    const form = await FormPdf.findById(id);
    if (!form) return res.status(404).json({ message: "Form not found" });

    // delete file
    const filePath = `uploads/forms/${form.pdfFile}`;
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await form.deleteOne();
    res.json({ success: true, message: "Form deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
};
