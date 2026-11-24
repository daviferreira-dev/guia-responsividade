<script setup>
import { computed, ref } from 'vue'
import SliderCampo from './SliderCampo.vue'
import { useLargura } from '../composables/medidas.js'

// Lab 1: arraste a largura da "tela" e veja a regra de media query entrar e sair.
// Usamos @container (mesma lógica de @media, mas olhando a caixa e não a janela).
const pedida = ref(360)
const comMeta = ref(true)
const moldura = ref(null)
const real = useLargura(moldura)

// Sem a meta viewport, o celular monta a página em ~980px e depois encolhe tudo.
const LARGURA_VIRTUAL = 980
const larguraDoLayout = computed(() => (comMeta.value ? real.value : LARGURA_VIRTUAL))
const zoom = computed(() => (comMeta.value ? 1 : real.value / LARGURA_VIRTUAL))
const regraAtiva = computed(() => larguraDoLayout.value >= 480)
</script>

<template>
  <div class="lab">
    <SliderCampo v-model="pedida" rotulo="Largura da tela" :min="240" :max="960" :passo="10" />
    <label class="meta">
      <input v-model="comMeta" type="checkbox" />
      <code>&lt;meta name="viewport"&gt;</code> presente
    </label>

    <div class="janela">
    <div ref="moldura" class="moldura" :style="{ width: pedida + 'px' }">
      <div class="pagina" :style="{ width: comMeta ? '100%' : LARGURA_VIRTUAL + 'px', zoom }">
        <div class="mini">
          <p class="barra">meu-site</p>
          <p class="menu">menu</p>
          <p class="cartao">cartão 1</p>
          <p class="cartao">cartão 2</p>
          <p class="cartao">cartão 3</p>
        </div>
      </div>
    </div>
    </div>

    <p class="lab-leitura" aria-live="polite">
      Tela: {{ real }}px · layout calculado com {{ larguraDoLayout }}px ·
      <strong>@media (min-width: 30rem) {{ regraAtiva ? 'ATIVA → 2 colunas' : 'inativa → 1 coluna' }}</strong>
    </p>
  </div>
</template>

<style scoped>
.meta {
  display: flex;
  align-items: center;
  gap: var(--esp-2);
  margin-top: var(--esp-2);
  font-size: 0.875rem;
}

.meta input {
  width: 1.5rem;
  min-height: 1.5rem;
  accent-color: var(--destaque);
}

.janela {
  margin-top: var(--esp-3);
  overflow-x: auto; /* a rolagem fica só dentro do lab */
}

.moldura {
  overflow: hidden;
  background: var(--painel);
  border: 3px solid var(--tinta);
}

.pagina {
  container-type: inline-size;
}

/* Mobile-first: sem media query = 1 coluna */
.mini {
  display: grid;
  gap: 0.5rem;
  padding: 0.5rem;
}

.mini p {
  margin: 0;
  padding: 0.75rem;
  font-family: var(--mono);
  font-size: 0.8125rem;
}

.barra {
    background: var(--sol);
  color: var(--papel);
}

.menu {
  background: var(--amarelo);
  color: var(--papel);
}

.cartao {
  background: var(--papel);
  border: 1px solid var(--tinta);
}

/* 30rem = 480px (com fonte padrão de 16px) */
@container (min-width: 30rem) {
  .mini {
    grid-template-columns: 1fr 1fr;
  }

  .barra {
    grid-column: 1 / -1;
  }
}
</style>
