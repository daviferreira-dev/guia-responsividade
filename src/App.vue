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
  <!-- href="#/" porque a rota usa o hash da URL; o foco vai por JS -->
  <a class="pular" href="#/" @click.prevent="$refs.principal.focus()">Pular para o conteúdo</a>
  <header class="topo">
    <RouterLink to="/" class="marca">Caderno de<br />Responsividade</RouterLink>
    <!-- Celular e tablet: o menu vira este botão -->
    <button class="menu-btn" type="button" aria-controls="menu" :aria-expanded="aberto" @click="aberto = !aberto">
      {{ aberto ? 'Fechar' : 'Menu' }}
    </button>
    <nav id="menu" :class="{ aberto }" aria-label="Seções do guia">
      <RouterLink v-for="(s, i) in secoes" :key="s.rota" :to="s.rota" :style="{ '--i': i }">
        <span class="num">{{ s.num }}</span>
        <span>{{ s.nome }}</span>
      </RouterLink>
    </nav>
  </header>
  <div class="pagina">
    <main ref="principal" tabindex="-1">
      <RouterView />
    </main>
  </div>
  <IndicadorLargura />
</template>

<style scoped>
.pular {
  position: absolute;
  left: var(--esp-2);
  top: -4rem;
  z-index: 20;
  padding: var(--esp-2) var(--esp-3);
  background: var(--tinta);
  color: var(--papel);
}

.pular:focus {
  top: var(--esp-2);
}

/* Mobile-first: barra no topo */
.topo {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: var(--esp-2) var(--esp-3);
  padding: var(--esp-3);
  background: linear-gradient(90deg, #2a0b45, #7a1760 60%, #c2306b);
  border-bottom: 4px solid var(--amarelo);
}

.marca {
  font-family: var(--titulo);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 1.15;
  color: var(--tinta);
  text-decoration: none;
}

.menu-btn {
  background: transparent;
  color: var(--tinta);
  box-shadow: inset 0 0 0 2px var(--tinta);
}

nav {
  display: none;
  flex-basis: 100%;
  flex-direction: column;
  gap: var(--esp-1);
}

nav.aberto {
  display: flex;
}

nav a {
  display: grid;
  grid-template-columns: 2.5rem 1fr;
  align-items: center;
  padding: var(--esp-2) var(--esp-2);
  color: var(--tinta);
  font-size: 0.9375rem;
  text-decoration: none;
  border-radius: var(--raio);
}

nav a:hover {
  background: rgba(255, 241, 220, 0.12);
}

.num {
  font-family: var(--titulo);
  font-size: 1.25rem;
  color: var(--amarelo);
}

nav a.router-link-exact-active {
  background: var(--sol);
  color: var(--papel);
  font-weight: bold;
}

nav a.router-link-exact-active .num {
  color: var(--papel);
}

/* Desktop: menu fixo na lateral esquerda */
@media (min-width: 64rem) {
  .topo {
    position: fixed;
    inset: 0 auto 0 0;
    z-index: 5;
    width: 17rem;
    flex-direction: column;
    flex-wrap: nowrap;
    align-items: stretch;
    justify-content: flex-start;
    gap: var(--esp-4);
    padding: var(--esp-4) var(--esp-3);
    overflow-y: auto;
    background: linear-gradient(180deg, #1d0733, #4a0f55 55%, #a8235f);
    border-bottom: 0;
    border-right: 4px solid var(--amarelo);
  }

  .marca {
    padding-bottom: var(--esp-3);
    font-size: 1.625rem;
    border-bottom: 2px solid rgba(255, 241, 220, 0.25);
  }

  .menu-btn {
    display: none;
  }

  nav {
    display: flex;
    flex-basis: auto;
  }

  nav a {
    padding: 0.7rem var(--esp-2);
    animation: entra 0.5s both;
    animation-delay: calc(var(--i) * 70ms);
  }

  .pagina {
    padding-left: 17rem;
  }
}

@keyframes entra {
  from {
    opacity: 0;
    transform: translateX(-1rem);
  }
}
</style>
