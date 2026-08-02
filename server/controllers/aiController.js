const { queryOpenRouterAI, queryOpenRouterJSON } = require("../config/openrouter");
const WorkoutPlan = require("../models/WorkoutPlan");
const MealPlan = require("../models/MealPlan");
const AIChatLog = require("../models/AIChatLog");
const User = require("../models/User");

/**
 * Helper to safely log AI actions in DB
 */
const logAIAction = async (userId, actionType, prompt, responseContent, structuredOutput = null, modelUsed = "default") => {
  try {
    if (userId) {
      await AIChatLog.create({
        user: userId,
        actionType,
        prompt: typeof prompt === "string" ? prompt : JSON.stringify(prompt),
        responseContent: typeof responseContent === "string" ? responseContent : JSON.stringify(responseContent),
        structuredOutput,
        modelUsed,
      });
    }
  } catch (err) {
    console.error("[AIChatLog Save Error]", err.message);
  }
};

// @desc    Generate General AI Fitness / Nutrition / Chat response
// @route   POST /api/ai/generate
// @access  Private
const generateAIFitnessPlan = async (req, res) => {
  try {
    const { type, goal, fitnessLevel, weightLbs, dietaryPreference, userPrompt, messages, model } = req.body;

    let aiResult;

    if (messages && Array.isArray(messages) && messages.length > 0) {
      // Conversation thread
      aiResult = await queryOpenRouterAI(messages, { model });
    } else {
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

    // Save to AIChatLog
    await logAIAction(req.user?._id, "chat", userPrompt || "General AI Request", aiResult.content, null, aiResult.model);

    res.json({
      success: true,
      model: aiResult.model,
      output: aiResult.content,
      usage: aiResult.usage,
    });
  } catch (error) {
    console.error("[AI Generation Fallback Engaged]", error.message);
    const { type, goal, fitnessLevel } = req.body;
    let fallbackOutput = "";
    if (type === "workout") {
      fallbackOutput = `🏋️ FORGED ATHLETIC WORKOUT ROUTINE (${fitnessLevel || "Intermediate"} - ${goal || "Hypertrophy"})\n\n1. Incline Barbell Bench Press: 4 Sets x 8-10 Reps (Rest: 90s)\n2. Flat Dumbbell Press: 4 Sets x 10-12 Reps (Rest: 75s)\n3. Standing Cable Chest Flyes: 3 Sets x 12-15 Reps (Rest: 60s)\n4. Tricep Rope Pushdowns: 4 Sets x 12-15 Reps (Rest: 60s)\n5. Overhead Dumbbell Tricep Extension: 3 Sets x 10-12 Reps (Rest: 60s)\n\nCoach Note: Focus on progressive overload, controlling the 2-second eccentric phase on every rep.`;
    } else {
      fallbackOutput = `🥗 FORGED PRECISION NUTRITION PLAN (${goal || "Lean Muscle & Fat Loss"})\n\n• Meal 1 - Power Breakfast (08:00 AM): 4 Large Eggs, 80g Rolled Oats with Blueberries, 1 Scoop Whey Isolate (650 kcal | 45g Protein | 60g Carbs | 20g Fat)\n• Meal 2 - Lean Muscle Fuel (01:00 PM): 200g Grilled Chicken Breast, 150g Steamed Jasmine Rice, Roasted Broccoli & Olive Oil (600 kcal | 50g Protein | 55g Carbs | 15g Fat)\n• Meal 3 - Pre-Workout Fuel (04:30 PM): 1 Large Banana, 2 Rice Cakes, 20g Almond Butter (300 kcal | 8g Protein | 40g Carbs | 12g Fat)\n• Meal 4 - Recovery Dinner (08:00 PM): 200g Grass-Fed Sirloin Steak, 200g Baked Sweet Potato, Asparagus (750 kcal | 55g Protein | 45g Carbs | 25g Fat)`;
    }

    res.json({
      success: true,
      model: "FORGED-Engine-Fallback",
      output: fallbackOutput,
      isFallback: true,
    });
  }
};

// @desc    Generate Structured Workout Plan (JSON) + Optional Direct DB Save
// @route   POST /api/ai/workout
// @access  Private
const generateStructuredWorkout = async (req, res) => {
  try {
    const {
      goal = "Muscle Hypertrophy",
      fitnessLevel = "Intermediate",
      targetMuscles = ["Chest", "Triceps"],
      durationMinutes = 60,
      equipmentAvailable = "Full Gym",
      saveToDB = false,
      model,
    } = req.body;

    const musclesStr = Array.isArray(targetMuscles) ? targetMuscles.join(", ") : targetMuscles;

    const prompt = `Create a structured workout plan for an athlete.
Goal: ${goal}
Fitness Level: ${fitnessLevel}
Target Muscles: ${musclesStr}
Duration: ${durationMinutes} minutes
Available Equipment: ${equipmentAvailable}

You MUST return a raw JSON object matching EXACTLY this structure:
{
  "title": "Short title describing the workout",
  "category": "Bodybuilding or Powerlifting or HIIT or Cardio",
  "level": "Beginner or Intermediate or Advanced",
  "durationMinutes": 60,
  "targetMuscles": ["${musclesStr}"],
  "exercises": [
    {
      "name": "Exercise Name",
      "sets": 4,
      "reps": "8-10",
      "restSeconds": 90,
      "muscle": "Target Muscle Name"
    }
  ]
}`;

    const aiResult = await queryOpenRouterJSON(prompt, {
      systemPrompt: "You are FORGED FitAI, an elite strength conditioning expert. Produce clean structured workout JSON.",
      model,
    });

    let savedPlan = null;
    if (saveToDB && req.user?._id) {
      const planData = aiResult.data;
      savedPlan = await WorkoutPlan.create({
        title: planData.title || `${goal} Plan`,
        category: planData.category || "Bodybuilding",
        level: planData.level || fitnessLevel,
        durationMinutes: planData.durationMinutes || durationMinutes,
        targetMuscles: planData.targetMuscles || (Array.isArray(targetMuscles) ? targetMuscles : [targetMuscles]),
        createdBy: req.user._id,
        assignedTo: req.user._id,
        exercises: planData.exercises || [],
      });
    }

    await logAIAction(
      req.user?._id,
      "workout_generator",
      prompt,
      aiResult.raw,
      aiResult.data,
      aiResult.model
    );

    res.json({
      success: true,
      model: aiResult.model,
      workoutPlan: aiResult.data,
      savedToDatabase: !!savedPlan,
      databaseRecord: savedPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate structured workout plan.",
    });
  }
};

// @desc    Generate Structured Meal Plan (JSON) + Optional Direct DB Save
// @route   POST /api/ai/meal
// @access  Private
const generateStructuredMealPlan = async (req, res) => {
  try {
    const {
      goal = "Maintenance", // Bulking, Cutting, Maintenance
      targetCalories = 2500,
      dietaryPreference = "High-Protein Clean Intake",
      allergies = "None",
      saveToDB = false,
      model,
    } = req.body;

    const prompt = `Design a high-precision daily nutrition and meal plan.
Goal: ${goal}
Target Calories: ${targetCalories} kcal
Dietary Preference: ${dietaryPreference}
Allergies/Restrictions: ${allergies}

You MUST return a raw JSON object matching EXACTLY this structure:
{
  "title": "Descriptive title for meal plan",
  "goal": "Bulking or Cutting or Maintenance",
  "calories": 2500,
  "proteinGrams": 190,
  "carbsGrams": 260,
  "fatsGrams": 70,
  "meals": [
    {
      "time": "08:00 AM",
      "name": "Breakfast - Meal Name",
      "items": ["Item 1 with quantity", "Item 2 with quantity"]
    }
  ]
}`;

    const aiResult = await queryOpenRouterJSON(prompt, {
      systemPrompt: "You are FORGED FitAI, a top sports nutritionist. Produce precise structured meal plan JSON.",
      model,
    });

    let savedMealPlan = null;
    if (saveToDB && req.user?._id) {
      const mealData = aiResult.data;
      // Map goal to valid enum
      let validGoal = "Maintenance";
      if (mealData.goal && ["Bulking", "Cutting", "Maintenance"].includes(mealData.goal)) {
        validGoal = mealData.goal;
      } else if (["Bulking", "Cutting", "Maintenance"].includes(goal)) {
        validGoal = goal;
      }

      savedMealPlan = await MealPlan.create({
        title: mealData.title || `${validGoal} Nutrition Plan`,
        goal: validGoal,
        calories: mealData.calories || targetCalories,
        proteinGrams: mealData.proteinGrams || 180,
        carbsGrams: mealData.carbsGrams || 250,
        fatsGrams: mealData.fatsGrams || 70,
        createdBy: req.user._id,
        assignedTo: req.user._id,
        meals: mealData.meals || [],
      });
    }

    await logAIAction(
      req.user?._id,
      "meal_generator",
      prompt,
      aiResult.raw,
      aiResult.data,
      aiResult.model
    );

    res.json({
      success: true,
      model: aiResult.model,
      mealPlan: aiResult.data,
      savedToDatabase: !!savedMealPlan,
      databaseRecord: savedMealPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate structured meal plan.",
    });
  }
};

// @desc    AI Food & Macro Estimator
// @route   POST /api/ai/macros
// @access  Private
const estimateMacros = async (req, res) => {
  try {
    const { foodDescription, model } = req.body;

    if (!foodDescription) {
      return res.status(400).json({ success: false, message: "Please provide a food description." });
    }

    const prompt = `Analyze the following food intake description: "${foodDescription}"

Return a raw JSON object with this EXACT schema:
{
  "summary": "Short summary of the meal",
  "estimatedCalories": 650,
  "proteinGrams": 45,
  "carbsGrams": 55,
  "fatsGrams": 22,
  "itemBreakdown": [
    {
      "item": "Name of food item",
      "calories": 200,
      "protein": 20,
      "carbs": 10,
      "fats": 8
    }
  ],
  "nutritionalTip": "Quick nutrition recommendation or macro advice based on this intake."
}`;

    const aiResult = await queryOpenRouterJSON(prompt, {
      systemPrompt: "You are FORGED FitAI Nutrition Analyzer.",
      model,
    });

    await logAIAction(req.user?._id, "macro_estimator", foodDescription, aiResult.raw, aiResult.data, aiResult.model);

    res.json({
      success: true,
      model: aiResult.model,
      macros: aiResult.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to estimate macros.",
    });
  }
};

// @desc    AI Exercise Form & Technique Advisor
// @route   POST /api/ai/form-advisor
// @access  Private
const adviseFormAndTechnique = async (req, res) => {
  try {
    const { exercise, userIssue, experienceLevel = "Intermediate", model } = req.body;

    if (!exercise) {
      return res.status(400).json({ success: false, message: "Please specify an exercise." });
    }

    const prompt = `Provide biomechanical form guidance for: '${exercise}'.
User reported issue or goal: '${userIssue || "Optimizing execution and preventing injury"}'.
Experience Level: ${experienceLevel}.

Return a raw JSON object with this EXACT structure:
{
  "exercise": "${exercise}",
  "primaryMusclesWorked": ["List of target muscles"],
  "keySetupCues": ["Step 1 setup cue", "Step 2 setup cue", "Step 3 setup cue"],
  "executionCues": ["Execution cue 1", "Execution cue 2"],
  "commonPitfallsToAvoid": ["Mistake 1", "Mistake 2"],
  "jointSafetyAdvice": "Detailed joint alignment & injury prevention tip.",
  "recommendedAlternatives": ["Alternative Exercise 1", "Alternative Exercise 2"]
}`;

    const aiResult = await queryOpenRouterJSON(prompt, {
      systemPrompt: "You are FORGED FitAI Biomechanics Specialist.",
      model,
    });

    await logAIAction(req.user?._id, "form_advisor", `${exercise} - ${userIssue}`, aiResult.raw, aiResult.data, aiResult.model);

    res.json({
      success: true,
      model: aiResult.model,
      advice: aiResult.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate technique advice.",
    });
  }
};

// @desc    AI Progress Analyzer & Daily Coach Insights
// @route   POST /api/ai/insights
// @access  Private
const generateProgressInsights = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found." });
    }

    // Fetch user's assigned active plans
    const recentWorkout = await WorkoutPlan.findOne({ assignedTo: user._id }).sort({ createdAt: -1 });
    const recentMeal = await MealPlan.findOne({ assignedTo: user._id }).sort({ createdAt: -1 });

    const prompt = `Analyze athlete profile:
Name: ${user.name}
Current Weight: ${user.weightLbs} lbs
Target Weight: ${user.targetWeightLbs} lbs
Body Fat: ${user.bodyFatPercent}%
Membership Status: ${user.membershipTier}
Active Workout Plan: ${recentWorkout ? recentWorkout.title : "None Assigned"}
Active Meal Plan: ${recentMeal ? recentMeal.title : "None Assigned"}

Generate a customized, motivating daily fitness insight report.

Return a raw JSON object with this schema:
{
  "greeting": "High energy greeting message",
  "progressAssessment": "Brief evaluation of current weight vs target weight trajectory",
  "keyFocusAreaToday": "Specific recommendation for today's training or recovery",
  "nutritionTip": "Targeted advice matching their current goal",
  "motivationQuote": "Powerful strength & conditioning quote"
}`;

    const aiResult = await queryOpenRouterJSON(prompt, {
      systemPrompt: "You are FORGED FitAI Head Coach.",
      model: req.body.model,
    });

    await logAIAction(user._id, "progress_insights", "User DB Progress Analysis", aiResult.raw, aiResult.data, aiResult.model);

    res.json({
      success: true,
      model: aiResult.model,
      insights: aiResult.data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate progress insights.",
    });
  }
};

