<script setup>
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { RouterLink, RouterView, useRoute } from 'vue-router'
import { secoes } from './secoes.js'
import IndicadorLargura from './components/IndicadorLargura.vue'

const aberto = ref(false)
const route = useRoute()
// "Nível de procurado": uma estrela por seção já alcançada
const estrelas = computed(() => secoes.findIndex((s) => s.rota === route.path) + 1)

// Ao trocar de página, o menu do celular fecha sozinho.
watch(() => route.fullPath, () => (aberto.value = false))
// Menu aberto trava a rolagem da página por trás.
watch(aberto, (v) => (document.body.style.overflow = v ? 'hidden' : ''))

const fecharComEsc = (e) => e.key === 'Escape' && (aberto.value = false)
onMounted(() => window.addEventListener('keydown', fecharComEsc))
onUnmounted(() => window.removeEventListener('keydown', fecharComEsc))
</script>

<template>
  <!-- href="#/" porque a rota usa o hash da URL; o foco vai por JS -->
  <a class="pular" href="#/" @click.prevent="$refs.principal.focus()">Pular para o conteúdo</a>
  <header class="topo">
    <RouterLink to="/" class="marca">
      Caderno de<br />Responsividade
      <small>guia interativo · vol. VI</small>
    </RouterLink>
    <!-- Celular e tablet: o menu vira este botão -->
    <button
      class="menu-btn"
      :class="{ aberto }"
      type="button"
      aria-controls="menu"
      :aria-expanded="aberto"
      :aria-label="aberto ? 'Fechar menu' : 'Abrir menu'"
      @click="aberto = !aberto"
    >
      <span></span><span></span><span></span>
    </button>
    <nav id="menu" :class="{ aberto }" aria-label="Seções do guia">
      <RouterLink v-for="(s, i) in secoes" :key="s.rota" :to="s.rota" :style="{ '--i': i }">
        <span class="num">{{ s.num }}</span>
        <span class="nome">{{ s.nome }}</span>
      </RouterLink>
      <p class="procurado" :aria-label="`Progresso: ${estrelas} de ${secoes.length}`">
        <span class="rotulo">Nível de procurado</span>
        <span aria-hidden="true">
          <span v-for="n in secoes.length" :key="n" :class="{ ligada: n <= estrelas }">★</span>
        </span>
      </p>
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
  z-index: 50;
  padding: var(--esp-2) var(--esp-3);
  background: var(--tinta);
  color: var(--papel);
}

.pular:focus {
  top: var(--esp-2);
}

/* ---------- Mobile-first: barra fixa no topo + gaveta de menu ---------- */
.topo {
  --alt-topo: 4.25rem;
  position: sticky;
  top: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--esp-3);
  padding: 0.75rem var(--esp-3);
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

.marca small {
  display: none;
  margin-top: var(--esp-2);
  font-family: var(--mono);
  font-size: 0.6875rem;
  letter-spacing: 0.14em;
  color: var(--amarelo);
}

/* Botão hambúrguer que vira X */
.menu-btn {
  position: relative;
  width: 2.75rem;
  padding: 0;
  background: rgba(10, 2, 19, 0.35);
  box-shadow: inset 0 0 0 2px var(--tinta);
  border-radius: 50%;
}

.menu-btn span {
  position: absolute;
  left: 0.75rem;
  width: 1.25rem;
  height: 2px;
  background: var(--tinta);
  transition: transform 0.25s, opacity 0.2s;
}

.menu-btn span:nth-child(1) { top: 1.0625rem; }
.menu-btn span:nth-child(2) { top: 1.3125rem; }
.menu-btn span:nth-child(3) { top: 1.5625rem; }

.menu-btn.aberto span:nth-child(1) { transform: translateY(0.25rem) rotate(45deg); }
.menu-btn.aberto span:nth-child(2) { opacity: 0; }
.menu-btn.aberto span:nth-child(3) { transform: translateY(-0.25rem) rotate(-45deg); }

