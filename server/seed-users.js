require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");
const TrainerProfile = require("./models/TrainerProfile");
const MembershipPlan = require("./models/MembershipPlan");
const Payment = require("./models/Payment");
const Attendance = require("./models/Attendance");
const Notification = require("./models/Notification");

async function seedDatabase() {
  await connectDB();

  console.log("---------------------------------------------------");
  console.log("🌱 SEEDING FULL ADMIN & TRAINER DATA INTO MONGODB ATLAS");
  console.log("---------------------------------------------------");

  try {
    // 1. Admin User
    let admin = await User.findOne({ email: "admin@forgedgym.com" });
    if (!admin) {
      admin = await User.create({
        name: "HQ Administrator",
        email: "admin@forgedgym.com",
        password: "password123",
        role: "admin",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
        phone: "+1 (555) 000-1122",
        status: "Active",
        membershipTier: "VIP Elite",
      });
      console.log("✅ Admin created: admin@forgedgym.com / password123");
    }

    // 2. Trainer User
    let trainer = await User.findOne({ email: "marcus@forgedgym.com" });
    if (!trainer) {
      trainer = await User.create({
        name: "Marcus Vance",
        email: "marcus@forgedgym.com",
        password: "password123",
        role: "trainer",
        avatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80",
        phone: "+1 (555) 444-5566",
        status: "Active",
        membershipTier: "Pro Performance",
      });

      await TrainerProfile.create({
        user: trainer._id,
        title: "Master Strength & Hypertrophy Coach",
        category: "Bodybuilding",
        bio: "IFBB Pro bodybuilder & strength science specialist.",
        fullBio: "Marcus has trained top-tier physique competitors.",
        experienceYears: 11,
        hourlyRate: 85,
        rating: 4.9,
        specializations: ["Hypertrophy Programming", "Contest Prep", "Powerbuilding"],
        certifications: ["CSCS (NSCA)", "NASM Master Trainer"],
        achievements: ["IFBB Pro Card Holder 2019"],
      });
      console.log("✅ Trainer created: marcus@forgedgym.com / password123");
    }

    // 3. Member User
    let member = await User.findOne({ email: "athlete@forged.com" });
    if (!member) {
      member = await User.create({
        name: "Alex Mercer",
        email: "athlete@forged.com",
        password: "password123",
        role: "member",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80",
        phone: "+1 (555) 777-8899",
        status: "Active",
        membershipTier: "VIP Elite",
        assignedTrainer: trainer._id,
      });
      console.log("✅ Member created: athlete@forged.com / password123");
    }

    // 4. Seed Membership Plans
    const plansCount = await MembershipPlan.countDocuments();
    if (plansCount === 0) {
      await MembershipPlan.insertMany([
        {
          title: "Basic Access",
          price: 49,
          billingPeriod: "Monthly",
          features: ["Access to Main Gym Floor", "Locker Access", "Standard Fob (6AM-10PM)"],
          activeSubscribers: 420,
        },
        {
          title: "Pro Performance",
          price: 99,
          billingPeriod: "Monthly",
          isPopular: true,
          features: ["24/7 Unlimited Access", "Sauna & Cold Plunge Suite", "Group Classes"],
          activeSubscribers: 580,
        },
        {
          title: "VIP Elite Athlete",
          price: 199,
          billingPeriod: "Monthly",
          features: ["Everything in Pro", "Dedicated Personal Trainer", "AI Workout & Meal Engine"],
          activeSubscribers: 248,
        },
      ]);
      console.log("✅ Membership Plans seeded into MongoDB");
    }

    // 5. Seed Payments
    const paymentsCount = await Payment.countDocuments();
    if (paymentsCount === 0) {
      await Payment.insertMany([
        {
          invoiceId: "INV-2026-0891",
          member: member._id,
          planName: "VIP Elite Athlete",
          amount: 199.0,
          paymentMethod: "Credit Card",
          status: "Paid",
          date: "2026-07-30",
        },
        {
          invoiceId: "INV-2026-0892",
          member: member._id,
          planName: "Personal Training Pack",
          amount: 425.0,
          paymentMethod: "Apple Pay",
          status: "Paid",
          date: "2026-07-29",
        },
      ]);
      console.log("✅ Payments ledger seeded into MongoDB");
    }

    // 6. Seed Attendance
    const attendanceCount = await Attendance.countDocuments();
    if (attendanceCount === 0) {
      const today = new Date().toISOString().split("T")[0];
      await Attendance.insertMany([
        {
          user: member._id,
          date: today,
          time: "08:30 AM",
          method: "Mobile App QR",
          status: "Present",
        },
      ]);
      console.log("✅ Attendance logs seeded into MongoDB");
    }

    // 7. Seed Notifications
    const notifCount = await Notification.countDocuments();
    if (notifCount === 0) {
      await Notification.insertMany([
        {
          title: "New Recovery Lab Equipment Installation",
          message: "The new Cryotherapy chambers are now live on the 2nd floor.",
          category: "Announcement",
          targetAudience: "All Members",
          sentBy: "Admin HQ",
        },
      ]);
      console.log("✅ System Notifications seeded into MongoDB");
    }

    console.log("---------------------------------------------------");
    console.log("🎉 ALL MONGODB ATLAS SEEDING COMPLETED SUCCESSFULLY!");
    console.log("---------------------------------------------------");
    process.exit(0);
  } catch (error) {
    console.error("❌ SEED ERROR:", error.message);
    process.exit(1);
  }
}

seedDatabase();
