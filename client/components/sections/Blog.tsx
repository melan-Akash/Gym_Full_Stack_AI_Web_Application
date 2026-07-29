"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FadeUp } from "../motion/FadeUp";
import { ArrowUpRight, Clock } from "lucide-react";

const articles = [
  {
    image:
      "https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=800&q=85",
    category: "Training",
    readTime: "6 min read",
    title: "The Science Behind Progressive Overload: Why Your Gains Plateau",
    excerpt:
      "Understanding the neurological and muscular adaptations that drive strength gains — and how to keep them coming.",
    date: "May 28, 2025",
    author: "Coach Alex Reed",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&q=85",
    category: "Nutrition",
    readTime: "8 min read",
    title: "Optimizing Protein Intake: Timing, Sources & the 0.8g Myth",
    excerpt:
      "New research suggests most gym-goers are dramatically underestimating their protein needs. Here's what the data says.",
    date: "May 21, 2025",
    author: "Dr. Priya Mehta, RD",
  },
  {
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=85",
    category: "Recovery",
    readTime: "5 min read",
    title: "Cold Therapy & Infrared Saunas: The Contrast Protocol Explained",
    excerpt:
      "Elite athletes have been using contrast therapy for decades. We break down the evidence and the optimal protocol.",
    date: "May 14, 2025",
    author: "Coach Sarah Kim",
  },
];

export default function Blog() {
  return (
    <section className="section-spacing bg-[#0f0f0f]">
      <div className="container-gym">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <FadeUp>
              <span className="text-[#d7ff2f] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
                Insight Hub
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="text-5xl font-black uppercase text-white"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                FORGED INSIGHTS
                <br />
                <span className="text-[#d7ff2f]">FORGING POWER</span>
              </h2>
            </FadeUp>
          </div>
          <FadeUp delay={0.2}>
            <motion.a
              href="#"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#d7ff2f]/30 text-[#d7ff2f] font-heading font-bold uppercase tracking-wider rounded-full text-sm hover:bg-[#d7ff2f]/10 transition-colors"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
                            Explore All Insights <ArrowUpRight size={14} />
            </motion.a>
          </FadeUp>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {articles.map((article, i) => (
            <motion.article
              key={article.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group cursor-pointer"
            >
              {/* Image */}
              <div className="relative h-56 rounded-2xl overflow-hidden mb-5">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0b0b0b]/60 to-transparent" />
                {/* Category badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#d7ff2f] text-[#0b0b0b] text-[10px] font-black uppercase tracking-widest rounded-full">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-3">
                <div className="flex items-center gap-1 text-white/40 text-xs">
                  <Clock size={10} />
                  <span>{article.readTime}</span>
                </div>
                <span className="text-white/20 text-xs">·</span>
                <span className="text-white/40 text-xs">{article.date}</span>
              </div>

              {/* Title */}
              <h3
                className="text-xl font-black uppercase leading-tight text-white mb-3 group-hover:text-[#d7ff2f] transition-colors duration-300"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                {article.title}
              </h3>

              <p className="text-white/50 text-sm line-clamp-2 leading-relaxed mb-4">
                {article.excerpt}
              </p>

              {/* Author + arrow */}
              <div className="flex items-center justify-between">
                <span className="text-white/40 text-xs font-medium">
                  {article.author}
                </span>
                <div className="w-8 h-8 rounded-full border border-[#333] flex items-center justify-center group-hover:border-[#d7ff2f] group-hover:text-[#d7ff2f] text-white/30 transition-all duration-300">
                  <ArrowUpRight size={13} />
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
