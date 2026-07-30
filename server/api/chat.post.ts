import type { ChatRequest, ChatResponse } from '~/types';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig();

  const body = await readBody<ChatRequest>(event);

  if (!body.sessionId || !body.message) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing sessionId or message',
    });
  }

  try {
    const response = await $fetch<ChatResponse>('/chat', {
      baseURL: config.chatApiBase as string,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: {
        sessionId: body.sessionId,
        message: body.message,
      },
    });

    return response;
  } catch (err: unknown) {
    const statusCode = (err && typeof err === 'object' && 'statusCode' in err)
      ? (err as { statusCode: number }).statusCode
      : 502;

    throw createError({
      statusCode: statusCode >= 400 && statusCode < 600 ? statusCode : 502,
      statusMessage: 'Backend chat service unavailable. Please try again later.',
    });
  }
});
