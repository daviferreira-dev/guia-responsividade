<script setup>
import { computed, ref } from 'vue'
import SliderCampo from './SliderCampo.vue'
import { useJanela } from '../composables/medidas.js'

// Lab 2: conversor de unidades CSS para pixels.
const valor = ref(1.5)
const unidade = ref('rem')
const raiz = ref(16) // font-size do <html> (a preferência de fonte do navegador)
const fontePai = ref(20) // font-size do elemento, usado por em e ch
const larguraPai = ref(800) // largura do elemento pai, usada por %
const { largura, altura } = useJanela()

const unidades = ['rem', 'em', '%', 'vw', 'vh', 'dvh', 'ch']

const conta = computed(() => {
  const v = valor.value || 0
  switch (unidade.value) {
    case 'rem': return { px: v * raiz.value, texto: `${v} × ${raiz.value}px (fonte da raiz)` }
    case 'em': return { px: v * fontePai.value, texto: `${v} × ${fontePai.value}px (fonte do elemento)` }
    case '%': return { px: (v / 100) * larguraPai.value, texto: `${v}% × ${larguraPai.value}px (largura do pai)` }
    case 'vw': return { px: (v / 100) * largura.value, texto: `${v}% × ${largura.value}px (largura da janela)` }
    case 'vh':
    case 'dvh': return { px: (v / 100) * altura.value, texto: `${v}% × ${altura.value}px (altura da janela)` }
    default: return { px: v * fontePai.value * 0.5, texto: `${v} × ~${fontePai.value * 0.5}px (≈ metade da fonte; varia por fonte)` }
  }
})
</script>

<template>
  <div class="lab">
    <div class="campos">
      <label>
        Valor
        <input v-model.number="valor" type="number" step="0.5" min="0" />
      </label>
      <label>
        Unidade
        <select v-model="unidade">
          <option v-for="u in unidades" :key="u">{{ u }}</option>
        </select>
      </label>
    </div>

    <SliderCampo v-model="raiz" rotulo="Fonte do navegador (rem)" :min="12" :max="32" />
    <SliderCampo v-model="fontePai" rotulo="Fonte do elemento (em, ch)" :min="12" :max="40" />
    <SliderCampo v-model="larguraPai" rotulo="Largura do pai (%)" :min="200" :max="1000" :passo="10" />

    <p class="lab-leitura" aria-live="polite">
      {{ valor }}{{ unidade }} = <strong>{{ Math.round(conta.px * 100) / 100 }}px</strong><br />
      conta: {{ conta.texto }}
    </p>
    <div class="trilho"><div class="barra" :style="{ width: Math.min(conta.px, 1000) + 'px' }"></div></div>
  </div>
</template>

<style scoped>
.lab {
  display: grid;
  gap: var(--esp-3);
}

.campos {
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

.lab-leitura {
  margin: 0;
}

.trilho {
  overflow: hidden; /* barras maiores que a tela são cortadas, sem rolagem horizontal */
}

.barra {
  height: 1.5rem;
  background: var(--destaque);
}
</style>
