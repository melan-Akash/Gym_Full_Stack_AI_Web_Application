"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeUp, SlideIn } from "../motion/FadeUp";
import { Plus, Minus, Send } from "lucide-react";
import { toast } from "react-toast-msg";
import { useFormSync } from "formsync/react";

const faqs = [
  {
    q: "Is there a contract or commitment required?",
    a: "No contracts, ever. All FORGED memberships are month-to-month. You can cancel at any time with 30 days notice, no questions asked.",
  },
  {
    q: "Do you offer a free trial?",
    a: "Yes — every plan includes a 7-day free trial. Experience the full FORGED facility, classes and coaching before committing to a membership.",
  },
  {
    q: "What are your gym operating hours?",
    a: "Foundation members enjoy access from 6am–10pm daily. Performance and Elite members have 24/7 access using their biometric key fob.",
  },
  {
    q: "Are personal training sessions included?",
    a: "Performance plans include one monthly 1-on-1 coaching session. Elite members receive four dedicated personal training sessions per week with a dedicated coach.",
  },
  {
    q: "What recovery facilities do you offer?",
    a: "Our recovery suite features infrared saunas, ice bath tanks, percussion massage stations and a dedicated mobility & stretching zone.",
  },
  {
    q: "Can I freeze my membership?",
    a: "Yes, you can freeze your membership for up to 2 months per year at no additional cost. Perfect for travel or injury recovery.",
  },
];

function AccordionItem({
  q,
  a,
  index,
}: {
  q: string;
  a: string;
  index: number;
}) {
  const [open, setOpen] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="border-b border-[#1a1a1a]"
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex items-start justify-between gap-4 w-full py-6 text-left group"
        aria-expanded={open}
      >
        <span
          className={`text-base font-semibold transition-colors duration-200 ${open ? "text-[#d7ff2f]" : "text-white group-hover:text-white/80"
            }`}
        >
          {q}
        </span>
        <div
          className={`shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-all duration-200 ${open
            ? "border-[#d7ff2f] bg-[#d7ff2f] text-[#0b0b0b]"
            : "border-[#333] text-white/50 group-hover:border-[#555]"
            }`}
        >
          {open ? <Minus size={12} /> : <Plus size={12} />}
        </div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-white/60 text-sm leading-relaxed pb-6">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const [submitted, setSubmitted] = useState(false);

  const { submit, isLoading } = useFormSync({
    formId: "your-form-id",
    onError(err) {
      toast.error(err.message);
    },
    onSuccess() {
      toast.success("Message Sent!");
      setSubmitted(true);
    },
  });

  return (
    <section id="contact" className="section-spacing bg-[#1e2230]">
      <div className="container-gym">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          {/* FAQ */}
          <div>
            <FadeUp>
              <span className="text-[#d7ff2f] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
                FAQ
              </span>
            </FadeUp>
            <FadeUp delay={0.1}>
              <h2
                className="text-5xl font-black uppercase text-white mb-10"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                COMMON ASKED
                <br />
                <span className="text-[#d7ff2f]">QUESTIONS</span>
              </h2>
            </FadeUp>
            <div>
              {faqs.map((faq, i) => (
                <AccordionItem key={faq.q} q={faq.q} a={faq.a} index={i} />
              ))}
            </div>
          </div>

          {/* Contact form */}
          <SlideIn direction="right">
            <div className="bg-[#111] border border-[#1a1a1a] rounded-2xl p-8 md:p-10">
              <span className="text-[#d7ff2f] text-xs font-semibold tracking-[0.25em] uppercase mb-4 block">
                Get In Touch
              </span>
              <h3
                className="text-3xl md:text-4xl font-black uppercase leading-tight text-white mb-2"
                style={{ fontFamily: "Space Grotesk, sans-serif" }}
              >
                START YOUR
                <br />
                JOURNEY TODAY
              </h3>
              <p className="text-white/50 text-sm mb-8">
                Drop us a message. Our team responds within 2 hours.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-16 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#d7ff2f] flex items-center justify-center mb-4">
                    <Send size={24} className="text-[#0b0b0b]" />
                  </div>
                  <h4
                    className="text-2xl font-black uppercase text-white mb-2"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    Message Sent!
                  </h4>
                  <p className="text-white/50 text-sm">
                    We&apos;ll reach out within 2 hours. Get ready to transform.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full bg-[#0b0b0b] border border-[#222] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#d7ff2f]/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full bg-[#0b0b0b] border border-[#222] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#d7ff2f]/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">
                      Goal / Message
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Tell us about your fitness goals..."
                      className="w-full bg-[#0b0b0b] border border-[#222] rounded-xl px-4 py-3 text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#d7ff2f]/50 transition-colors resize-none"
                    />
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isLoading}
                    className="w-full py-4 bg-[#d7ff2f] text-[#0b0b0b] font-heading font-black uppercase tracking-wider rounded-full text-sm hover:bg-[#c8f020] hover:shadow-[0_0_25px_rgba(215,255,47,0.35)] transition-all duration-200 flex items-center justify-center gap-2"
                    style={{ fontFamily: "Space Grotesk, sans-serif" }}
                  >
                    {isLoading ? "Sending..." : "Send Message"} <Send size={14} />
                  </motion.button>
                </form>
              )}
            </div>
          </SlideIn>
        </div>
      </div>
    </section>
  );
}
