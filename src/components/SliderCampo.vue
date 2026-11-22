<script setup>
// Controle deslizante reutilizável: props tipadas + evento update:modelValue (v-model).
defineProps({
  modelValue: { type: Number, required: true },
  rotulo: { type: String, required: true },
  min: { type: Number, default: 0 },
  max: { type: Number, required: true },
  passo: { type: Number, default: 1 },
  unidade: { type: String, default: 'px' },
})
defineEmits({ 'update:modelValue': (v) => typeof v === 'number' })
</script>

<template>
  <label class="slider">
    <span>
      {{ rotulo }}: <strong>{{ modelValue }}{{ unidade }}</strong>
    </span>
    <input
      type="range"
      :min="min"
      :max="max"
      :step="passo"
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
    />
  </label>
</template>

<style scoped>
.slider {
  display: grid;
  gap: var(--esp-1);
  font-family: var(--mono);
  font-size: 0.875rem;
}

input {
  width: 100%;
  padding: 0;
  accent-color: var(--destaque);
  background: none;
  border: 0;
}
</style>
