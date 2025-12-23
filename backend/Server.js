import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import skillProgramRoutes from "./Routes/skillProgramRoutes.js";
import studentRoutes from "./Routes/studentRoutes.js";
import galleryRoutes from "./Routes/galleryRoutes.js";
import contactRoutes from "./Routes/contactRoutes.js";


dotenv.config(); // 👈 Make sure to load .env

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

// 🔥 Serve uploaded images (frontend will call http://localhost:5000/uploads/xyz.png)
app.use("/uploads", express.static("uploads"));

// Routes
app.use("/api/skill-programs", skillProgramRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/contact", contactRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("IISD API running...");
});

// DB Connect
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
