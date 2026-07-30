const WorkoutPlan = require("../models/WorkoutPlan");

// @desc    Get all workout plans
// @route   GET /api/workouts
// @access  Private
const getWorkouts = async (req, res) => {
  try {
    const workouts = await WorkoutPlan.find()
      .populate("assignedTo", "name email")
      .populate("createdBy", "name role");
    res.json({ success: true, count: workouts.length, data: workouts });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new workout plan
// @route   POST /api/workouts
// @access  Private (Trainer/Admin)
const createWorkout = async (req, res) => {
  try {
    const { title, category, level, durationMinutes, targetMuscles, assignedTo, exercises } = req.body;

    const workout = await WorkoutPlan.create({
      title,
      category,
      level,
      durationMinutes,
      targetMuscles,
      assignedTo: assignedTo || null,
      createdBy: req.user._id,
      exercises: exercises || [],
    });

    res.status(201).json({ success: true, data: workout });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getWorkouts, createWorkout };
