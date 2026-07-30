import { Router, Request, Response } from "express";
import {
  createEntry,
  getAllEntries,
  getEntryById,
  deleteEntry,
} from "../services/journalService.js";

const router = Router();

router.post("/", (req: Request, res: Response) => {
  const { sessionId, title, content } = req.body;
  if (!title || !content) {
    res.status(400).json({ error: "title and content are required." });
    return;
  }
  const entry = createEntry({ sessionId, title, content });
  res.status(201).json({ journalId: entry.journalId, createdAt: entry.createdAt });
});

router.get("/", (_req: Request, res: Response) => {
  const entries = getAllEntries();
  res.json({ entries });
});

router.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const entry = getEntryById(id);
  if (!entry) {
    res.status(404).json({ error: "Journal entry not found." });
    return;
  }
  res.json(entry);
});

router.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id as string;
  const deleted = deleteEntry(id);
  if (!deleted) {
    res.status(404).json({ error: "Journal entry not found." });
    return;
  }
  res.json({ message: "Journal entry successfully deleted." });
});

export default router;
