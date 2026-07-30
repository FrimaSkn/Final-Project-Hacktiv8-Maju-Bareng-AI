import type { ChatMessage, ChatResponse } from '~/types';

export function useReflectionChat() {
  const messages = useState<ChatMessage[]>('chat-messages', () => [
    {
      role: 'assistant',
      content: 'The atmosphere is calm here. What would you like to untangle at this moment?',
    },
  ]);

  const isTyping = useState('chat-is-typing', () => false);

  const sessionId = useState('chat-session-id', () => {
    if (import.meta.client) {
      const stored = localStorage.getItem('stoicmind-chat-session');
      if (stored) return stored;
    }
    return crypto.randomUUID();
  });

  // Persist sessionId to localStorage
  watch(sessionId, (val) => {
    if (import.meta.client) {
      localStorage.setItem('stoicmind-chat-session', val);
    }
  });

  async function sendMessage(userText: string): Promise<void> {
    // Optimistic update
    messages.value.push({ role: 'user', content: userText });
    isTyping.value = true;

    try {
      const response = await $fetch<ChatResponse>('/api/chat', {
        method: 'POST',
        body: {
          sessionId: sessionId.value,
          message: userText,
        },
      });

      messages.value.push({
        role: 'assistant',
        content: response.reply,
        dichotomyTable: response.dichotomy_table,
        crisisFlag: response.crisis_flag,
      });
    } catch {
      messages.value.push({
        role: 'system',
        content: "Sorry, it seems there's a connection issue. Try sending that message again in a moment.",
      });
    } finally {
      isTyping.value = false;
    }
  }

  function retryLastMessage(): void {
    // Find last user message
    const lastUserIdx = messages.value.findLastIndex(m => m.role === 'user');
    if (lastUserIdx === -1) return;

    const lastUserMsg = messages.value[lastUserIdx];
    if (!lastUserMsg) return;

    // Remove system error message if present after it
    const nextIdx = lastUserIdx + 1;
    const nextMsg = messages.value[nextIdx];
    if (nextIdx < messages.value.length && nextMsg?.role === 'system') {
      messages.value.splice(nextIdx, 1);
    }

    void sendMessage(lastUserMsg.content);
  }

  return { messages, isTyping, sessionId, sendMessage, retryLastMessage };
}
