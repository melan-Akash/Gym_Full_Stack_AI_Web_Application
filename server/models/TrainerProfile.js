const mongoose = require("mongoose");

const trainerProfileSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80",
    },
    title: {
      type: String,
      required: true,
      default: "Certified Strength & Fitness Coach",
    },
    category: {
      type: String,
      enum: ["Bodybuilding", "HIIT & Cardio", "Powerlifting", "Yoga & Mobility", "Rehabilitation"],
      default: "Bodybuilding",
    },
    bio: {
      type: String,
      default: "",
    },
    fullBio: {
      type: String,
      default: "",
    },
    experienceYears: {
      type: Number,
      default: 5,
    },
    hourlyRate: {
      type: Number,
      default: 75,
    },
    rating: {
      type: Number,
      default: 5.0,
    },
    specializations: [String],
    certifications: [String],
    achievements: [String],
    availableDays: {
      type: [String],
      default: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    },
    timeSlots: {
      type: [String],
      default: ["08:00 AM", "10:00 AM", "02:00 PM", "04:00 PM"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TrainerProfile", trainerProfileSchema);
