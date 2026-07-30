const MealPlan = require("../models/MealPlan");

// @desc    Get all meal plans
// @route   GET /api/meals
// @access  Private
const getMealPlans = async (req, res) => {
  try {
    const mealPlans = await MealPlan.find()
      .populate("assignedTo", "name email")
      .populate("createdBy", "name role");
    res.json({ success: true, count: mealPlans.length, data: mealPlans });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new meal plan
// @route   POST /api/meals
// @access  Private (Trainer/Admin)
const createMealPlan = async (req, res) => {
  try {
    const { title, goal, calories, proteinGrams, carbsGrams, fatsGrams, assignedTo, meals } = req.body;

    const mealPlan = await MealPlan.create({
      title,
      goal,
      calories,
      proteinGrams,
      carbsGrams,
      fatsGrams,
      assignedTo: assignedTo || null,
      createdBy: req.user._id,
      meals: meals || [],
    });

    res.status(201).json({ success: true, data: mealPlan });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getMealPlans, createMealPlan };
