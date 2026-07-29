"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Dumbbell,
  Zap,
  Brain,
  Heart,
  Timer,
  Trophy,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Flame,
  Activity,
  Plus,
  Minus,
  BrainCircuit,
  Utensils,
  Calculator,
  MessageSquare,
  Send,
  Bot,
  User,
  Scale,
  TrendingDown,
} from "lucide-react";

const capabilities = [
  {
    icon: Dumbbell,
    title: "Force & Velocity",
    subtitle: "Heavy Iron & Systemic Overload",
    description:
      "Precision powerlifting, strength mechanics, and neuromuscular hypertrophy protocols engineered for maximum force production.",
    tag: "Foundation",
    features: [
      "Olympic weightlifting platforms",
      "Calibrated steel & urethane plates",
      "Velocity-based training sensors",
      "Biomechanical form analysis",
    ],
    color: "#d7ff2f",
  },
  {
    icon: Zap,
    title: "Cardio & Stamina",
    subtitle: "High-Output Energy Systems",
    description:
      "Rapid-pace metabolic conditioning designed to accelerate lipid burn, elevate VO2 max, and build relentless cardiovascular endurance.",
    tag: "Fat Burn",
    features: [
      "Interactive Assault AirBikes",
      "Sled pull & sprint turf tracks",
      "Heart rate zone telemetries",
      "Anaerobic threshold drills",
    ],
    color: "#00f2fe",
  },
  {
    icon: Brain,
    title: "Custom Mentorship",
    subtitle: "1-on-1 Credentialed Coaching",
    description:
      "Bespoke periodization pathways tailored to your unique anatomical structure, competition schedules, and personal goals.",
    tag: "Premium",
    highlight: true,
    features: [
      "Dedicated elite personal coach",
      "Weekly video form reviews",
      "Custom macronutrient planning",
      "24/7 direct coach messaging",
    ],
    color: "#d7ff2f",
  },
  {
    icon: Heart,
    title: "Restoration & Therapy",
    subtitle: "Regeneration & Cellular Repair",
    description:
      "Cold plunges, infrared heat, contrast therapy, and guided tissue release to minimize DOMS and optimize recovery speed.",
    tag: "Recovery",
    features: [
      "Sub-zero cryo & cold plunges",
      "Full-spectrum infrared saunas",
      "Percussion therapy stations",
      "Dynamic decompression boots",
    ],
    color: "#00f2fe",
  },
  {
    icon: Timer,
    title: "Aerobic Capacity",
    subtitle: "Endurance & Lactate Threshold",
    description:
      "Systematic pacing frameworks and aerobic base building protocols for marathon runners, triathletes, and tactical athletes.",
    tag: "Endurance",
    features: [
      "Lactate threshold testing",
      "Pacing & cadence mastery",
      "Pneumatic rowing resistance",
      "Mitochondrial density training",
    ],
    color: "#d7ff2f",
  },
  {
    icon: Trophy,
    title: "Championship Ready",
    subtitle: "Competition & Stage Preparation",
    description:
      "Rigorous contest prep protocols for powerlifting meets, bodybuilding stages, Hyrox events, and professional sports.",
    tag: "Elite",
    features: [
      "Peak week manipulation plans",
      "Stage posing & execution clinics",
      "Meet day handler support",
      "Psychological mindset prep",
    ],
    color: "#00f2fe",
  },
];

const modalities = [
  {
    title: "Biometric AI Tracking",
    description:
      "Integrated smart sensors track velocity, bar speed, heart rate variability (HRV), and muscle fatigue in real time.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=85",
  },
  {
    title: "Hydrotherapy & Cold Plunge",
    description:
      "38°F mineralized cold water tanks reduce systemic inflammation and stimulate rapid metabolic nervous system reboot.",
    image: "https://images.unsplash.com/photo-1540497077202-7c8a3999166f?w=800&q=85",
  },
  {
    title: "Powerlifting & Heavy Iron",
    description:
      "Eleiko competition bars, IPF-approved power racks, and specialized specialty bars built for maximum loading safety.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=85",
  },
  {
    title: "Elite Competition Turf",
    description:
      "50-meter indoor shock-absorbing turf engineered for heavy sled drives, farmer carries, and explosive sprint work.",
    image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&q=85",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Biometric Assessment",
    desc: "We perform complete body composition analysis, movement screening, and baseline strength testing to identify your baseline.",
  },
  {
    step: "02",
    title: "Periodized Blueprint",
    desc: "Our neural algorithms and head coaches build a multi-phase training program targeted specifically to your timeline.",
  },
  {
    step: "03",
    title: "High-Intensity Execution",
    desc: "Execute your daily workouts under the supervision of certified trainers using world-class equipment and real-time feedback.",
  },
  {
    step: "04",
    title: "Recovery & Optimization",
    desc: "Leverage our contrast therapy suite and nutrition plans to ensure full cellular recovery before your next session.",
  },
];

