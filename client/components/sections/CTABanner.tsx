"use client";

import { motion } from "framer-motion";
import { FadeUp } from "../motion/FadeUp";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CTABanner() {
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=1920&q=90"
          alt="Elite gym training"
          fill
          className="object-cover object-center opacity-35"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0b0b0b]/70" />
        {/* Neon lime gradient accent */}
        <div className="absolute inset-0 bg-linear-to-br from-[#d7ff2f]/10 via-transparent to-transparent" />
      </div>

      <div className="container-gym relative z-10 text-center">
        <FadeUp>
          <span className="text-[#d7ff2f] text-xs font-semibold tracking-[0.25em] uppercase mb-6 block">
            Exclusive Slots Open
          </span>
        </FadeUp>

        <FadeUp delay={0.1}>
          <h2
            className="text-6xl font-black uppercase text-white mb-8 max-w-4xl mx-auto"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            YOUR POTENTIAL AWAITS
            <br />
            <span className="text-[#d7ff2f]">TO BE UNLEASHED.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.2}>
          <p className="text-white/50 text-base max-w-md mx-auto mb-10">
            Secure your complimentary trial and experience elite training today — no card needed.
            Take the first step toward elite results. Join our community and push your boundaries.
          </p>
        </FadeUp>

        <FadeUp delay={0.3}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-2 px-6 py-3 bg-[#d7ff2f] text-[#0b0b0b] font-heading font-black uppercase tracking-wider rounded-full text-base hover:shadow-[0_0_40px_rgba(215,255,47,0.45)] transition-shadow duration-300"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Secure Your Trial
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white font-heading font-bold uppercase tracking-wider rounded-full text-base hover:border-white/50 transition-colors duration-200"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Connect with a Coach
            </motion.a>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
