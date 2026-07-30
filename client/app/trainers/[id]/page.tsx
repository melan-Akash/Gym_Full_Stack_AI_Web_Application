"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import { TRAINERS_DATA } from "@/lib/trainersData";
import { Star, Award, Users, ArrowLeft, CheckCircle2, Calendar, Clock, MessageSquare, Shield, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TrainerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const trainer = TRAINERS_DATA.find((t) => t.id === resolvedParams.id);

  const [selectedDay, setSelectedDay] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  if (!trainer) {
    notFound();
  }

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setBookingSubmitted(false);
      setBookingModalOpen(false);
      setSelectedDay("");
      setSelectedTime("");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white selection:bg-[#d7ff2f] selection:text-[#0b0b0b] font-body">
      <Navbar />

      {/* Top Banner & Profile Header */}
      <section className="relative pt-32 pb-16 px-4 md:px-8 border-b border-white/10">
        <div className="max-w-6xl mx-auto space-y-6">
          <Link
            href="/trainers"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#d7ff2f] transition-colors"
          >
            <ArrowLeft size={16} />
            Back to All Trainers
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#141722] border border-white/15 rounded-3xl p-6 sm:p-10 relative overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.5)]">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#d7ff2f]/5 rounded-full blur-[100px] pointer-events-none" />

            {/* Left Column: Avatar */}
            <div className="lg:col-span-4 relative h-80 sm:h-96 rounded-2xl overflow-hidden border border-white/15 bg-[#1e2230]">
              <Image
                src={trainer.avatar}
                alt={trainer.name}
                fill
                priority
                className="object-cover object-top"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-md border border-white/10 p-3 rounded-xl flex items-center justify-between text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase">Rating Score</span>
                  <span className="text-amber-400 font-bold flex items-center gap-1 text-sm">
                    <Star size={14} className="fill-amber-400" />
                    {trainer.rating.toFixed(1)} / 5.0
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase">Rate</span>
                  <span className="text-[#d7ff2f] font-black text-sm" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    ${trainer.hourlyRate}/hr
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Bio & Highlights */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <span className="px-3 py-1 bg-[#d7ff2f]/15 border border-[#d7ff2f]/40 text-[#d7ff2f] text-xs font-black uppercase tracking-widest rounded-md inline-block">
                  {trainer.category} Specialist
                </span>
                <h1
                  className="text-3xl sm:text-5xl font-black uppercase text-white tracking-tight"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {trainer.name}
                </h1>
                <p className="text-[#00f2fe] text-sm font-semibold uppercase tracking-wider">
                  {trainer.title}
                </p>
              </div>

              <p className="text-slate-300 text-sm leading-relaxed">
                {trainer.fullBio}
              </p>

              {/* Stats Highlights Grid */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-center">
                  <span className="text-2xl font-black text-[#d7ff2f] block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {trainer.experienceYears}+ Yrs
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Experience</span>
                </div>

                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-center">
                  <span className="text-2xl font-black text-[#00f2fe] block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {trainer.activeClientsCount}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Active Clients</span>
                </div>

                <div className="bg-white/5 border border-white/10 p-3.5 rounded-xl text-center">
                  <span className="text-2xl font-black text-purple-400 block" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                    {trainer.reviewsCount}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">Verified Reviews</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-4 pt-2">
                <button
                  onClick={() => setBookingModalOpen(true)}
                  className="px-8 py-3.5 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#c8f020] transition-all shadow-[0_0_25px_rgba(215,255,47,0.35)] cursor-pointer flex items-center gap-2"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  <Calendar size={16} />
                  Book Private Session
                </button>
                <Link
                  href="/login"
                  className="px-6 py-3.5 bg-white/5 border border-white/20 text-white font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  <MessageSquare size={16} />
                  Send Direct Message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-16 px-4 md:px-8 max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left 8 Cols: Specializations, Certifications, Achievements */}
        <div className="lg:col-span-8 space-y-12">
          {/* Specializations */}
          <div className="bg-[#141722] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-black uppercase text-white flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              <Sparkles size={18} className="text-[#d7ff2f]" />
              Core Specializations
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {trainer.specializations.map((spec) => (
                <div key={spec} className="flex items-center gap-3 bg-white/5 border border-white/10 p-3 rounded-xl text-sm font-medium text-slate-200">
                  <CheckCircle2 size={16} className="text-[#d7ff2f] shrink-0" />
                  {spec}
                </div>
              ))}
            </div>
          </div>

          {/* Certifications & Badges */}
          <div className="bg-[#141722] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-black uppercase text-white flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              <Shield size={18} className="text-[#00f2fe]" />
              Accreditation & Certifications
            </h3>
            <div className="flex flex-wrap gap-2 pt-2">
              {trainer.certifications.map((cert) => (
                <span
                  key={cert}
                  className="px-4 py-2 bg-[#00f2fe]/10 border border-[#00f2fe]/30 rounded-lg text-xs font-bold text-[#00f2fe] uppercase tracking-wider"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="bg-[#141722] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-xl font-black uppercase text-white flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              <Award size={18} className="text-amber-400" />
              Career Achievements
            </h3>
            <ul className="space-y-3 pt-2">
              {trainer.achievements.map((ach, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-slate-300">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-2 shrink-0" />
                  {ach}
                </li>
              ))}
            </ul>
          </div>

          {/* Client Reviews Section */}
          <div className="bg-[#141722] border border-white/10 rounded-2xl p-6 space-y-6">
            <h3 className="text-xl font-black uppercase text-white flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              <Star size={18} className="text-amber-400" />
              Athlete Testimonials ({trainer.reviews.length})
            </h3>
            <div className="space-y-4">
              {trainer.reviews.map((rev) => (
                <div key={rev.id} className="bg-white/5 border border-white/10 p-5 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Image
                        src={rev.clientAvatar}
                        alt={rev.clientName}
                        width={40}
                        height={40}
                        className="rounded-full object-cover border border-white/15"
                      />
                      <div>
                        <h4 className="text-sm font-bold text-white">{rev.clientName}</h4>
                        <span className="text-[10px] text-slate-400">{rev.date}</span>
                      </div>
                    </div>
                    <div className="flex items-center text-amber-400 text-xs">
                      {Array.from({ length: rev.rating }).map((_, i) => (
                        <Star key={i} size={13} className="fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed italic">
                    &ldquo;{rev.comment}&rdquo;
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right 4 Cols: Availability Schedule Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#141722] border border-white/15 rounded-2xl p-6 space-y-6 sticky top-28 shadow-xl">
            <div>
              <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                Weekly Schedule
              </h3>
              <p className="text-xs text-slate-400 mt-1">Available time slots for private training & assessment.</p>
            </div>

            {/* Days Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">Available Days</label>
              <div className="flex flex-wrap gap-2">
                {trainer.availableDays.map((day) => (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase transition-all cursor-pointer ${
                      selectedDay === day
                        ? "bg-[#d7ff2f] text-[#0b0b0b] font-bold"
                        : "bg-white/5 border border-white/10 text-slate-300 hover:border-white/30"
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-300 block">Select Time Slot</label>
              <div className="grid grid-cols-2 gap-2">
                {trainer.timeSlots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`px-3 py-2 rounded-lg text-xs font-mono transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                      selectedTime === slot
                        ? "bg-[#00f2fe] text-[#0b0b0b] font-bold"
                        : "bg-white/5 border border-white/10 text-slate-300 hover:border-white/30"
                    }`}
                  >
                    <Clock size={12} />
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setBookingModalOpen(true)}
              className="w-full py-3.5 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-widest rounded-xl hover:bg-[#c8f020] transition-all cursor-pointer shadow-[0_0_20px_rgba(215,255,47,0.3)]"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Reserve Session
            </button>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#141722] border border-white/20 p-6 sm:p-8 rounded-2xl max-w-md w-full relative space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <h3 className="text-xl font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  Book Session with <span className="text-[#d7ff2f]">{trainer.name}</span>
                </h3>
                <button
                  onClick={() => setBookingModalOpen(false)}
                  className="text-slate-400 hover:text-white text-lg font-bold"
                >
                  ✕
                </button>
              </div>

              {bookingSubmitted ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 size={48} className="text-[#d7ff2f] mx-auto animate-bounce" />
                  <h4 className="text-lg font-bold text-white">Booking Request Submitted!</h4>
                  <p className="text-slate-400 text-xs">
                    You will receive a notification in your dashboard once {trainer.name} confirms your slot.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Alex Mercer"
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d7ff2f]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Your Email</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@example.com"
                      className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d7ff2f]"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Day</label>
                      <input
                        type="text"
                        value={selectedDay || trainer.availableDays[0]}
                        onChange={(e) => setSelectedDay(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Time</label>
                      <input
                        type="text"
                        value={selectedTime || trainer.timeSlots[0]}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-2 text-white text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-lg hover:bg-[#c8f020] transition-all cursor-pointer mt-4"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Confirm Booking (${trainer.hourlyRate})
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
