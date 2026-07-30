"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { TRAINERS_DATA } from "@/lib/trainersData";
import { Star, Award, Users, ArrowRight, Search, Sparkles, Calendar, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function PublicTrainersPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Bodybuilding", "HIIT & Cardio", "Powerlifting", "Yoga & Mobility", "Rehabilitation"];

  const filteredTrainers = TRAINERS_DATA.filter((t) => {
    const matchesCategory = selectedCategory === "All" || t.category === selectedCategory;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.specializations.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white selection:bg-[#d7ff2f] selection:text-[#0b0b0b] font-body">
      <Navbar />

      {/* Hero Header */}
      <section className="relative pt-36 pb-20 px-4 md:px-8 overflow-hidden bg-linear-to-b from-[#181b26] via-[#12151c] to-[#0b0b0b]">
        {/* Glow Effects */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-87.5 bg-[#d7ff2f]/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-[#d7ff2f]/30 text-[#d7ff2f] text-xs font-black uppercase tracking-widest"
          >
            <Sparkles size={14} />
            World-Class Athletic Coaching
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-tight"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            MEET OUR <span className="text-transparent bg-clip-text bg-linear-to-r from-[#d7ff2f] via-[#b8e020] to-[#00f2fe]">ELITE TRAINERS</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed font-normal"
          >
            Every FORGED coach is a master of human performance, backed by biometrics, elite athletic credentials, and custom program design.
          </motion.p>

          {/* Search & Filter Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="pt-6 max-w-3xl mx-auto space-y-4"
          >
            {/* Search Input */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by trainer name, skill, or specialization..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-full pl-12 pr-6 py-4 text-white text-sm placeholder:text-slate-500 focus:outline-none focus:border-[#d7ff2f] transition-all shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              />
            </div>

            {/* Category Filter Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#d7ff2f] text-[#0b0b0b] shadow-[0_0_20px_rgba(215,255,47,0.4)] scale-105"
                      : "bg-white/5 border border-white/10 text-slate-300 hover:border-white/30 hover:text-white"
                  }`}
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trainers Grid */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        {filteredTrainers.length === 0 ? (
          <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-slate-400 text-lg font-medium">No trainers found matching your search parameters.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="mt-4 px-6 py-2.5 bg-[#d7ff2f] text-[#0b0b0b] font-bold text-xs uppercase tracking-wider rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTrainers.map((trainer, idx) => (
              <motion.div
                key={trainer.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group bg-[#141722] border border-white/10 rounded-2xl overflow-hidden hover:border-[#d7ff2f]/50 transition-all duration-300 flex flex-col justify-between hover:shadow-[0_10px_40px_rgba(215,255,47,0.12)]"
              >
                <div>
                  {/* Photo Banner */}
                  <div className="relative h-72 w-full overflow-hidden bg-[#1e2230]">
                    <Image
                      src={trainer.avatar}
                      alt={trainer.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-[#141722] via-[#141722]/30 to-transparent" />

                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 bg-[#0b0b0b]/80 backdrop-blur-md border border-white/15 text-[#d7ff2f] text-[10px] font-black uppercase tracking-wider rounded-md">
                        {trainer.category}
                      </span>
                      <div className="flex items-center gap-1 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-md border border-amber-500/30 text-amber-400 text-xs font-bold">
                        <Star size={12} className="fill-amber-400" />
                        {trainer.rating.toFixed(1)} ({trainer.reviewsCount})
                      </div>
                    </div>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs text-slate-300">
                      <span className="flex items-center gap-1.5 bg-black/70 px-2.5 py-1 rounded-md border border-white/10">
                        <Award size={13} className="text-[#d7ff2f]" />
                        {trainer.experienceYears} Yrs Exp.
                      </span>
                      <span className="flex items-center gap-1.5 bg-black/70 px-2.5 py-1 rounded-md border border-white/10">
                        <Users size={13} className="text-[#00f2fe]" />
                        {trainer.activeClientsCount} Active Clients
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3
                        className="text-2xl font-black uppercase text-white tracking-tight group-hover:text-[#d7ff2f] transition-colors"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {trainer.name}
                      </h3>
                      <p className="text-xs font-semibold text-[#00f2fe] uppercase tracking-wider mt-0.5">
                        {trainer.title}
                      </p>
                    </div>

                    <p className="text-slate-300 text-xs leading-relaxed line-clamp-3">
                      {trainer.bio}
                    </p>

                    {/* Specialization Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {trainer.specializations.slice(0, 3).map((spec) => (
                        <span
                          key={spec}
                          className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-slate-300 font-medium"
                        >
                          {spec}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-6 pt-0 border-t border-white/5 mt-4 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Consultation</span>
                    <span className="text-lg font-black text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                      ${trainer.hourlyRate} <span className="text-xs text-slate-400 font-normal">/ hr</span>
                    </span>
                  </div>

                  <Link
                    href={`/trainers/${trainer.id}`}
                    className="px-5 py-2.5 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-lg hover:bg-[#c8f020] transition-all flex items-center gap-1.5 group-hover:shadow-[0_0_20px_rgba(215,255,47,0.4)]"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    View Profile
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 max-w-6xl mx-auto">
        <div className="bg-linear-to-r from-[#181b26] to-[#12151c] border border-[#d7ff2f]/30 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-[0_0_50px_rgba(215,255,47,0.1)]">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              READY TO TRAIN WITH A <span className="text-[#d7ff2f]">FORGED PRO?</span>
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Book a personal 1-on-1 assessment session today. Get biometrics evaluated, custom workout plans engineered, and nutritional goals calibrated.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/login"
                className="px-8 py-3.5 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-widest rounded-full shadow-[0_0_30px_rgba(215,255,47,0.4)] hover:scale-105 transition-all"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Get Started Now
              </Link>
              <Link
                href="/services"
                className="px-8 py-3.5 bg-white/5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-full hover:bg-white/10 transition-all"
              >
                Explore Facilities
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
