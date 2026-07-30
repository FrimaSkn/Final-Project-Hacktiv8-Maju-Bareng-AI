import { GoogleGenAI } from "@google/genai";
require("dotenv").config();

let ai: GoogleGenAI | undefined;

export function getGenAI(): GoogleGenAI {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    ai = new GoogleGenAI({ apiKey });
  }
  return ai;
}

export const MODEL = process.env.GEMINI_MODEL || "gemini-3.5-flash";
