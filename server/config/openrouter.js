const axios = require("axios");

/**
 * Professional OpenRouter API Client
 * Supports models like 'meta-llama/llama-3.1-8b-instruct'
 *
 * @param {string|Array} messages - Single prompt string or OpenAI-compatible messages array
 * @param {Object} options - Custom parameters (temperature, max_tokens, top_p, etc.)
 */
const queryOpenRouterAI = async (messages, options = {}) => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey || apiKey.includes("your_openrouter_api_key")) {
    throw new Error("OpenRouter API key is missing. Please configure OPENROUTER_API_KEY in server/.env");
  }

  const model = options.model || process.env.OPENROUTER_MODEL || "meta-llama/llama-3.1-8b-instruct";

  // Format messages if passed as a simple prompt string
  const formattedMessages = typeof messages === "string"
    ? [
        {
          role: "system",
          content: options.systemPrompt || "You are FORGED FitAI, an elite strength & conditioning coach and sports nutritionist.",
        },
        {
          role: "user",
          content: messages,
        },
      ]
    : messages;

  const payload = {
    model: model,
    messages: formattedMessages,
    temperature: options.temperature ?? 0.7,
    max_tokens: options.max_tokens ?? 1200,
    top_p: options.top_p ?? 1,
    frequency_penalty: options.frequency_penalty ?? 0,
    presence_penalty: options.presence_penalty ?? 0,
    repetition_penalty: options.repetition_penalty ?? 1,
  };

  try {
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", payload, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:3000",
        "X-Title": "FORGED Athletic Gym Application",
      },
      timeout: 25000, // 25 seconds timeout
    });

    const aiMessage = response.data?.choices?.[0]?.message?.content;
    if (!aiMessage) {
      throw new Error("Invalid or empty response format from OpenRouter API.");
    }

    return {
      success: true,
      model: response.data?.model || model,
      content: aiMessage,
      usage: response.data?.usage || null,
    };
  } catch (error) {
    const errorDetails = error.response?.data?.error?.message || error.message;
    console.error(`[OpenRouter AI Error] Model: ${model} | Error: ${errorDetails}`);
    throw new Error(`OpenRouter API Request Failed: ${errorDetails}`);
  }
};

module.exports = { queryOpenRouterAI };
