const express = require("express");
const router = express.Router();
const {
  generateAIFitnessPlan,
  generateStructuredWorkout,
  generateStructuredMealPlan,
  estimateMacros,
  adviseFormAndTechnique,
  generateProgressInsights,
  generateAdminContent,
  getAIChatHistory,
  clearAIChatHistory,
} = require("../controllers/aiController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Base AI Generation (General Chat / Prompt)
router.post("/generate", protect, generateAIFitnessPlan);

// Structured Plan Generators (+ Optional DB Auto-save)
router.post("/workout", protect, generateStructuredWorkout);
router.post("/meal", protect, generateStructuredMealPlan);

// Specialized AI Utilities
router.post("/macros", protect, estimateMacros);
router.post("/form-advisor", protect, adviseFormAndTechnique);
router.post("/insights", protect, generateProgressInsights);

// Admin / Content Marketing AI Helper
router.post("/admin-content", protect, authorize("admin", "trainer"), generateAdminContent);

// AI Conversation & Interaction Logs History
router.get("/history", protect, getAIChatHistory);
router.delete("/history", protect, clearAIChatHistory);

module.exports = router;
