<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: number;
}>(), {
  modelValue: 0,
});

const emit = defineEmits<{
  'update:modelValue': [value: number];
}>();

const segments = [
  { label: 'Morning', index: 0 },
  { label: 'Midday', index: 1 },
  { label: 'Evening', index: 2 },
];

function clickSegment(index: number) {
  emit('update:modelValue', index);
}
</script>

<template>
  <div class="mb-4">Curated morning and evening prompts designed to cultivate resilience, gratitude, and purposeful action.</div>
  <!-- <div class="flex gap-1.5" role="group" aria-label="Meditation progress">
    <button
      v-for="seg in segments"
      :key="seg.index"
      class="h-1.5 flex-1 cursor-pointer rounded-full transition-colors duration-200"
      :class="seg.index <= props.modelValue
        ? seg.index === props.modelValue ? 'bg-accent' : 'bg-accent/40'
        : 'bg-white/5 hover:bg-white/10'"
      :aria-label="seg.label"
      :aria-current="seg.index === props.modelValue ? 'step' : undefined"
      @click="clickSegment(seg.index)"
    />
  </div> -->
</template>
