<script setup>
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'

// Resposta: 4 × 14rem + 3 × 1rem = 4 × 224 + 3 × 16 = 944px (laboratório de Grid, seção 3)
const RESPOSTA = 944
const tentativa = ref(null)
const conferido = ref(false)

const resultado = computed(() => {
  if (!conferido.value) return ''
  if (tentativa.value === RESPOSTA) return 'Correto! 4 × 224 + 3 × 16 = 944px.'
  return tentativa.value > RESPOSTA
    ? 'Ainda é menos que isso. Procure o ponto exato onde a 4ª coluna aparece.'
    : 'Ainda não cabem 4 colunas nessa largura. Use o laboratório de Grid.'
})
</script>

<template>
  <h1>Desafio</h1>
  <p>Esta pergunta só se responde usando o guia.</p>
  <p class="pergunta">
    No laboratório de Grid, a partir de qual largura do contêiner (em px) aparecem
    <strong>4 colunas</strong>?
  </p>
  <p>Dica: vá à <RouterLink to="/secao/3">seção 3</RouterLink> e arraste o controle deslizante, ou faça a conta.</p>

  <form @submit.prevent="conferido = true">
    <label>
      Largura em px
      <input v-model.number="tentativa" type="number" min="0" required @input="conferido = false" />
    </label>
    <button type="submit">Conferir</button>
  </form>
  <p class="resultado" role="status">{{ resultado }}</p>
</template>

<style scoped>
.pergunta {
  font-size: 1.25rem;
}

form {
  display: flex;
  flex-wrap: wrap;
  align-items: end;
  gap: var(--esp-3);
}

label {
  display: grid;
  gap: var(--esp-1);
  font-family: var(--mono);
  font-size: 0.875rem;
}

.resultado {
  min-height: 1.6em; /* reserva a linha para o resultado não empurrar a página (CLS) */
  font-weight: bold;
}
</style>
