const express = require("express");
const router = express.Router();
const { getWorkouts, createWorkout } = require("../controllers/workoutController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", protect, getWorkouts);
router.post("/", protect, authorize("trainer", "admin"), createWorkout);

module.exports = router;
