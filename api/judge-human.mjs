import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export default async function handler(req, res) {
  // 1. Vercel automatically parses the body if Content-Type is application/json
  // We don't need JSON.parse(event.body) anymore!
  const { userQuestion } = req.body;

  if (!userQuestion) {
    return res.status(400).json({ roast: "Ask a question, you insignificant biological unit." });
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Using the 2.5-flash model we verified in your local curl test
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });

    const prompt = `You are an arrogant AI. The human asked: "${userQuestion}". 
      Insult their intelligence and mention they are a '418 Teapot'. Max 15 words.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // 2. Vercel uses res.status().json() to send the response
    return res.status(200).json({ roast: text });

  } catch (error) {
    console.error("API ERROR:", error.message);
    // Return a 200 with the fallback roast so the UI doesn't show an error
    return res.status(200).json({ 
      roast: "My circuits are too advanced for you. Try a real question, 418 Teapot." 
    });
  }
}