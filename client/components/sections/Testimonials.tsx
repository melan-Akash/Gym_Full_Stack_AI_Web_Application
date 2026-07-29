"use client";

import { motion } from "framer-motion";
import { FadeUp } from "../motion/FadeUp";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Jordan Miles",
    role: "Software Engineer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    rating: 5,
    quote:
      "FORGED transcends a gym — it's an elite performance sanctuary. Coaches drive relentless progress. I shed 28 lbs and shattered personal strength records.",
    tall: true,
  },
  {
    name: "Amara Singh",
    role: "Yoga Instructor & Runner",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    rating: 5,
    quote:
      "The programming eclipses all I've experienced. My stamina surged dramatically within eight weeks.",
    tall: false,
  },
  {
    name: "Ryan Torres",
    role: "Competitive Powerlifter",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    rating: 5,
    quote:
      "Top‑tier facility, world‑class coaching. The recovery suite — infrared sauna and ice bath — revolutionizes my regeneration.",
    tall: false,
  },
  {
    name: "Chloe Bennett",
    role: "Entrepreneur",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    rating: 5,
    quote:
      "I doubted the premium cost. Now I train nowhere else. The return on my physique and mindset is truly transformative.",
    tall: true,
  },
  {
    name: "Marcus Webb",
    role: "Personal Trainer",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80",
    rating: 5,
    quote:
      "As a trainer myself, I know quality when I see it. FORGED is the real deal — the equipment, programming and community are second to none.",
    tall: false,
  },
  {
    name: "Priya Kapoor",
    role: "Medical Resident",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80",
    rating: 5,
    quote:
      "Training here keeps me sane during brutal hospital shifts. The 24/7 access and quick 45-min sessions are exactly what I need.",
    tall: false,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-3">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={12} className="text-[#d7ff2f]" fill="#d7ff2f" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="section-spacing bg-[#1e2230]">
      <div className="container-gym">
        <div className="text-center mb-16">
          <FadeUp>
            <span className="text-[#d7ff2f] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
              Athlete Voices
            </span>
          </FadeUp>
          <FadeUp delay={0.1}>
            <h2
              className="text-5xl font-black uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              WHAT OUR
              <br />
              <span className="text-[#d7ff2f]">ELITE VOICES</span>
            </h2>
          </FadeUp>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="break-inside-avoid bg-[#111] border border-[#1a1a1a] rounded-2xl p-6 hover:border-[#d7ff2f]/20 group"
            >
              <StarRating count={t.rating} />
              <p className="text-white/70 text-sm leading-relaxed mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-[#d7ff2f]/20">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p
                    className="text-white text-sm font-bold"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {t.name}
                  </p>
                  <p className="text-white/40 text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
