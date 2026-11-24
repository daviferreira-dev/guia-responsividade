<script setup>
import { computed } from 'vue'
import { useJanela } from '../composables/medidas.js'

// Laboratório fixo no canto: mostra a largura da janela e o breakpoint ativo.
// Os valores (48rem e 64rem) são os mesmos usados nas media queries do projeto.
const pontos = [
  { nome: 'celular', minRem: 0 },
  { nome: 'tablet', minRem: 48 },
  { nome: 'desktop', minRem: 64 },
]

const { largura } = useJanela()

const ativo = computed(() => {
  largura.value // dependência: recalcula quando a janela muda
  return pontos.filter((p) => window.matchMedia(`(min-width: ${p.minRem}rem)`).matches).at(-1)
})
</script>

<template>
  <div class="indicador" role="status" aria-label="Largura da janela e breakpoint ativo">
    <strong>{{ largura }}px</strong>
    <span>{{ ativo.nome }} <small v-if="ativo.minRem">(≥ {{ ativo.minRem }}rem)</small></span>
  </div>
</template>

<style scoped>
.indicador {
  position: fixed;
  right: var(--esp-2);
  bottom: var(--esp-2);
  z-index: 10;
  display: flex;
  gap: var(--esp-2);
  padding: var(--esp-1) var(--esp-2);
  background: var(--destaque);
  color: var(--papel);
  font-family: var(--mono);
  font-size: 0.75rem;
  border-radius: var(--raio);
  pointer-events: none;
}
</style>
