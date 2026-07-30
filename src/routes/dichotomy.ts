import { Router, Request, Response, NextFunction } from "express";
import { analyzeProblem } from "../services/dichotomyService.js";
import { getHistory } from "../services/sessionStore.js";

const router = Router();

router.post("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { sessionId, problem } = req.body;

    if (!problem || problem.trim() === "") {
      res.status(400).json({ error: "The Problem field is required." });
      return;
    }

    let history: Array<{ role: string; parts: [{ text: string }] }> = [];
    if (sessionId) {
      history = getHistory(sessionId) || [];
    }

    const result = await analyzeProblem(problem, history);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

export default router;
