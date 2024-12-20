import { GoogleGenerativeAI } from "@google/generative-ai";
import "jsr:@std/dotenv/load";

if (import.meta.main) {
  const genAi = new GoogleGenerativeAI(
    Deno.env.get("GOOGLE_GEMINI_API_KEY") || ""
  );

  const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt = "What's Deno js";
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}
