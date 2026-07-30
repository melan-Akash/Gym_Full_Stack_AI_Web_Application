const { queryOpenRouterAI } = require("../config/openrouter");

// @desc    Generate AI Workout / Meal Plan / Chat using OpenRouter (meta-llama/llama-3.1-8b-instruct)
// @route   POST /api/ai/generate
// @access  Private
const generateAIFitnessPlan = async (req, res) => {
  try {
    const { type, goal, fitnessLevel, weightLbs, dietaryPreference, userPrompt, messages, model } = req.body;

    let aiResult;

    if (messages && Array.isArray(messages) && messages.length > 0) {
      // Full conversation thread request
      aiResult = await queryOpenRouterAI(messages, { model });
    } else {
      // Form structured request
      let prompt = "";
      let systemPrompt = "You are FORGED FitAI, an elite strength & conditioning coach and sports nutritionist. Provide a structured, highly actionable response.";

      if (type === "workout") {
        prompt = `Generate a comprehensive, high-intensity workout routine for a ${fitnessLevel || "Intermediate"} athlete. Goal: '${goal || "Muscle Hypertrophy"}'. Bodyweight: ${weightLbs || 170} lbs. Special focus: ${userPrompt || "Chest & Arms"}. Format with exercise names, sets, reps, and rest intervals.`;
      } else if (type === "meal") {
        prompt = `Design a precision nutrition & meal plan for goal '${goal || "Lean Fat Loss"}'. Dietary preference: '${dietaryPreference || "High-Protein Clean Intake"}'. Target: ~2,400 kcal daily. Format with Breakfast, Lunch, Dinner, and Snacks including protein, carbs, and fats breakdown.`;
      } else {
        prompt = userPrompt || "Explain the core principles of progressive overload for muscle growth.";
      }

      aiResult = await queryOpenRouterAI(prompt, { systemPrompt, model });
    }

    res.json({
      success: true,
      model: aiResult.model,
      output: aiResult.content,
      usage: aiResult.usage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate AI response via OpenRouter.",
    });
  }
};

module.exports = { generateAIFitnessPlan };
