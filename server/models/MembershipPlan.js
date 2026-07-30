const mongoose = require("mongoose");

const membershipPlanSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    price: {
      type: Number,
      required: true,
    },
    billingPeriod: {
      type: String,
      enum: ["Monthly", "Yearly"],
      default: "Monthly",
    },
    features: [String],
    activeSubscribers: {
      type: Number,
      default: 0,
    },
    isPopular: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("MembershipPlan", membershipPlanSchema);
