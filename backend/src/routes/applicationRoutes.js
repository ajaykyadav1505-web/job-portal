const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { checkCandidate, checkAdmin } = require("../middleware/roleMiddleware");
const {
  applyJob,
  myApplications,
  updateStatus,
  getApplicantsForJob
} = require("../controllers/applicationController");

// Candidate
router.post("/:jobId", auth, checkCandidate, applyJob);
router.get("/my", auth, checkCandidate, myApplications);

// Admin
router.get("/job/:jobId", auth, checkAdmin, getApplicantsForJob);
router.put("/status/:id", auth, checkAdmin, updateStatus);

module.exports = router;
