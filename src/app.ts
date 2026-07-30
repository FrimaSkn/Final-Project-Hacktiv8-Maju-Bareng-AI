import express, { Request, Response } from "express";
import { apiReference } from "@scalar/express-api-reference";
import sessionRoutes from "./routes/session.js";
import chatRoutes from "./routes/chat.js";
import journalRoutes from "./routes/journal.js";
import dichotomyRoutes from "./routes/dichotomy.js";
import errorHandler from "./middlewares/errorHandler.js";
import openApiSpec from "./docs/openapi.json";

const app = express();

// Capture raw body for multipart/form-data BEFORE body parsers consume stream
app.use((req: Request, _res: Response, next: () => void) => {
  const ct = (req.headers["content-type"] || "").toLowerCase();
  if (ct.startsWith("multipart/form-data")) {
    const chunks: Buffer[] = [];
    req.on("data", (chunk: Buffer) => chunks.push(chunk));
    req.on("end", () => {
      (req as unknown as { rawBody?: Buffer }).rawBody = Buffer.concat(chunks);
      next();
    });
  } else {
    next();
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/health", (_req: Request, res: Response) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

app.get("/openapi.json", (_req: Request, res: Response) => {
  res.json(openApiSpec);
});

app.use("/reference", apiReference({ spec: { url: "/openapi.json" } }));

app.use("/session", sessionRoutes);
app.use("/chat", chatRoutes);
app.use("/journal", journalRoutes);
app.use("/dichotomy", dichotomyRoutes);

app.use(errorHandler);

export default app;
