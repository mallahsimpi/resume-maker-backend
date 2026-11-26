import Resume from "../models/Resume.js";

// CREATE RESUME
export const createResume = async (req, res) => {
  try {
    const resume = await Resume.create({
      ...req.body,
      user: req.user._id
    });

    res.status(201).json({
      message: "Resume created successfully",
      resume
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// GET ALL RESUMES
export const getResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: resumes.length,
      resumes
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// GET SINGLE RESUME
export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      });
    }

    res.status(200).json({ resume });

  } catch (error) {
    res.status(400).json({
      message: "Invalid resume ID"
    });
  }
};

// UPDATE RESUME
export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      { $set: req.body },
      {
        new: true,
        runValidators: true
      }
    );

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      });
    }

    res.status(200).json({
      message: "Resume updated successfully",
      resume
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// DELETE RESUME
export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!resume) {
      return res.status(404).json({
        message: "Resume not found"
      });
    }

    res.status(200).json({
      message: "Resume deleted successfully"
    });

  } catch (error) {
    res.status(400).json({
      message: "Invalid resume ID"
    });
  }
};