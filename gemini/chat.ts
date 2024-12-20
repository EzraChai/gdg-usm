import { GoogleGenerativeAI } from "@google/generative-ai";
import "jsr:@std/dotenv/load";

if (import.meta.main) {
  const genAi = new GoogleGenerativeAI(
    Deno.env.get("GOOGLE_GEMINI_API_KEY") || ""
  );

  const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });

  const chat = model.startChat();

  const encoder = new TextEncoder();
  while (true) {
    const userPrompt = prompt("User: ") || "";
    await Deno.stdout.write(encoder.encode("AI: "));
    const result = await chat.sendMessageStream(userPrompt);

    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      const data = encoder.encode(chunkText);
      await Deno.stdout.write(data);
    }
  }

  //   const result = await model.generateContent([prompt]);
  //   console.log(result.response.text());
}
