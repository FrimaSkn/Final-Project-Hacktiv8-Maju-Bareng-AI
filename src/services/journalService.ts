import { v4 as uuidv4 } from "uuid";

interface JournalEntryInput {
  sessionId?: string;
  title: string;
  content: string;
}

interface JournalEntry extends JournalEntryInput {
  journalId: string;
  createdAt: string;
}

const journalStore = new Map<string, JournalEntry>();

export function createEntry({ sessionId, title, content }: JournalEntryInput): JournalEntry {
  const journalId = uuidv4();
  const createdAt = new Date().toISOString();
  const entry: JournalEntry = { journalId, sessionId, title, content, createdAt };
  journalStore.set(journalId, entry);
  return entry;
}

export function getAllEntries(): JournalEntry[] {
  return Array.from(journalStore.values());
}

export function getEntryById(journalId: string): JournalEntry | null {
  return journalStore.get(journalId) || null;
}

export function deleteEntry(journalId: string): boolean {
  return journalStore.delete(journalId);
}
