const express = require("express");
const router = express.Router();
const { generateAIFitnessPlan } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

router.post("/generate", protect, generateAIFitnessPlan);

module.exports = router;