/* Gaveta: ocupa a tela abaixo da barra */
nav {
  position: fixed;
  inset: var(--alt-topo) 0 0 0;
  display: none;
  flex-direction: column;
  gap: var(--esp-2);
  padding: var(--esp-4) var(--esp-3);
  overflow-y: auto;
  background:
    radial-gradient(circle at 50% 110%, rgba(255, 210, 63, 0.35), transparent 60%),
    linear-gradient(180deg, #1d0733, #4a0f55 60%, #8f1d5e);
}

nav.aberto {
  display: flex;
}

nav a {
  display: grid;
  grid-template-columns: 3.25rem 1fr;
  align-items: center;
  min-height: 3.5rem;
  padding: 0 var(--esp-3);
  color: var(--tinta);
  font-size: 1.0625rem;
  text-decoration: none;
  background: rgba(255, 241, 220, 0.06);
  border: 1px solid rgba(255, 241, 220, 0.18);
  border-left: 4px solid var(--destaque);
  border-radius: var(--raio);
}

nav a:hover {
  background: rgba(255, 241, 220, 0.14);
}

.num {
  font-family: var(--titulo);
  font-size: 1.5rem;
  color: var(--amarelo);
}

nav a.router-link-exact-active {
  background: var(--sol);
  border-color: transparent;
  color: var(--papel);
  font-weight: bold;
}

nav a.router-link-exact-active .num {
  color: var(--papel);
}

.procurado {
  margin: auto 0 0;
  padding-top: var(--esp-3);
  font-family: var(--mono);
  font-size: 0.6875rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.procurado .rotulo {
  display: block;
  margin-bottom: var(--esp-1);
}

.procurado span span {
  font-size: 1.5rem;
  color: rgba(255, 241, 220, 0.25);
}

.procurado span span.ligada {
  color: var(--amarelo);
  text-shadow: 0 0 0.5rem var(--laranja);
}

/* ---------- Desktop: menu fixo na lateral esquerda ---------- */
@media (min-width: 64rem) {
  .topo {
    position: fixed;
    inset: 0 auto 0 0;
    width: 17.5rem;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    gap: var(--esp-4);
    padding: var(--esp-4) var(--esp-3);
    background: linear-gradient(180deg, #1d0733, #4a0f55 55%, #a8235f);
    border-bottom: 0;
    border-right: 4px solid var(--amarelo);
  }

  .marca {
    padding-bottom: var(--esp-3);
    font-size: 1.75rem;
    border-bottom: 2px solid rgba(255, 241, 220, 0.25);
  }

  .marca small {
    display: block;
  }

  .menu-btn {
    display: none;
  }

  nav {
    position: static;
    display: flex;
    flex: 1;
    gap: var(--esp-1);
    padding: 0;
    background: none;
  }

  nav a {
    grid-template-columns: 2.5rem 1fr;
    min-height: 0;
    padding: 0.65rem var(--esp-2);
    font-size: 0.9375rem;
    background: none;
    border: 0;
    border-left: 3px solid transparent;
    animation: entra 0.5s both;
    animation-delay: calc(var(--i) * 70ms);
    transition: transform 0.15s, background 0.15s;
  }

  nav a:hover {
    background: rgba(255, 241, 220, 0.12);
    border-left-color: var(--destaque);
    transform: translateX(0.25rem);
  }

  nav a.router-link-exact-active {
    border-left-color: var(--amarelo);
    transform: none;
  }

  .num {
    font-size: 1.25rem;
  }

  .procurado {
    border-top: 2px solid rgba(255, 241, 220, 0.25);
  }

  .procurado span span {
    font-size: 1.25rem;
  }

  .pagina {
    padding-left: 17.5rem;
  }
}

@keyframes entra {
  from {
    opacity: 0;
    transform: translateX(-1rem);
  }
}
</style>
