<script setup lang="ts">
import { SUPPORT_BANNER_TRANSLATIONS } from '~/config/translations'

const { lang } = useUserLanguage()

const t = computed(() => SUPPORT_BANNER_TRANSLATIONS[lang.value])

const searchUrl = computed(() => {
  const query = encodeURIComponent(t.value.searchQuery)
  return `https://www.google.com/search?q=${query}`
})
</script>

<template>
  <div class="rounded-lg border border-secondary/30 bg-secondary-container/10 p-4">
    <p class="body-sm leading-relaxed text-on-surface-variant">
      {{ t.message }}
    </p>
    <a
      :href="searchUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-2 inline-flex items-center gap-1 body-sm font-medium text-primary transition-colors hover:underline"
    >
      {{ t.cta }}
      <Icon name="lucide:external-link" class="h-3.5 w-3.5" />
    </a>
  </div>
</template>
