<script setup>
import { RouterLink } from 'vue-router'
import { secoes } from '../secoes.js'
</script>

<template>
  <h1>Caderno de Responsividade</h1>
  <p class="intro">
    Um guia interativo para criar páginas que funcionam em qualquer tela, do celular ao monitor grande.
    Cada seção tem explicação curta, código comentado, a resposta de uma pergunta-guia e as fontes.
    Os laboratórios deixam você mexer e ver o conceito acontecer.
  </p>
  <p>
    Dica: veja o indicador laranja no canto da tela. Ele mostra a largura da janela e o breakpoint ativo
    enquanto você redimensiona.
  </p>
  <ol>
    <li v-for="s in secoes" :key="s.rota">
      <RouterLink :to="s.rota">{{ s.titulo }}</RouterLink>
    </li>
  </ol>
</template>

<style scoped>
.intro {
  font-size: 1.125rem;
}

ol {
  display: grid;
  gap: var(--esp-2);
  padding-left: var(--esp-4);
  font-family: var(--mono);
}
</style>
