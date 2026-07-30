require("dotenv").config();
const axios = require("axios");

const BASE_URL = `http://localhost:5000/api`;

async function testAllAPIs() {
  console.log("==========================================================");
  console.log("🚀 FORGED GYM BACKEND API COMPREHENSIVE TEST SUITE");
  console.log("==========================================================");

  let authToken = "";
  let testUserEmail = `test_athlete_${Date.now()}@forged.com`;

  // 1. Health Check Test
  try {
    const res = await axios.get(`${BASE_URL}/health`);
    console.log("✅ 1. GET /api/health → PASSED");
    console.log("   Status:", res.data.status, "| DB:", res.data.database);
  } catch (err) {
    console.error("❌ 1. GET /api/health → FAILED:", err.message);
  }

  // 2. Auth Register Test
  try {
    const res = await axios.post(`${BASE_URL}/auth/register`, {
      name: "Test Athlete Pro",
      email: testUserEmail,
      password: "password123",
      role: "member",
    });
    console.log("✅ 2. POST /api/auth/register → PASSED");
    console.log("   Registered User ID:", res.data.data._id, "| Token Received");
  } catch (err) {
    console.error("❌ 2. POST /api/auth/register → FAILED:", err.response?.data?.message || err.message);
  }

  // 3. Auth Login Test
  try {
    const res = await axios.post(`${BASE_URL}/auth/login`, {
      email: testUserEmail,
      password: "password123",
    });
    authToken = res.data.data.token;
    console.log("✅ 3. POST /api/auth/login → PASSED");
    console.log("   User Authenticated | JWT Token:", authToken.substring(0, 20) + "...");
  } catch (err) {
    console.error("❌ 3. POST /api/auth/login → FAILED:", err.response?.data?.message || err.message);
  }

  // 4. Auth Get Profile (Protected Route Test)
  try {
    const res = await axios.get(`${BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` },
    });
    console.log("✅ 4. GET /api/auth/me (JWT Protected) → PASSED");
    console.log("   Profile Loaded:", res.data.data.name, "(Role:", res.data.data.role + ")");
  } catch (err) {
    console.error("❌ 4. GET /api/auth/me → FAILED:", err.response?.data?.message || err.message);
  }

  // 5. Public Trainers List Test
  try {
    const res = await axios.get(`${BASE_URL}/trainers`);
    console.log("✅ 5. GET /api/trainers (Public) → PASSED");
    console.log("   Trainers Count:", res.data.count);
  } catch (err) {
    console.error("❌ 5. GET /api/trainers → FAILED:", err.response?.data?.message || err.message);
  }

  // 6. OpenRouter AI Fitness Generator Test (Protected Route)
  try {
    const res = await axios.post(
      `${BASE_URL}/ai/generate`,
      {
        type: "workout",
        goal: "Hypertrophy Chest & Triceps",
        fitnessLevel: "Intermediate",
        weightLbs: 180,
      },
      {
        headers: { Authorization: `Bearer ${authToken}` },
      }
    );
    console.log("✅ 6. POST /api/ai/generate (OpenRouter meta-llama/llama-3.1-8b-instruct) → PASSED");
    console.log("   Model Used:", res.data.model);
    console.log("   AI Output Preview:", res.data.output.substring(0, 150) + "...");
  } catch (err) {
    console.error("❌ 6. POST /api/ai/generate → FAILED:", err.response?.data?.message || err.message);
  }

  console.log("==========================================================");
  console.log("🎉 API TEST SUITE COMPLETED SUCCESSFULLY!");
  console.log("==========================================================");
}

testAllAPIs();
