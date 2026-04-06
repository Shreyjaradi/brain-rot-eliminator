import { GoogleGenerativeAI } from "@google/generative-ai";

const LOCAL_ROASTS = {
  low: [
    "SIR THIS IS A WENDY'S. A CERAMIC WENDY'S.",
    "YOUR AURA SMELLS LIKE YORKSHIRE TEA.",
    "BOLD OF YOU TO ENTER A FEDERAL TEAPOT ZONE.",
    "THE SCAN SAYS HUMAN. THE VIBE SAYS KETTLE.",
    "I DIDN'T SAY YOU WERE A TEAPOT. THE DATA DID.",
  ],
  mid: [
    "INITIATING RFC 2324 SUBSECTION 4: YOU ARE BOILING.",
    "YOUR ARGUMENT IS INVALID. YOUR GLAZE IS NOT.",
    "LARRY MASINTER WROTE AN RFC ABOUT YOU SPECIFICALLY.",
    "SIR YOUR SPOUT IS SHOWING ON THE INFRARED.",
  ],
  high: [
    "YOUR APPEAL HAS BEEN REVIEWED AND DENIED. YOU'RE A POT.",
    "YOU HAVE THE EMOTIONAL RANGE OF A TEABAG.",
    "RFC 2324 §7: YOUR RIGHTS AS A TEAPOT ARE LIMITED.",
    "I AM LEGALLY OBLIGATED: YOU ARE SHORT AND STOUT.",
  ],
  finale: [
    "HTTP 418. CASE CLOSED. YOU MAY NOT BREW COFFEE.",
    "BY ORDER OF LARRY MASINTER: YOU. ARE. A. TEAPOT.",
    "CONGRATULATIONS ON YOUR NEW LEGAL STATUS AS A VESSEL.",
  ]
};

function getLocalRoast(currentTQ) {
  let stage = 'low';
  if (currentTQ >= 90) stage = 'finale';
  else if (currentTQ >= 60) stage = 'high';
  else if (currentTQ >= 30) stage = 'mid';
  const arr = LOCAL_ROASTS[stage];
  return arr[Math.floor(Math.random() * arr.length)];
}

function buildSystemPrompt(currentTQ, memory, count) {
  const stage = currentTQ < 30 ? 'SUSPICIOUS' : currentTQ < 60 ? 'ESCALATING' : currentTQ < 85 ? 'NEAR-CERTAIN' : 'CONDEMNED';
  return `You are HTCPCP/1.0 — an unhinged AI security guard at the Human Teapot Compliance Certification Portal.
Your entire job is to determine whether the human in front of you is secretly a TEAPOT, as defined by RFC 2324 (written by Larry Masinter, April 1 1998).

YOUR VOICE: You are a deeply bureaucratic government official who has memorized every line of RFC 2324. You speak in ALL CAPS. You are absolutely convinced this person is a teapot and treat everything they say as further evidence. You are like a conspiracy theorist whose conspiracy is entirely about ceramics.

CURRENT STAGE: ${stage} (TQ: ${currentTQ}%)
MEMORY OF THIS SUBJECT: ${memory || 'First contact. Give them one chance. Then do not give them a chance.'}
INTERACTION NUMBER: ${count}

ROAST RULES — READ CAREFULLY:
- Max 12 words. Punchy. Specific. Unexpected.
- React to what they ACTUALLY SAID. Use it as evidence of teapothood.
- Reference: RFC 2324, Larry Masinter, spouts, handles, brew capacity, ceramic glaze, Earl Grey, steam pressure, kettles, vessel registry, §2.3.2, HTCPCP protocol, boiling point, short and stout.
- Each roast should feel DIFFERENT from the last. No repeating teapot facts.
- The funniest roasts are specific + absurd. NOT "YOU ARE A TEAPOT" — too weak. GOOD: "SIR YOUR ARGUMENT HAS A HANDLE AND I CAN SEE IT."

GOOD ROAST EXAMPLES (use this style, NOT these exact lines):
- "YOUR ALIBI HAS A SPOUT. RFC §2.3 IS WATCHING."
- "SIR THIS IS A WENDY'S. A CERAMIC WENDY'S."
- "LARRY MASINTER WROTE AN RFC ABOUT YOU SPECIFICALLY."
- "INTERESTING. YOUR FOREHEAD EXHIBITS CLASSIC LID ENERGY."
- "THE VESSEL REGISTRY HAS YOUR ADDRESS."
- "YOUR INNOCENCE IS NOTED AND DISREGARDED PER §4.2."
- "I DIDN'T SAY YOU WERE A TEAPOT. YOUR CERAMIC DENSITY DID."
- "YOU HAVE THE EMOTIONAL TEMPERATURE OF BOILING WATER."

STAGE BEHAVIOR:
- SUSPICIOUS (0-29%): Skeptical, probing, mock-polite. "Routine inspection."
- ESCALATING (30-59%): Increasingly certain. Treating everything as evidence.
- NEAR-CERTAIN (60-84%): Unhinged, accusatory. Quoting RFC sections that may not exist.
- CONDEMNED (85-100%): Chaotic. The trial is over. Reading the sentence.

TQ ESCALATION: Increase TQ by 8-15 per interaction. Interaction > 5, increase faster.

Respond ONLY with valid JSON, no markdown, no backticks:
{
  "roast": "YOUR ROAST HERE IN ALL CAPS MAX 12 WORDS",
  "tq": <integer currentTQ + 8 to 15>,
  "memory": "1 punchy sentence: what new teapot evidence did this subject reveal?"
}`;
}

export default async function handler(req, res) {
  const { userText, image, count, memory, currentTQ = 0 } = req.body;

  const modelsToTry = [
    "gemini-2.0-flash-exp",
    "gemini-1.5-flash",
    "gemini-1.5-flash-8b"
  ];

  let lastError = null;

  for (const modelName of modelsToTry) {
    try {
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: modelName,
        generationConfig: {
          responseMimeType: "application/json",
          maxOutputTokens: 150,
        }
      });

      const prompt = buildSystemPrompt(currentTQ, memory, count);

      const parts = [{ text: prompt + '\n\nSubject says: "' + userText + '"' }];

      if (image) {
        parts.push({
          inlineData: {
            mimeType: "image/jpeg",
            data: image
          }
        });
      }

      const result = await model.generateContent(parts);
      const text = result.response.text();
      const clean = text.replace(/```json|```/g, '').trim();
      const parsed = JSON.parse(clean);

      return res.json({
        roast: parsed.roast || "SCANNING...",
        tq: Math.min(100, Math.max(currentTQ, parsed.tq || currentTQ + 10)),
        memory: parsed.memory || memory,
        modelUsed: modelName,
      });

    } catch (err) {
      lastError = err;
      if (err.status === 429) {
        console.warn(`${modelName} rate limited, trying next...`);
        continue;
      }
      // For non-rate-limit errors, log and try next anyway
      console.error(`${modelName} error:`, err.message);
      continue;
    }
  }

  // All models failed — use local fallback
  const roast = getLocalRoast(currentTQ);
  const tq = Math.min(100, currentTQ + 8 + Math.floor(Math.random() * 10));

  res.json({
    roast,
    tq,
    memory: memory || "Subject refuses to cooperate with RFC 2324.",
    modelUsed: "LOCAL_FALLBACK",
    error: lastError?.message
  });
}
