<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
}>();
</script>

<template>
  <div class="rounded-xl border border-white/5 bg-surface p-5 transition-all hover:border-white/10 sm:p-6 group">
    <!-- Top: icon slot -->
    <div class="mb-4">
      <slot name="icons" />
    </div>

    <!-- Title -->
    <h3 class="font-serif text-lg font-medium text-white">{{ title }}</h3>

    <!-- Description -->
    <p class="mt-2 text-sm leading-relaxed text-muted">{{ description }}</p>

    <!-- Bottom slot (buttons / progress) -->
    <div class="mt-5">
      <slot name="bottom" />
    </div>
  </div>
</template>
