"use client";

import { useState } from "react";
import { Utensils, Plus, Trash2, Save, Sparkles, Flame, Apple } from "lucide-react";

interface MealItem {
  id: string;
  time: string;
  name: string;
  items: string[];
}

export default function MealBuilderPage() {
  const [planTitle, setPlanTitle] = useState("High-Protein Hypertrophy Blueprint");
  const [targetClient, setTargetClient] = useState("David Miller");
  const [calories, setCalories] = useState(3100);
  const [protein, setProtein] = useState(210);
  const [carbs, setCarbs] = useState(340);
  const [fats, setFats] = useState(80);

  const [meals, setMeals] = useState<MealItem[]>([
    { id: "m1", time: "07:30 AM", name: "Power Breakfast", items: ["6 Whole Organic Eggs", "1.5 Cups Oatmeal", "1 tbsp Peanut Butter"] },
    { id: "m2", time: "12:30 PM", name: "Clean Lunch Split", items: ["8oz Grilled Chicken Breast", "2 Cups Jasmine Rice", "Steamed Broccoli"] },
    { id: "m3", time: "07:00 PM", name: "Anabolic Dinner", items: ["8oz Salmon Fillet", "1 Large Sweet Potato", "Mixed Greens"] },
  ]);

  const [newMealTime, setNewMealTime] = useState("04:00 PM");
  const [newMealName, setNewMealName] = useState("Pre-Workout Snack");
  const [newMealFood, setNewMealFood] = useState("2 Scoops Whey Isolate + 1 Banana");
  const [saved, setSaved] = useState(false);

  const addMeal = () => {
    if (!newMealName.trim()) return;
    const newM: MealItem = {
      id: Date.now().toString(),
      time: newMealTime,
      name: newMealName,
      items: [newMealFood],
    };
    setMeals([...meals, newM]);
    setNewMealName("");
    setNewMealFood("");
  };

  const removeMeal = (id: string) => {
    setMeals(meals.filter((m) => m.id !== id));
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <span className="text-[#00f2fe] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 font-heading">
            <Sparkles size={14} /> Nutrition & Macro Engine
          </span>
          <h1 className="text-3xl font-black uppercase text-white tracking-tight" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
            MEAL <span className="text-[#00f2fe]">BUILDER</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1">Engineered macronutrient splits, meal timing schedules, and dietary recommendations.</p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-[#00f2fe] text-[#0b0b0b] font-black text-xs uppercase tracking-wider rounded-xl hover:bg-[#00d0e0] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(0,242,254,0.3)]"
          style={{ fontFamily: "Space Grotesk, sans-serif" }}
        >
          <Save size={16} />
          {saved ? "Meal Plan Saved!" : "Publish Meal Plan"}
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Macro Calculator & Client Selector */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Target Macros Calibrator
            </h3>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Plan Title</label>
              <input
                type="text"
                value={planTitle}
                onChange={(e) => setPlanTitle(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00f2fe]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-300 mb-1">Target Client</label>
              <select
                value={targetClient}
                onChange={(e) => setTargetClient(e.target.value)}
                className="w-full bg-[#1e2230] border border-white/15 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-[#00f2fe]"
              >
                <option value="David Miller">David Miller (Bulking)</option>
                <option value="Sarah Jenkins">Sarah Jenkins (Cutting)</option>
                <option value="Alex Thorne">Alex Thorne (Maintenance)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400">Calories (kcal)</label>
                <input
                  type="number"
                  value={calories}
                  onChange={(e) => setCalories(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-white text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400">Protein (g)</label>
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-emerald-400 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400">Carbs (g)</label>
                <input
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-amber-400 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400">Fats (g)</label>
                <input
                  type="number"
                  value={fats}
                  onChange={(e) => setFats(Number(e.target.value))}
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-3 py-1.5 text-purple-400 text-xs font-bold"
                />
              </div>
            </div>
          </div>

          {/* Add Meal Form */}
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-black uppercase text-white flex items-center gap-2" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              <Plus size={16} className="text-[#00f2fe]" />
              Add Meal Slot
            </h3>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">Time Slot</label>
              <input
                type="text"
                value={newMealTime}
                onChange={(e) => setNewMealTime(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">Meal Title</label>
              <input
                type="text"
                value={newMealName}
                onChange={(e) => setNewMealName(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase text-slate-300 mb-1">Food Items</label>
              <input
                type="text"
                placeholder="e.g. 2 scoops Whey, 1 banana"
                value={newMealFood}
                onChange={(e) => setNewMealFood(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-xs"
              />
            </div>

            <button
              onClick={addMeal}
              className="w-full py-2.5 bg-white/10 hover:bg-[#00f2fe] hover:text-[#0b0b0b] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              + Add Meal Slot
            </button>
          </div>
        </div>

        {/* Right Column: Meal Schedule */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#12151c] border border-white/10 rounded-2xl p-6 space-y-4">
            <h3 className="text-lg font-black uppercase text-white" style={{ fontFamily: "Space Grotesk, sans-serif" }}>
              Daily Meal Schedule ({meals.length} Meals)
            </h3>

            <div className="space-y-3">
              {meals.map((m) => (
                <div key={m.id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#00f2fe] font-bold bg-[#00f2fe]/10 px-2 py-0.5 rounded">
                        {m.time}
                      </span>
                      <h4 className="text-sm font-bold text-white">{m.name}</h4>
                    </div>

                    <ul className="text-xs text-slate-300 space-y-0.5 pl-2 pt-1 border-l border-white/10">
                      {m.items.map((item, idx) => (
                        <li key={idx}>• {item}</li>
                      ))}
                    </ul>
                  </div>

                  <button
                    onClick={() => removeMeal(m.id)}
                    className="p-2 text-slate-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
