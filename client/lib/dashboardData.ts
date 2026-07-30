export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  joinedDate: string;
  program: string;
  status: "Active" | "Pending" | "Paused";
  trainerId: string;
  trainerName: string;
  goal: string;
  weight: number; // lbs
  targetWeight: number;
  bodyFat: number; // %
  height: string;
  attendanceRate: number; // %
  workoutPlan: string;
  mealPlan: string;
  notes: string;
  recentWorkouts: {
    date: string;
    workoutName: string;
    duration: string;
    completed: boolean;
  }[];
}

export interface WorkoutTemplate {
  id: string;
  title: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationMinutes: number;
  targetMuscles: string[];
  exercises: {
    name: string;
    sets: number;
    reps: string;
    restSeconds: number;
  }[];
}

export interface MealPlanTemplate {
  id: string;
  title: string;
  calories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  goal: "Bulking" | "Cutting" | "Maintenance";
  meals: {
    time: string;
    name: string;
    items: string[];
  }[];
}

export interface BookingSession {
  id: string;
  clientName: string;
  clientAvatar: string;
  sessionType: string;
  date: string;
  time: string;
  status: "Confirmed" | "Pending" | "Cancelled";
  notes?: string;
}

export interface MessageItem {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  role: "client" | "trainer" | "admin";
  content: string;
  timestamp: string;
  isRead: boolean;
}

export const TRAINER_CLIENTS: ClientProfile[] = [
  {
    id: "c-101",
    name: "David Miller",
    email: "david.m@gmail.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80",
    joinedDate: "2026-01-15",
    program: "Hypertrophy Mastery",
    status: "Active",
    trainerId: "marcus-vance",
    trainerName: "Marcus Vance",
    goal: "Lean Muscle Hypertrophy (+12 lbs)",
    weight: 184,
    targetWeight: 195,
    bodyFat: 14.2,
    height: "6'1\"",
    attendanceRate: 94,
    workoutPlan: "Push-Pull-Legs 6-Day Split",
    mealPlan: "High-Protein Hypertrophy (3,100 kcal)",
    notes: "Responding exceptionally well to shoulder volume. Slight hamstring tightness after heavy deadlifts.",
    recentWorkouts: [
      { date: "2026-07-29", workoutName: "Heavy Chest & Triceps Shred", duration: "65 mins", completed: true },
      { date: "2026-07-27", workoutName: "Back & Biceps Thickness", duration: "70 mins", completed: true },
      { date: "2026-07-25", workoutName: "Quad Hypertrophy & Calves", duration: "75 mins", completed: true },
    ],
  },
  {
    id: "c-102",
    name: "Sarah Jenkins",
    email: "sarah.j@hotmail.com",
    phone: "+1 (555) 876-5432",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    joinedDate: "2026-03-01",
    program: "Strength & Shred",
    status: "Active",
    trainerId: "marcus-vance",
    trainerName: "Marcus Vance",
    goal: "Fat Loss & Core Definition (-10 lbs)",
    weight: 138,
    targetWeight: 128,
    bodyFat: 19.8,
    height: "5'6\"",
    attendanceRate: 98,
    workoutPlan: "Full Body Recomp 4-Day Split",
    mealPlan: "Carb Cycling Fat Loss (1,900 kcal)",
    notes: "Consistently hitting macros. Squat form improved significantly.",
    recentWorkouts: [
      { date: "2026-07-30", workoutName: "Glute & Hamstring Focus", duration: "55 mins", completed: true },
      { date: "2026-07-28", workoutName: "Upper Body Sculpting", duration: "60 mins", completed: true },
    ],
  },
  {
    id: "c-103",
    name: "Alex Thorne",
    email: "alex.t@techcorp.com",
    phone: "+1 (555) 432-1098",
    avatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&q=80",
    joinedDate: "2026-04-10",
    program: "HIIT Metabolic Blast",
    status: "Active",
    trainerId: "elena-[#00f2fe]-rostova",
    trainerName: "Elena Rostova",
    goal: "VO2 Max Increase & Weight Reduction",
    weight: 202,
    targetWeight: 185,
    bodyFat: 22.1,
    height: "5'11\"",
    attendanceRate: 88,
    workoutPlan: "Metabolic Circuit 5-Day",
    mealPlan: "Balanced Maintenance (2,400 kcal)",
    notes: "Heart rate recovery time has dropped by 24 seconds during high-intensity intervals.",
    recentWorkouts: [
      { date: "2026-07-29", workoutName: "Rowing & Assault Bike Intervals", duration: "45 mins", completed: true },
    ],
  },
  {
    id: "c-104",
    name: "Chloe Bennett",
    email: "chloe.b@gmail.com",
    phone: "+1 (555) 998-1122",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&q=80",
    joinedDate: "2026-02-18",
    program: "Mobility & Core Stability",
    status: "Active",
    trainerId: "maya-lin",
    trainerName: "Maya Lin",
    goal: "Pelvic Alignment & Lower Back Pain Relief",
    weight: 126,
    targetWeight: 126,
    bodyFat: 18.2,
    height: "5'5\"",
    attendanceRate: 91,
    workoutPlan: "Spinal Decompression & Vinyasa",
    mealPlan: "Anti-Inflammatory Wellness Plan",
    notes: "Lumbar flexibility increased by 15%. No spinal discomfort reported this week.",
    recentWorkouts: [
      { date: "2026-07-30", workoutName: "Hip Mobility & Thoracic Spine Flow", duration: "50 mins", completed: true },
    ],
  },
];

