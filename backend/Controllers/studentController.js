import Student from "../Models/Student.js";
import PDFDocument from "pdfkit";

// Student Login & Get Result
// Student Login & Get Result
export const loginStudent = async (req, res) => {
  const { username, password } = req.body; // username = rollNo OR enrollmentNo, password = session year

  try {
    const student = await Student.findOne({
      "result.session": password,
      $or: [
        { username: username }, // roll no stored in username
        { "result.rollNo": username },
        { "result.enrollmentNo": username },
      ],
    });

    if (!student) {
      return res.status(400).json({
        message: "Invalid Roll No / Enrollment No or Session Year",
      });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin - Upload Result
export const uploadResult = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Result uploaded successfully", student });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Admin - Update Result (for adding new fields later dynamically)
export const updateResult = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Student.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Fetch all students
export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete student
export const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    await Student.findByIdAndDelete(id);
    res.json({ message: "Student result deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

