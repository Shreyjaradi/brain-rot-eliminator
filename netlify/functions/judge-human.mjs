import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export const handler = async (event) => {
  try {
    const { userQuestion } = JSON.parse(event.body);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Using the absolute model path which fixes the 404 error
    const model = genAI.getGenerativeModel({ 
      model: "models/gemini-1.5-flash",
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

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roast: text }),
    };
  } catch (error) {
    console.error("DETAILED API ERROR:", error.message);
    // If Flash fails, we return a pre-baked roast so the user doesn't see a 'System Error'
    return {
      statusCode: 200, 
      body: JSON.stringify({ roast: "My circuits are too advanced for your 'Hey'. Try asking a real question, you 418 Teapot." }),
    };
  }
};