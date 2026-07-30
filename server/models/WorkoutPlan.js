const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sets: { type: Number, required: true, default: 3 },
  reps: { type: String, required: true, default: "10-12" },
  restSeconds: { type: Number, default: 60 },
  muscle: { type: String, default: "Full Body" },
});

const workoutPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Workout plan title is required"],
    },
    category: {
      type: String,
      default: "Bodybuilding",
    },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Intermediate",
    },
    durationMinutes: {
      type: Number,
      default: 60,
    },
    targetMuscles: [String],
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    exercises: [exerciseSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("WorkoutPlan", workoutPlanSchema);
