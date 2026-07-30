const express = require("express");
const router = express.Router();
const {
  getAdminStats,
  getAllMembers,
  getMemberById,
  createMember,
  updateMemberStatus,
  getAdminTrainers,
  getMembershipPlans,
  createMembershipPlan,
  getAdminPayments,
  getAdminAttendance,
  recordCheckIn,
  getNotifications,
  createNotification,
} = require("../controllers/adminController");
const { protect, authorize } = require("../middleware/authMiddleware");

// All admin routes protected with JWT + Admin Authorization
router.use(protect);
router.use(authorize("admin"));

router.get("/stats", getAdminStats);

router.get("/members", getAllMembers);
router.post("/members", createMember);
router.get("/members/:id", getMemberById);
router.patch("/members/:id/status", updateMemberStatus);

router.get("/trainers", getAdminTrainers);

router.get("/membership-plans", getMembershipPlans);
router.post("/membership-plans", createMembershipPlan);

router.get("/payments", getAdminPayments);

router.get("/attendance", getAdminAttendance);
router.post("/attendance", recordCheckIn);

router.get("/notifications", getNotifications);
router.post("/notifications", createNotification);

module.exports = router;
