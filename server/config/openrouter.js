const axios = require("axios");

/**
 * Professional OpenRouter API Client
 * Supports models like 'meta-llama/llama-3.1-8b-instruct', 'google/gemini-2.0-flash-lite-001', etc.
 *
 * @param {string|Array} messages - Single prompt string or OpenAI-compatible messages array
 * @param {Object} options - Custom parameters (temperature, max_tokens, systemPrompt, model, etc.)
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
    max_tokens: options.max_tokens ?? 2000,
    top_p: options.top_p ?? 1,
    frequency_penalty: options.frequency_penalty ?? 0,
    presence_penalty: options.presence_penalty ?? 0,
  };

  try {
    const response = await axios.post("https://openrouter.ai/api/v1/chat/completions", payload, {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": process.env.FRONTEND_URL || "http://localhost:3000",
        "X-Title": "FORGED Athletic Gym Application",
      },
      timeout: 30000, // 30 seconds timeout
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

/**
 * Clean and parse JSON from LLM output (handles markdown code blocks like ```json ... ```)
 * @param {string} rawContent 
 */
const cleanAndParseJSON = (rawContent) => {
  if (!rawContent) throw new Error("Empty AI response received.");
  
  let cleaned = rawContent.trim();
  // Strip markdown code fences if present
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
  }
  
  // Find first { or [ and last } or ]
  const firstBrace = cleaned.search(/[\{\[]/);
  const lastBrace = Math.max(cleaned.lastIndexOf("}"), cleaned.lastIndexOf("]"));

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    cleaned = cleaned.substring(firstBrace, lastBrace + 1);
  }

  // Attempt 1: Standard JSON parse
  try {
    return JSON.parse(cleaned);
  } catch (err1) {
    // Attempt 2: Sanitize control chars, unescaped line breaks inside strings & trailing commas
    try {
      const sanitized = cleaned
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, " ")
        .replace(/,\s*([\}\]])/g, "$1");
      return JSON.parse(sanitized);
    } catch (err2) {
      console.error("[JSON Parsing Failed] Raw Output:\n", rawContent);
      throw new Error(`Failed to parse structured JSON from AI output: ${err1.message}`);
    }
  }
};

/**
 * Query OpenRouter AI with guaranteed JSON output parsing & automatic 1-step retry
 */
const queryOpenRouterJSON = async (messages, options = {}) => {
  const jsonSystemPrompt = `${options.systemPrompt || "You are FORGED FitAI, an elite fitness AI assistant."}\nIMPORTANT: You must ONLY reply with valid raw JSON format. Ensure all strings use proper double-quote escaping. Do NOT include markdown code blocks or commentary.`;

  try {
    const result = await queryOpenRouterAI(messages, {
      ...options,
      systemPrompt: jsonSystemPrompt,
      temperature: options.temperature ?? 0.2,
    });

    const parsedData = cleanAndParseJSON(result.content);

    return {
      success: true,
      model: result.model,
      data: parsedData,
      raw: result.content,
      usage: result.usage,
    };
  } catch (err) {
    console.warn(`[JSON Query Warning] First attempt failed (${err.message}). Retrying with fallback temperature 0.1...`);
    // Retry once with lower temperature
    const retryResult = await queryOpenRouterAI(messages, {
      ...options,
      systemPrompt: jsonSystemPrompt,
      temperature: 0.1,
    });

    const parsedData = cleanAndParseJSON(retryResult.content);

    return {
      success: true,
      model: retryResult.model,
      data: parsedData,
      raw: retryResult.content,
      usage: retryResult.usage,
    };
  }
};

module.exports = {
  queryOpenRouterAI,
  queryOpenRouterJSON,
  cleanAndParseJSON,
};
