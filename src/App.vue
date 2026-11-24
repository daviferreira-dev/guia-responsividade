<script setup>
import { ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { secoes } from './secoes.js'
import IndicadorLargura from './components/IndicadorLargura.vue'

const aberto = ref(false)
const route = useRoute()

// Ao trocar de página, o menu do celular fecha sozinho.
watch(() => route.fullPath, () => (aberto.value = false))
</script>

<template>
  <!-- href="#" não serve: a rota usa o hash da URL, então o foco vai por JS -->
  <a class="pular" href="#/" @click.prevent="$refs.principal.focus()">Pular para o conteúdo</a>
  <header class="topo">
    <RouterLink to="/" class="marca">Caderno de<br />Responsividade</RouterLink>
    <!-- No celular o menu vira este botão -->
    <button
      class="menu-btn"
      type="button"
      aria-controls="menu"
      :aria-expanded="aberto"
      @click="aberto = !aberto"
    >
      {{ aberto ? 'Fechar' : 'Menu' }}
    </button>
    <nav id="menu" :class="{ aberto }" aria-label="Seções do guia">
      <RouterLink v-for="s in secoes" :key="s.rota" :to="s.rota">{{ s.curto }}</RouterLink>
    </nav>
  </header>
  <main ref="principal" tabindex="-1">
    <RouterView />
  </main>
  <IndicadorLargura />
</template>

<style scoped>
.pular {
  position: absolute;
  left: var(--esp-2);
  top: -4rem;
  padding: var(--esp-2) var(--esp-3);
  background: var(--tinta);
  color: var(--papel);
}

.pular:focus {
  top: var(--esp-2);
}

.topo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--esp-2) var(--esp-3);
  padding: var(--esp-3);
  background: linear-gradient(90deg, #2a0b45, #7a1760 60%, #c2306b);
  color: var(--tinta);
  border-bottom: 4px solid var(--amarelo);
}

.marca {
  font-family: var(--titulo);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 1.2;
  color: var(--tinta);
  text-decoration: none;
}

.menu-btn {
  background: transparent;
  color: var(--tinta);
  box-shadow: inset 0 0 0 2px var(--tinta);
}

/* Celular: o menu fica escondido até o botão abrir */
nav {
  display: none;
  flex-basis: 100%;
  flex-direction: column;
}

nav.aberto {
  display: flex;
}

nav a {
  padding: var(--esp-3) 0;
  border-top: 1px solid rgba(255, 241, 220, 0.3);
  color: var(--tinta);
  font-family: var(--mono);
  font-size: 0.875rem;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: var(--amarelo);
  text-decoration: underline;
  text-decoration-color: var(--amarelo);
  text-underline-offset: 0.4em;
}

/* Tablet em diante: o botão some e o menu vira uma linha */
@media (min-width: 48rem) {
  .menu-btn {
    display: none;
  }

  nav {
    display: flex;
    flex-basis: auto;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 0 var(--esp-3);
  }

  nav a {
    padding: var(--esp-2) 0;
    border-top: 0;
  }
}
</style>
