"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Clock, ArrowUpRight, Search, Sparkles, Filter } from "lucide-react";
import { blogPosts, BlogPost } from "@/lib/blogData";

const categories = ["All", "Training", "Nutrition", "Recovery", "Endurance", "Mindset"] as const;

export default function BlogListingPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <main className="bg-[#1e2230] text-white min-h-screen overflow-x-hidden font-body selection:bg-[#d7ff2f] selection:text-[#0b0b0b]">
      <Navbar />

      {/* =========================================================================
         1. HERO SECTION (Slate bg)
         ========================================================================= */}
      <section className="relative min-h-[65vh] flex items-center justify-center pt-36 pb-20 overflow-hidden bg-[#1e2230]">
        {/* Full-bleed background image & dark gradient overlays */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=1920&q=95"
            alt="FORGED Insight Hub"
            fill
            priority
            className="object-cover object-center opacity-30"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-[#1e2230] via-[#1e2230]/70 to-[#1e2230]/40" />
          <div className="absolute inset-0 bg-linear-to-r from-[#1e2230] via-transparent to-[#1e2230]" />

          {/* Ambient lighting */}
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#d7ff2f]/15 rounded-full blur-[160px] pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00f2fe]/15 rounded-full blur-[160px] pointer-events-none" />
        </div>

        <div className="container-gym w-full relative z-10 text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#d7ff2f]/40 rounded-lg mb-6 bg-[#d7ff2f]/10 backdrop-blur-md shadow-lg">
            <Sparkles size={14} className="text-[#d7ff2f]" />
            <span className="text-xs font-bold tracking-widest uppercase text-[#d7ff2f]">
              Knowledge &amp; Sports Science
            </span>
          </div>

          {/* Simple Clean Headline */}
          <h1
            className="text-6xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight leading-none text-white mb-6"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            FORGED <span className="text-[#d7ff2f]">BLOGS</span>
          </h1>

          {/* Subtitle */}
          <p className="text-slate-200 text-lg sm:text-xl leading-relaxed max-w-2xl mx-auto font-normal">
            Evidence-based training protocols, bio-nutritional strategies, and performance insights written by credentialed sports scientists and coaches.
          </p>
        </div>
      </section>

      {/* =========================================================================
         2. FILTER & SEARCH BAR + BLOG GRID (Deep Dark bg)
         ========================================================================= */}
      <section className="section-spacing bg-[#0b0b0b] border-y border-white/10">
        <div className="container-gym">
          {/* Search & Category Filter Controls */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-14 bg-[#111] p-4 sm:p-6 rounded-xl border border-white/10">
            {/* Category Tabs */}
            <div className="flex items-center gap-2 flex-wrap w-full md:w-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#d7ff2f] text-[#0b0b0b] shadow-[0_0_20px_rgba(215,255,47,0.3)]"
                      : "bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10"
                  }`}
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search insights..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-lg pl-10 pr-4 py-2.5 text-white text-xs placeholder:text-slate-400 focus:outline-none focus:border-[#d7ff2f] transition-colors"
              />
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
            </div>
          </div>

          {/* Articles Grid */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 bg-[#111] rounded-xl border border-white/10">
              <p className="text-xl font-bold text-white mb-2 uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                No Insights Found
              </p>
              <p className="text-slate-400 text-sm">
                Try searching for a different keyword or resetting your category filter.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory("All");
                  setSearchQuery("");
                }}
                className="mt-4 px-5 py-2 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-lg hover:bg-[#c8f020] transition-colors cursor-pointer"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((article) => (
                <div
                  key={article.slug}
                  className="bg-[#111] rounded-xl overflow-hidden border border-white/10 hover:border-[#d7ff2f]/50 transition-all duration-300 group flex flex-col justify-between"
                >
                  <Link href={`/blog/${article.slug}`} className="block cursor-pointer">
                    {/* Article Image */}
                    <div className="relative h-60 w-full overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-[#111] via-transparent to-transparent" />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#d7ff2f] text-[#0b0b0b] text-[10px] font-black uppercase tracking-widest rounded-md">
                          {article.category}
                        </span>
                      </div>
                    </div>

                    {/* Article Details */}
                    <div className="p-6">
                      <div className="flex items-center gap-3 mb-3 text-xs text-slate-400">
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-[#d7ff2f]" />
                          <span>{article.readTime}</span>
                        </div>
                        <span>·</span>
                        <span>{article.date}</span>
                      </div>

                      <h2
                        className="text-xl font-black uppercase leading-tight text-white mb-3 group-hover:text-[#d7ff2f] transition-colors"
                        style={{ fontFamily: "Space Grotesk, sans-serif" }}
                      >
                        {article.title}
                      </h2>

                      <p className="text-slate-300 text-sm line-clamp-3 leading-relaxed mb-6 font-normal">
                        {article.excerpt}
                      </p>
                    </div>
                  </Link>

                  {/* Article Author Footer */}
                  <div className="px-6 pb-6 flex items-center justify-between border-t border-white/10 mt-auto pt-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#d7ff2f]/30">
                        <Image
                          src={article.authorAvatar}
                          alt={article.author}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span className="text-xs font-bold text-slate-200">
                        {article.author}
                      </span>
                    </div>

                    <Link
                      href={`/blog/${article.slug}`}
                      className="w-8 h-8 rounded-lg border border-white/20 flex items-center justify-center group-hover:border-[#d7ff2f] group-hover:bg-[#d7ff2f] group-hover:text-[#0b0b0b] text-white/70 transition-all duration-300"
                    >
                      <ArrowUpRight size={14} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
         3. NEWSLETTER CTA SECTION (Slate bg)
         ========================================================================= */}
      <section className="section-spacing bg-[#1e2230]">
        <div className="container-gym max-w-4xl mx-auto text-center">
          <span className="text-[#d7ff2f] text-xs font-bold tracking-[0.25em] uppercase mb-3 block font-heading">
            Weekly Intelligence
          </span>

          <h2
            className="text-4xl sm:text-5xl font-black uppercase text-white mb-4"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            Get The <span className="text-[#d7ff2f]">Weekly Training Drop</span>
          </h2>

          <p className="text-slate-200 text-base max-w-xl mx-auto mb-8 font-normal">
            Join 5,000+ athletes receiving our breakdown of sports science, training periodization, and nutrition protocols every Sunday.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="athlete@example.com"
              className="w-full sm:flex-1 bg-white/5 border border-white/20 rounded-lg px-5 py-3.5 text-white text-sm placeholder:text-slate-400 focus:outline-none focus:border-[#d7ff2f]"
            />
            <button
              className="w-full sm:w-auto px-7 py-3.5 bg-[#d7ff2f] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg hover:bg-[#c8f020] transition-colors cursor-pointer"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
         4. FOOTER
         ========================================================================= */}
      <Footer />
    </main>
  );
}
