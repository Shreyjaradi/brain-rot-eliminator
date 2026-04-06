import { GoogleGenerativeAI } from "@google/generative-ai";

export const handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { userQuestion } = JSON.parse(event.body);
    // Add a quick log to see if the function even starts
    console.log("Function triggered with input:", event.body);
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("API Key Loaded:", !!process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are 'BRAIN-ROT v1.0', an arrogant AI. 
      A human asked: "${userQuestion}". 
      Refuse to answer and insult their laziness. Mention they are being a '418 Teapot'. Max 2 sentences.`;

    const result = await model.generateContent(prompt);
    const response = await result.response; // Add this line
    const responseText = response.text();   // Use the resolved response

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roast: responseText }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ roast: "ERROR: My circuits are protected from your low-quality query." }),
    };
  }
};