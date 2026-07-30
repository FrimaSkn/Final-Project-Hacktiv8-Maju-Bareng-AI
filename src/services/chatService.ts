import { getGenAI, MODEL } from "../config/genai.js";
import buildSystemPrompt from "../prompts/systemPrompt.js";
import responseSchema from "../utils/responseSchema.js";
import { detectCrisisKeywords } from "./safetyService.js";

interface GeminiParsedResponse {
  reply: string;
  dichotomy_table?: { internal: string[]; external: string[] } | null;
  crisis_flag?: boolean;
}

interface ChatResult {
  reply: string;
  dichotomy_table: { internal: string[]; external: string[] } | null;
  crisis_flag: boolean;
}

const CRISIS_REPLY =
  "I hear you, and your feelings are valid. But this situation needs direct help from a professional. " +
  "Please contact 119 ext 8 (Ministry of Health) or your local crisis service. You are not alone.";

export async function handleChat(message: string): Promise<ChatResult> {
  const keywordCrisis = detectCrisisKeywords(message);
  const ai = getGenAI();

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [{ role: "user", parts: [{ text: message }] }],
    config: {
      systemInstruction: buildSystemPrompt(),
      responseMimeType: "application/json",
      responseSchema: responseSchema,
    },
  });

  const parsed: GeminiParsedResponse = JSON.parse(response.text ?? "{}");
  const modelCrisis = parsed.crisis_flag === true;

  if (keywordCrisis || modelCrisis) {
    return {
      reply: modelCrisis ? parsed.reply : CRISIS_REPLY,
      dichotomy_table: null,
      crisis_flag: true,
    };
  }

  return {
    reply: parsed.reply,
    dichotomy_table: parsed.dichotomy_table || null,
    crisis_flag: false,
  };
}
