import { askGroq } from "../services/groq.js";
import { askGemini } from "../services/gemini.js";

export async function getAIResponse(prompt, model) {
  try {
    if (model === "groq") {
      return await askGroq(prompt);
    } else {
      return await askGemini(prompt);
    }
  } catch (error) {
    console.log("\nPrimary Model Failed.");
    console.log("Switching to fallback model...\n");

    try {
      if (model === "groq") {
        return await askGemini(prompt);
      } else {
        return await askGroq(prompt);
      }
    } catch (err) {
      return "Both models failed. Please try again later.";
    }
  }
}