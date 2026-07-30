const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    method: {
      type: String,
      enum: ["Mobile App QR", "Key Fob", "Biometric Scanner", "Manual Check-in"],
      default: "Mobile App QR",
    },
    status: {
      type: String,
      enum: ["Present", "Excused", "Absent"],
      default: "Present",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
