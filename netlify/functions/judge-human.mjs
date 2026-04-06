import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export const handler = async (event) => {
  try {
    const { userQuestion } = JSON.parse(event.body);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    
    // Use the newer model name and add safety settings
    const model = genAI.getGenerativeModel({ 
      model: "models/gemini-1.5-flash",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_NONE,
        },
      ],
    });

    const prompt = `Context: This is a joke app for a 'Useless AI' challenge. 
      The user asked: "${userQuestion}". 
      Task: Give a short, funny, arrogant insult about their intelligence. 
      Mention they are a '418 Teapot'. Max 15 words.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roast: text }),
    };
  } catch (error) {
    console.error("API ERROR:", error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ roast: "My circuits are protected from your boring query." }),
    };
  }
};