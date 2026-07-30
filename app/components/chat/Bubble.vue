<script setup lang="ts">
import type { DichotomyTable } from '~/types';

defineProps<{
  role: 'assistant' | 'user' | 'system';
  content: string;
  label: string;
  dichotomyTable?: DichotomyTable;
  crisisFlag?: boolean;
  isTyping?: boolean;
}>();
</script>

<template>
  <div class="flex flex-col" :class="role === 'user' ? 'items-end' : 'items-start'">
    <!-- Typing indicator -->
    <div v-if="isTyping" class="flex flex-col items-start">
      <div class="flex items-center gap-1.5 rounded-lg border border-outline-variant bg-surface-container px-4 py-3">
        <span class="h-2 w-2 animate-bounce rounded-full bg-on-surface-variant [animation-delay:0ms]" />
        <span class="h-2 w-2 animate-bounce rounded-full bg-on-surface-variant [animation-delay:150ms]" />
        <span class="h-2 w-2 animate-bounce rounded-full bg-on-surface-variant [animation-delay:300ms]" />
      </div>
      <span class="mt-1.5 body-sm text-on-surface-variant">{{ label }}</span>
    </div>

    <!-- Normal message -->
    <template v-else>
      <div
        class="max-w-[85%] border border-outline-variant px-4 py-3 body-sm font-medium leading-relaxed sm:max-w-[70%] sm:body-md"
        :class="role === 'user'
          ? 'bg-transparent text-on-surface rounded-tr-lg rounded-l-lg'
          : role === 'system'
            ? 'border-primary/30 bg-primary-container/10 text-on-surface-variant rounded-tl-lg rounded-r-lg'
            : 'bg-surface-container text-on-surface rounded-tl-lg rounded-r-lg'"
      >
        {{ content }}
      </div>
      <span v-if="role !== 'system'" class="mt-1.5 body-sm text-on-surface-variant">{{ label }}</span>
    </template>
  </div>
</template>
