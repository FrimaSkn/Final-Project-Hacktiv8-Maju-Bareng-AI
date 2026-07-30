<script setup lang="ts">
import type { NavLink } from '~/types';

const route = useRoute();

const navLinks: NavLink[] = [
  { label: 'Home', to: '/' },
  { label: 'Reflection', to: '/reflection' },
  { label: 'Meditations', to: '/meditations' },
  // { label: 'Journal', to: '/journal' },
];

const mobileOpen = ref(false);

function toggleMobile() {
  mobileOpen.value = !mobileOpen.value;
}

function isActive(to: string): boolean {
  if (to === '/') return route.path === '/';
  return route.path.startsWith(to);
}
</script>

<template>
  <nav class="sticky top-0 z-50 border-b border-white/5 bg-bg/80 backdrop-blur-md">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 md:py-3">
      <!-- Logo -->
      <NuxtLink to="/" class="flex items-center gap-2.5">
        <div class="flex size-12 items-center justify-center rounded-full bg-surface">
          <!-- <Icon name="lucide:book" class="h-4 w-4 text-accent" /> -->
           <img src="/logo.png" alt="Brain icon" class="h-8 w-8" />
        </div>
        <div class="text-xl text-text font-extralight"><span class="font-extrabold!">Stoic</span>Mind</div>
      </NuxtLink>

      <!-- Desktop nav -->
      <div class="hidden items-center gap-8 md:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm transition-colors"
          :class="isActive(link.to) ? 'font-medium text-text' : 'text-muted hover:text-text'"
        >
          {{ link.label }}
        </NuxtLink>
      </div>

      <!-- Right side -->
      <div class="relative flex items-center gap-3">
        <!-- My Journal button (desktop) -->
        <NuxtLink
          to="/journal"
          class="hidden items-center gap-2 rounded-md border border-white/10 px-4 py-2 text-sm font-medium text-text transition-colors hover:bg-surface md:inline-flex"
        >
          <Icon name="lucide:book" class="h-4 w-4" />
          My Journal
        </NuxtLink>

        <!-- Mobile hamburger -->
        <button
          class="flex h-8 w-8 items-center justify-center rounded-lg text-muted transition-all duration-300 ease-in-out md:hidden"
          :class="{ 'rotate-90': mobileOpen }"
          aria-label="Toggle menu"
          @click="toggleMobile"
        >
          <Icon v-if="!mobileOpen" name="lucide:menu" class="size-7!" />
          <Icon v-else name="lucide:x" class="size-7!" />
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div v-if="mobileOpen" class="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-outline-variant bg-surface-container-high p-2 shadow-lg md:hidden">
        <div class="flex flex-col gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="rounded-lg px-3 py-2.5 text-sm transition-colors"
            :class="isActive(link.to) ? 'bg-surface font-medium text-text' : 'text-muted hover:bg-surface hover:text-text'"
            @click="mobileOpen = false"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink
            to="/journal"
            class="mt-2 flex items-center justify-center gap-2 rounded-md border border-white/10 px-4 py-2.5 text-sm font-medium text-text transition-colors hover:bg-surface"
            @click="mobileOpen = false"
          >
            <Icon name="lucide:book" class="h-4 w-4" />
            My Journal
          </NuxtLink>
        </div>
      </div>
    </Transition>
  </nav>
</template>
