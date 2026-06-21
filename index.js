import readline from "readline";
import dotenv from "dotenv";
import { getAIResponse } from "./utils/fallback.js";

dotenv.config();

let currentModel = "groq";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("AI Chat Started");
console.log("Commands: /groq /gemini /exit /clear /help\n");

function askUser() {
  rl.question("You: ", async (input) => {
    if (!input.trim()) {
      console.log("Please enter a message.");
      return askUser();
    }

    if (input === "/exit") {
      console.log("Goodbye");
      rl.close();
      return;
    }

    if (input === "/groq") {
      currentModel = "groq";
      console.log("Switched to Groq Model\n");
      return askUser();
    }

    if (input === "/gemini") {
      currentModel = "gemini";
      console.log("Switched to Gemini Model\n");
      return askUser();
    }

    if (input === "/clear") {
      console.clear();
      return askUser();
    }

    if (input === "/help") {
      console.log(`
Commands:
/groq - switch to Groq
/gemini - switch to Gemini
/clear - clear screen
/exit - exit chat
`);
      return askUser();
    }

    try {
      const response = await getAIResponse(input, currentModel);
      console.log(`AI: ${response}\n`);
    } catch (err) {
      console.log("Error getting response\n");
    }

    askUser();
  });
}

askUser();