<script setup>
import { nextTick, ref, watch } from 'vue'
import SliderCampo from './SliderCampo.vue'
import { useLargura } from '../composables/medidas.js'

// Lab 3: grid com repeat(auto-fit, minmax(14rem, 1fr)) e gap 1rem.
const pedida = ref(400)
const grade = ref(null)
const real = useLargura(grade)
const colunas = ref(1)

// Pergunta ao navegador quantas colunas ele criou de fato.
watch(real, async () => {
  await nextTick()
  colunas.value = getComputedStyle(grade.value).gridTemplateColumns.split(' ').length
})

// Largura mínima para n colunas: n × 14rem + (n − 1) × 1rem, com 1rem = 16px
const tabela = [1, 2, 3, 4, 5].map((n) => ({ n, px: n * 224 + (n - 1) * 16 }))
</script>

<template>
  <div class="lab">
    <SliderCampo v-model="pedida" rotulo="Largura do contêiner" :min="200" :max="1100" :passo="4" />

    <!-- A rolagem fica só dentro desta janela: a página nunca ganha rolagem horizontal -->
    <div class="janela">
      <div ref="grade" class="grade" :style="{ width: pedida + 'px' }">
        <p v-for="n in 8" :key="n">{{ n }}</p>
      </div>
    </div>

    <p class="lab-leitura" aria-live="polite">
      Largura real: {{ real }}px · <strong>{{ colunas }} coluna{{ colunas > 1 ? 's' : '' }}</strong>
    </p>

    <table>
      <caption>Largura mínima do contêiner para cada número de colunas</caption>
      <thead>
        <tr><th scope="col">Colunas</th><th scope="col">Conta (14rem = 224px · gap 1rem = 16px)</th><th scope="col">Mínimo</th></tr>
      </thead>
      <tbody>
        <tr v-for="l in tabela" :key="l.n">
          <td>{{ l.n }}</td>
          <td>{{ l.n }} × 224 + {{ l.n - 1 }} × 16</td>
          <td>{{ l.px }}px</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.janela {
  margin-top: var(--esp-3);
  overflow-x: auto;
}

.grade {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
}

.grade p {
  margin: 0;
  padding: var(--esp-3);
  background: var(--tinta);
  color: var(--papel);
  font-family: var(--mono);
  text-align: center;
}

table {
  width: 100%;
  margin-top: var(--esp-3);
  border-collapse: collapse;
  font-size: 0.875rem;
}

caption {
  margin-bottom: var(--esp-1);
  text-align: left;
  font-family: var(--mono);
  font-size: 0.75rem;
}

th,
td {
  padding: var(--esp-1) var(--esp-2);
  border: 1px solid var(--tinta);
  text-align: left;
}
</style>
