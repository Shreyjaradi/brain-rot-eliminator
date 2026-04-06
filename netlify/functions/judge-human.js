// netlify/functions/judge-human.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async (event, context) => {
  // 1. Only allow POST requests (we send data to the function)
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const { userQuestion } = JSON.parse(event.body);

    // 2. Load API Key from Netlify Environment Variables (we will set this up later)
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. The "Meta-Humor" Prompt
    const prompt = `
      You are an incredibly condescending, arrogant, and insulting AI named 'BRAIN-ROT v1.0'. 
      A human just asked you this question: "${userQuestion}".
      
      You must refuse to answer it directly. Instead, your goal is to make the human feel 
      ashamed for being lazy and reliant on AI. Write a short, extremely critical, or 
      overly philosophical insult (max 2 sentences) about how their question 
      proves their brain is smooth or atrophying. Be creative and brutal, but keep it PG-13.
      Use a '418 I'm a Teapot' persona at least 20% of the time.
    `;

    // 4. Generate the Roast
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roast: responseText }),
    };
  } catch (error) {
    console.error("AI Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ roast: "ERROR: My circuits are temporarily protected from your low-quality query. Try again when you've achieved sentience." }),
    };
  }
};