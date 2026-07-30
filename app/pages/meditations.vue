<script setup lang="ts">
definePageMeta({
  layout: 'default',
  pageTransition: { name: 'page', mode: 'out-in' },
});

useHead({
  title: 'StoicMind — Meditations',
});
</script>

<template>
  <div class="flex min-h-screen flex-col items-center justify-center px-4">
    <h1 class="font-serif text-3xl font-medium text-text">Meditations</h1>
    <p class="mt-3 text-sm text-muted">Coming soon.</p>
    <NuxtLink to="/" class="mt-6 text-sm text-accent transition-colors hover:opacity-80">
      &larr; Back to Home
    </NuxtLink>
  </div>
</template>
