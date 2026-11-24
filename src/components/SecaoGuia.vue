<script setup>
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { secoes } from '../secoes.js'

// Molde das 6 seções: explicação, (lab), código, pergunta-guia com resposta e fontes.
const props = defineProps({
  numero: { type: Number, required: true },
  titulo: { type: String, required: true },
  pergunta: { type: String, required: true },
  codigo: { type: String, required: true },
  fontes: {
    type: Array,
    required: true,
    validator: (lista) => lista.every((f) => f.texto && f.url),
  },
})

const route = useRoute()
const indice = computed(() => secoes.findIndex((s) => s.rota === route.path))
const anterior = computed(() => secoes[indice.value - 1])
const proxima = computed(() => secoes[indice.value + 1])
</script>

<template>
  <article>
    <p class="rotulo">Seção {{ props.numero }} de 6</p>
    <h1>{{ titulo }}</h1>

    <section>
      <h2>1 · Explicação</h2>
      <slot />
    </section>

    <section v-if="$slots.lab">
      <h2>Laboratório</h2>
      <slot name="lab" />
    </section>

    <section>
      <h2>2 · Exemplo de código</h2>
      <pre tabindex="0"><code>{{ codigo }}</code></pre>
    </section>

    <section class="resposta">
      <h2>3 · Pergunta-guia</h2>
      <p class="pergunta">{{ pergunta }}</p>
      <div class="texto-resposta"><slot name="resposta" /></div>
    </section>

    <section>
      <h2>4 · Fontes consultadas</h2>
      <ul>
        <li v-for="f in fontes" :key="f.url">
          <a :href="f.url" target="_blank" rel="noopener">{{ f.texto }}</a>
        </li>
      </ul>
    </section>

    <nav class="passos" aria-label="Navegar entre seções">
      <RouterLink v-if="anterior" :to="anterior.rota">← {{ anterior.titulo }}</RouterLink>
      <RouterLink v-if="proxima" :to="proxima.rota" class="proxima">{{ proxima.titulo }} →</RouterLink>
    </nav>
  </article>
</template>

<style scoped>
.rotulo {
  margin: 0 0 var(--esp-2);
  font-family: var(--mono);
  font-size: 0.8125rem;
  color: var(--tinta-suave);
}

section {
  margin-top: var(--esp-5);
}

.resposta {
  padding: var(--esp-3);
  background: var(--painel);
  border-left: 6px solid var(--ok);
}

.pergunta {
  margin: 0 0 var(--esp-3);
  font-weight: bold;
}

.texto-resposta :deep(p) {
  margin: 0 0 var(--esp-2);
}

ul {
  padding-left: var(--esp-4);
}

li {
  margin-bottom: var(--esp-2);
}

.passos {
  display: flex;
  flex-direction: column;
  gap: var(--esp-3);
  margin-top: var(--esp-5);
  padding-top: var(--esp-3);
  border-top: 2px solid var(--tinta);
}

@media (min-width: 48rem) {
  .passos {
    flex-direction: row;
    justify-content: space-between;
  }

  .proxima {
    margin-left: auto;
    text-align: right;
  }
}
</style>
