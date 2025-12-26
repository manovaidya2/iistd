import SkillProgram from "../Models/SkillProgram.js";
import path from "path";

// Add new skill program
export const addSkillProgram = async (req, res) => {
  try {
    const { title } = req.body;
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newProgram = new SkillProgram({
      title,
      image: req.file.filename,
    });

    await newProgram.save();
    res.status(201).json({ message: "Skill Program added successfully", data: newProgram });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all skill programs
export const getSkillPrograms = async (req, res) => {
  try {
    const programs = await SkillProgram.find().sort({ createdAt: -1 });

    const formatted = programs.map(p => ({
      _id: p._id,
      name: p.title,   // 👈 alias
      image: p.image,
      createdAt: p.createdAt
    }));

    res.status(200).json(formatted);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteSkillProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await SkillProgram.findByIdAndDelete(id);

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.status(200).json({ message: "Program deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Update skill program
export const updateSkillProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    let updatedData = { title };
    if (req.file) {
      updatedData.image = req.file.filename;
    }

    const program = await SkillProgram.findByIdAndUpdate(id, updatedData, {
      new: true,
    });

    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }

    res.status(200).json({ message: "Program updated successfully", data: program });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};