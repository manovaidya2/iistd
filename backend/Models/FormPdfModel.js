import mongoose from "mongoose";

const formPdfSchema = new mongoose.Schema(
  {
    formName: { type: String, required: true },
    pdfFile: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("FormPdf", formPdfSchema);
