const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { checkAdmin } = require("../middleware/roleMiddleware");
const { getApplicants } = require("../controllers/adminController");

router.get("/jobs/:jobId/applications", auth, checkAdmin, getApplicants);

module.exports = router;
