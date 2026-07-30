<script setup lang="ts">
import type { DichotomyTable } from '~/types';

const props = defineProps<{
  dichotomyTable: DichotomyTable;
}>();
</script>

<template>
  <div class="overflow-hidden rounded-lg border border-outline-variant bg-surface-container-low">
    <div class="grid grid-cols-1 sm:grid-cols-2">
      <!-- INTERNAL -->
      <div class="border-b border-outline-variant bg-primary-container/10 p-4 sm:border-b-0 sm:border-r sm:border-outline-variant">
        <span class="label-lg uppercase text-primary">
          Internal
        </span>
        <ul v-if="props.dichotomyTable.internal?.length" class="mt-2 space-y-1 list-disc ml-4">
          <li
            v-for="(item, i) in props.dichotomyTable.internal"
            :key="i"
            class="body-sm text-on-surface-variant"
          >
            {{ item }}
          </li>
        </ul>
        <p v-else class="mt-2 body-sm text-on-surface-variant italic">—</p>
      </div>

      <!-- EXTERNAL -->
      <div class="bg-secondary-container/10 p-4">
        <span class="label-lg uppercase text-secondary">
          External
        </span>
        <ul v-if="props.dichotomyTable.external?.length" class="mt-2 space-y-1 list-disc ml-4">
          <li
            v-for="(item, i) in props.dichotomyTable.external"
            :key="i"
            class="body-sm text-on-surface-variant"
          >
            {{ item }}
          </li>
        </ul>
        <p v-else class="mt-2 body-sm text-on-surface-variant italic">—</p>
      </div>
    </div>
  </div>
</template>
