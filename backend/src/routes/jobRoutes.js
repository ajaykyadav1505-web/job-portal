const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { checkAdmin } = require("../middleware/roleMiddleware");
const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
} = require("../controllers/jobController");

// Admin – create job
router.post("/", auth, checkAdmin, createJob);

// Public – list jobs (with search & filters)
router.get("/", getJobs);

// Public – get single job
router.get("/:id", getJobById);

// Admin – update job
router.put("/:id", auth, checkAdmin, updateJob);

// Admin – delete job
router.delete("/:id", auth, checkAdmin, deleteJob);

module.exports = router;
