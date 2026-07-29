"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden bg-[#1e2230]"
    >
      {/* Background image & ambient glowing light blobs */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1920&q=95"
          alt="Elite athletic training facility"
          fill
          priority
          className="object-cover object-center opacity-75 transition-opacity duration-700"
          sizes="100vw"
        />
        {/* Animated ambient mesh light spots */}
        <div className="absolute top-1/4 -left-20 w-120 h-120 bg-[#d7ff2f]/20 rounded-full blur-[160px] pointer-events-none animate-pulse-glow" />
        <div className="absolute bottom-10 right-10 w-130 h-130 bg-[#00f2fe]/15 rounded-full blur-[180px] pointer-events-none animate-pulse-glow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-white/5 rounded-full blur-[200px] pointer-events-none" />
      </div>

      <div className="container-gym w-full relative z-10 pt-28 pb-16">
        <div className="max-w-4xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 mt-8 py-2 border border-[#d7ff2f]/50 rounded-full mb-8 bg-[#d7ff2f]/15 backdrop-blur-md shadow-[0_4px_25px_rgba(215,255,47,0.25)]"
          >
            <Zap size={14} className="text-[#d7ff2f]" fill="#d7ff2f" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#d7ff2f]">
              Peak Performance Domain
            </span>
          </motion.div>

          {/* Main headline */}
          <div className="overflow-hidden mb-3">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl sm:text-8xl lg:text-9xl font-black uppercase leading-[0.88] tracking-tight text-white drop-shadow-lg"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              CONVERT
            </motion.h1>
          </div>
          <div className="overflow-hidden mb-3">
            <motion.div
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-baseline gap-4 flex-wrap"
            >
              <h1
                className="text-7xl sm:text-8xl lg:text-9xl font-black uppercase leading-[0.88] tracking-tight text-[#d7ff2f] drop-shadow-[0_0_40px_rgba(215,255,47,0.5)]"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                POTENTIAL TO
              </h1>
            </motion.div>
          </div>
          <div className="overflow-hidden mb-8">
            <motion.h1
              initial={{ y: 120, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-7xl sm:text-8xl lg:text-9xl font-black uppercase leading-[0.88] tracking-tight text-white drop-shadow-lg"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              STRENGTH
            </motion.h1>
          </div>

          {/* Subtext + CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="flex flex-col gap-6 mt-4"
          >
            <p className="text-slate-200 text-lg max-w-xl leading-relaxed font-normal">
              Engineered workouts. Top-tier mentorship. Unrivaled progression for individuals demanding excellence.
            </p>
            <div className="flex items-center gap-4 flex-wrap mt-2">
              <motion.a
                href="#pricing"
                whileHover={{ scale: 1.05, boxShadow: "0 0 40px rgba(215,255,47,0.6)" }}
                whileTap={{ scale: 0.95 }}
                className="group flex items-center gap-2.5 px-8 py-4 bg-linear-to-r from-[#d7ff2f] to-[#b8e020] text-[#0b0b0b] font-heading font-black uppercase tracking-wider rounded-full text-sm shadow-[0_6px_30px_rgba(215,255,47,0.4)] transition-all duration-300 cursor-pointer"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Begin Journey
                <ArrowRight size={18} className="group-hover:translate-x-1.5 transition-transform" />
              </motion.a>
              <Link
                href="/about"
                className="px-8 py-4 bg-white/10 backdrop-blur-xl border border-white/25 text-white font-heading font-bold uppercase tracking-wider rounded-full text-sm hover:bg-white/20 transition-all duration-300 shadow-[0_6px_25px_rgba(0,0,0,0.25)] cursor-pointer inline-block"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                About Us
              </Link>
            </div>
          </motion.div>

          {/* Glass Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="flex items-center gap-4 sm:gap-8 mt-14 pt-8 border-t border-white/20 flex-wrap"
          >
            {[
              { value: "12+", label: "Years of Innovation" },
              { value: "5K+", label: "Athletes Upgraded" },
              { value: "98%", label: "Member Approval Rate" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col bg-white/10 backdrop-blur-2xl border border-white/20 px-6 py-4 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.2)] hover:border-[#d7ff2f]/50 transition-colors"
              >
                <span
                  className="text-3xl font-black text-[#d7ff2f] leading-none"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-xs text-slate-200 mt-1.5 font-medium tracking-wide uppercase">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 right-8 md:right-16 z-10 flex flex-col items-center gap-2"
      >
        <div className="w-px h-16 bg-linear-to-b from-transparent to-[#d7ff2f]" />
        <span className="text-[10px] tracking-widest uppercase text-slate-300 rotate-90 origin-center translate-x-4 font-bold">
          Scroll
        </span>
      </motion.div>
    </section>
  );
}
