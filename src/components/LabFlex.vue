<script setup>
import { ref } from 'vue'

// Lab 4: mexa em justify-content, align-items e flex-wrap.
const justify = ref('flex-start')
const align = ref('stretch')
const wrap = ref('wrap')

const opcoes = {
  'justify-content': ['flex-start', 'center', 'flex-end', 'space-between', 'space-around'],
  'align-items': ['stretch', 'flex-start', 'center', 'flex-end'],
  'flex-wrap': ['nowrap', 'wrap'],
}
</script>

<template>
  <div class="lab">
    <div class="controles">
      <label>justify-content
        <select v-model="justify"><option v-for="o in opcoes['justify-content']" :key="o">{{ o }}</option></select>
      </label>
      <label>align-items
        <select v-model="align"><option v-for="o in opcoes['align-items']" :key="o">{{ o }}</option></select>
      </label>
      <label>flex-wrap
        <select v-model="wrap"><option v-for="o in opcoes['flex-wrap']" :key="o">{{ o }}</option></select>
      </label>
    </div>

    <div class="caixa" :style="{ justifyContent: justify, alignItems: align, flexWrap: wrap }">
      <p v-for="n in 5" :key="n" :style="{ height: 2 + (n % 3) + 'rem' }">{{ n }}</p>
    </div>
    <p class="lab-leitura">
      display: flex; gap: 1rem; justify-content: {{ justify }}; align-items: {{ align }}; flex-wrap: {{ wrap }};
    </p>
  </div>
</template>

<style scoped>
.controles {
  display: flex;
  flex-wrap: wrap;
  gap: var(--esp-3);
}

label {
  display: grid;
  gap: var(--esp-1);
  font-family: var(--mono);
  font-size: 0.875rem;
}

.caixa {
  display: flex;
  gap: 1rem;
  min-height: 9rem;
  margin-top: var(--esp-3);
  padding: var(--esp-2);
  background: var(--painel);
  border: 2px solid var(--tinta);
}

.caixa p {
  flex: 0 0 5rem;
  margin: 0;
  background: var(--destaque);
  color: var(--papel);
  font-family: var(--mono);
  text-align: center;
}
</style>
