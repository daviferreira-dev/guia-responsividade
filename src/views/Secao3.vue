<script setup>
import SecaoGuia from '../components/SecaoGuia.vue'
import LabFlex from '../components/LabFlex.vue'
import LabGrid from '../components/LabGrid.vue'

const codigo = `/* FLEXBOX: organiza itens em UMA linha (ou coluna) */
.barra {
  display: flex;
  justify-content: space-between; /* distribui no eixo principal (horizontal) */
  align-items: center;            /* alinha no eixo cruzado (vertical) */
  flex-wrap: wrap;                /* quebra para a próxima linha se faltar espaço */
  gap: 1rem;                      /* espaço entre os itens, sem margem */
}

/* GRID: organiza em linhas E colunas */
.cards {
  display: grid;
  gap: 1rem;
  /* auto-fit: cria quantas colunas couberem
     minmax(14rem, 1fr): cada coluna tem no mínimo 14rem e divide o que sobra */
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
}
/* Sem nenhuma media query, os cards já se adaptam à largura! */`

const fontes = [
  { texto: 'MDN: Guia de flexbox', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_flexible_box_layout/Basic_concepts_of_flexbox' },
  { texto: 'MDN: repeat() e auto-fit', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/repeat' },
  { texto: 'CSS-Tricks: auto-fill vs auto-fit', url: 'https://css-tricks.com/auto-sizing-columns-css-grid-auto-fill-vs-auto-fit/' },
]
</script>

<template>
  <SecaoGuia
    :numero="3"
    titulo="Flexbox e Grid"
    pergunta="Com repeat(auto-fit, minmax(14rem, 1fr)) e gap: 1rem, a partir de qual largura em px os cards passam de 1 para 2 colunas? Mostrar a conta, com 1rem = 16px."
    :codigo="codigo"
    :fontes="fontes"
  >
    <p>
      <strong>Flexbox</strong> alinha itens em uma direção. <code>justify-content</code> controla o espaço no eixo
      principal, <code>align-items</code> no eixo cruzado, <code>flex-wrap</code> deixa os itens quebrarem de linha
      e <code>gap</code> cria espaço entre eles.
    </p>
    <p>
      <strong>Grid</strong> trabalha em duas direções. Com <code>repeat(auto-fit, minmax(14rem, 1fr))</code>, o
      navegador cria quantas colunas de pelo menos 14rem couberem e divide o espaço que sobrar.
    </p>

    <template #lab>
      <h3>Flexbox</h3>
      <LabFlex />
      <h3>Grid</h3>
      <LabGrid />
    </template>

    <template #resposta>
      <p>Cada coluna precisa de no mínimo 14rem = 14 × 16 = <strong>224px</strong>, e o gap é 1rem = <strong>16px</strong>.</p>
      <p>Para 2 colunas: 224 + 16 + 224 = 2 × 224 + 1 × 16 = 448 + 16 = <strong>464px</strong>.</p>
      <p>
        Então: com menos de 464px sobra uma coluna só; a partir de <strong>464px</strong> passam a ser 2 colunas.
        Em geral, para n colunas: <code>n × 224 + (n − 1) × 16</code>. A tabela do laboratório mostra os outros casos.
      </p>
    </template>
  </SecaoGuia>
</template>

<style scoped>
h3 {
  margin: var(--esp-4) 0 var(--esp-2);
  font-size: 1.125rem;
}
</style>
