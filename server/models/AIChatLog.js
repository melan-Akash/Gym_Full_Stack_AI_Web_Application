const mongoose = require("mongoose");

const aiChatLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    actionType: {
      type: String,
      enum: ["chat", "workout_generator", "meal_generator", "macro_estimator", "form_advisor", "progress_insights", "admin_generator"],
      default: "chat",
    },
    prompt: {
      type: String,
      required: true,
    },
    responseContent: {
      type: String,
      required: true,
    },
    structuredOutput: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    modelUsed: {
      type: String,
      default: "meta-llama/llama-3.1-8b-instruct",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("AIChatLog", aiChatLogSchema);
