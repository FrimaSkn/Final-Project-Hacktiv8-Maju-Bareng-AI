<script setup lang="ts">
import { APP_AUTHOR } from '~/config';
</script>

<template>
  <section class="relative flex flex-col items-center px-4 py-16 text-center sm:py-24">
    <!-- Author badge -->
    <span class="mb-6 inline-flex items-center rounded-full px-4 py-1.5 text-[11px] font-medium tracking-widest text-accent border border-accent/30 bg-accent/15">
      Marcus Aurelius 
    </span>

    <!-- Quote -->
    <h1 class="font-serif text-4xl font-medium leading-tight tracking-tight text-text sm:text-5xl md:text-6xl">
      "The happiness of your life depends upon the quality of your thoughts."
    </h1>

    <!-- Subtext -->
    <p class="mt-6 max-w-md text-sm leading-relaxed text-muted sm:text-base">
      A digital sanctuary for stoic reflection and mental clarity. Ground your mind in the wisdom of the ancients.
    </p>

    <!-- CTA -->
    <NuxtLink
      to="/reflection"
      class="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg transition-all hover:opacity-90 active:scale-95"
    >
      Begin Reflection
    </NuxtLink>

    <!-- Decorative dots -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.03]">
      <div class="h-full w-full" style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 24px 24px;" />
    </div>
  </section>
</template>
