<template>
  <div class="pointer-events-none absolute inset-0 flex items-center justify-center opacity-20">
    <svg class="h-64 w-64" viewBox="0 0 256 256" fill="none">
      <!-- Outer ring -->
      <circle
        cx="128"
        cy="128"
        r="120"
        stroke="currentColor"
        stroke-width="1"
        class="text-primary"
        style="animation: breathe-in 4s ease-in-out infinite alternate; transform-origin: center;"
      />
      <!-- Middle ring -->
      <circle
        cx="128"
        cy="128"
        r="90"
        stroke="currentColor"
        stroke-width="1"
        class="text-outline-variant"
        style="animation: breathe-out 6s ease-in-out infinite alternate; transform-origin: center;"
      />
      <!-- Inner ring -->
      <circle
        cx="128"
        cy="128"
        r="60"
        stroke="currentColor"
        stroke-width="1"
        class="text-primary"
        style="animation: breathe-in 4s ease-in-out 1s infinite alternate; transform-origin: center;"
      />
    </svg>
  </div>
</template>
