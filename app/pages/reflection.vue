<script setup lang="ts">
definePageMeta({
  layout: 'default',
  pageTransition: { name: 'page', mode: 'out-in' },
});

useHead({
  title: 'StoicMind — Reflective Chat Space',
  meta: [
    { name: 'description', content: 'A reflective chat space to separate internal and external concerns.' },
  ],
});

import { APP_AUTHOR_SHORT } from '~/config';

const { messages, isTyping, sendMessage, retryLastMessage } = useReflectionChat();

const mobileOpen = ref(false);

const route = useRoute();

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Reflection', to: '/reflection' },
  { label: 'Meditations', to: '/meditations' },
];

function isActive(to: string): boolean {
  if (to === '/') return route.path === '/';
  return route.path.startsWith(to);
}

const chatContainer = ref<HTMLElement | null>(null);

function scrollToBottom() {
  nextTick(() => {
    if (chatContainer.value) {
      chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
    }
  });
}

async function handleSend(content: string) {
  await sendMessage(content);
  scrollToBottom();
}

watch(messages, () => {
  scrollToBottom();
}, { deep: true });

onMounted(() => {
  scrollToBottom();
});
</script>

<template>
  <div class="flex h-screen flex-col bg-background">
    <!-- Navbar -->
    <nav class="sticky top-0 z-50 border-b border-outline-variant bg-background/80 backdrop-blur-md">
      <div class="mx-auto flex max-w-[640px] items-center justify-between px-6 py-3">
        <!-- Left: logo -->
        <NuxtLink to="/" class="flex items-center gap-2.5">
          <div class="flex size-12 items-center justify-center rounded-full bg-accent/15">
            <!-- <Icon name="lucide:book" class="h-4 w-4 text-accent" /> -->
            <img src="/logo.png" alt="Brain icon" class="h-8 w-8" />
          </div>
          <div class="text-xl text-text font-extralight"><span class="font-extrabold!">Stoic</span>Mind</div>
        </NuxtLink>

        <!-- Right: My Journal + hamburger -->
        <div class="relative flex items-center gap-3">
          <!-- <NuxtLink
            to="/journal"
            class="hidden items-center gap-2 rounded border border-outline px-3 py-1.5 text-sm text-on-surface transition-colors hover:bg-surface-container sm:inline-flex"
          >
            <Icon name="lucide:book" class="h-4 w-4" />
            My Journal
          </NuxtLink> -->
          <button
            class="flex size-10 items-center justify-center rounded-lg text-on-surface-variant transition-all duration-300 ease-in-out hover:text-on-surface"
            :class="{ 'rotate-90': mobileOpen }"
            aria-label="Toggle menu"
            @click="mobileOpen = !mobileOpen"
          >
            <Icon v-if="!mobileOpen" name="lucide:menu" class="size-7!" />
            <Icon v-else name="lucide:x" class="size-7!" />
          </button>

          <!-- Floating dropdown -->
          <Transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-2"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div v-if="mobileOpen" class="absolute right-0 top-full z-50 mt-2 w-56 rounded-lg border border-outline-variant bg-surface-container-high p-2 shadow-lg">
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
        </div>
      </div>
    </nav>

    <!-- Chat container -->
    <div class="mx-auto flex w-full max-w-[640px] flex-col px-6 pt-4 h-[calc(100vh-12.3rem)]">
      <!-- Chat area -->
      <div ref="chatContainer" class="flex-1 max-h-full overflow-y-auto rounded-lg border border-outline-variant bg-surface-container px-4 py-6 pb-6 space-y-6 sm:space-y-8">
        <!-- BreathingRing decorative background -->
        <SharedBreathingRing />

        <template v-for="(msg, i) in messages" :key="i">
          <ChatBubble
            :role="msg.role"
            :content="msg.content"
            :label="msg.role === 'assistant' ? APP_AUTHOR_SHORT : msg.role === 'system' ? 'System' : 'You'"
          />

          <!-- Dynamic Control Analysis Panel -->
          <ChatControlAnalysisPanel
            v-if="msg.dichotomyTable
              && (msg.dichotomyTable.internal.length > 0 || msg.dichotomyTable.external.length > 0)"
            :dichotomy-table="msg.dichotomyTable"
          />

          <!-- Support Banner for crisis_flag -->
          <ChatSupportBanner v-if="msg.crisisFlag" />
        </template>

        <!-- Typing indicator -->
        <ChatBubble
          v-if="isTyping"
          role="assistant"
          content=""
          :label="APP_AUTHOR_SHORT"
          :is-typing="true"
        />
        
        <!-- System error retry -->
        <div
          v-if="messages.length > 0 && messages[messages.length - 1]?.role === 'system'"
          class="flex justify-center bg-surface-container px-4 py-5"
        >
          <button
            class="body-sm text-primary transition-colors hover:underline"
            @click="retryLastMessage"
          >
            Try again
          </button>
        </div>
      </div>


      <!-- Input bar (fixed) -->
      <div class="fixed bottom-0 left-0 right-0 z-40 border-t border-outline-variant bg-surface-container/95 backdrop-blur-md px-6 py-3 shadow-[0_-4px_12px_rgba(0,0,0,0.15)]">
        <div class="mx-auto max-w-[640px] md:px-6">
          <ChatInput @send="handleSend" />
        </div>
      </div>
    </div>
  </div>
</template>
