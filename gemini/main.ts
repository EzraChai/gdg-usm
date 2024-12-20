import { GoogleGenerativeAI } from "@google/generative-ai";
import "jsr:@std/dotenv/load";

if (import.meta.main) {
  const genAi = new GoogleGenerativeAI(
    Deno.env.get("GOOGLE_GEMINI_API_KEY") || ""
  );

  const data = await Deno.readFile("images.jpeg");
  const base64 = btoa(String.fromCharCode(...new Uint8Array(data)));
  const image = {
    inlineData: {
      data: base64,
      mimeType: "image/jpeg",
    },
  };

  const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
  const prompt =
    ' How many cookies there are';
  const result = await model.generateContent([prompt, image]);
  console.log(result.response.text());
}
