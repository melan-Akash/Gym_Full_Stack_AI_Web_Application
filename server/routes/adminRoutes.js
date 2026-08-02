const express = require("express");
const router = express.Router();
const {
  getAdminStats,
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember,
  updateMemberStatus,
  updateMemberPaymentStatus,
  getAdminTrainers,
  createTrainerProfile,
  updateTrainerProfile,
  updateTrainerCommission,
  deleteTrainerProfile,
  getMembershipPlans,
  createMembershipPlan,
  updateMembershipPlan,
  deleteMembershipPlan,
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

// Full CRUD for Members
router.get("/members", getAllMembers);
router.post("/members", createMember);
router.get("/members/:id", getMemberById);
router.put("/members/:id", updateMember);
router.delete("/members/:id", deleteMember);
router.patch("/members/:id/status", updateMemberStatus);
router.patch("/members/:id/payment-status", updateMemberPaymentStatus);

// Full CRUD for Trainers
router.get("/trainers", getAdminTrainers);
router.post("/trainers", createTrainerProfile);
router.put("/trainers/:id", updateTrainerProfile);
router.patch("/trainers/:id/commission", updateTrainerCommission);
router.delete("/trainers/:id", deleteTrainerProfile);

// Full CRUD for Membership Plans
router.get("/membership-plans", getMembershipPlans);
router.post("/membership-plans", createMembershipPlan);
router.put("/membership-plans/:id", updateMembershipPlan);
router.delete("/membership-plans/:id", deleteMembershipPlan);

router.get("/payments", getAdminPayments);

router.get("/attendance", getAdminAttendance);
router.post("/attendance", recordCheckIn);

router.get("/notifications", getNotifications);
router.post("/notifications", createNotification);

module.exports = router;
