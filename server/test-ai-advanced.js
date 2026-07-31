require("dotenv").config({ path: __dirname + "/.env" });
const axios = require("axios");

const BASE_URL = "http://localhost:5000/api";

async function runAdvancedAITests() {
  console.log("=================================================================");
  console.log("⚡ TESTING FORGED GYM ADVANCED BACKEND AI SYSTEM");
  console.log("=================================================================");

  // Ensure server is running or start Express server in process
  try {
    await axios.get(`${BASE_URL}/health`, { timeout: 2000 });
    console.log("ℹ️ Express server is already online at port 5000.");
  } catch (err) {
    console.log("🚀 Launching Express backend server instance for testing...");
    require("./server");
    // Wait 3 seconds for DB & Server to boot
    await new Promise((resolve) => setTimeout(resolve, 3500));
  }

  let authToken = "";
  const testEmail = `ai_tester_${Date.now()}@forgedgym.com`;

  // 1. Authenticate / Register Test User
  try {
    const regRes = await axios.post(`${BASE_URL}/auth/register`, {
      name: "AI Athlete Test User",
      email: testEmail,
      password: "Password123!",
      role: "admin", // set as admin to test admin-content as well
    });
    authToken = regRes.data.data.token;
    console.log("✅ 1. AUTH REGISTER SUCCESS → Token acquired!");
  } catch (err) {
    console.error("❌ Auth Setup Failed:", err.response?.data?.message || err.message);
    process.exit(1);
  }

  const authHeaders = { Authorization: `Bearer ${authToken}` };

  // 2. Test Base AI Generation
  try {
    const res = await axios.post(
      `${BASE_URL}/ai/generate`,
      { userPrompt: "Give me 2 key principles of progressive overload." },
      { headers: authHeaders }
    );
    console.log("✅ 2. POST /api/ai/generate → SUCCESS!");
    console.log("   Model:", res.data.model);
    console.log("   Preview:", res.data.output.substring(0, 100).replace(/\n/g, " ") + "...");
  } catch (err) {
    console.error("❌ 2. POST /api/ai/generate FAILED:", err.response?.data?.message || err.message);
  }

  // 3. Test Structured Workout Plan Generator (+ Save to DB)
  try {
    const res = await axios.post(
      `${BASE_URL}/ai/workout`,
      {
        goal: "Hypertrophy Chest & Triceps",
        fitnessLevel: "Intermediate",
        targetMuscles: ["Chest", "Triceps"],
        durationMinutes: 60,
        saveToDB: true,
      },
      { headers: authHeaders }
    );
    console.log("✅ 3. POST /api/ai/workout (Structured JSON + DB Save) → SUCCESS!");
    console.log("   Plan Title:", res.data.workoutPlan?.title);
    console.log("   Saved to DB:", res.data.savedToDatabase ? "YES (ID: " + res.data.databaseRecord?._id + ")" : "NO");
    console.log("   Exercises Count:", res.data.workoutPlan?.exercises?.length);
  } catch (err) {
    console.error("❌ 3. POST /api/ai/workout FAILED:", err.response?.data?.message || err.message);
  }

  // 4. Test Structured Meal Plan Generator (+ Save to DB)
  try {
    const res = await axios.post(
      `${BASE_URL}/ai/meal`,
      {
        goal: "Bulking",
        targetCalories: 2900,
        dietaryPreference: "High-Protein Clean Intake",
        saveToDB: true,
      },
      { headers: authHeaders }
    );
    console.log("✅ 4. POST /api/ai/meal (Structured JSON + DB Save) → SUCCESS!");
    console.log("   Meal Title:", res.data.mealPlan?.title);
    console.log("   Calories:", res.data.mealPlan?.calories, "kcal | Protein:", res.data.mealPlan?.proteinGrams, "g");
    console.log("   Saved to DB:", res.data.savedToDatabase ? "YES (ID: " + res.data.databaseRecord?._id + ")" : "NO");
  } catch (err) {
    console.error("❌ 4. POST /api/ai/meal FAILED:", err.response?.data?.message || err.message);
  }

  // 5. Test Food Intake & Macro Estimator
  try {
    const res = await axios.post(
      `${BASE_URL}/ai/macros`,
      { foodDescription: "3 boiled eggs, 1 cup cooked oatmeal, 1 banana, 30g almonds" },
      { headers: authHeaders }
    );
    console.log("✅ 5. POST /api/ai/macros (Macro Estimator) → SUCCESS!");
    console.log("   Est Calories:", res.data.macros?.estimatedCalories, "kcal | Protein:", res.data.macros?.proteinGrams, "g");
  } catch (err) {
    console.error("❌ 5. POST /api/ai/macros FAILED:", err.response?.data?.message || err.message);
  }

  // 6. Test Exercise Form & Technique Advisor
  try {
    const res = await axios.post(
      `${BASE_URL}/ai/form-advisor`,
      { exercise: "Conventional Barbell Deadlift", userIssue: "Lower back fatigue" },
      { headers: authHeaders }
    );
    console.log("✅ 6. POST /api/ai/form-advisor (Form Advisor) → SUCCESS!");
    console.log("   Key Setup Cues Count:", res.data.advice?.keySetupCues?.length);
    console.log("   Safety Advice Preview:", res.data.advice?.jointSafetyAdvice?.substring(0, 80) + "...");
  } catch (err) {
    console.error("❌ 6. POST /api/ai/form-advisor FAILED:", err.response?.data?.message || err.message);
  }

  // 7. Test User Progress Insights Analyzer
  try {
    const res = await axios.post(
      `${BASE_URL}/ai/insights`,
      {},
      { headers: authHeaders }
    );
    console.log("✅ 7. POST /api/ai/insights (Progress Insights) → SUCCESS!");
    console.log("   Greeting:", res.data.insights?.greeting);
    console.log("   Focus Area:", res.data.insights?.keyFocusAreaToday);
  } catch (err) {
    console.error("❌ 7. POST /api/ai/insights FAILED:", err.response?.data?.message || err.message);
  }

  // 8. Test Admin Content Generator
  try {
    const res = await axios.post(
      `${BASE_URL}/ai/admin-content`,
      { topic: "Summer Shredding Campaign Launch", contentType: "blog" },
      { headers: authHeaders }
    );
    console.log("✅ 8. POST /api/ai/admin-content (Admin Generator) → SUCCESS!");
    console.log("   Content Length:", res.data.content?.length, "characters");
  } catch (err) {
    console.error("❌ 8. POST /api/ai/admin-content FAILED:", err.response?.data?.message || err.message);
  }

  // 9. Test AI History Retrieval
  try {
    const res = await axios.get(`${BASE_URL}/ai/history`, { headers: authHeaders });
    console.log("✅ 9. GET /api/ai/history (AI Logs History) → SUCCESS!");
    console.log("   Logs Recorded in DB:", res.data.count);
  } catch (err) {
    console.error("❌ 9. GET /api/ai/history FAILED:", err.response?.data?.message || err.message);
  }

  console.log("=================================================================");
  console.log("🎉 ALL ADVANCED BACKEND AI TESTS COMPLETED!");
  console.log("=================================================================");
  process.exit(0);
}

runAdvancedAITests();
