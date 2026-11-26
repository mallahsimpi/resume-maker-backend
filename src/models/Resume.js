import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    personalInfo: {
      fullName: String,
      email: String,
      phone: String,
      address: String,
      jobTitle: String,
      summary: String
    },

    education: [
      {
        degree: String,
        institution: String,
        startYear: String,
        endYear: String,
        percentage: String
      }
    ],

    experience: [
      {
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        description: String
      }
    ],

    skills: [String],

    projects: [
      {
        name: String,
        technologies: [String],
        description: String
      }
    ],

    certifications: [String]
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

export default Resume;