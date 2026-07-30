const express = require("express");
const router = express.Router();
const { getAdminStats, getAllMembers } = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.use(protect);
router.use(authorize("admin"));

router.get("/stats", getAdminStats);
router.get("/members", getAllMembers);

module.exports = router;
