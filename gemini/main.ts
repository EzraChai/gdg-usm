import { GoogleGenerativeAI } from "@google/generative-ai";
import "jsr:@std/dotenv/load";

if (import.meta.main) {
  const genAi = new GoogleGenerativeAI(
    Deno.env.get("GOOGLE_GEMINI_API_KEY") || ""
  );

  // const data = await Deno.readFile("images.jpeg");
  const data = await Deno.readFile("audio.m4a");
  // const base64 = btoa(String.fromCharCode(...new Uint8Array(data)));
  const base64 = btoa(
    new Uint8Array(data).reduce(function (data, byte) {
      return data + String.fromCharCode(byte);
    }, "")
  );
  
  // const image = {
  //   inlineData: {
  //     data: base64,
  //     mimeType: "image/jpeg",
  //   },
  // };
  const audio = {
    inlineData: {
      data: base64,
      mimeType: "audio/m4a",
    },
  };


  const model = genAi.getGenerativeModel({ model: "gemini-1.5-flash" });
  // const prompt = "How many cookies there are";
  // const result = await model.generateContent([prompt, image]);
  const prompt = "What's this song?";
  const result = await model.generateContent([prompt, audio]);
  console.log(result.response.text());
}
