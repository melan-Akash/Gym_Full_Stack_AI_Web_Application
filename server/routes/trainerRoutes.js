const express = require("express");
const router = express.Router();
const { getTrainers, getTrainerById, getTrainerClients } = require("../controllers/trainerController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/", getTrainers);
router.get("/my-clients", protect, authorize("trainer", "admin"), getTrainerClients);
router.get("/:id", getTrainerById);

module.exports = router;
