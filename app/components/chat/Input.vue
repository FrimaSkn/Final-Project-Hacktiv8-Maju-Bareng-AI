<script setup lang="ts">
const emit = defineEmits<{
  send: [content: string];
}>();

const input = ref('');
const textarea = ref<HTMLTextAreaElement | null>(null);

function autoResize() {
  if (!textarea.value) return;
  textarea.value.style.height = 'auto';
  textarea.value.style.height = `${textarea.value.scrollHeight}px`;
}

function handleSend() {
  const trimmed = input.value.trim();
  if (!trimmed) return;
  emit('send', trimmed);
  input.value = '';
  if (textarea.value) {
    textarea.value.style.height = 'auto';
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    handleSend();
  }
}
</script>

<template>
  <div class="w-full">
    <!-- Input bar -->
    <div class="flex items-center gap-2 rounded-xl border border-outline-variant bg-surface-container px-4 py-2">
      <!-- Mic icon -->
      <!-- <button class="mb-0.5 shrink-0 text-on-surface-variant transition-colors hover:text-on-surface" aria-label="Voice input">
        <Icon name="lucide:mic" class="h-5 w-5" />
      </button> -->

      <!-- Text input (textarea auto-resize) -->
      <textarea
        ref="textarea"
        v-model="input"
        rows="1"
        class="flex-1 resize-none bg-transparent body-md text-on-surface placeholder-on-surface/50 outline-none"
        placeholder="What's on your mind today?"
        @keydown="handleKeydown"
        @input="autoResize"
      />

      <!-- Send button -->
      <button
        class="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary transition-all hover:brightness-110 active:scale-95"
        aria-label="Send message"
        @click="handleSend"
      >
        <Icon name="lucide:send" class="h-4 w-4" />
      </button>
    </div>

    <!-- Shortcut links -->
    <div class="mt-2 flex items-center justify-center gap-4">
      <button class="flex items-center gap-1 body-sm text-on-surface-variant transition-colors hover:text-on-surface">
        <Icon name="lucide:book" class="h-3.5 w-3.5" />
        Dichotomy Tool
      </button>
      <button class="flex items-center gap-1 body-sm text-on-surface-variant transition-colors hover:text-on-surface">
        <Icon name="lucide:heart" class="h-3.5 w-3.5" />
        Breathe
      </button>
    </div>
  </div>
</template>
