import { getGenAI, MODEL } from "../config/genai.js";

export async function transcribeAudio(audioData: ArrayBuffer | Buffer, mimeType = "audio/mp3"): Promise<string> {
  const ai = getGenAI();

  let base64Data: string;
  if (typeof Buffer !== "undefined" && audioData instanceof Buffer) {
    base64Data = audioData.toString("base64");
  } else {
    const bytes = new Uint8Array(audioData as ArrayBuffer);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    base64Data = btoa(binary);
  }

  const response = await ai.models.generateContent({
    model: MODEL,
    contents: [
      {
        role: "user",
        parts: [
          {
            inlineData: {
              mimeType,
              data: base64Data,
            },
          },
          {
            text: "Transcribe this audio to text. Return only the transcribed text, nothing else.",
          },
        ],
      },
    ],
  });

  return response.text?.trim() ?? "";
}
