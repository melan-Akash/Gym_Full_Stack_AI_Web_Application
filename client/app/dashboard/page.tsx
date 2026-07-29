"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  LayoutDashboard,
  User,
  ShieldCheck,
  CalendarCheck,
  Dumbbell,
  FileText,
  Utensils,
  Bot,
  TrendingUp,
  Camera,
  Bell,
  CreditCard,
  Settings,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
  ArrowRight,
  Plus,
  Trash2,
  Upload,
  Download,
  AlertCircle,
  Flame,
  Activity,
  Award,
} from "lucide-react";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<
    | "dashboard"
    | "profile"
    | "membership"
    | "attendance"
    | "workout_plan"
    | "workout_details"
    | "meal_planner"
    | "ai_chat"
    | "progress"
    | "photos"
    | "notifications"
    | "payments"
    | "settings"
  >("dashboard");

  // Mock User State
  const [userInfo, setUserInfo] = useState({
    name: "Akash Perera",
    username: "@akash_athlete",
    email: "akash@example.com",
    phone: "+94 77 123 4567",
    memberId: "FG-8924-CMB",
    tier: "PERFORMANCE ATHLETE",
    homeGym: "Colombo Flagship (142 Galle Road)",
    joinedDate: "Jan 15, 2026",
    height: 178,
    weight: 76,
    targetWeight: 70,
    bodyFat: 14.8,
  });

  const sidebarNavItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "profile", label: "My Profile", icon: User },
    { id: "membership", label: "My Membership", icon: ShieldCheck },
    { id: "attendance", label: "Attendance Log", icon: CalendarCheck },
    { id: "workout_plan", label: "Workout Plan", icon: Dumbbell },
    { id: "workout_details", label: "Workout Details", icon: FileText },
    { id: "meal_planner", label: "AI Meal Planner", icon: Utensils },
    { id: "ai_chat", label: "AI Chat Coach", icon: Bot },
    { id: "progress", label: "Progress Tracking", icon: TrendingUp },
    { id: "photos", label: "Progress Photos", icon: Camera },
    { id: "notifications", label: "Notifications", icon: Bell, badge: 3 },
    { id: "payments", label: "Payment History", icon: CreditCard },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <main className="bg-[#1e2230] text-white min-h-screen font-body selection:bg-[#d7ff2f] selection:text-[#0b0b0b]">
      <Navbar />

      <div className="pt-28 pb-16 min-h-screen">
        <div className="container-gym max-w-7xl mx-auto">
          {/* Member Banner Header */}
          <div className="bg-[#111] p-6 sm:p-8 rounded-2xl border border-white/15 mb-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
            <div className="flex items-center gap-5 relative z-10">
              <div className="relative w-20 h-20 rounded-full border-2 border-[#d7ff2f] overflow-hidden bg-white/10 shrink-0">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80"
                  alt="Member Profile Avatar"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-3 py-1 bg-[#d7ff2f]/20 border border-[#d7ff2f]/50 rounded-md text-[10px] font-black uppercase text-[#d7ff2f] tracking-widest">
                    {userInfo.tier}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    ID: {userInfo.memberId}
                  </span>
                </div>

                <h1
                  className="text-2xl sm:text-3xl font-black uppercase text-white mt-1"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {userInfo.name}
                </h1>
                <p className="text-xs text-slate-400 font-normal">
                  {userInfo.homeGym} · Joined {userInfo.joinedDate}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 relative z-10 shrink-0">
              <Link
                href="/services#meet-our-ai"
                className="px-5 py-3 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-lg shadow-[0_4px_20px_rgba(215,255,47,0.3)] hover:scale-105 transition-all cursor-pointer flex items-center gap-2"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                <Sparkles size={14} />
                FitAI Neural Engine
              </Link>
            </div>
          </div>

          {/* Main Dashboard Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Navigation */}
            <aside className="col-span-1 lg:col-span-3">
              {/* Mobile Tab Selector */}
              <div className="lg:hidden mb-6">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                  Select Dashboard View
                </label>
                <select
                  value={activeTab}
                  onChange={(e: any) => setActiveTab(e.target.value)}
                  className="w-full bg-[#111] border border-white/15 rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#d7ff2f] cursor-pointer"
                >
                  {sidebarNavItems.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Desktop Sidebar Nav */}
              <div className="hidden lg:block bg-[#111] p-4 rounded-2xl border border-white/15 space-y-1.5 shadow-xl sticky top-28">
                {sidebarNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id as any)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#d7ff2f] text-[#0b0b0b] shadow-[0_0_20px_rgba(215,255,47,0.3)] font-black"
                          : "text-slate-300 hover:bg-white/5 hover:text-white"
                      }`}
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      <div className="flex items-center gap-3">
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                            isActive
                              ? "bg-[#0b0b0b] text-[#d7ff2f]"
                              : "bg-[#d7ff2f] text-[#0b0b0b]"
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Main Content Area */}
            <main className="col-span-1 lg:col-span-9 bg-[#111] p-6 sm:p-10 rounded-2xl border border-white/15 min-h-162.5 shadow-2xl">
              {/* TAB 1: MAIN DASHBOARD OVERVIEW */}
              {activeTab === "dashboard" && (
                <div className="space-y-8 animate-fadeIn">
                  <div>
                    <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase block mb-1">
                      Member Overview
                    </span>
                    <h2
                      className="text-3xl font-black uppercase text-white"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      Athlete <span className="text-[#d7ff2f]">Dashboard</span>
                    </h2>
                  </div>

                  {/* Top Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="p-5 bg-[#1e2230] rounded-xl border border-white/10">
                      <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Check-in Streak</span>
                      <span className="text-3xl font-black text-[#d7ff2f]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        18 Days 🔥
                      </span>
                    </div>

                    <div className="p-5 bg-[#1e2230] rounded-xl border border-white/10">
                      <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Current Weight</span>
                      <span className="text-3xl font-black text-[#00f2fe]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        {userInfo.weight} kg
                      </span>
                    </div>

                    <div className="p-5 bg-[#1e2230] rounded-xl border border-white/10">
                      <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Target Weight</span>
                      <span className="text-3xl font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        {userInfo.targetWeight} kg
                      </span>
                    </div>

                    <div className="p-5 bg-[#1e2230] rounded-xl border border-white/10">
                      <span className="text-xs text-slate-400 font-bold uppercase block mb-1">Body Fat %</span>
                      <span className="text-3xl font-black text-[#d7ff2f]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        {userInfo.bodyFat}%
                      </span>
                    </div>
                  </div>

                  {/* Today's Workout & AI Macros */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-xs font-bold text-[#d7ff2f] uppercase tracking-wider block mb-2">
                        Today&apos;s Workout Blueprint
                      </span>
                      <h3 className="text-xl font-bold text-white uppercase mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        Upper Power &amp; Chest Velocity
                      </h3>
                      <ul className="space-y-2 text-xs text-slate-300">
                        <li>• Barbell Bench Press (4 Sets x 5 Reps @ RPE 8.5)</li>
                        <li>• Weighted Pull-Ups (4 Sets x 6 Reps @ RPE 8.0)</li>
                        <li>• Overhead Military Press (3 Sets x 6 Reps)</li>
                      </ul>
                      <button
                        onClick={() => setActiveTab("workout_details")}
                        className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-xs text-white font-bold uppercase rounded-lg transition-colors cursor-pointer"
                      >
                        Log Workout Session →
                      </button>
                    </div>

                    <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-xs font-bold text-[#00f2fe] uppercase tracking-wider block mb-2">
                        Daily AI Macro Targets
                      </span>
                      <h3 className="text-xl font-bold text-white uppercase mb-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        2,250 <span className="text-xs text-slate-400">kcal/day</span>
                      </h3>
                      <div className="grid grid-cols-3 gap-2 text-center pt-2">
                        <div className="p-2 bg-white/5 rounded">
                          <span className="text-[10px] text-slate-400 block uppercase">Protein</span>
                          <span className="text-sm font-black text-[#d7ff2f]">167g</span>
                        </div>
                        <div className="p-2 bg-white/5 rounded">
                          <span className="text-[10px] text-slate-400 block uppercase">Carbs</span>
                          <span className="text-sm font-black text-[#00f2fe]">210g</span>
                        </div>
                        <div className="p-2 bg-white/5 rounded">
                          <span className="text-[10px] text-slate-400 block uppercase">Fats</span>
                          <span className="text-sm font-black text-white">62g</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 2: MY PROFILE */}
              {activeTab === "profile" && (
                <div className="space-y-6 animate-fadeIn">
                  <h2
                    className="text-3xl font-black uppercase text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    My <span className="text-[#d7ff2f]">Profile</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={userInfo.name}
                        onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#d7ff2f]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Username</label>
                      <input
                        type="text"
                        value={userInfo.username}
                        onChange={(e) => setUserInfo({ ...userInfo, username: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#d7ff2f]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Email</label>
                      <input
                        type="email"
                        value={userInfo.email}
                        readOnly
                        className="w-full bg-white/5 border border-white/15 rounded-lg p-3 text-sm text-slate-400 cursor-not-allowed"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-400 mb-1">Phone Number</label>
                      <input
                        type="text"
                        value={userInfo.phone}
                        onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-[#d7ff2f]"
                      />
                    </div>
                  </div>

                  <div className="pt-4">
                    <button
                      className="px-6 py-3 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-lg hover:bg-[#c8f020] transition-colors cursor-pointer"
                      style={{ fontFamily: "Space Grotesk, sans-serif" }}
                    >
                      Save Profile Updates
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 3: MY MEMBERSHIP */}
              {activeTab === "membership" && (
                <div className="space-y-6 animate-fadeIn">
                  <h2
                    className="text-3xl font-black uppercase text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    My <span className="text-[#d7ff2f]">Membership</span>
                  </h2>

                  <div className="p-6 bg-white/5 rounded-xl border border-[#d7ff2f]/50 space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-[#d7ff2f] text-[#0b0b0b] text-xs font-black uppercase rounded">
                        Active Tier
                      </span>
                      <span className="text-xs text-slate-400">Renews on Feb 15, 2026</span>
                    </div>

                    <h3 className="text-2xl font-black text-white uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      Performance Tier - $149 / Month
                    </h3>

                    <ul className="space-y-2 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#d7ff2f]" />
                        <span>24/7 Biometric Keycard Access (All Sri Lankan Facilities)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#d7ff2f]" />
                        <span>Unlimited Group Classes &amp; Cold Plunge Hydrotherapy</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#d7ff2f]" />
                        <span>Monthly 1-on-1 Head Coach Session &amp; FitAI Meal Blueprint</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* TAB 4: ATTENDANCE LOG */}
              {activeTab === "attendance" && (
                <div className="space-y-6 animate-fadeIn">
                  <h2
                    className="text-3xl font-black uppercase text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Attendance <span className="text-[#d7ff2f]">Log</span>
                  </h2>

                  <div className="space-y-3">
                    {[
                      { date: "Today (Jan 29, 2026)", time: "06:15 AM", location: "Colombo Flagship", status: "Biometric Check-In" },
                      { date: "Yesterday (Jan 28, 2026)", time: "05:45 PM", location: "Colombo Flagship", status: "Biometric Check-In" },
                      { date: "Jan 26, 2026", time: "06:30 AM", location: "Kandy Lab", status: "Biometric Check-In" },
                      { date: "Jan 24, 2026", time: "07:00 AM", location: "Colombo Flagship", status: "Biometric Check-In" },
                    ].map((item, idx) => (
                      <div key={idx} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-white">{item.date}</p>
                          <p className="text-slate-400">{item.location} · {item.time}</p>
                        </div>
                        <span className="px-3 py-1 bg-[#d7ff2f]/20 text-[#d7ff2f] font-bold rounded">
                          {item.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: WORKOUT PLAN */}
              {activeTab === "workout_plan" && (
                <div className="space-y-6 animate-fadeIn">
                  <h2
                    className="text-3xl font-black uppercase text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Active <span className="text-[#d7ff2f]">Workout Plan</span>
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-5 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-xs font-bold text-[#d7ff2f] uppercase block mb-1">Day 1</span>
                      <h4 className="text-base font-bold text-white uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        Upper Body Power
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">Bench Press, Pull-Ups, Overhead Press</p>
                    </div>

                    <div className="p-5 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-xs font-bold text-[#00f2fe] uppercase block mb-1">Day 2</span>
                      <h4 className="text-base font-bold text-white uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                        Lower Body Power
                      </h4>
                      <p className="text-xs text-slate-400 mt-1">Barbell Squats, Romanian Deadlifts, Split Squats</p>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 6: WORKOUT DETAILS */}
              {activeTab === "workout_details" && (
                <div className="space-y-6 animate-fadeIn">
                  <h2
                    className="text-3xl font-black uppercase text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Workout <span className="text-[#d7ff2f]">Details &amp; PRs</span>
                  </h2>

                  <div className="space-y-4">
                    <div className="p-5 bg-white/5 rounded-xl border border-white/10">
                      <h4 className="text-base font-bold text-white uppercase mb-2 font-heading">
                        Personal Records (PRs)
                      </h4>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-white/5 rounded">
                          <span className="text-xs text-slate-400 block uppercase">Squat</span>
                          <span className="text-xl font-black text-[#d7ff2f]">140 kg</span>
                        </div>
                        <div className="p-3 bg-white/5 rounded">
                          <span className="text-xs text-slate-400 block uppercase">Bench</span>
                          <span className="text-xl font-black text-[#00f2fe]">110 kg</span>
                        </div>
                        <div className="p-3 bg-white/5 rounded">
                          <span className="text-xs text-slate-400 block uppercase">Deadlift</span>
                          <span className="text-xl font-black text-white">180 kg</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 7: AI MEAL PLANNER */}
              {activeTab === "meal_planner" && (
                <div className="space-y-6 animate-fadeIn">
                  <h2
                    className="text-3xl font-black uppercase text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    AI Meal <span className="text-[#d7ff2f]">Planner</span>
                  </h2>
                  <p className="text-xs text-slate-300">
                    Use our AI Meal Blueprint generator embedded in the Services page to calculate fresh nutrition targets.
                  </p>
                  <Link
                    href="/services#meet-our-ai"
                    className="inline-block px-6 py-3 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-lg"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Open AI Meal Generator →
                  </Link>
                </div>
              )}

              {/* TAB 8: AI CHAT COACH */}
              {activeTab === "ai_chat" && (
                <div className="space-y-6 animate-fadeIn">
                  <h2
                    className="text-3xl font-black uppercase text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    AI Chat <span className="text-[#d7ff2f]">Coach</span>
                  </h2>
                  <p className="text-xs text-slate-300">
                    Interact directly with your 24/7 FitAI Neural Assistant using the floating chat button on the bottom right corner!
                  </p>
                </div>
              )}

              {/* TAB 9: PROGRESS TRACKING */}
              {activeTab === "progress" && (
                <div className="space-y-6 animate-fadeIn">
                  <h2
                    className="text-3xl font-black uppercase text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Progress <span className="text-[#d7ff2f]">Tracking</span>
                  </h2>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-xs text-slate-400 uppercase block mb-1">Start Weight</span>
                      <span className="text-2xl font-black text-white">82 kg</span>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-xs text-slate-400 uppercase block mb-1">Current Weight</span>
                      <span className="text-2xl font-black text-[#d7ff2f]">76 kg (-6kg)</span>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                      <span className="text-xs text-slate-400 uppercase block mb-1">Body Fat Lost</span>
                      <span className="text-2xl font-black text-[#00f2fe]">-3.2%</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 10: PROGRESS PHOTOS */}
              {activeTab === "photos" && (
                <div className="space-y-6 animate-fadeIn">
                  <h2
                    className="text-3xl font-black uppercase text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Progress <span className="text-[#d7ff2f]">Photos</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                      <div className="h-48 rounded-lg bg-white/10 flex items-center justify-center mb-3 text-slate-500">
                        <Camera size={32} />
                      </div>
                      <span className="text-xs font-bold text-white uppercase block">Jan 01, 2026 (Front)</span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                      <div className="h-48 rounded-lg bg-white/10 flex items-center justify-center mb-3 text-slate-500">
                        <Camera size={32} />
                      </div>
                      <span className="text-xs font-bold text-white uppercase block">Jan 15, 2026 (Side)</span>
                    </div>
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 text-center">
                      <div className="h-48 rounded-lg bg-[#d7ff2f]/10 border border-dashed border-[#d7ff2f]/50 flex items-center justify-center mb-3 text-[#d7ff2f] cursor-pointer">
                        <Upload size={32} />
                      </div>
                      <span className="text-xs font-bold text-[#d7ff2f] uppercase block">Upload New Photo</span>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 11: NOTIFICATIONS */}
              {activeTab === "notifications" && (
                <div className="space-y-6 animate-fadeIn">
                  <h2
                    className="text-3xl font-black uppercase text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    System <span className="text-[#d7ff2f]">Notifications</span>
                  </h2>

                  <div className="space-y-3">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-start gap-3">
                      <Bell size={18} className="text-[#d7ff2f] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-white">Monthly Coach Review Scheduled</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Your 1-on-1 session with Head Coach Ranil is set for Feb 2 at 10am.</p>
                      </div>
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-start gap-3">
                      <Bell size={18} className="text-[#00f2fe] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs font-bold text-white">New Hydrotherapy Sauna Slots Available</p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Book your weekend sub-zero cold plunge session.</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB 12: PAYMENT HISTORY */}
              {activeTab === "payments" && (
                <div className="space-y-6 animate-fadeIn">
                  <h2
                    className="text-3xl font-black uppercase text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Payment <span className="text-[#d7ff2f]">History</span>
                  </h2>

                  <div className="space-y-3">
                    {[
                      { inv: "INV-2026-001", date: "Jan 15, 2026", amount: "$149.00", status: "Paid" },
                      { inv: "INV-2025-012", date: "Dec 15, 2025", amount: "$149.00", status: "Paid" },
                    ].map((inv) => (
                      <div key={inv.inv} className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between text-xs">
                        <div>
                          <p className="font-bold text-white">{inv.inv}</p>
                          <p className="text-slate-400">{inv.date}</p>
                        </div>
                        <div className="text-right">
                          <span className="font-bold text-white">{inv.amount}</span>
                          <span className="text-[10px] text-[#d7ff2f] block uppercase font-bold">{inv.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 13: SETTINGS */}
              {activeTab === "settings" && (
                <div className="space-y-6 animate-fadeIn">
                  <h2
                    className="text-3xl font-black uppercase text-white"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Account <span className="text-[#d7ff2f]">Settings</span>
                  </h2>

                  <div className="space-y-4 text-xs">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                      <span>Email Workout Reminders</span>
                      <input type="checkbox" defaultChecked className="accent-[#d7ff2f] cursor-pointer" />
                    </div>
                    <div className="p-4 bg-white/5 rounded-xl border border-white/10 flex items-center justify-between">
                      <span>SMS Biometric Keycard Alerts</span>
                      <input type="checkbox" defaultChecked className="accent-[#d7ff2f] cursor-pointer" />
                    </div>
                  </div>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
