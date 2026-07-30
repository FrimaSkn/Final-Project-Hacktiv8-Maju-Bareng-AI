import { getGenAI, MODEL } from "../config/genai.js";
import responseSchema from "../utils/responseSchema.js";

interface GeminiParsedResponse {
  reply: string;
  dichotomy_table?: { internal: string[]; external: string[] } | null;
  crisis_flag?: boolean;
}

interface DichotomyResult {
  reply: string;
  dichotomy_table: { internal: string[]; external: string[] } | null;
  crisis_flag: boolean;
}

const DICHOTOMY_PROMPT = `
You are ${process.env.BOT_PERSONA_NAME || "Marcus"}, a virtual perspective counselor.
The user provides one problem. Map their Internal/External Dichotomy of Control.
Reply with ONE short opening sentence, then fill in dichotomy_table. Don't be verbose.
`;

export async function analyzeProblem(
  problem: string,
  history: Array<{ role: string; parts: [{ text: string }] }> = []
): Promise<DichotomyResult> {
  const ai = getGenAI();

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      ...history,
      { role: "user", parts: [{ text: problem }] },
    ],
    config: {
      systemInstruction: DICHOTOMY_PROMPT,
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    },
  });

  const parsed: GeminiParsedResponse = JSON.parse(response.text ?? "{}");
  return {
    reply: parsed.reply,
    dichotomy_table: parsed.dichotomy_table || null,
    crisis_flag: parsed.crisis_flag || false,
  };
}
