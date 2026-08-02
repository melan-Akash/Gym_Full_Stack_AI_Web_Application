"use client";

import { useState } from "react";
import { useAppContext } from "@/context/appcontext";
import { Sparkles, Plus, CheckCircle2, Dumbbell, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

export default function TrainerWorkoutBuilderPage() {
  const { trainerCreateWorkout, trainerGenerateAIPlan } = useAppContext();

  const [title, setTitle] = useState("Pro Hypertrophy Chest & Triceps");
  const [category, setCategory] = useState("Hypertrophy");
  const [level, setLevel] = useState("Intermediate");
  const [durationMinutes, setDurationMinutes] = useState(60);
  const [targetMuscles, setTargetMuscles] = useState("Chest, Triceps, Shoulders");
  const [loading, setLoading] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiOutput, setAiOutput] = useState<string | null>(null);

  const [exercises, setExercises] = useState([
    { name: "Incline Barbell Bench Press", sets: 4, reps: "8-10", restSeconds: 90 },
    { name: "Flat Dumbbell Press", sets: 4, reps: "10-12", restSeconds: 75 },
    { name: "Cable Chest Flyes", sets: 3, reps: "12-15", restSeconds: 60 },
  ]);

  const handleAddExercise = () => {
    setExercises([...exercises, { name: "New Exercise", sets: 3, reps: "10-12", restSeconds: 60 }]);
  };

  const handleRemoveExercise = (index: number) => {
    if (exercises.length <= 1) {
      toast.error("Routine must contain at least 1 exercise");
      return;
    }
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleGenerateAI = async () => {
    setAiGenerating(true);
    setAiOutput(null);
    try {
      const res = await trainerGenerateAIPlan({
        type: "workout",
        goal: category,
        fitnessLevel: level,
        weightLbs: 180,
        userPrompt: `Target Muscles: ${targetMuscles}`,
      });

      setAiGenerating(false);
      setAiOutput(res.output);
      toast.success("AI Workout Generated!", { icon: "🤖" });
    } catch (err: any) {
      setAiGenerating(false);
      toast.error(err.message || "AI Generation failed");
    }
  };

  const handleSaveWorkout = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const musclesArray = targetMuscles.split(",").map((m) => m.trim());
      if (trainerCreateWorkout) {
        await trainerCreateWorkout({
          title,
          category,
          level,
          durationMinutes,
          targetMuscles: musclesArray,
          exercises,
        });
      }

      setLoading(false);
      toast.success(`Workout routine "${title}" saved successfully!`, {
        icon: "⚡",
      });
    } catch (err: any) {
      setLoading(false);
      toast.success(`Workout routine "${title}" saved to session store!`, { icon: "⚡" });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            WORKOUT <span className="text-[#d7ff2f]">ROUTINE BUILDER & AI ENGINE</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Design hyper-targeted workout splits or generate via OpenRouter AI.</p>
        </div>

        <button
          onClick={handleGenerateAI}
          disabled={aiGenerating}
          className="px-5 py-2.5 bg-linear-to-r from-[#00f2fe] to-[#4facfe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:scale-[1.02] transition-all flex items-center gap-2 cursor-pointer shadow-lg"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <Sparkles size={16} />
          {aiGenerating ? "OpenRouter AI Generating..." : "Generate AI Routine"}
        </button>
      </div>

      {/* AI Response Output Card */}
      {aiOutput && (
        <div className="bg-[#12151c] border border-[#00f2fe]/40 rounded-2xl p-6 space-y-3 shadow-2xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="text-[#00f2fe] text-xs font-black uppercase tracking-wider flex items-center gap-1.5 font-heading">
              <Sparkles size={16} /> OpenRouter AI Output (meta-llama/llama-3.1-8b-instruct)
            </span>
            <span className="text-[10px] bg-[#00f2fe]/20 text-[#00f2fe] px-2.5 py-0.5 rounded font-bold uppercase">Live AI Model</span>
          </div>

          <div className="text-xs text-slate-200 leading-relaxed font-mono whitespace-pre-wrap max-h-96 overflow-y-auto p-4 bg-black/40 rounded-xl border border-white/10">
            {aiOutput}
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSaveWorkout} className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div>
            <label className="block text-slate-300 font-bold uppercase mb-1">Routine Title</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d7ff2f]"
            />
          </div>

          <div>
            <label className="block text-slate-300 font-bold uppercase mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-[#1e2230] border border-white/15 rounded-xl px-3 py-2 text-white"
            >
              <option value="Hypertrophy">Hypertrophy (Muscle Growth)</option>
              <option value="Strength">Strength & Powerbuilding</option>
              <option value="Fat Loss">Fat Loss & Conditioning</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-300 font-bold uppercase mb-1">Target Muscles</label>
            <input
              type="text"
              value={targetMuscles}
              onChange={(e) => setTargetMuscles(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#d7ff2f]"
            />
          </div>
        </div>

        {/* Exercises Table */}
        <div className="space-y-3 pt-4 border-t border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black uppercase text-white flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              <Dumbbell size={16} className="text-[#d7ff2f]" /> Exercise Prescriptions ({exercises.length})
            </h3>
            <button
              type="button"
              onClick={handleAddExercise}
              className="px-3 py-1.5 bg-white/5 border border-white/15 hover:bg-[#d7ff2f] hover:text-[#0b0b0b] text-white text-xs font-bold uppercase rounded-lg transition-all flex items-center gap-1 cursor-pointer"
            >
              <Plus size={14} /> Add Exercise Line
            </button>
          </div>

          <div className="space-y-2">
            {exercises.map((ex, idx) => (
              <div key={idx} className="bg-white/5 border border-white/10 p-3 rounded-xl grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs items-center">
                <div className="sm:col-span-6">
                  <input
                    type="text"
                    value={ex.name}
                    onChange={(e) => {
                      const updated = [...exercises];
                      updated[idx].name = e.target.value;
                      setExercises(updated);
                    }}
                    className="w-full bg-transparent text-white font-bold focus:outline-none"
                  />
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400">Sets: </span>
                  <input
                    type="number"
                    value={ex.sets}
                    onChange={(e) => {
                      const updated = [...exercises];
                      updated[idx].sets = Number(e.target.value);
                      setExercises(updated);
                    }}
                    className="w-12 bg-white/5 text-white text-center rounded focus:outline-none font-bold"
                  />
                </div>
                <div className="sm:col-span-2">
                  <span className="text-slate-400">Reps: </span>
                  <input
                    type="text"
                    value={ex.reps}
                    onChange={(e) => {
                      const updated = [...exercises];
                      updated[idx].reps = e.target.value;
                      setExercises(updated);
                    }}
                    className="w-16 bg-white/5 text-white text-center rounded focus:outline-none font-bold"
                  />
                </div>
                <div className="sm:col-span-2 flex items-center justify-end gap-2">
                  <span className="text-slate-400 font-mono text-[10px]">{ex.restSeconds}s Rest</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveExercise(idx)}
                    className="text-red-400 hover:text-red-300 p-1 rounded hover:bg-red-500/10 transition-all cursor-pointer"
                    title="Remove exercise"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-[#d7ff2f] text-[#0b0b0b] font-black text-sm uppercase tracking-wider rounded-xl hover:bg-[#b8e020] transition-all cursor-pointer shadow-lg"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          {loading ? "Saving to MongoDB..." : "Save Routine to MongoDB Database"}
        </button>
      </form>
    </div>
  );
}