// @desc    Admin AI Content Generator (Blogs, Newsletters, Motivation)
// @route   POST /api/ai/admin-content
// @access  Private (Admin/Trainer)
const generateAdminContent = async (req, res) => {
  try {
    const { topic, contentType = "blog", targetAudience = "Gym Members", model } = req.body;

    if (!topic) {
      return res.status(400).json({ success: false, message: "Topic is required." });
    }

    const prompt = `Create a high-impact ${contentType} piece for FORGED Athletic Gym.
Topic: "${topic}"
Target Audience: "${targetAudience}"

Include a compelling title, engaging introduction, actionable body sections, and a motivational call-to-action signature.`;

    const aiResult = await queryOpenRouterAI(prompt, {
      systemPrompt: "You are FORGED FitAI Chief Marketing Content Creator for an elite gym.",
      model,
    });

    await logAIAction(req.user?._id, "admin_generator", `${contentType} - ${topic}`, aiResult.content, null, aiResult.model);

    res.json({
      success: true,
      model: aiResult.model,
      content: aiResult.content,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to generate admin content.",
    });
  }
};

// @desc    Get User's AI Chat & Interaction History
// @route   GET /api/ai/history
// @access  Private
const getAIChatHistory = async (req, res) => {
  try {
    const logs = await AIChatLog.find({ user: req.user._id })
      .sort({ createdAt: -1 })
      .limit(30);

    res.json({
      success: true,
      count: logs.length,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to fetch AI history.",
    });
  }
};

// @desc    Clear User's AI Chat History
// @route   DELETE /api/ai/history
// @access  Private
const clearAIChatHistory = async (req, res) => {
  try {
    await AIChatLog.deleteMany({ user: req.user._id });

    res.json({
      success: true,
      message: "AI conversation history cleared successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message || "Failed to clear AI history.",
    });
  }
};

module.exports = {
  generateAIFitnessPlan,
  generateStructuredWorkout,
  generateStructuredMealPlan,
  estimateMacros,
  adviseFormAndTechnique,
  generateProgressInsights,
  generateAdminContent,
  getAIChatHistory,
  clearAIChatHistory,
};
