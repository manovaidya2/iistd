import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import skillProgramRoutes from "./Routes/skillProgramRoutes.js";
import studentRoutes from "./Routes/studentRoutes.js";
import galleryRoutes from "./Routes/galleryRoutes.js";
import contactRoutes from "./Routes/contactRoutes.js";
import skillProgramCourseRoutes from "./Routes/skillProgramCourseRoutes.js";
import admissionRoutes from "./Routes/admissionRoutes.js";
 import examinationRoutes from "./Routes/examinationRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "http://localhost:5174",
      "http://api.iist.ind.in",
      "https://iist.ind.in",
      "https://admin.iist.ind.in"
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ✅ Health check FIRST
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "API healthy" });
});

// Routes
app.use("/api/skill-programs", skillProgramRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/skillprogramdetails", skillProgramCourseRoutes);
app.use("/api", examinationRoutes);
    app.use("/api", admissionRoutes); 

// DB Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
