"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  FastForward,
  Dumbbell,
  Target,
  User,
  Scale,
  Calendar,
  Flame,
  Award,
  Utensils,
  Clock,
  Sparkles,
} from "lucide-react";

export default function OnboardingPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 10;

  // Onboarding Form State
  const [goal, setGoal] = useState("shred");
  const [gender, setGender] = useState("male");
  const [age, setAge] = useState(25);
  const [height, setHeight] = useState(178);
  const [weight, setWeight] = useState(76);
  const [targetWeight, setTargetWeight] = useState(70);
  const [experience, setExperience] = useState("intermediate");
  const [frequency, setFrequency] = useState(4);
  const [needTrainer, setNeedTrainer] = useState("yes");
  const [diet, setDiet] = useState("srilankan");
  const [workoutTime, setWorkoutTime] = useState("evening");

  const handleNext = () => {
    if (currentStep < totalSteps + 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSkipAll = () => {
    // Directly bypass all questions and go to home page / dashboard
    router.push("/");
  };

  const handleComplete = () => {
    router.push("/");
  };

  return (
    <main className="bg-[#1e2230] text-white min-h-screen flex flex-col justify-between font-body selection:bg-[#d7ff2f] selection:text-[#0b0b0b]">
      {/* Top Header */}
      <header className="p-6 border-b border-white/10 flex items-center justify-between bg-[#12151c]">
        <div className="flex items-center gap-3">
          <Link href="/">
            <Image
              width={297}
              height={72}
              className="h-8 w-auto"
              src="/assets/logo.svg"
              alt="FORGED Logo"
            />
          </Link>
          <span className="hidden sm:inline-block text-xs font-bold text-[#d7ff2f] uppercase tracking-widest pl-3 border-l border-white/15">
            Athlete AI Onboarding
          </span>
        </div>

        {/* Skip All Button Always Visible */}
        <button
          onClick={handleSkipAll}
          className="flex items-center gap-1.5 px-4 py-2 bg-white/5 hover:bg-white/15 border border-white/20 text-xs font-bold uppercase text-slate-300 hover:text-white rounded-lg transition-colors cursor-pointer"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <span>Skip Questionnaire</span>
          <FastForward size={14} className="text-[#d7ff2f]" />
        </button>
      </header>

      {/* Main Questionnaire Container */}
      <section className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-2xl bg-[#111] p-8 sm:p-12 rounded-2xl border border-white/15 shadow-2xl space-y-8 relative overflow-hidden">
          {currentStep <= totalSteps && (
            <>
              {/* Progress Indicator */}
              <div>
                <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  <span>Question {currentStep} of {totalSteps}</span>
                  <span className="text-[#d7ff2f]">{Math.round((currentStep / totalSteps) * 100)}% Completed</span>
                </div>

                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-linear-to-r from-[#d7ff2f] to-[#00f2fe] transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* STEP 1: Goal */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase block mb-1">
                      Step 1
                    </span>
                    <h2
                      className="text-3xl font-black uppercase text-white"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      What is your <span className="text-[#d7ff2f]">Primary Fitness Target?</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      { id: "shred", title: "Fat Shred & Weight Loss", desc: "Accelerate lipid burn & define muscle" },
                      { id: "gain", title: "Muscle Hypertrophy", desc: "Build lean muscle mass & strength" },
                      { id: "power", title: "Powerlifting & Strength", desc: "Maximize squat, bench & deadlift" },
                      { id: "recomp", title: "Body Recomposition", desc: "Lose fat & gain muscle simultaneously" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGoal(item.id)}
                        className={`p-5 rounded-xl border text-left transition-all cursor-pointer ${
                          goal === item.id
                            ? "bg-[#d7ff2f]/10 border-[#d7ff2f] shadow-[0_0_20px_rgba(215,255,47,0.2)]"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <h3 className="text-base font-bold text-white uppercase mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Gender */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase block mb-1">
                      Step 2
                    </span>
                    <h2
                      className="text-3xl font-black uppercase text-white"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      What is your <span className="text-[#d7ff2f]">Biological Gender?</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    {[
                      { id: "male", label: "Male" },
                      { id: "female", label: "Female" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGender(item.id)}
                        className={`py-8 rounded-xl border text-center transition-all cursor-pointer ${
                          gender === item.id
                            ? "bg-[#d7ff2f]/10 border-[#d7ff2f] shadow-[0_0_20px_rgba(215,255,47,0.2)] text-[#d7ff2f]"
                            : "bg-white/5 border-white/10 text-white"
                        }`}
                      >
                        <User size={32} className="mx-auto mb-2" />
                        <span className="text-lg font-black uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 3: Age */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase block mb-1">
                      Step 3
                    </span>
                    <h2
                      className="text-3xl font-black uppercase text-white"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      How old <span className="text-[#d7ff2f]">are you?</span>
                    </h2>
                  </div>

                  <div className="text-center py-6">
                    <span className="text-6xl font-black text-[#d7ff2f]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      {age} <span className="text-2xl text-white">Years</span>
                    </span>

                    <input
                      type="range"
                      min={16}
                      max={75}
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full mt-8 accent-[#d7ff2f] cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Height */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase block mb-1">
                      Step 4
                    </span>
                    <h2
                      className="text-3xl font-black uppercase text-white"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      What is your <span className="text-[#d7ff2f]">Current Height?</span>
                    </h2>
                  </div>

                  <div className="text-center py-6">
                    <span className="text-6xl font-black text-[#00f2fe]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      {height} <span className="text-2xl text-white">cm</span>
                    </span>

                    <input
                      type="range"
                      min={140}
                      max={220}
                      value={height}
                      onChange={(e) => setHeight(Number(e.target.value))}
                      className="w-full mt-8 accent-[#00f2fe] cursor-pointer"
                    />
                  </div>
                </div>
              )}

              {/* STEP 5: Weight & Target Weight */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase block mb-1">
                      Step 5
                    </span>
                    <h2
                      className="text-3xl font-black uppercase text-white"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      Weight &amp; <span className="text-[#d7ff2f]">Target Weight</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                      <span className="text-xs font-bold text-slate-400 uppercase block mb-2">Current Weight</span>
                      <span className="text-4xl font-black text-[#d7ff2f]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        {weight} kg
                      </span>
                      <input
                        type="range"
                        min={40}
                        max={150}
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="w-full mt-4 accent-[#d7ff2f] cursor-pointer"
                      />
                    </div>

                    <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-center">
                      <span className="text-xs font-bold text-slate-400 uppercase block mb-2">Target Goal Weight</span>
                      <span className="text-4xl font-black text-[#00f2fe]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        {targetWeight} kg
                      </span>
                      <input
                        type="range"
                        min={40}
                        max={150}
                        value={targetWeight}
                        onChange={(e) => setTargetWeight(Number(e.target.value))}
                        className="w-full mt-4 accent-[#00f2fe] cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 6: Experience Level */}
              {currentStep === 6 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase block mb-1">
                      Step 6
                    </span>
                    <h2
                      className="text-3xl font-black uppercase text-white"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      What is your <span className="text-[#d7ff2f]">Training Experience?</span>
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: "beginner", title: "Total Beginner (0 - 1 Years)", desc: "New to weightlifting & structured training" },
                      { id: "intermediate", title: "Intermediate (1 - 3 Years)", desc: "Familiar with compound lifts & progressive overload" },
                      { id: "elite", title: "Advanced Athlete (3+ Years)", desc: "High competitive strength, hypertrophy & powerlifting" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setExperience(item.id)}
                        className={`w-full p-5 rounded-xl border text-left transition-all cursor-pointer ${
                          experience === item.id
                            ? "bg-[#d7ff2f]/10 border-[#d7ff2f] shadow-[0_0_20px_rgba(215,255,47,0.2)]"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <h3 className="text-base font-bold text-white uppercase mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 7: Frequency */}
              {currentStep === 7 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase block mb-1">
                      Step 7
                    </span>
                    <h2
                      className="text-3xl font-black uppercase text-white"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      How many days <span className="text-[#d7ff2f]">can you train per week?</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { days: 3, label: "3 Days / wk", split: "Full Body Split" },
                      { days: 4, label: "4 Days / wk", split: "Upper / Lower Split" },
                      { days: 5, label: "5 Days / wk", split: "Push / Pull / Legs" },
                    ].map((item) => (
                      <button
                        key={item.days}
                        type="button"
                        onClick={() => setFrequency(item.days)}
                        className={`p-6 rounded-xl border text-center transition-all cursor-pointer ${
                          frequency === item.days
                            ? "bg-[#d7ff2f]/10 border-[#d7ff2f] shadow-[0_0_20px_rgba(215,255,47,0.2)] text-[#d7ff2f]"
                            : "bg-white/5 border-white/10 text-white"
                        }`}
                      >
                        <span className="text-2xl font-black uppercase block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                          {item.label}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-1">{item.split}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 8: Personal Trainer */}
              {currentStep === 8 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase block mb-1">
                      Step 8
                    </span>
                    <h2
                      className="text-3xl font-black uppercase text-white"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      Would you like a <span className="text-[#d7ff2f]">Personal Trainer?</span>
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: "yes", title: "Yes, I want a 1-on-1 Dedicated Coach", desc: "Personalized form guidance & weekly accountability" },
                      { id: "self", title: "No, I am self-guided with AI tools", desc: "Will use FitAI workout generator & biometric tools" },
                      { id: "undecided", title: "Undecided - Consult first", desc: "Book a consultation call with head coach" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setNeedTrainer(item.id)}
                        className={`w-full p-5 rounded-xl border text-left transition-all cursor-pointer ${
                          needTrainer === item.id
                            ? "bg-[#d7ff2f]/10 border-[#d7ff2f] shadow-[0_0_20px_rgba(215,255,47,0.2)]"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <h3 className="text-base font-bold text-white uppercase mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 9: Diet */}
              {currentStep === 9 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase block mb-1">
                      Step 9
                    </span>
                    <h2
                      className="text-3xl font-black uppercase text-white"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      What is your <span className="text-[#d7ff2f]">Cuisine &amp; Diet preference?</span>
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: "srilankan", title: "Sri Lankan High-Protein", desc: "Red rice, devilled chicken, dhal, buffalo curd & fish" },
                      { id: "western", title: "Western High-Protein", desc: "Steak, salmon, oats, eggs & whey isolate" },
                      { id: "vegan", title: "Plant-Based Vegan", desc: "Tofu, quinoa, soya meat, lentils & chickpeas" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setDiet(item.id)}
                        className={`w-full p-5 rounded-xl border text-left transition-all cursor-pointer ${
                          diet === item.id
                            ? "bg-[#d7ff2f]/10 border-[#d7ff2f] shadow-[0_0_20px_rgba(215,255,47,0.2)]"
                            : "bg-white/5 border-white/10 hover:border-white/20"
                        }`}
                      >
                        <h3 className="text-base font-bold text-white uppercase mb-1">{item.title}</h3>
                        <p className="text-xs text-slate-400">{item.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 10: Workout Time */}
              {currentStep === 10 && (
                <div className="space-y-6">
                  <div>
                    <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase block mb-1">
                      Step 10
                    </span>
                    <h2
                      className="text-3xl font-black uppercase text-white"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      When do you <span className="text-[#d7ff2f]">prefer to train?</span>
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {[
                      { id: "morning", label: "Morning", time: "6:00 AM - 10:00 AM" },
                      { id: "afternoon", label: "Afternoon", time: "12:00 PM - 4:00 PM" },
                      { id: "evening", label: "Evening / Night", time: "5:00 PM - 10:00 PM" },
                    ].map((item) => (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setWorkoutTime(item.id)}
                        className={`p-6 rounded-xl border text-center transition-all cursor-pointer ${
                          workoutTime === item.id
                            ? "bg-[#d7ff2f]/10 border-[#d7ff2f] shadow-[0_0_20px_rgba(215,255,47,0.2)] text-[#d7ff2f]"
                            : "bg-white/5 border-white/10 text-white"
                        }`}
                      >
                        <Clock size={24} className="mx-auto mb-2" />
                        <span className="text-base font-black uppercase block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                          {item.label}
                        </span>
                        <span className="text-[10px] text-slate-400 block mt-1">{item.time}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step Navigation Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentStep === 1}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg text-xs font-bold uppercase ${
                    currentStep === 1
                      ? "opacity-30 cursor-not-allowed text-slate-500"
                      : "bg-white/5 hover:bg-white/10 text-white cursor-pointer"
                  }`}
                >
                  <ArrowLeft size={14} />
                  Previous
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-7 py-3.5 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-lg shadow-[0_4px_20px_rgba(215,255,47,0.35)] hover:scale-[1.02] transition-all cursor-pointer"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  <span>{currentStep === totalSteps ? "Generate Profile" : "Next Question"}</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </>
          )}

          {/* FINAL SUMMARY STEP (Step 11) */}
          {currentStep > totalSteps && (
            <div className="space-y-8 animate-fadeIn">
              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-[#d7ff2f]/20 border border-[#d7ff2f] text-[#d7ff2f] flex items-center justify-center mx-auto mb-4">
                  <Sparkles size={32} />
                </div>
                <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase block">
                  AI Profile Generated
                </span>
                <h2
                  className="text-4xl font-black uppercase text-white"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  Welcome To <span className="text-[#d7ff2f]">FORGED</span>
                </h2>
                <p className="text-slate-300 text-sm font-normal">
                  Your customized athletic profile and initial biometric targets have been calculated.
                </p>
              </div>

              {/* Profile Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Target Goal</span>
                  <span className="text-base font-black text-[#d7ff2f] uppercase">{goal}</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Frequency</span>
                  <span className="text-base font-black text-[#00f2fe]">{frequency} Days/wk</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Diet Style</span>
                  <span className="text-base font-black text-white uppercase">{diet}</span>
                </div>
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                  <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">Coaching</span>
                  <span className="text-base font-black text-[#d7ff2f] uppercase">{needTrainer}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleComplete}
                className="w-full py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg shadow-[0_6px_30px_rgba(215,255,47,0.4)] hover:scale-[1.01] transition-all cursor-pointer flex items-center justify-center gap-2"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Launch FORGED Athletic Hub
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Footer info */}
      <footer className="p-4 text-center text-xs text-slate-500 border-t border-white/10 bg-[#12151c]">
        © {new Date().getFullYear()} FORGED Athletic Center. All Athlete Rights Reserved.
      </footer>
    </main>
  );
}
