require("dotenv").config();
const { queryOpenRouterAI } = require("./config/openrouter");

async function testOpenRouter() {
  console.log("---------------------------------------------------");
  console.log("⚡ TESTING OPENROUTER AI INTEGRATION");
  console.log("Model:", process.env.OPENROUTER_MODEL || "meta-llama/llama-3.1-8b-instruct");
  console.log("---------------------------------------------------");

  try {
    const result = await queryOpenRouterAI("Give me a 3-step high-energy motivation quote for an elite gym athlete.", {
      model: "meta-llama/llama-3.1-8b-instruct",
      temperature: 0.7,
    });

    console.log("✅ OPENROUTER API RESPONSE SUCCESSFUL!");
    console.log("Model Used:", result.model);
    console.log("AI Generated Content:\n");
    console.log(result.content);
    console.log("---------------------------------------------------");
  } catch (error) {
    console.error("❌ OPENROUTER API TEST FAILED:", error.message);
  }
}

testOpenRouter();
