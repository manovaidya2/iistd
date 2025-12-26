import SkillProgramCourse from "../Models/SkillProgramCourse.js";

export const addCoursesToProgram = async (req, res) => {
  try {
    const { programId } = req.params;
    const { certificate = [], diploma = [], advancedDiploma = [] } = req.body;

    if (
      certificate.length === 0 &&
      diploma.length === 0 &&
      advancedDiploma.length === 0
    ) {
      return res.status(400).json({ message: "At least one course required" });
    }

    const saved = await SkillProgramCourse.findOneAndUpdate(
      { program: programId },
      {
        courses: {
          certificate,
          diploma,
          advancedDiploma,
        },
      },
      { new: true, upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Courses saved category-wise",
      data: saved,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getCoursesByProgram = async (req, res) => {
  try {
    const { programId } = req.params;

    const data = await SkillProgramCourse.findOne({
      program: programId,
    });

    res.status(200).json(data || { program: programId, courses: [] });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};



export const updateCourse = async (req, res) => {
  try {
    const { programId, category, index } = req.params;
    const updatedCourse = req.body;

    const program = await SkillProgramCourse.findOne({ program: programId });
    if (!program) return res.status(404).json({ message: "Program not found" });

    program.courses[category][index] = updatedCourse;
    await program.save();

    res.json({ success: true, message: "Course updated" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


export const deleteCourse = async (req, res) => {
  try {
    const { programId, category, index } = req.params;

    const program = await SkillProgramCourse.findOne({ program: programId });
    if (!program) return res.status(404).json({ message: "Program not found" });

    program.courses[category].splice(index, 1);
    await program.save();

    res.json({ success: true, message: "Course deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
