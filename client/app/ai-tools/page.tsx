"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  Sparkles,
  Utensils,
  Dumbbell,
  Calculator,
  Flame,
  Zap,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Scale,
  RefreshCw,
  ShieldAlert,
  BrainCircuit,
  Award,
} from "lucide-react";

export default function AiToolsPage() {
  const [activeTab, setActiveTab] = useState<"meal" | "workout" | "biometric">("meal");

  // ---------------------------------------------------------------------------
  // State for AI Meal Plan Generator
  // ---------------------------------------------------------------------------
  const [mealAge, setMealAge] = useState<number>(26);
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
      // Calculate BMR (Mifflin-St Jeor)
      const bmr = 10 * mealWeight + 6.25 * mealHeight - 5 * mealAge + 5;
      const tdee = Math.round(bmr * 1.55); // Moderate activity

      let targetCalories = tdee;
      if (mealGoal === "shred") targetCalories = tdee - 500;
      if (mealGoal === "gain") targetCalories = tdee + 350;

      const protein = Math.round(mealWeight * 2.2); // 2.2g per kg
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
    }, 900);
  };

  // ---------------------------------------------------------------------------
  // State for AI Workout Routine Creator
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
      let schedule = [];
      if (daysPerWeek === 4) {
        schedule = [
          {
            day: "Day 1 - Upper Power",
            focus: "Barbell Press & Pull Mechanics",
            exercises: [
              { name: "Barbell Bench Press", sets: "4 Sets x 5 Reps", rpe: "RPE 8.5", rest: "3 mins" },
              { name: "Weighted Pull-Ups / Lat Pulldown", sets: "4 Sets x 6 Reps", rpe: "RPE 8.0", rest: "2.5 mins" },
              { name: "Overhead Military Press", sets: "3 Sets x 6 Reps", rpe: "RPE 8.0", rest: "2 mins" },
              { name: "Incline Dumbbell Row", sets: "3 Sets x 8 Reps", rpe: "RPE 8.5", rest: "90 secs" },
            ],
          },
          {
            day: "Day 2 - Lower Power",
            focus: "Squat & Hinge Foundation",
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
      } else {
        schedule = [
          {
            day: "Day 1 - Push Focus",
            focus: "Chest, Shoulders & Triceps",
            exercises: [
              { name: "Barbell Bench Press", sets: "4 Sets x 6 Reps", rpe: "RPE 8.5", rest: "2.5 mins" },
              { name: "Incline Dumbbell Press", sets: "3 Sets x 8 Reps", rpe: "RPE 8.5", rest: "2 mins" },
              { name: "Overhead Dumbbell Press", sets: "3 Sets x 10 Reps", rpe: "RPE 8.0", rest: "90 secs" },
              { name: "Skullcrushers", sets: "3 Sets x 10 Reps", rpe: "RPE 9.0", rest: "60 secs" },
            ],
          },
          {
            day: "Day 2 - Pull Focus",
            focus: "Lats, Upper Back & Biceps",
            exercises: [
              { name: "Weighted Chin-Ups", sets: "4 Sets x 6 Reps", rpe: "RPE 8.5", rest: "2.5 mins" },
              { name: "Barbell Bent-Over Row", sets: "4 Sets x 8 Reps", rpe: "RPE 8.5", rest: "2 mins" },
              { name: "Face Pulls", sets: "3 Sets x 15 Reps", rpe: "RPE 9.0", rest: "60 secs" },
              { name: "Incline Dumbbell Curls", sets: "3 Sets x 10 Reps", rpe: "RPE 9.0", rest: "60 secs" },
            ],
          },
          {
            day: "Day 3 - Legs & Core Focus",
            focus: "Quadriceps, Glutes & Abs",
            exercises: [
              { name: "Barbell Back Squat", sets: "4 Sets x 6 Reps", rpe: "RPE 8.5", rest: "3 mins" },
              { name: "Leg Press", sets: "3 Sets x 10 Reps", rpe: "RPE 8.5", rest: "2 mins" },
              { name: "Walking Lunges", sets: "3 Sets x 12 Reps / leg", rpe: "RPE 8.5", rest: "90 secs" },
              { name: "Ab Wheel Rollouts", sets: "3 Sets x 12 Reps", rpe: "RPE 9.0", rest: "60 secs" },
            ],
          },
        ];
      }

      setGeneratedWorkout({
        level: level.toUpperCase(),
        days: daysPerWeek,
        focus: focus.toUpperCase(),
        schedule,
      });
      setIsGeneratingWorkout(false);
    }, 900);
  };

  // ---------------------------------------------------------------------------
  // State for AI Biometrics & Body Fat Estimator
  // ---------------------------------------------------------------------------
  const [gender, setGender] = useState<"male" | "female">("male");
  const [bioWeight, setBioWeight] = useState<number>(78);
  const [bioHeight, setBioHeight] = useState<number>(178);
  const [neck, setNeck] = useState<number>(38);
  const [waist, setWaist] = useState<number>(84);
  const [hip, setHip] = useState<number>(95);
  const [isCalculatingBio, setIsCalculatingBio] = useState<boolean>(false);
  const [generatedBio, setGeneratedBio] = useState<any>(null);

  const handleCalculateBio = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculatingBio(true);

    setTimeout(() => {
      // US Navy Body Fat Formula calculation
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
              0.35004 * Math.log10(waist + hip - neck) +
              0.221 * Math.log10(bioHeight)) -
          450;
      }

      bodyFat = Math.max(5, Math.min(45, Math.round(bodyFat * 10) / 10));
      const fatMass = Math.round((bioWeight * (bodyFat / 100)) * 10) / 10;
      const leanMass = Math.round((bioWeight - fatMass) * 10) / 10;
      const bmr = Math.round(10 * bioWeight + 6.25 * bioHeight - 5 * 25 + (gender === "male" ? 5 : -161));
      const tdee = Math.round(bmr * 1.55);

      setGeneratedBio({
        bodyFat,
        fatMass,
        leanMass,
        bmr,
        tdee,
      });
      setIsCalculatingBio(false);
    }, 800);
  };

  return (
    <main className="bg-[#1e2230] text-white min-h-screen overflow-x-hidden font-body selection:bg-[#d7ff2f] selection:text-[#0b0b0b]">
      <Navbar />

      {/* =========================================================================
         1. HERO SECTION (Slate bg)
         ========================================================================= */}
      <section className="relative min-h-[65vh] flex items-center justify-center pt-36 pb-20 overflow-hidden bg-[#1e2230]">
        {/* Background image & dark gradient overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1920&q=95"
            alt="FitAI Neural Engine"
            fill
            priority
            className="object-cover object-center opacity-35"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1e2230] via-[#1e2230]/75 to-[#1e2230]/40" />
          <div className="absolute inset-0 bg-linear-to-r from-[#1e2230] via-transparent to-[#1e2230]" />

          {/* Ambient lighting */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#d7ff2f]/15 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00f2fe]/15 rounded-full blur-[160px] pointer-events-none" />
        </div>

        <div className="container-gym w-full relative z-10 text-center max-w-4xl mx-auto">
          {/* AI Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#d7ff2f]/50 rounded-lg mb-6 bg-[#d7ff2f]/10 backdrop-blur-md shadow-lg">
            <BrainCircuit size={16} className="text-[#d7ff2f]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#d7ff2f]">
              FitAI Neural Engine v3.4 Active
            </span>
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none text-white mb-6"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            FITAI NEURAL <span className="text-[#d7ff2f]">ENGINE</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-200 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal">
            Generate AI-customized Sri Lankan &amp; International meal plans, calculate precise body fat &amp; macro ratios, and construct periodized workout routines in seconds.
          </p>
        </div>
      </section>

      {/* =========================================================================
         2. TABBED AI TOOLS SUITE (Obsidian Dark bg)
         ========================================================================= */}
      <section className="section-spacing bg-[#0b0b0b] border-y border-white/10">
        <div className="container-gym max-w-5xl mx-auto">
          {/* Main Navigation Tabs */}
          <div className="flex items-center justify-center gap-3 mb-12 flex-wrap bg-[#111] p-3 rounded-xl border border-white/10">
            <button
              onClick={() => setActiveTab("meal")}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "meal"
                  ? "bg-[#d7ff2f] text-[#0b0b0b] shadow-[0_0_25px_rgba(215,255,47,0.35)]"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <Utensils size={16} />
              AI Meal Plan Generator
            </button>

            <button
              onClick={() => setActiveTab("workout")}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "workout"
                  ? "bg-[#d7ff2f] text-[#0b0b0b] shadow-[0_0_25px_rgba(215,255,47,0.35)]"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <Dumbbell size={16} />
              AI Workout Creator
            </button>

            <button
              onClick={() => setActiveTab("biometric")}
              className={`flex items-center gap-2 px-6 py-3.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                activeTab === "biometric"
                  ? "bg-[#d7ff2f] text-[#0b0b0b] shadow-[0_0_25px_rgba(215,255,47,0.35)]"
                  : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
              }`}
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              <Calculator size={16} />
              Body Fat &amp; Macro Analyzer
            </button>
          </div>

          {/* =========================================================================
             TAB 1: AI MEAL PLAN GENERATOR
             ========================================================================= */}
          {activeTab === "meal" && (
            <div id="meal-planner" className="bg-[#111] p-8 sm:p-10 rounded-xl border border-white/15">
              <div className="mb-8">
                <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-2 block font-heading">
                  Nutrition Intelligence
                </span>
                <h2
                  className="text-3xl sm:text-4xl font-black uppercase text-white"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Generate Your <span className="text-[#d7ff2f]">AI Meal Blueprint</span>
                </h2>
                <p className="text-slate-300 text-sm mt-1 font-normal">
                  Calculate target calories and generate custom Sri Lankan, Western, or Vegan high-protein meal splits.
                </p>
              </div>

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
                      Primary Fitness Goal
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
                      Cuisine &amp; Diet Preference
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

              {/* Meal Plan Output Card */}
              {generatedMealPlan && (
                <div className="bg-[#1e2230] p-6 sm:p-8 rounded-xl border border-[#d7ff2f]/50 space-y-8 animate-fadeIn">
                  {/* Calorie & Macro Header */}
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
                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center min-w-[90px]">
                        <span className="text-xs text-slate-400 font-semibold uppercase block">Protein</span>
                        <span className="text-xl font-black text-[#d7ff2f]">{generatedMealPlan.protein}g</span>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center min-w-[90px]">
                        <span className="text-xs text-slate-400 font-semibold uppercase block">Carbs</span>
                        <span className="text-xl font-black text-[#00f2fe]">{generatedMealPlan.carbs}g</span>
                      </div>
                      <div className="p-3 bg-white/5 border border-white/10 rounded-lg text-center min-w-[90px]">
                        <span className="text-xs text-slate-400 font-semibold uppercase block">Fats</span>
                        <span className="text-xl font-black text-white">{generatedMealPlan.fat}g</span>
                      </div>
                    </div>
                  </div>

                  {/* Meals Breakdown */}
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

          {/* =========================================================================
             TAB 2: AI WORKOUT ROUTINE CREATOR
             ========================================================================= */}
          {activeTab === "workout" && (
            <div id="workout-planner" className="bg-[#111] p-8 sm:p-10 rounded-xl border border-white/15">
              <div className="mb-8">
                <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-2 block font-heading">
                  Training Intelligence
                </span>
                <h2
                  className="text-3xl sm:text-4xl font-black uppercase text-white"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Construct Your <span className="text-[#d7ff2f]">AI Workout Routine</span>
                </h2>
                <p className="text-slate-300 text-sm mt-1 font-normal">
                  Generate periodized split schedules tailored to your experience level and target training frequency.
                </p>
              </div>

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
                      Primary Adaptation Focus
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

              {/* Workout Output Grid */}
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

          {/* =========================================================================
             TAB 3: BODY FAT & BIOMETRIC ANALYZER
             ========================================================================= */}
          {activeTab === "biometric" && (
            <div id="biometrics" className="bg-[#111] p-8 sm:p-10 rounded-xl border border-white/15">
              <div className="mb-8">
                <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-2 block font-heading">
                  Biometric Precision
                </span>
                <h2
                  className="text-3xl sm:text-4xl font-black uppercase text-white"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Body Fat &amp; <span className="text-[#d7ff2f]">Biometric Analyzer</span>
                </h2>
                <p className="text-slate-300 text-sm mt-1 font-normal">
                  Calculate US Navy estimated body fat percentage, lean mass vs fat mass, and daily energy expenditure.
                </p>
              </div>

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

                  {gender === "female" && (
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Hip Circumference (cm)
                      </label>
                      <input
                        type="number"
                        value={hip}
                        onChange={(e) => setHip(Number(e.target.value))}
                        className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f]"
                        required
                      />
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isCalculatingBio}
                  className="w-full py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg shadow-[0_6px_30px_rgba(215,255,47,0.35)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {isCalculatingBio ? "Analyzing Navy Biometrics..." : "Calculate Body Fat & Biometrics"}
                  <Calculator size={16} />
                </button>
              </form>

              {/* Biometrics Output Card */}
              {generatedBio && (
                <div className="bg-[#1e2230] p-6 sm:p-8 rounded-xl border border-[#d7ff2f]/50 space-y-6">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Body Fat</span>
                      <span className="text-3xl font-black text-[#d7ff2f]">{generatedBio.bodyFat}%</span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Lean Mass</span>
                      <span className="text-3xl font-black text-[#00f2fe]">{generatedBio.leanMass} kg</span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Fat Mass</span>
                      <span className="text-3xl font-black text-white">{generatedBio.fatMass} kg</span>
                    </div>
                    <div className="p-4 bg-white/5 border border-white/10 rounded-lg">
                      <span className="text-xs text-slate-400 font-bold uppercase block mb-1">TDEE</span>
                      <span className="text-3xl font-black text-[#d7ff2f]">{generatedBio.tdee} kcal</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
         3. CALL TO ACTION (Obsidian Dark bg)
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
            Train Smarter With FitAI
          </span>

          <h2
            className="text-4xl sm:text-6xl font-black text-white tracking-tight mb-6 uppercase leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Ready to Lock In <br />
            <span className="text-[#d7ff2f]">Your Physique Plan?</span>
          </h2>

          <p className="text-slate-200 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto font-normal">
            Join 5,000+ athletes using FitAI neural algorithms for custom meal plans, biometric tracking, and strength periodization.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#pricing"
              className="px-9 py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black uppercase tracking-wider rounded-lg text-base shadow-[0_6px_30px_rgba(215,255,47,0.4)] hover:scale-105 transition-all cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Get Started Now
            </Link>

            <Link
              href="/services"
              className="px-9 py-4 bg-white/10 backdrop-blur-xl border border-white/20 text-white font-bold uppercase tracking-wider rounded-lg text-base hover:bg-white/20 transition-all cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Explore Capabilities
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================================
         4. FOOTER
         ========================================================================= */}
      <Footer />
    </main>
  );
}
