<script setup lang="ts">
definePageMeta({
  layout: 'default',
  pageTransition: { name: 'page', mode: 'out-in' },
});

useHead({
  title: 'StoicMind — Digital Sanctuary',
  meta: [
    { name: 'description', content: 'A digital space for Stoic reflection, daily journaling, and philosophical conversation.' },
  ],
});

const activeControl = ref<'internal' | 'external'>('internal');
const meditationStep = ref(0);
</script>

<template>
  <div>
    <!-- Navbar -->
    <HomeNavBar />

    <main class="mx-auto max-w-6xl px-4">
      <!-- Hero Section -->
      <HomeHeroQuote />

      <!-- Feature Cards -->
      <section class="grid gap-4 pb-16 sm:grid-cols-2 sm:gap-6">
        <!-- Card 1: Dichotomy of Control -->
        <HomeFeatureCard
          title="Dichotomy of Control"
          description="Map your concerns between what you can change and what you must accept. Focus your energy where it matters most."
        >
          <template #icons>
            <div class="flex gap-3 justify-between items-center">
              <div class="flex h-10 w-10 items-center justify-center rounded-md text-accent bg-accent/20">
                <img src="/icons/neraca.png" alt="Brain icon" class="h-5 w-5" />
              </div>
              <div class="flex items-center justify-center rounded-full">
                <img src="/icons/neraca-w.png" alt="Brain icon" class="size-14 opacity-25 group-hover:opacity-45" />
              </div>
            </div>
          </template>
          <template #bottom>
            <!-- <HomeControlToggle v-model="activeControl" /> -->
             <div class="grid grid-cols-2 gap-2">
                <div class="text-primary uppercase text-center border-accent/60 rounded-md border py-5 bg-primary/20">Internal</div>
                <div class="text-secondary uppercase text-center border-secondary/60 rounded-md border py-5 bg-secondary/20">External</div>
             </div>
          </template>
        </HomeFeatureCard>

        <!-- Card 2: Daily Meditations -->
         <!-- Begin with purpose, end with gratitude—two daily reflections to build a stronger, more resilient mind. -->
          <!-- Set your intention in the morning and reflect at night, turning every day into a step toward purposeful living. -->
           <!-- Curated morning and evening prompts designed to cultivate resilience, gratitude, and purposeful action. -->
        <HomeFeatureCard
          title="Daily Meditations"
          description=""
        >
          <template #icons>
            <div class="flex gap-3 justify-between items-center">
              <div class="flex h-10 w-10 items-center justify-center rounded-md text-accent bg-accent/20">
                <img src="/icons/book-open.png" alt="Brain icon" class="h-5 w-5" />
              </div>
              <div class="flex items-center justify-center rounded-full">
                <img src="/icons/book-open-w.png" alt="Brain icon" class="size-14 opacity-25 group-hover:opacity-45" />
              </div>
            </div>
          </template>
          <template #bottom>
            <HomeMeditationSlider v-model="meditationStep" />
          </template>
        </HomeFeatureCard>
      </section>

      <!-- Feature Highlight: A Private Space for Reason -->
      <section class="grid gap-8 border-t border-white/5 py-16 sm:grid-cols-2 sm:items-center sm:gap-12">
        <div>
          <h2 class="font-serif text-3xl font-medium text-accent sm:text-4xl">
            A Private Space for<br>Reason
          </h2>
          <p class="mt-4 max-w-md text-sm leading-relaxed text-muted sm:text-base">
            A judgment-free zone to explore your thoughts through the lens of ancient wisdom. Ask questions, reflect on Stoic principles, and gain clarity.
          </p>
          <NuxtLink to="/reflection" class="mt-6 inline-flex items-center gap-1 text-sm font-medium text-accent transition-colors hover:opacity-80">
            Try Reflective Chat
            <Icon name="lucide:chevron-right" class="h-4 w-4" />
          </NuxtLink>
        </div>

        <!-- Mini journal mockup -->
        <div class="rounded-xl border border-white/5 bg-surface p-4">
          <div class="space-y-3">
            <div class="flex items-start gap-3">
              <div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Icon name="lucide:user" class="h-3.5 w-3.5" />
              </div>
              <div class="flex-1 rounded-lg bg-bg p-3">
                <p class="text-xs text-muted">You are disturbed not by things, but by your judgments about them.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-bg">
                <Icon name="lucide:book" class="h-3.5 w-3.5" />
              </div>
              <div class="flex-1 rounded-lg bg-bg p-3">
                <p class="text-xs text-muted">Yes. My reaction is the only thing I can control in this situation.</p>
              </div>
            </div>
            <div class="flex items-start gap-3">
              <div class="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent/20 text-accent">
                <Icon name="lucide:lightbulb" class="h-3.5 w-3.5" />
              </div>
              <div class="flex-1 rounded-lg bg-bg p-3">
                <p class="text-xs text-muted">What would a Stoic do? They would accept, adapt, and act with virtue.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Quote Band -->
      <section class="border-t border-white/5 py-12 text-center sm:py-16">
        <p class="font-serif text-xl italic leading-relaxed text-muted sm:text-2xl">
          "Very little is needed to make a happy life; it is all within yourself, in your way of thinking."
        </p>
      </section>
    </main>

    <!-- Footer -->
    <footer class="border-t border-white/5">
      <div class="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div class="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <!-- Left: logo + tagline -->
          <div class="text-center sm:text-left max-md:flex flex-col items-center">
            <div class="flex flex-col gap-2 w-fit items-center">
              <div class="flex size-20 items-center justify-center rounded-full bg-primary/10">
                <!-- <Icon name="lucide:book" class="h-3.5 w-3.5 text-accent" /> -->
                 <img src="/logo.png" alt="Brain icon" class="h-16 w-16" />
              </div>
              <div class="text-2xl text-text  font-extralight"><span class="font-extrabold!">Stoic</span>Mind</div>
            </div>
            <p class="mt-1 text-xs text-muted text-center">Your digital sanctuary for reflection.</p>
          </div>

          <!-- Center: links -->
          <div class="flex gap-6 text-sm text-muted">
            <NuxtLink to="/reflection" class="transition-colors hover:text-text">Reflection</NuxtLink>
            <NuxtLink to="/meditations" class="transition-colors hover:text-text">Meditations</NuxtLink>
            <NuxtLink to="/journal" class="transition-colors hover:text-text">Journal</NuxtLink>
          </div>

          <!-- Right: social -->
          <div class="flex gap-3">
            <a href="https://id.linkedin.com/in/frima-satria-989b77223" target="_blank" class="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:text-text" aria-label="LinkedIn">
              <Icon name="lucide:linkedin" class="h-4 w-4" />
            </a>
            <a href="https://github.com/frimaSkn" target="_blank" class="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-muted transition-colors hover:text-text" aria-label="GitHub">
              <Icon name="lucide:github" class="h-4 w-4" />
            </a>
          </div>
        </div>

        <!-- Copyright -->
        <div class="mt-8 border-t border-white/5 pt-6 text-center">
          <p class="text-xs text-muted">StoicMind is a digital sanctuary for reflection, inspired by the wisdom of Stoic philosophy.</p>
        </div>
      </div>
    </footer>
  </div>
</template>
