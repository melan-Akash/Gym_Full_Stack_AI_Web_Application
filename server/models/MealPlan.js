const mongoose = require("mongoose");

const mealItemSchema = new mongoose.Schema({
  time: { type: String, required: true, default: "08:00 AM" },
  name: { type: String, required: true },
  items: [String],
});

const mealPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Meal plan title is required"],
    },
    goal: {
      type: String,
      default: "Maintenance",
    },
    calories: {
      type: Number,
      required: true,
      default: 2500,
    },
    proteinGrams: {
      type: Number,
      default: 180,
    },
    carbsGrams: {
      type: Number,
      default: 250,
    },
    fatsGrams: {
      type: Number,
      default: 70,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    meals: [mealItemSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MealPlan", mealPlanSchema);
