"use client";

import { FadeUp } from "../motion/FadeUp";

const partners = [
  "Nike Training",
  "Optimum Nutrition",
  "Garmin",
  "Rogue Fitness",
  "WHOOP",
  "MyProtein",
  "Hyperice",
  "Eleiko",
  "TechnoGym",
  "Wahoo",
];

export default function Partners() {
  const doubled = [...partners, ...partners];

  return (
    <section className="py-20 bg-[#0f0f0f] border-y border-[#1a1a1a] overflow-hidden">
      <div className="container-gym mb-10">
        <FadeUp className="text-center">
          <span className="text-white/60 text-xs font-semibold tracking-[0.25em] uppercase">
            Trusted by the best — powered by elite partnerships
          </span>
        </FadeUp>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Gradient masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-[#0f0f0f] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-[#0f0f0f] to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee whitespace-nowrap mt-10">
          {doubled.map((partner, i) => (
            <div
              key={`${partner}-${i}`}
              className="flex items-center gap-12 mx-10"
            >
              <div className="flex items-center gap-3 group">
                <div className="w-2 h-2 rounded-full bg-[#d7ff2f] group-hover:scale-150 transition-transform duration-200" />
                <span
                  className="text-white/30 text-lg font-black uppercase tracking-widest group-hover:text-white/70 transition-colors duration-200"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {partner}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
