require("dotenv").config();
const connectDB = require("./config/db");
const User = require("./models/User");
const TrainerProfile = require("./models/TrainerProfile");
const MembershipPlan = require("./models/MembershipPlan");
const Payment = require("./models/Payment");
const Attendance = require("./models/Attendance");
const Notification = require("./models/Notification");
const Booking = require("./models/Booking");
const WorkoutPlan = require("./models/WorkoutPlan");
const MealPlan = require("./models/MealPlan");

async function seedDatabase() {
  await connectDB();

  console.log("---------------------------------------------------");
  console.log("🌱 SEEDING FULL TRAINER & ADMIN DATA INTO MONGODB ATLAS");
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
    } else {
      // Ensure assignedTrainer is set
      member.assignedTrainer = trainer._id;
      await member.save();
    }

    // 4. Seed Bookings for Trainer
    const bookingsCount = await Booking.countDocuments();
    if (bookingsCount === 0) {
      const today = new Date().toISOString().split("T")[0];
      await Booking.insertMany([
        {
          trainer: trainer._id,
          client: member._id,
          date: today,
          time: "10:00 AM",
          sessionType: "1-on-1 Hypertrophy Session",
          status: "Confirmed",
          notes: "Focusing on chest & shoulders progression.",
        },
        {
          trainer: trainer._id,
          client: member._id,
          date: today,
          time: "02:00 PM",
          sessionType: "Physique Assessment & Body Fat Scan",
          status: "Confirmed",
          notes: "Monthly bio-metric check.",
        },
      ]);
      console.log("✅ Trainer Bookings seeded into MongoDB");
    }

    // 5. Seed Workouts
    const workoutsCount = await WorkoutPlan.countDocuments();
    if (workoutsCount === 0) {
      await WorkoutPlan.create({
        title: "Pro Hypertrophy Upper Body Annihilation",
        category: "Hypertrophy",
        level: "Advanced",
        durationMinutes: 75,
        targetMuscles: ["Chest", "Lats", "Deltoids", "Triceps"],
        assignedTo: member._id,
        createdBy: trainer._id,
        exercises: [
          { name: "Incline Barbell Press", sets: 4, reps: "8-10", restSeconds: 90 },
          { name: "Weighted Pull-Ups", sets: 4, reps: "6-8", restSeconds: 90 },
          { name: "Standing Dumbbell Lateral Raises", sets: 4, reps: "12-15", restSeconds: 60 },
        ],
      });
      console.log("✅ Workout routines seeded into MongoDB");
    }

    console.log("---------------------------------------------------");
    console.log("🎉 ALL TRAINER SEEDING COMPLETED!");
    console.log("---------------------------------------------------");
    process.exit(0);
  } catch (error) {
    console.error("❌ SEED ERROR:", error.message);
    process.exit(1);
  }
}

seedDatabase();
