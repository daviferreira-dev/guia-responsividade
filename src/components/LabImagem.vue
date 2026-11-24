<script setup>
import { onUnmounted, ref } from 'vue'

// Lab 5: a "imagem" chega 2 segundos depois, como numa conexão lenta.
// Sem width/height o navegador não sabe o tamanho antes de baixar e o texto pula.
const desenho = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450">
<rect width="800" height="450" fill="#2a0b45"/><path d="M0 330 220 150 400 290 560 190 800 360V450H0Z" fill="#ff3d8b"/>
<circle cx="640" cy="90" r="40" fill="#ffd23f"/><text x="24" y="48" fill="#ffd23f" font-family="monospace" font-size="28">800 × 450</text></svg>`
const src = 'data:image/svg+xml,' + encodeURIComponent(desenho)

const carregada = ref(false)
let timer

function carregar() {
  carregada.value = false
  clearTimeout(timer)
  timer = setTimeout(() => (carregada.value = true), 2000)
}
onUnmounted(() => clearTimeout(timer))
</script>

<template>
  <div class="lab">
    <button type="button" @click="carregar">Carregar imagem (2 s de atraso)</button>
    <div class="painel">
      <figure>
        <figcaption>Sem width e height</figcaption>
        <img v-if="carregada" :src="src" alt="Montanhas ao pôr do sol (desenho)" />
        <p>Texto abaixo da imagem. Ele pula quando a imagem chega.</p>
      </figure>
      <figure>
        <figcaption>Com width="800" height="450"</figcaption>
        <!-- Simulação: com width/height o navegador já conhece a proporção e reserva a caixa
             antes do download. Aqui a imagem fica invisível (mas ocupando espaço) até "chegar". -->
        <img
          :src="src"
          width="800"
          height="450"
          :style="{ visibility: carregada ? 'visible' : 'hidden' }"
          alt="Montanhas ao pôr do sol (desenho)"
        />
        <p>Texto abaixo da imagem. Ele fica parado.</p>
      </figure>
    </div>
  </div>
</template>

<style scoped>
.painel {
  display: grid;
  gap: var(--esp-4);
  margin-top: var(--esp-3);
}

figure {
  margin: 0;
}

figcaption {
  margin-bottom: var(--esp-2);
  font-family: var(--mono);
  font-size: 0.8125rem;
  font-weight: bold;
}

p {
  margin: var(--esp-2) 0 0;
  font-size: 0.9375rem;
}

@media (min-width: 48rem) {
  .painel {
    grid-template-columns: 1fr 1fr;
  }
}
</style>
