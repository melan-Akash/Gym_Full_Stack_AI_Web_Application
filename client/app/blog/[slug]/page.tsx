"use client";

import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { useState } from "react";
import {
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  Check,
  Sparkles,
  ArrowUpRight,
  User,
} from "lucide-react";
import { getBlogPostBySlug, blogPosts } from "@/lib/blogData";

export default function SingleBlogPostPage() {
  const params = useParams();
  const slug = typeof params?.slug === "string" ? params.slug : "";
  const post = getBlogPostBySlug(slug);
  const [copied, setCopied] = useState(false);

  if (!post) {
    return (
      <main className="bg-[#1e2230] text-white min-h-screen flex flex-col justify-between">
        <Navbar />
        <div className="container-gym text-center py-40">
          <h1 className="text-5xl font-black mb-4 uppercase text-[#d7ff2f]" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            Insight Not Found
          </h1>
          <p className="text-slate-300 text-lg mb-8">
            The requested article could not be located in our research database.
          </p>
          <Link
            href="/blog"
            className="px-8 py-4 bg-[#d7ff2f] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-lg hover:bg-[#c8f020] transition-colors"
          >
            Back To Blog Hub
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const relatedPosts = blogPosts.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <main className="bg-[#1e2230] text-white min-h-screen overflow-x-hidden font-body selection:bg-[#d7ff2f] selection:text-[#0b0b0b]">
      <Navbar />

      {/* =========================================================================
         1. ARTICLE HEADER (Slate bg)
         ========================================================================= */}
      <section className="pt-36 pb-14 bg-[#1e2230] border-b border-white/10">
        <div className="container-gym max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d7ff2f] hover:text-white transition-colors mb-8"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            <ArrowLeft size={16} />
            Back to Insight Hub
          </Link>

          {/* Category & Read Time */}
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-[#d7ff2f] text-[#0b0b0b] text-[10px] font-black uppercase tracking-widest rounded-md">
              {post.category}
            </span>
            <span className="text-white/20 text-xs">·</span>
            <div className="flex items-center gap-1 text-slate-300 text-xs font-medium">
              <Clock size={14} className="text-[#d7ff2f]" />
              <span>{post.readTime}</span>
            </div>
            <span className="text-white/20 text-xs">·</span>
            <span className="text-slate-300 text-xs font-medium">{post.date}</span>
          </div>

          {/* Title */}
          <h1
            className="text-4xl sm:text-6xl font-black uppercase tracking-tight leading-[1.05] text-white mb-6"
            style={{ fontFamily: "Space Grotesk, sans-serif" }}
          >
            {post.title}
          </h1>

          {/* Subtitle */}
          <p className="text-slate-200 text-lg sm:text-xl leading-relaxed mb-8 font-normal">
            {post.subtitle}
          </p>

          {/* Author Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6 border-t border-white/15">
            <div className="flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#d7ff2f]">
                <Image
                  src={post.authorAvatar}
                  alt={post.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-base font-bold text-white uppercase" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
                  {post.author}
                </p>
                <p className="text-xs font-bold text-[#d7ff2f] uppercase tracking-wider">
                  {post.authorRole}
                </p>
              </div>
            </div>

            {/* Share button */}
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 bg-white/5 border border-white/15 rounded-lg text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2 hover:border-[#d7ff2f] hover:text-[#d7ff2f] transition-all cursor-pointer"
            >
              {copied ? (
                <>
                  <Check size={14} className="text-[#d7ff2f]" />
                  Copied Link!
                </>
              ) : (
                <>
                  <Share2 size={14} />
                  Share Article
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================================
         2. ARTICLE COVER IMAGE & MAIN CONTENT (Deep Dark bg)
         ========================================================================= */}
      <section className="section-spacing bg-[#0b0b0b] border-b border-white/10">
        <div className="container-gym max-w-4xl mx-auto">
          {/* Main Hero Cover Image */}
          <div className="relative h-96 sm:h-125 w-full rounded-xl overflow-hidden border border-white/15 mb-14 shadow-2xl">
            <Image
              src={post.image}
              alt={post.title}
              fill
              priority
              className="object-cover object-center"
            />
          </div>

          {/* Article Body */}
          <div className="space-y-10 text-slate-200 text-base sm:text-lg leading-relaxed font-normal">
            {/* Introduction */}
            <div className="bg-[#111] p-8 rounded-xl border border-white/10">
              <p className="text-white font-medium text-lg leading-relaxed italic">
                &ldquo;{post.content.introduction}&rdquo;
              </p>
            </div>

            {/* Sections */}
            {post.content.sections.map((section, idx) => (
              <div key={idx} className="space-y-4 pt-4">
                <h2
                  className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight"
                  style={{ fontFamily: "Space Grotesk, sans-serif" }}
                >
                  {section.heading}
                </h2>
                <p className="whitespace-pre-line text-slate-300">
                  {section.body}
                </p>
                {section.keyTakeaway && (
                  <div className="bg-[#1e2230] p-6 rounded-xl border-l-4 border-l-[#d7ff2f] border border-white/10 mt-4">
                    <p className="text-xs font-bold uppercase tracking-widest text-[#d7ff2f] mb-1 font-heading">
                      Key Takeaway
                    </p>
                    <p className="text-sm font-medium text-white">
                      {section.keyTakeaway}
                    </p>
                  </div>
                )}
              </div>
            ))}

            {/* Conclusion */}
            <div className="pt-8 border-t border-white/10">
              <h2
                className="text-2xl font-black uppercase text-white mb-4"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                Final Verdict &amp; Execution
              </h2>
              <p className="text-slate-300">
                {post.content.conclusion}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
         3. RELATED ARTICLES SECTION (Slate bg)
         ========================================================================= */}
      <section className="section-spacing bg-[#1e2230]">
        <div className="container-gym max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <h2
              className="text-3xl font-black uppercase text-white"
              style={{ fontFamily: "Space Grotesk, sans-serif" }}
            >
              Related <span className="text-[#d7ff2f]">Insights</span>
            </h2>
            <Link
              href="/blog"
              className="text-xs font-bold uppercase tracking-wider text-[#d7ff2f] hover:text-white transition-colors"
            >
              View All Insights →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {relatedPosts.map((rel) => (
              <div
                key={rel.slug}
                className="bg-[#0b0b0b] rounded-xl overflow-hidden border border-white/10 hover:border-[#d7ff2f]/50 transition-all group p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 bg-[#d7ff2f] text-[#0b0b0b] text-[10px] font-black uppercase tracking-wider rounded-md">
                      {rel.category}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{rel.readTime}</span>
                  </div>
                  <h3
                    className="text-lg font-bold text-white uppercase mb-2 group-hover:text-[#d7ff2f] transition-colors"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {rel.title}
                  </h3>
                  <p className="text-slate-300 text-xs line-clamp-2 leading-relaxed mb-4">
                    {rel.excerpt}
                  </p>
                </div>
                <Link
                  href={`/blog/${rel.slug}`}
                  className="text-xs font-bold text-[#d7ff2f] uppercase tracking-wider flex items-center gap-1 hover:text-white transition-colors"
                >
                  Read Full Post <ArrowUpRight size={14} />
                </Link>
              </div>
            ))}
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