const serviceFaqs = [
  {
    q: "Can I customize my training program based on my schedule?",
    a: "Absolutely. All program blueprints adapt seamlessly to your availability—whether you can train 3 days or 6 days a week.",
  },
  {
    q: "Are personal training sessions available individually?",
    a: "Yes, 1-on-1 private mentorship sessions can be booked individually or included in our Performance and Elite membership tiers.",
  },
  {
    q: "Do I need prior gym experience to join these programs?",
    a: "No. Our certified coaches tailor movement patterns and weight selection to your current experience level, from total beginner to elite competitor.",
  },
  {
    q: "How does the AI nutrition recommendation system work?",
    a: "By tracking your workout volume, metabolic output, and goals, the AI calculates precise daily calorie and macronutrient targets.",
  },
];

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [aiTab, setAiTab] = useState<"meal" | "workout" | "biometrics" | "chat">("meal");

  // ---------------------------------------------------------------------------
  // AI Meal Planner State
  // ---------------------------------------------------------------------------
  const [mealAge, setMealAge] = useState<number>(25);
  const [mealWeight, setMealWeight] = useState<number>(75);
  const [mealHeight, setMealHeight] = useState<number>(178);
  const [mealGoal, setMealGoal] = useState<"shred" | "gain" | "recomp">("shred");
  const [dietType, setDietType] = useState<"srilankan" | "western" | "vegan">("srilankan");
  const [isGeneratingMeal, setIsGeneratingMeal] = useState<boolean>(false);
  const [generatedMealPlan, setGeneratedMealPlan] = useState<any>(null);

  const handleGenerateMealPlan = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingMeal(true);

    setTimeout(() => {
      const bmr = 10 * mealWeight + 6.25 * mealHeight - 5 * mealAge + 5;
      const tdee = Math.round(bmr * 1.55);

      let targetCalories = tdee;
      if (mealGoal === "shred") targetCalories = tdee - 500;
      if (mealGoal === "gain") targetCalories = tdee + 350;

      const protein = Math.round(mealWeight * 2.2);
      const fat = Math.round((targetCalories * 0.25) / 9);
      const carbs = Math.round((targetCalories - (protein * 4 + fat * 9)) / 4);

      let meals = [];
      if (dietType === "srilankan") {
        meals = [
          {
            meal: "Breakfast (7:30 AM)",
            name: "High-Protein String Hoppers & Omelette",
            items: "5 Red String Hoppers, 3 Whole Eggs Omelette with Onion & Green Chili, Katta Sambol & Dhal Curry",
            cals: Math.round(targetCalories * 0.25),
            protein: Math.round(protein * 0.25),
          },
          {
            meal: "Lunch (12:30 PM)",
            name: "Traditional Sri Lankan Fitness Plate",
            items: "150g Red Rice, 200g Devilled Chicken Breast or Fish Curry, Parippu (Dhal), Gotukola Sambol & Bandakka",
            cals: Math.round(targetCalories * 0.35),
            protein: Math.round(protein * 0.35),
          },
          {
            meal: "Post-Workout Snack (4:30 PM)",
            name: "Curd & Whey Protein Shake",
            items: "1 Scoop Whey Isolate, 100g Buffalo Curd with Kithul Treacle (1 tsp) & Handful of Roasted Cashews",
            cals: Math.round(targetCalories * 0.15),
            protein: Math.round(protein * 0.2),
          },
          {
            meal: "Dinner (7:30 PM)",
            name: "Grilled Fish & Steamed Sweet Potato",
            items: "200g Pan-Seared Tuna/Sailfish, 150g Steamed Sweet Potato (Batala), Steamed Broccoli & Carrot Salad",
            cals: Math.round(targetCalories * 0.25),
            protein: Math.round(protein * 0.2),
          },
        ];
      } else if (dietType === "vegan") {
        meals = [
          {
            meal: "Breakfast (7:30 AM)",
            name: "Tofu Scramble & Oatmeal",
            items: "200g Firm Tofu Scramble with Spinach & Turmeric, 60g Rolled Oats with Soy Milk & Chia Seeds",
            cals: Math.round(targetCalories * 0.25),
            protein: Math.round(protein * 0.25),
          },
          {
            meal: "Lunch (12:30 PM)",
            name: "High-Protein Quinoa & Soya Bowl",
            items: "150g Cooked Quinoa, 150g Devilled Soya Meat, Chickpea Salad & Avocado Slices",
            cals: Math.round(targetCalories * 0.35),
            protein: Math.round(protein * 0.35),
          },
          {
            meal: "Post-Workout Snack (4:30 PM)",
            name: "Plant Protein & Almond Smoothie",
            items: "1 Scoop Pea/Rice Isolate, 250ml Almond Milk, 1 Banana & 20g Peanut Butter",
            cals: Math.round(targetCalories * 0.15),
            protein: Math.round(protein * 0.2),
          },
          {
            meal: "Dinner (7:30 PM)",
            name: "Lentil & Tempeh Curry Bowl",
            items: "200g Red Lentil Dhal, 100g Grilled Tempeh, Mixed Leafy Salad with Olive Oil",
            cals: Math.round(targetCalories * 0.25),
            protein: Math.round(protein * 0.2),
          },
        ];
      } else {
        meals = [
          {
            meal: "Breakfast (7:30 AM)",
            name: "Classic Steak & Egg Whites",
            items: "4 Egg Whites + 1 Whole Egg, 100g Lean Beef Patty, 2 Slices Whole Grain Toast & Avocado",
            cals: Math.round(targetCalories * 0.25),
            protein: Math.round(protein * 0.25),
          },
          {
            meal: "Lunch (12:30 PM)",
            name: "Chicken, Rice & Asparagus",
            items: "220g Grilled Chicken Breast, 180g Jasmine Rice, Steamed Asparagus with Extra Virgin Olive Oil",
            cals: Math.round(targetCalories * 0.35),
            protein: Math.round(protein * 0.35),
          },
          {
            meal: "Post-Workout Snack (4:30 PM)",
            name: "Whey Isolate & Greek Yogurt",
            items: "1 Scoop Whey Isolate, 150g Low-Fat Greek Yogurt, 50g Blueberries & Almonds",
            cals: Math.round(targetCalories * 0.15),
            protein: Math.round(protein * 0.2),
          },
          {
            meal: "Dinner (7:30 PM)",
            name: "Wild Salmon & Roasted Potato",
            items: "200g Baked Salmon Fillet, 150g Roasted Sweet Potato, Mixed Green Salad",
            cals: Math.round(targetCalories * 0.25),
            protein: Math.round(protein * 0.2),
          },
        ];
      }

      setGeneratedMealPlan({
        calories: targetCalories,
        protein,
        carbs,
        fat,
        meals,
      });
      setIsGeneratingMeal(false);
    }, 850);
  };

  // ---------------------------------------------------------------------------
  // AI Workout Creator State
  // ---------------------------------------------------------------------------
  const [level, setLevel] = useState<"beginner" | "intermediate" | "elite">("intermediate");
  const [daysPerWeek, setDaysPerWeek] = useState<number>(4);
  const [focus, setFocus] = useState<"hypertrophy" | "strength" | "fatburn">("hypertrophy");
  const [isGeneratingWorkout, setIsGeneratingWorkout] = useState<boolean>(false);
  const [generatedWorkout, setGeneratedWorkout] = useState<any>(null);

  const handleGenerateWorkout = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingWorkout(true);

    setTimeout(() => {
      let schedule = [
        {
          day: "Day 1 - Upper Power",
          focus: "Barbell Press & Pull Velocity",
          exercises: [
            { name: "Barbell Bench Press", sets: "4 Sets x 5 Reps", rpe: "RPE 8.5", rest: "3 mins" },
            { name: "Weighted Pull-Ups / Lat Pulldown", sets: "4 Sets x 6 Reps", rpe: "RPE 8.0", rest: "2.5 mins" },
            { name: "Overhead Military Press", sets: "3 Sets x 6 Reps", rpe: "RPE 8.0", rest: "2 mins" },
            { name: "Incline Dumbbell Row", sets: "3 Sets x 8 Reps", rpe: "RPE 8.5", rest: "90 secs" },
          ],
        },
        {
          day: "Day 2 - Lower Power",
          focus: "Squat & Hip Hinge Foundation",
          exercises: [
            { name: "Barbell Back Squat", sets: "4 Sets x 5 Reps", rpe: "RPE 8.5", rest: "3 mins" },
            { name: "Romanian Deadlift", sets: "3 Sets x 8 Reps", rpe: "RPE 8.0", rest: "2.5 mins" },
            { name: "Bulgarian Split Squats", sets: "3 Sets x 8 Reps / leg", rpe: "RPE 8.5", rest: "90 secs" },
            { name: "Hanging Leg Raises", sets: "3 Sets x 12 Reps", rpe: "RPE 9.0", rest: "60 secs" },
          ],
        },
        {
          day: "Day 3 - Push Hypertrophy",
          focus: "Chest, Shoulders & Triceps Volume",
          exercises: [
            { name: "Incline Dumbbell Press", sets: "4 Sets x 8-10 Reps", rpe: "RPE 8.5", rest: "2 mins" },
            { name: "Cable Lateral Raises", sets: "4 Sets x 12 Reps", rpe: "RPE 9.0", rest: "60 secs" },
            { name: "Tricep Rope Pushdowns", sets: "3 Sets x 12 Reps", rpe: "RPE 9.0", rest: "60 secs" },
            { name: "Chest Dips", sets: "3 Sets x Failure", rpe: "RPE 9.5", rest: "90 secs" },
          ],
        },
        {
          day: "Day 4 - Pull & Legs Hypertrophy",
          focus: "Back, Hamstrings & Biceps",
          exercises: [
            { name: "Conventional / Sumo Deadlift", sets: "3 Sets x 5 Reps", rpe: "RPE 8.5", rest: "3 mins" },
            { name: "Seated Cable Row", sets: "4 Sets x 10 Reps", rpe: "RPE 8.5", rest: "90 secs" },
            { name: "Lying Hamstring Curls", sets: "3 Sets x 12 Reps", rpe: "RPE 9.0", rest: "60 secs" },
            { name: "EZ-Bar Incline Bicep Curls", sets: "3 Sets x 10 Reps", rpe: "RPE 9.0", rest: "60 secs" },
          ],
        },
      ];

      setGeneratedWorkout({
        level: level.toUpperCase(),
        days: daysPerWeek,
        focus: focus.toUpperCase(),
        schedule,
      });
      setIsGeneratingWorkout(false);
    }, 850);
  };

  // ---------------------------------------------------------------------------
  // AI Biometrics State
  // ---------------------------------------------------------------------------
  const [gender, setGender] = useState<"male" | "female">("male");
  const [bioWeight, setBioWeight] = useState<number>(78);
  const [bioHeight, setBioHeight] = useState<number>(178);
  const [neck, setNeck] = useState<number>(38);
  const [waist, setWaist] = useState<number>(84);
  const [targetFat, setTargetFat] = useState<number>(12);
  const [isCalculatingBio, setIsCalculatingBio] = useState<boolean>(false);
  const [generatedBio, setGeneratedBio] = useState<any>(null);

  const handleCalculateBio = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculatingBio(true);

    setTimeout(() => {
      let bodyFat = 15;
      if (gender === "male") {
        bodyFat =
          495 /
            (1.0324 -
              0.19077 * Math.log10(waist - neck) +
              0.15456 * Math.log10(bioHeight)) -
          450;
      } else {
        bodyFat =
          495 /
            (1.29579 -
              0.35004 * Math.log10(waist - neck) +
              0.221 * Math.log10(bioHeight)) -
          450;
      }

      bodyFat = Math.max(5, Math.min(45, Math.round(bodyFat * 10) / 10));
      const fatMass = Math.round((bioWeight * (bodyFat / 100)) * 10) / 10;
      const leanMass = Math.round((bioWeight - fatMass) * 10) / 10;
      const bmr = Math.round(10 * bioWeight + 6.25 * bioHeight - 5 * 25 + (gender === "male" ? 5 : -161));
      const tdee = Math.round(bmr * 1.55);
      const fatToLose = Math.max(0, Math.round((fatMass - bioWeight * (targetFat / 100)) * 10) / 10);
      const weeksToGoal = Math.round((fatToLose / 0.6) * 10) / 10;

      setGeneratedBio({
        bodyFat,
        fatMass,
        leanMass,
        bmr,
        tdee,
        fatToLose,
        weeksToGoal,
      });
      setIsCalculatingBio(false);
    }, 800);
  };

  // ---------------------------------------------------------------------------
  // AI Neural Chatbot State
  // ---------------------------------------------------------------------------
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string }[]>([
    {
      sender: "ai",
      text: "Ayubowan! I am your FitAI Neural Coach. Ask me anything about fat loss, Sri Lankan meal timing, or training protocols.",
    },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [isAiThinking, setIsAiThinking] = useState(false);

  const handleSendMessage = (textToSend?: string) => {
    const query = textToSend || chatInput;
    if (!query.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    if (!textToSend) setChatInput("");
    setIsAiThinking(true);

    setTimeout(() => {
      let aiResponse = "";
      const lower = query.toLowerCase();

      if (lower.includes("fat") || lower.includes("lose") || lower.includes("weight")) {
        aiResponse =
          "To accelerate fat loss while retaining lean muscle:\n\n" +
          "1. Maintain a 500 kcal Deficit (aim for ~0.5kg/week fat loss).\n" +
          "2. Eat 2.0g-2.2g Protein per kg body weight (Red fish, Chicken, Dhal, Buffalo curd).\n" +
          "3. Continue lifting heavy 3-4x weekly to signal muscle retention.\n" +
          "4. Walk 8,000 to 10,000 steps daily for low-stress NEAT calorie burn.";
      } else if (lower.includes("meal") || lower.includes("sri lanka") || lower.includes("diet")) {
        aiResponse =
          "Optimal Sri Lankan High-Protein Fat Loss Meal Plan:\n\n" +
          "• Breakfast: 3 Eggs Omelette + 5 Red String Hoppers + Dhal Curry.\n" +
          "• Lunch: 150g Red Rice + 200g Devilled Chicken Breast / Fish + Gotukola Sambol.\n" +
          "• Snack: 100g Buffalo Curd + 1 Scoop Whey Protein Isolate.\n" +
          "• Dinner: 200g Pan-Seared Fish + Steamed Sweet Potato (Batala) + Vegetables.";
      } else {
        aiResponse =
          "FitAI Neural Engine Recommendation:\n\n" +
          "• Apply Progressive Overload systematically every session.\n" +
          "• Prioritize 7.5 to 9 hours of sleep for Growth Hormone surges.\n" +
          "• Maintain hydration (3-4L daily) to sustain neuromuscular strength.";
      }

      setMessages((prev) => [...prev, { sender: "ai", text: aiResponse }]);
      setIsAiThinking(false);
    }, 900);
  };

  return (
    <main className="bg-[#1e2230] text-white min-h-screen overflow-x-hidden font-body selection:bg-[#d7ff2f] selection:text-[#0b0b0b]">
      <Navbar />

      {/* =========================================================================
         1. HERO SECTION (Slate bg)
         ========================================================================= */}
      <section className="relative min-h-[65vh] flex items-center justify-center pt-36 pb-24 overflow-hidden bg-[#1e2230]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1920&q=95"
            alt="FORGED Services & Capabilities"
            fill
            priority
            className="object-cover object-center opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1e2230] via-[#1e2230]/75 to-[#1e2230]/40" />
          <div className="absolute inset-0 bg-linear-to-r from-[#1e2230] via-transparent to-[#1e2230]" />

          <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#d7ff2f]/15 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00f2fe]/15 rounded-full blur-[160px] pointer-events-none" />
        </div>

        <div className="container-gym w-full relative z-10 text-center max-w-4xl mx-auto">
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none text-white mb-6"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            OUR <span className="text-[#d7ff2f]">SERVICES</span>
          </h1>

          <p className="text-slate-200 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal">
            Precision training programs, bespoke coaching, AI workout analytics, and high-performance recovery facilities engineered for athletes.
          </p>
        </div>
      </section>

      {/* =========================================================================
         2. CORE CAPABILITIES GRID (Obsidian Dark bg)
         ========================================================================= */}
      <section id="capabilities" className="section-spacing bg-[#0b0b0b] border-y border-white/10">
        <div className="container-gym">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
              Training Modalities
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Engineered <span className="text-[#d7ff2f]">For Output</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap) => {
              const IconComponent = cap.icon;
              return (
                <div
                  key={cap.title}
                  className={`bg-[#111] p-8 rounded-xl border relative flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 ${
                    cap.highlight
                      ? "border-[#d7ff2f]/60 shadow-[0_8px_40px_rgba(215,255,47,0.15)]"
                      : "border-white/10 hover:border-[#d7ff2f]/40"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-6">
                      <span
                        className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-widest"
                        style={{
                          backgroundColor: `${cap.color}20`,
                          color: cap.color,
                          border: `1px solid ${cap.color}40`,
                        }}
                      >
                        {cap.tag}
                      </span>
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center border border-white/10"
                        style={{ backgroundColor: `${cap.color}15`, color: cap.color }}
                      >
                        <IconComponent size={24} />
                      </div>
                    </div>

                    <h3
                      className="text-2xl font-black text-white uppercase mb-1 group-hover:text-[#d7ff2f] transition-colors"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {cap.title}
                    </h3>
                    <p className="text-xs font-bold text-[#d7ff2f]/80 uppercase tracking-wider mb-4">
                      {cap.subtitle}
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6 font-normal">
                      {cap.description}
                    </p>

                    <ul className="space-y-2.5 pt-4 border-t border-white/10 mb-8">
                      {cap.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-xs text-slate-300">
                          <CheckCircle2 size={14} className="text-[#d7ff2f] shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href="/contact"
                    className="w-full py-3 bg-white/5 border border-white/15 hover:border-[#d7ff2f] hover:bg-[#d7ff2f] hover:text-[#0b0b0b] text-white text-xs font-black uppercase tracking-wider rounded-lg transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Inquire Capability
                    <ArrowRight size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. ULTRA PROFESSIONAL "MEET OUR AI ENGINE" SECTION (Slate bg)
         ========================================================================= */}
      <section id="meet-our-ai" className="section-spacing bg-[#1e2230]">
        <div className="container-gym max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#d7ff2f]/40 rounded-lg mb-4 bg-[#d7ff2f]/10 backdrop-blur-md shadow-lg">
              <BrainCircuit size={16} className="text-[#d7ff2f]" />
              <span className="text-xs font-bold tracking-widest uppercase text-[#d7ff2f]">
                FitAI Neural Engine v3.4 Active
              </span>
            </div>

            <h2
              className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              MEET OUR <span className="text-[#d7ff2f]">AI ENGINE</span>
            </h2>

            <p className="text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
              Your 24/7 intelligent training partner. Generate custom Sri Lankan meal plans, periodized workout routines, body fat projections, and ask real-time fitness questions.
            </p>
          </div>

          {/* AI Navigation Controls */}
          <div className="flex items-center justify-center gap-3 mb-10 flex-wrap bg-[#111] p-3 rounded-xl border border-white/15 shadow-xl">
            <button
              onClick={() => setAiTab("meal")}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                aiTab === "meal"
                  ? "bg-[#d7ff2f] text-[#0b0b0b] shadow-[0_0_25px_rgba(215,255,47,0.35)]"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <Utensils size={16} />
              AI Meal Blueprint
            </button>

            <button
              onClick={() => setAiTab("workout")}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                aiTab === "workout"
                  ? "bg-[#d7ff2f] text-[#0b0b0b] shadow-[0_0_25px_rgba(215,255,47,0.35)]"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <Dumbbell size={16} />
              AI Workout Creator
            </button>

            <button
              onClick={() => setAiTab("biometrics")}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                aiTab === "biometrics"
                  ? "bg-[#d7ff2f] text-[#0b0b0b] shadow-[0_0_25px_rgba(215,255,47,0.35)]"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <Calculator size={16} />
              Biometric Analyzer
            </button>

            <button
              onClick={() => setAiTab("chat")}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                aiTab === "chat"
                  ? "bg-[#d7ff2f] text-[#0b0b0b] shadow-[0_0_25px_rgba(215,255,47,0.35)]"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <MessageSquare size={16} />
              Ask FitAI Coach
            </button>
          </div>

          {/* AI TAB CONTENT PANELS */}
          {/* TAB 1: MEAL PLANNER */}
          {aiTab === "meal" && (
            <div className="bg-[#111] p-8 sm:p-10 rounded-xl border border-white/15 shadow-2xl">
              <form onSubmit={handleGenerateMealPlan} className="space-y-6 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Age (Years)
                    </label>
                    <input
                      type="number"
                      value={mealAge}
                      onChange={(e) => setMealAge(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={mealWeight}
                      onChange={(e) => setMealWeight(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={mealHeight}
                      onChange={(e) => setMealHeight(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Primary Goal
                    </label>
                    <select
                      value={mealGoal}
                      onChange={(e: any) => setMealGoal(e.target.value)}
                      className="w-full bg-[#1e2230] border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f] cursor-pointer"
                    >
                      <option value="shred">Fat Shred (-500 kcal Deficit)</option>
                      <option value="gain">Lean Muscle Gain (+350 kcal Surplus)</option>
                      <option value="recomp">Body Recomposition (Maintenance)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Cuisine Preference
                    </label>
                    <select
                      value={dietType}
                      onChange={(e: any) => setDietType(e.target.value)}
                      className="w-full bg-[#1e2230] border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f] cursor-pointer"
                    >
                      <option value="srilankan">Sri Lankan High-Protein (Red Rice, Chicken Curry, Dhal, Curd)</option>
                      <option value="western">Western High-Protein (Steak, Salmon, Oats, Whey)</option>
                      <option value="vegan">Plant-Based Vegan (Tofu, Quinoa, Soya, Lentils)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGeneratingMeal}
                  className="w-full py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg shadow-[0_6px_30px_rgba(215,255,47,0.35)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {isGeneratingMeal ? "Calculating AI Nutrition Specs..." : "Generate AI Meal Blueprint"}
                  <Sparkles size={16} />
                </button>
              </form>

              {generatedMealPlan && (
                <div className="bg-[#1e2230] p-6 sm:p-8 rounded-xl border border-[#d7ff2f]/50 space-y-8 animate-fadeIn">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-white/15">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#d7ff2f]">
                        Daily Target Calories
                      </span>
                      <h3
                        className="text-4xl sm:text-5xl font-black text-white leading-none mt-1"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {generatedMealPlan.calories} <span className="text-xl text-slate-300">kcal/day</span>
                      </h3>
                    </div>

                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center min-w-22.5">
                        <span className="text-xs text-slate-400 font-semibold uppercase block">Protein</span>
                        <span className="text-xl font-black text-[#d7ff2f]">{generatedMealPlan.protein}g</span>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center min-w-22.5">
                        <span className="text-xs text-slate-400 font-semibold uppercase block">Carbs</span>
                        <span className="text-xl font-black text-[#00f2fe]">{generatedMealPlan.carbs}g</span>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center min-w-22.5">
                        <span className="text-xs text-slate-400 font-semibold uppercase block">Fats</span>
                        <span className="text-xl font-black text-white">{generatedMealPlan.fat}g</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-lg font-bold uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      AI 4-Meal Menu Blueprint
                    </h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {generatedMealPlan.meals.map((item: any) => (
                        <div key={item.meal} className="bg-white/5 p-5 rounded-lg border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-bold uppercase text-[#d7ff2f]">
                              {item.meal}
                            </span>
                            <span className="text-xs text-slate-300 font-semibold">
                              {item.cals} kcal · {item.protein}g Protein
                            </span>
                          </div>
                          <h5 className="text-base font-bold text-white mb-1" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                            {item.name}
                          </h5>
                          <p className="text-xs text-slate-300 leading-relaxed font-normal">
                            {item.items}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 2: WORKOUT CREATOR */}
          {aiTab === "workout" && (
            <div className="bg-[#111] p-8 sm:p-10 rounded-xl border border-white/15 shadow-2xl">
              <form onSubmit={handleGenerateWorkout} className="space-y-6 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Experience Level
                    </label>
                    <select
                      value={level}
                      onChange={(e: any) => setLevel(e.target.value)}
                      className="w-full bg-[#1e2230] border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f] cursor-pointer"
                    >
                      <option value="beginner">Beginner (0-1 Years Training)</option>
                      <option value="intermediate">Intermediate (1-3 Years Training)</option>
                      <option value="elite">Elite Athlete (3+ Years Training)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Training Frequency
                    </label>
                    <select
                      value={daysPerWeek}
                      onChange={(e) => setDaysPerWeek(Number(e.target.value))}
                      className="w-full bg-[#1e2230] border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f] cursor-pointer"
                    >
                      <option value={3}>3 Days / Week (Full Body Split)</option>
                      <option value={4}>4 Days / Week (Upper / Lower Power)</option>
                      <option value={5}>5 Days / Week (Push / Pull / Legs)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Target Focus
                    </label>
                    <select
                      value={focus}
                      onChange={(e: any) => setFocus(e.target.value)}
                      className="w-full bg-[#1e2230] border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f] cursor-pointer"
                    >
                      <option value="hypertrophy">Hypertrophy (Muscle Growth)</option>
                      <option value="strength">Maximum Powerlifting Strength</option>
                      <option value="fatburn">Metabolic Fat Loss &amp; Conditioning</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGeneratingWorkout}
                  className="w-full py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg shadow-[0_6px_30px_rgba(215,255,47,0.35)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {isGeneratingWorkout ? "Constructing Periodized Split..." : "Generate AI Workout Routine"}
                  <Dumbbell size={16} />
                </button>
              </form>

              {generatedWorkout && (
                <div className="bg-[#1e2230] p-6 sm:p-8 rounded-xl border border-[#d7ff2f]/50 space-y-6">
                  <div className="flex items-center justify-between pb-4 border-b border-white/15">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#d7ff2f]">
                        Customized Training Blueprint
                      </span>
                      <h3
                        className="text-2xl font-black text-white uppercase mt-1"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {generatedWorkout.level} · {generatedWorkout.days} Days / Week ({generatedWorkout.focus})
                      </h3>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {generatedWorkout.schedule.map((dayItem: any) => (
                      <div key={dayItem.day} className="bg-white/5 p-6 rounded-lg border border-white/10">
                        <div className="mb-4">
                          <span className="text-xs font-bold text-[#d7ff2f] uppercase tracking-wider block">
                            {dayItem.day}
                          </span>
                          <h4 className="text-lg font-bold text-white uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                            {dayItem.focus}
                          </h4>
                        </div>

                        <ul className="space-y-3 pt-3 border-t border-white/10">
                          {dayItem.exercises.map((ex: any) => (
                            <li key={ex.name} className="flex items-center justify-between text-xs">
                              <div>
                                <p className="font-bold text-white">{ex.name}</p>
                                <p className="text-slate-400">{ex.sets}</p>
                              </div>
                              <div className="text-right">
                                <span className="px-2 py-0.5 bg-[#d7ff2f]/20 text-[#d7ff2f] font-black rounded text-[10px]">
                                  {ex.rpe}
                                </span>
                                <p className="text-slate-400 mt-0.5">{ex.rest} rest</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: BIOMETRIC ANALYZER */}
          {aiTab === "biometrics" && (
            <div className="bg-[#111] p-8 sm:p-10 rounded-xl border border-white/15 shadow-2xl">
              <form onSubmit={handleCalculateBio} className="space-y-6 mb-10">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Gender
                    </label>
                    <select
                      value={gender}
                      onChange={(e: any) => setGender(e.target.value)}
                      className="w-full bg-[#1e2230] border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f] cursor-pointer"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      value={bioWeight}
                      onChange={(e) => setBioWeight(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={bioHeight}
                      onChange={(e) => setBioHeight(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Neck Circumference (cm)
                    </label>
                    <input
                      type="number"
                      value={neck}
                      onChange={(e) => setNeck(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Waist Circumference (cm)
                    </label>
                    <input
                      type="number"
                      value={waist}
                      onChange={(e) => setWaist(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                      Target Body Fat %
                    </label>
                    <input
                      type="number"
                      value={targetFat}
                      onChange={(e) => setTargetFat(Number(e.target.value))}
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f]"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isCalculatingBio}
                  className="w-full py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg shadow-[0_6px_30px_rgba(215,255,47,0.35)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {isCalculatingBio ? "Analyzing Navy Biometrics..." : "Calculate Body Fat & Projection"}
                  <Calculator size={16} />
                </button>
              </form>

              {generatedBio && (
                <div className="bg-[#1e2230] p-6 sm:p-8 rounded-xl border border-[#d7ff2f]/50 space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Body Fat %</span>
                      <span className="text-3xl font-black text-[#d7ff2f]">{generatedBio.bodyFat}%</span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Lean Muscle Mass</span>
                      <span className="text-3xl font-black text-[#00f2fe]">{generatedBio.leanMass} kg</span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Fat to Shred</span>
                      <span className="text-3xl font-black text-white">{generatedBio.fatToLose} kg</span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Est. Weeks to Goal</span>
                      <span className="text-3xl font-black text-[#d7ff2f]">{generatedBio.weeksToGoal} wks</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 4: CHATBOT */}
          {aiTab === "chat" && (
            <div className="bg-[#111] p-6 sm:p-8 rounded-xl border border-white/15 shadow-2xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-1 block font-heading">
                    24/7 Neural Assistant
                  </span>
                  <h3
                    className="text-2xl sm:text-3xl font-black uppercase text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Ask <span className="text-[#d7ff2f]">FitAI Coach</span>
                  </h3>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
                {[
                  "How to lose fat without losing muscle?",
                  "Best Sri Lankan post-workout meal?",
                  "How to fix bench press shoulder pain?",
                  "How much protein do I need per day?",
                ].map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSendMessage(prompt)}
                    className="px-3.5 py-2 bg-white/5 hover:bg-[#d7ff2f] hover:text-[#0b0b0b] border border-white/15 text-xs text-slate-300 rounded-lg whitespace-nowrap transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>

              <div className="bg-[#1e2230] rounded-xl border border-white/15 p-6 h-96 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex items-start gap-3 ${
                      msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 ${
                        msg.sender === "user"
                          ? "bg-[#00f2fe] text-[#0b0b0b]"
                          : "bg-[#d7ff2f] text-[#0b0b0b]"
                      }`}
                    >
                      {msg.sender === "user" ? <User size={14} /> : <Bot size={14} />}
                    </div>

                    <div
                      className={`p-4 rounded-xl max-w-xl text-sm leading-relaxed whitespace-pre-line ${
                        msg.sender === "user"
                          ? "bg-[#00f2fe]/15 border border-[#00f2fe]/30 text-white"
                          : "bg-white/5 border border-white/10 text-slate-200"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}

                {isAiThinking && (
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#d7ff2f] text-[#0b0b0b] flex items-center justify-center">
                      <Bot size={14} />
                    </div>
                    <div className="p-3 bg-white/5 rounded-xl text-xs text-[#d7ff2f] font-bold animate-pulse">
                      FitAI Neural Engine is processing response...
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="text"
                  placeholder="Ask FitAI anything about training, diet, or biometrics..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  className="flex-1 bg-white/5 border border-white/15 rounded-lg px-4 py-3.5 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#d7ff2f]"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="px-6 py-3.5 bg-[#d7ff2f] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg hover:bg-[#c8f020] transition-colors cursor-pointer flex items-center gap-2"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Ask <Send size={14} />
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
         4. ELITE FACILITIES & MODALITIES (Obsidian Dark bg)
         ========================================================================= */}
      <section id="modalities" className="section-spacing bg-[#0b0b0b] border-y border-white/10">
        <div className="container-gym">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
              World-Class Infrastructure
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Next-Gen <span className="text-[#d7ff2f]">Facilities</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {modalities.map((item) => (
              <div
                key={item.title}
                className="bg-[#111] rounded-xl overflow-hidden border border-white/10 group hover:border-[#d7ff2f]/50 transition-all"
              >
                <div className="relative h-64 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-transparent" />
                </div>
                <div className="p-7">
                  <h3
                    className="text-2xl font-black uppercase text-white mb-2 group-hover:text-[#d7ff2f] transition-colors"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
         5. THE FORGED TRAINING BLUEPRINT (Slate bg)
         ========================================================================= */}
      <section id="process" className="section-spacing bg-[#1e2230]">
        <div className="container-gym">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
              Methodology
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              The Training <span className="text-[#d7ff2f]">Blueprint</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {processSteps.map((step) => (
              <div
                key={step.step}
                className="bg-white/5 p-8 rounded-xl border border-white/15 hover:border-[#d7ff2f]/40 transition-all relative"
              >
                <span
                  className="text-5xl font-black text-[#d7ff2f]/40 leading-none block mb-4"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {step.step}
                </span>
                <h3
                  className="text-xl font-bold text-white uppercase mb-3"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed font-normal">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
         6. SERVICE FAQS (Obsidian Dark bg)
         ========================================================================= */}
      <section id="faq" className="section-spacing bg-[#0b0b0b] border-y border-white/10">
        <div className="container-gym max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
              Got Questions?
            </span>
            <h2
              className="text-4xl sm:text-5xl font-black tracking-tight uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Service <span className="text-[#d7ff2f]">FAQs</span>
            </h2>
          </div>

          <div className="space-y-4">
            {serviceFaqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.q}
                  className="bg-[#111] rounded-xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span
                      className={`text-lg font-bold uppercase transition-colors ${
                        isOpen ? "text-[#d7ff2f]" : "text-white"
                      }`}
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                        isOpen
                          ? "border-[#d7ff2f] bg-[#d7ff2f] text-[#0b0b0b]"
                          : "border-white/20 text-white/70"
                      }`}
                    >
                      {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 border-t border-white/10">
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================================
         7. CALL TO ACTION (Obsidian Dark bg)
         ========================================================================= */}
      <section className="relative py-28 overflow-hidden bg-[#0b0b0b]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1920&q=90"
            alt="Gym training background"
            fill
            className="object-cover object-center opacity-25"
          />
          <div className="absolute inset-0 bg-linear-to-r from-[#0b0b0b] via-[#0b0b0b]/90 to-[#0b0b0b]" />
        </div>

        <div className="container-gym relative z-10 text-center max-w-4xl mx-auto">
          <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
            Elevate Your Standard
          </span>

          <h2
            className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 uppercase leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Ready to Elevate <br />
            <span className="text-[#d7ff2f]">Your Training?</span>
          </h2>

          <p className="text-slate-200 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-normal">
            Book a facility tour, consult with our head strength coaches, or claim your 7-day free trial pass.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#pricing"
              className="px-9 py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black uppercase tracking-wider rounded-lg text-base shadow-[0_6px_30px_rgba(215,255,47,0.4)] hover:scale-105 transition-all cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Join Now
            </Link>

            <Link
              href="/contact"
              className="px-9 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold uppercase tracking-wider rounded-lg text-base hover:bg-white/20 transition-all cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
         8. FOOTER
         ========================================================================= */}
      <Footer />
    </main>
  );
}
