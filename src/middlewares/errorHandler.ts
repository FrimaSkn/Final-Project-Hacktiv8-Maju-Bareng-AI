import { Request, Response, NextFunction } from "express";

function errorHandler(err: Error, _req: Request, res: Response, _next: NextFunction): void {
  const msg = err.message || "";

  if (msg.includes("429") || msg.includes("RESOURCE_EXHAUSTED")) {
    console.error("[ERROR] 429: Gemini API quota exceeded");
    res.status(429).json({ error: "API quota exceeded. Please try again later." });
    return;
  }

  if (msg.includes("400") || msg.includes("INVALID_ARGUMENT")) {
    console.error(`[ERROR] 400: ${msg}`);
    res.status(400).json({ error: "Invalid request. Please check your input." });
    return;
  }

  if (msg.includes("GEMINI_API_KEY") || msg.includes("API_KEY_INVALID")) {
    console.error("[ERROR] 401: Gemini API key missing or invalid");
    res.status(500).json({ error: "An internal error occurred. Please try again later." });
    return;
  }

  if (msg.includes("503") || msg.includes("UNAVAILABLE")) {
    console.error("[ERROR] 503: Gemini API temporarily unavailable");
    res.status(503).json({ error: "Service temporarily unavailable. Please try again later." });
    return;
  }

  console.error(`[ERROR] 500: ${msg}`);
  if (err.stack) console.error(err.stack);
  res.status(500).json({ error: "An internal error occurred. Please try again later." });
}

export default errorHandler;
