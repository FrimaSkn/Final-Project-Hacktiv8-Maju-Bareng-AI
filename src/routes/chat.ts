import { Router, Request, Response, NextFunction } from "express";
import { handleChat } from "../services/chatService.js";
import { transcribeAudio } from "../services/voiceService.js";
import parseFormData from "../middlewares/formData.js";

const router = Router();

router.post("/", parseFormData, async (req: Request, res: Response, next: NextFunction) => {
  try {
    let message: string | undefined = req.body?.message;

    const file = (req as unknown as { file?: { buffer: Buffer; mimetype: string } }).file;
    if (file) {
      const mimeType = file.mimetype || "audio/mp3";
      message = await transcribeAudio(file.buffer, mimeType);
    }

    if (!message || message.trim() === "") {
      res.status(400).json({ error: "The message field is required." });
      return;
    }

    const result = await handleChat(message);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
