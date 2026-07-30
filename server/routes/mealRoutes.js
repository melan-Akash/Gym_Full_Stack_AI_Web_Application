const express = require("express");
const router = express.Router();
const { getMealPlans, createMealPlan } = require("../controllers/mealController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", protect, getMealPlans);
router.post("/", protect, authorize("trainer", "admin"), createMealPlan);

module.exports = router;
