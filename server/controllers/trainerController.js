const TrainerProfile = require("../models/TrainerProfile");
const User = require("../models/User");

// @desc    Get all public trainers
// @route   GET /api/trainers
// @access  Public
const getTrainers = async (req, res) => {
  try {
    const trainers = await TrainerProfile.find().populate("user", "name email avatar phone status");
    res.json({ success: true, count: trainers.length, data: trainers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single trainer by ID
// @route   GET /api/trainers/:id
// @access  Public
const getTrainerById = async (req, res) => {
  try {
    const trainer = await TrainerProfile.findById(req.params.id).populate("user", "name email avatar phone");
    if (!trainer) {
      return res.status(404).json({ success: false, message: "Trainer profile not found" });
    }
    res.json({ success: true, data: trainer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get clients assigned to logged in trainer
// @route   GET /api/trainers/my-clients
// @access  Private (Trainer)
const getTrainerClients = async (req, res) => {
  try {
    const clients = await User.find({ assignedTrainer: req.user._id, role: "member" });
    res.json({ success: true, count: clients.length, data: clients });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getTrainers, getTrainerById, getTrainerClients };
