"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FadeUp } from "../motion/FadeUp";
import { ArrowUpRight, Clock } from "lucide-react";
import { blogPosts } from "@/lib/blogData";

export default function Blog() {
  const featuredPosts = blogPosts.slice(0, 3);

  return (
    <section className="section-spacing bg-[#1e2230]">
      <div className="container-gym">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <FadeUp>
              <span className="text-[#d7ff2f] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block font-heading">
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
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#d7ff2f]/40 text-[#d7ff2f] font-heading font-bold uppercase tracking-wider rounded-lg text-sm hover:bg-[#d7ff2f] hover:text-[#0b0b0b] transition-all duration-300 shadow-md cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Explore All Insights <ArrowUpRight size={14} />
            </Link>
          </FadeUp>
        </div>

        {/* Articles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredPosts.map((article, i) => (
            <motion.div
              key={article.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link href={`/blog/${article.slug}`} className="group block cursor-pointer">
                {/* Image */}
                <div className="relative h-56 rounded-xl overflow-hidden mb-5 border border-white/15">
                  <Image
                    src={article.image}
                    alt={article.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#1e2230]/70 to-transparent" />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#d7ff2f] text-[#0b0b0b] text-[10px] font-black uppercase tracking-widest rounded-md">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center gap-1 text-slate-300 text-xs">
                    <Clock size={12} className="text-[#d7ff2f]" />
                    <span>{article.readTime}</span>
                  </div>
                  <span className="text-white/20 text-xs">·</span>
                  <span className="text-slate-300 text-xs">{article.date}</span>
                </div>

                {/* Title */}
                <h3
                  className="text-xl font-black uppercase leading-tight text-white mb-3 group-hover:text-[#d7ff2f] transition-colors duration-300"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {article.title}
                </h3>

                <p className="text-slate-300 text-sm line-clamp-2 leading-relaxed mb-4 font-normal">
                  {article.excerpt}
                </p>

                {/* Author + arrow */}
                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <span className="text-slate-300 text-xs font-semibold">
                    {article.author}
                  </span>
                  <div className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center group-hover:border-[#d7ff2f] group-hover:bg-[#d7ff2f] group-hover:text-[#0b0b0b] text-white/70 transition-all duration-300">
                    <ArrowUpRight size={14} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