export const WORKOUT_TEMPLATES: WorkoutTemplate[] = [
  {
    id: "wt-1",
    title: "Pro Hypertrophy Push Day",
    category: "Bodybuilding",
    level: "Advanced",
    durationMinutes: 65,
    targetMuscles: ["Chest", "Front Delts", "Triceps"],
    exercises: [
      { name: "Incline Barbell Bench Press", sets: 4, reps: "8-10", restSeconds: 90 },
      { name: "Flat Dumbbell Flyes (Cable)", sets: 3, reps: "12-15", restSeconds: 60 },
      { name: "Standing Overhead Military Press", sets: 4, reps: "6-8", restSeconds: 120 },
      { name: "Cable Lateral Raises", sets: 4, reps: "15", restSeconds: 45 },
      { name: "Rope Triceps Pushdowns", sets: 4, reps: "12-15", restSeconds: 60 },
    ],
  },
  {
    id: "wt-2",
    title: "Metabolic Fat Shredder",
    category: "HIIT",
    level: "Intermediate",
    durationMinutes: 45,
    targetMuscles: ["Full Body", "Cardiovascular"],
    exercises: [
      { name: "Assault Bike Sprints", sets: 5, reps: "30 sec ALL OUT", restSeconds: 60 },
      { name: "Kettlebell Swings (24kg)", sets: 4, reps: "20", restSeconds: 45 },
      { name: "Plyometric Box Jumps", sets: 4, reps: "12", restSeconds: 45 },
      { name: "Medicine Ball Slams", sets: 4, reps: "15", restSeconds: 30 },
      { name: "Plank to Push-up", sets: 3, reps: "45 sec hold", restSeconds: 30 },
    ],
  },
  {
    id: "wt-3",
    title: "Powerlifting Deadlift & Back Focus",
    category: "Powerlifting",
    level: "Advanced",
    durationMinutes: 75,
    targetMuscles: ["Lower Back", "Hamstrings", "Lats", "Traps"],
    exercises: [
      { name: "Conventional Deadlift (Deficit)", sets: 5, reps: "3-5", restSeconds: 180 },
      { name: "Chest-Supported T-Bar Rows", sets: 4, reps: "8-10", restSeconds: 90 },
      { name: "Romanian Dumbbell Deadlifts", sets: 3, reps: "10-12", restSeconds: 90 },
      { name: "Lat Pulldowns (Wide Grip)", sets: 4, reps: "12", restSeconds: 60 },
    ],
  },
];

