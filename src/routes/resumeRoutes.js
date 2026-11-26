import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume
} from "../controllers/resumeController.js";

const router = express.Router();

router.use(protect);

router.post("/", createResume);
router.get("/", getResumes);
router.get("/:id", getResumeById);
router.put("/:id", updateResume);
router.delete("/:id", deleteResume);

export default router;