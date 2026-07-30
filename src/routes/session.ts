import { Router, Request, Response } from "express";
import { createSession, getHistory, deleteSession } from "../services/sessionStore.js";

const router = Router();

router.post("/", (_req: Request, res: Response) => {
  const sessionId = createSession();
  res.status(201).json({ sessionId });
});

router.get("/:id/history", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const history = getHistory(id);
  if (!history) {
    res.status(404).json({ error: "Session not found." });
    return;
  }
  res.json({ history });
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const deleted = deleteSession(id);
  if (!deleted) {
    res.status(404).json({ error: "Session not found." });
    return;
  }
  res.json({ message: "Session successfully deleted." });
});

export default router;