export const MEAL_PLAN_TEMPLATES: MealPlanTemplate[] = [
  {
    id: "mp-1",
    title: "Elite Lean Bulk Blueprint",
    calories: 3200,
    proteinGrams: 220,
    carbsGrams: 360,
    fatsGrams: 85,
    goal: "Bulking",
    meals: [
      { time: "07:30 AM", name: "Anabolic Breakfast", items: ["6 Whole Eggs with Spinach", "1.5 Cups Oatmeal with Blueberries", "1 tbsp Almond Butter"] },
      { time: "11:30 AM", name: "Pre-Workout Clean Fuel", items: ["8oz Grilled Chicken Breast", "2 Cups Jasmine Rice", "Steamed Broccoli"] },
      { time: "03:30 PM", name: "Post-Workout Recovery", items: ["2 Scoops Whey Isolate", "1 Large Banana", "50g Cream of Rice"] },
      { time: "07:30 PM", name: "High-Density Dinner", items: ["8oz Salmon Fillet", "1 Large Sweet Potato", "Mixed Green Salad with Olive Oil"] },
    ],
  },
  {
    id: "mp-2",
    title: "Aggressive Fat Loss Recomp",
    calories: 1950,
    proteinGrams: 190,
    carbsGrams: 140,
    fatsGrams: 55,
    goal: "Cutting",
    meals: [
      { time: "08:00 AM", name: "Protein Power Bowl", items: ["1.5 Cups Greek Yogurt (0% fat)", "1 Scoop Whey Isolate", "Handful of Raspberries"] },
      { time: "01:00 PM", name: "Lean Turkey Salad", items: ["7oz Ground Turkey (93/7)", "Large Spinach & Cucumber Bowl", "1/2 Avocado"] },
      { time: "06:30 PM", name: "Cod & Asparagus Dinner", items: ["8oz Baked Wild Cod", "1.5 Cups Quinoa", "Grilled Asparagus Spears"] },
    ],
  },
];

export const BOOKING_SESSIONS: BookingSession[] = [
  {
    id: "bk-1",
    clientName: "David Miller",
    clientAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80",
    sessionType: "1-on-1 Personal Training (Hypertrophy)",
    date: "2026-07-31",
    time: "09:00 AM",
    status: "Confirmed",
    notes: "Focusing on Barbell Bench technique and rotator warmup.",
  },
  {
    id: "bk-2",
    clientName: "Sarah Jenkins",
    clientAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    sessionType: "Body Composition & Form Check",
    date: "2026-07-31",
    time: "11:00 AM",
    status: "Confirmed",
    notes: "Pinch caliper body fat measurement scheduled.",
  },
  {
    id: "bk-3",
    clientName: "Alex Thorne",
    clientAvatar: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&q=80",
    sessionType: "HIIT Conditioning Session",
    date: "2026-08-01",
    time: "04:00 PM",
    status: "Pending",
    notes: "Requested reschedule to afternoon slot.",
  },
];

export const INITIAL_MESSAGES: MessageItem[] = [
  {
    id: "m-1",
    senderId: "c-101",
    senderName: "David Miller",
    senderAvatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&q=80",
    role: "client",
    content: "Hey Coach Marcus! Hit a new PR of 275 lbs on bench today! Form felt super solid.",
    timestamp: "10:14 AM",
    isRead: true,
  },
  {
    id: "m-2",
    senderId: "marcus-vance",
    senderName: "Marcus Vance",
    senderAvatar: "https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=600&q=80",
    role: "trainer",
    content: "Boom! Incredible work David! Make sure to log the video in your client tracker so we can audit leg drive.",
    timestamp: "10:18 AM",
    isRead: true,
  },
  {
    id: "m-3",
    senderId: "c-102",
    senderName: "Sarah Jenkins",
    senderAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80",
    role: "client",
    content: "Quick question on tomorrow's meal plan - can I swap sweet potato for rice?",
    timestamp: "11:05 AM",
    isRead: false,
  },
];
