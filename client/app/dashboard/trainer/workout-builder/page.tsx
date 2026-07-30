"use client";

import { useState } from "react";
import { Dumbbell, Plus, Trash2, Save, Sparkles, CheckCircle2, Clock } from "lucide-react";

interface ExerciseItem {
  id: string;
  name: string;
  sets: number;
  reps: string;
  restSeconds: number;
  muscle: string;
}

export default function WorkoutBuilderPage() {
  const [workoutTitle, setWorkoutTitle] = useState("Hypertrophy Chest & Triceps Shred");
  const [category, setCategory] = useState("Bodybuilding");
  const [targetClient, setTargetClient] = useState("David Miller");
  const [exercises, setExercises] = useState<ExerciseItem[]>([
    { id: "e1", name: "Incline Barbell Press", sets: 4, reps: "8-10", restSeconds: 90, muscle: "Upper Chest" },
    { id: "e2", name: "Flat Cable Flyes", sets: 3, reps: "12-15", restSeconds: 60, muscle: "Mid Chest" },
    { id: "e3", name: "Triceps Overhead Extension", sets: 4, reps: "10-12", restSeconds: 60, muscle: "Triceps Long Head" },
  ]);

  const [newExName, setNewExName] = useState("");
  const [newExSets, setNewExSets] = useState(3);
  const [newExReps, setNewExReps] = useState("10-12");
  const [newExRest, setNewExRest] = useState(60);
  const [newExMuscle, setNewExMuscle] = useState("Chest");

  const [savedSuccess, setSavedSuccess] = useState(false);

  const addExercise = () => {
    if (!newExName.trim()) return;
    const newEx: ExerciseItem = {
      id: Date.now().toString(),
      name: newExName,
      sets: Number(newExSets),
      reps: newExReps,
      restSeconds: Number(newExRest),
      muscle: newExMuscle,
    };
    setExercises([...exercises, newEx]);
    setNewExName("");
  };

  const removeExercise = (id: string) => {
    setExercises(exercises.filter((ex) => ex.id !== id));
  };

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-[#d7ff2f] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 font-heading">
            <Sparkles size={14} /> Interactive Workout Engine
          </span>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            WORKOUT <span className="text-[#d7ff2f]">BUILDER</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Design customized exercise routines, sets, rep ranges, and rest intervals.</p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-[#d7ff2f] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#c8f020] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(215,255,47,0.3)]"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <Save size={16} />
          {savedSuccess ? "Workout Saved!" : "Save & Publish Plan"}
        </button>
      </div>

      {/* Main Builder Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: General Configuration */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Routine Parameters
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Workout Title</label>
              <input
                type="text"
                value={workoutTitle}
                onChange={(e) => setWorkoutTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#d7ff2f]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Training Discipline</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-[#1e2230] border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#d7ff2f]"
              >
                <option value="Bodybuilding">Bodybuilding & Hypertrophy</option>
                <option value="HIIT">HIIT & Metabolic Conditioning</option>
                <option value="Powerlifting">Powerlifting & Max Strength</option>
                <option value="Mobility">Mobility & Rehabilitation</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1.5">Assign To Client</label>
              <select
                value={targetClient}
                onChange={(e) => setTargetClient(e.target.value)}
                className="w-full bg-[#1e2230] border border-white/15 rounded-xl px-4 py-2.5 text-white text-xs focus:outline-none focus:border-[#d7ff2f]"
              >
                <option value="David Miller">David Miller (Hypertrophy)</option>
                <option value="Sarah Jenkins">Sarah Jenkins (Shred)</option>
                <option value="Alex Thorne">Alex Thorne (HIIT)</option>
                <option value="Chloe Bennett">Chloe Bennett (Mobility)</option>
              </select>
            </div>

            <div className="pt-2 border-t border-white/10">
              <div className="flex justify-between text-xs text-slate-300 py-1">
                <span>Total Exercises:</span>
                <span className="font-bold text-white">{exercises.length}</span>
              </div>
              <div className="flex justify-between text-xs text-slate-300 py-1">
                <span>Est. Duration:</span>
                <span className="font-bold text-[#d7ff2f]">{exercises.length * 15} Mins</span>
              </div>
            </div>
          </div>

          {/* Add Exercise Form */}
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-black uppercase text-white flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              <Plus size={16} className="text-[#d7ff2f]" />
              Add Exercise to List
            </h3>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">Exercise Name</label>
              <input
                type="text"
                placeholder="e.g. Dumbbell Shoulder Press"
                value={newExName}
                onChange={(e) => setNewExName(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#d7ff2f]"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">Sets</label>
                <input
                  type="number"
                  value={newExSets}
                  onChange={(e) => setNewExSets(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">Reps</label>
                <input
                  type="text"
                  value={newExReps}
                  onChange={(e) => setNewExReps(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">Rest (Sec)</label>
                <input
                  type="number"
                  value={newExRest}
                  onChange={(e) => setNewExRest(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">Target Muscle</label>
                <input
                  type="text"
                  value={newExMuscle}
                  onChange={(e) => setNewExMuscle(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-xs"
                />
              </div>
            </div>

            <button
              onClick={addExercise}
              className="w-full py-2.5 bg-white/10 hover:bg-[#d7ff2f] hover:text-[#0b0b0b] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              + Add Exercise
            </button>
          </div>
        </div>

        {/* Right Column: Exercises Sequence List */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Exercise Program Sequence ({exercises.length})
            </h3>

            {exercises.length === 0 ? (
              <div className="text-center py-12 text-slate-500 text-xs">No exercises added yet.</div>
            ) : (
              <div className="space-y-3">
                {exercises.map((ex, index) => (
                  <div key={ex.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-full bg-[#d7ff2f]/20 border border-[#d7ff2f]/40 text-[#d7ff2f] font-bold text-xs flex items-center justify-center shrink-0">
                        {index + 1}
                      </span>
                      <div>
                        <h4 className="text-sm font-bold text-white">{ex.name}</h4>
                        <span className="text-[11px] text-[#00f2fe] uppercase font-semibold">{ex.muscle}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-right text-xs">
                        <span className="font-bold text-white block">{ex.sets} Sets × {ex.reps}</span>
                        <span className="text-slate-400 text-[10px] flex items-center gap-1 justify-end">
                          <Clock size={11} /> {ex.restSeconds}s rest
                        </span>
                      </div>

                      <button
                        onClick={() => removeExercise(ex.id)}
                        className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
