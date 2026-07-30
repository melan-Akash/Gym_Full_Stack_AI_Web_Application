const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      enum: ["Announcement", "Alert", "System Update", "Promotion"],
      default: "Announcement",
    },
    targetAudience: {
      type: String,
      enum: ["All Members", "Trainers Only", "VIP Members"],
      default: "All Members",
    },
    sentBy: {
      type: String,
      default: "Admin HQ",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Notification", notificationSchema);
