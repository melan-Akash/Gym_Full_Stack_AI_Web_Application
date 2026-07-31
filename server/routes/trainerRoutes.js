const express = require("express");
const router = express.Router();
const {
  getTrainers,
  getTrainerById,
  getTrainerStats,
  getTrainerClients,
  getClientById,
  getTrainerBookings,
  updateBookingStatus,
} = require("../controllers/trainerController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public
router.get("/", getTrainers);

// Trainer Protected Routes
router.get("/dashboard/stats", protect, authorize("trainer", "admin"), getTrainerStats);
router.get("/my-clients", protect, authorize("trainer", "admin"), getTrainerClients);
router.get("/my-clients/:id", protect, authorize("trainer", "admin"), getClientById);

router.get("/bookings", protect, authorize("trainer", "admin"), getTrainerBookings);
router.patch("/bookings/:id/status", protect, authorize("trainer", "admin"), updateBookingStatus);

router.get("/:id", getTrainerById);

module.exports = router;
