"use client";

import { useState } from "react";
import { useAppContext } from "@/context/appcontext";
import { Sparkles, Utensils } from "lucide-react";
import toast from "react-hot-toast";

export default function TrainerMealBuilderPage() {
  const { trainerCreateMeal, trainerGenerateAIPlan } = useAppContext();

  const [title, setTitle] = useState("Pro High-Protein Muscle Shred Plan");
  const [goal, setGoal] = useState("Lean Muscle & Fat Loss");
  const [calories, setCalories] = useState(2400);
  const [proteinGrams, setProteinGrams] = useState(210);
  const [carbsGrams, setCarbsGrams] = useState(240);
  const [fatsGrams, setFatsGrams] = useState(65);
  const [loading, setLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);

  const handleGenerateAI = async () => {
    setAiGenerating(true);
    setAiOutput(null);
    try {
      const res = await trainerGenerateAIPlan({
        type: "meal",
        goal: goal,
        dietaryPreference: "High-Protein Clean Muscle Intake",
        userPrompt: `Target Calories: ${calories} kcal. Protein: ${proteinGrams}g, Carbs: ${carbsGrams}g, Fats: ${fatsGrams}g.`,
      });

      setAiGenerating(false);
      setAiOutput(res.output);
      toast.success("AI Meal Plan Generated via OpenRouter (meta-llama/llama-3.1-8b-instruct)!", {
        icon: "🥗",
      });
    } catch (err: any) {
      setAiGenerating(false);
      toast.error(err.message || "AI Meal generation failed");
    }
  };

  const handleSaveMeal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await trainerCreateMeal({
        title,
        goal,
        calories,
        proteinGrams,
        carbsGrams,
        fatsGrams,
      });

      setLoading(false);
      toast.success(`Meal Plan "${title}" saved to MongoDB database!`, {
        icon: "⚡",
      });
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message || "Failed to save meal plan");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            PRECISION NUTRITION & <span className="text-[#d7ff2f]">MEAL BUILDER</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Design daily macro breakdowns or generate tailored nutrition with OpenRouter AI.</p>
        </div>

        <button
          onClick={handleGenerateAI}
          disabled={aiGenerating}
          className="px-5 py-2.5 bg-linear-to-r from-[#00f2fe] to-[#4facfe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <Sparkles size={16} />
          {aiGenerating ? "OpenRouter AI Generating..." : "Generate AI Nutrition Plan"}
        </button>
      </div>

      {/* AI Output Card */}
      {aiOutput && (
        <div className="bg-[#12151c] border border-[#00f2fe]/40 rounded-2xl p-6 space-y-3 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-[#00f2fe] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 font-heading">
              <Sparkles size={16} /> OpenRouter AI Nutrition Output (meta-llama/llama-3.1-8b-instruct)
            </span>
            <span className="text-[10px] bg-[#00f2fe]/20 text-[#00f2fe] px-2.5 py-0.5 rounded font-bold uppercase">Live AI Model</span>
          </div>

          <div className="text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap max-h-96 overflow-y-auto p-4 bg-black/40 rounded-xl border border-white/10">
            {aiOutput}
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSaveMeal} className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold uppercase mb-1">Meal Plan Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d7ff2f]"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold uppercase mb-1">Primary Goal</label>
            <input
              type="text"
              required
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d7ff2f]"
            />
          </div>
        </div>

        {/* Macros Breakdown */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs pt-4 border-t border-white/10">
          <div>
            <label className="block text-slate-300 font-bold uppercase mb-1">Total Calories</label>
            <input
              type="number"
              value={calories}
              onChange={(e) => setCalories(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-[#d7ff2f] font-black text-sm focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold uppercase mb-1">Protein (g)</label>
            <input
              type="number"
              value={proteinGrams}
              onChange={(e) => setProteinGrams(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold uppercase mb-1">Carbs (g)</label>
            <input
              type="number"
              value={carbsGrams}
              onChange={(e) => setCarbsGrams(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white font-bold focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold uppercase mb-1">Fats (g)</label>
            <input
              type="number"
              value={fatsGrams}
              onChange={(e) => setFatsGrams(Number(e.target.value))}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white font-bold focus:outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#d7ff2f] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-xl hover:bg-[#b8e020] transition-all cursor-pointer shadow-lg"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          {loading ? "Saving to MongoDB..." : "Save Meal Plan to MongoDB Database"}
        </button>
      </form>
    </div>
  );
}
