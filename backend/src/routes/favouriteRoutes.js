const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const { checkCandidate } = require("../middleware/roleMiddleware");
const { saveJob, myFavourites, removeJob } = require("../controllers/favouriteController");

router.post("/:jobId", auth, checkCandidate, saveJob);
router.delete("/:jobId", auth, checkCandidate, removeJob);
router.get("/my", auth, checkCandidate, myFavourites);

module.exports = router;
