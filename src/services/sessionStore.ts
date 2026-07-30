import { v4 as uuidv4 } from "uuid";

interface SessionMessage {
  role: "user" | "model";
  parts: [{ text: string }];
}

type SessionHistory = SessionMessage[];

const sessions = new Map<string, SessionHistory>();

export function createSession(): string {
  const sessionId = uuidv4();
  sessions.set(sessionId, []);
  return sessionId;
}

export function getHistory(sessionId: string): SessionHistory | undefined {
  return sessions.get(sessionId);
}

export function appendMessage(sessionId: string, role: SessionMessage["role"], text: string): SessionHistory {
  const history = sessions.get(sessionId) || [];
  history.push({ role, parts: [{ text }] });
  sessions.set(sessionId, history);
  return history;
}

export function deleteSession(sessionId: string): boolean {
  return sessions.delete(sessionId);
}
