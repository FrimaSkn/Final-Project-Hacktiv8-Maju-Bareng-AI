<script setup lang="ts">
type ControlType = 'internal' | 'external';

const props = withDefaults(defineProps<{
  modelValue?: ControlType;
}>(), {
  modelValue: 'internal',
});

const emit = defineEmits<{
  'update:modelValue': [value: ControlType];
}>();

function select(control: ControlType) {
  emit('update:modelValue', control);
}
</script>

<template>
  <div class="flex rounded-lg bg-bg p-1">
    <button
      class="flex-1 rounded-md px-3 py-2 text-xs font-medium transition-all duration-200"
      :class="props.modelValue === 'internal'
        ? 'bg-accent/20 text-accent border border-accent/30'
        : 'text-muted hover:text-text border border-transparent'"
      :aria-pressed="props.modelValue === 'internal'"
      @click="select('internal')"
    >
      INTERNAL
    </button>
    <button
      class="flex-1 rounded-md px-3 py-2 text-xs font-medium transition-all duration-200"
      :class="props.modelValue === 'external'
        ? 'bg-accent/20 text-accent border border-accent/30'
        : 'text-muted hover:text-text border border-transparent'"
      :aria-pressed="props.modelValue === 'external'"
      @click="select('external')"
    >
      EXTERNAL
    </button>
  </div>
</template>
