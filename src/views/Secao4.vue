<script setup>
import SecaoGuia from '../components/SecaoGuia.vue'
import LabImagem from '../components/LabImagem.vue'

const codigo = `<!-- HTML -->
<img
  src="praia-800.jpg"
  srcset="praia-400.jpg 400w, praia-800.jpg 800w, praia-1600.jpg 1600w"
  sizes="(min-width: 48rem) 46rem, 100vw"  <!-- largura que a imagem ocupa na tela -->
  width="800" height="450"                 <!-- reserva o espaço: evita o "pulo" -->
  loading="lazy"                           <!-- só baixa quando chega perto da tela -->
  alt="Praia ao entardecer"
>

/* CSS */
img {
  max-width: 100%; /* nunca passa da largura do pai */
  height: auto;    /* mantém a proporção quando a largura encolhe */
}

.capa {
  width: 100%;
  aspect-ratio: 16 / 9; /* caixa com proporção fixa */
  object-fit: cover;    /* a imagem preenche a caixa e corta o excesso */
}`

const fontes = [
  { texto: 'MDN: Imagens responsivas', url: 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Structuring_content/HTML_images#imagens_responsivas' },
  { texto: 'web.dev: Cumulative Layout Shift (CLS)', url: 'https://web.dev/articles/cls' },
  { texto: 'web.dev: Otimizar CLS (width e height em imagens)', url: 'https://web.dev/articles/optimize-cls' },
]
</script>

<template>
  <SecaoGuia
    :numero="4"
    titulo="Imagens responsivas"
    pergunta="Por que a imagem sem width e height empurra o texto para baixo quando termina de carregar? Qual métrica do Google mede esse problema?"
    :codigo="codigo"
    :fontes="fontes"
  >
    <p>
      Uma imagem responsiva nunca passa da largura da tela (<code>max-width: 100%</code>) e mantém a proporção
      (<code>height: auto</code>). Os atributos <code>width</code> e <code>height</code> no HTML dizem o tamanho
      original, para o navegador reservar o espaço antes do download.
    </p>
    <p>
      <code>loading="lazy"</code> adia o download de imagens fora da tela. <code>aspect-ratio</code> e
      <code>object-fit</code> controlam a caixa e o recorte. <code>srcset</code> oferece versões em vários tamanhos
      para o celular não baixar a imagem gigante do desktop.
    </p>

    <template #lab>
      <LabImagem />
    </template>

    <template #resposta>
      <p>
        Sem <code>width</code> e <code>height</code>, o navegador só descobre o tamanho da imagem depois de
        baixá-la. Até lá ela ocupa 0px de altura; quando chega, ocupa o espaço de repente e <strong>empurra o texto
        para baixo</strong>. Com os atributos, o navegador calcula a proporção (16:9) logo que lê o HTML e reserva a
        caixa antes do download.
      </p>
      <p>
        A métrica do Google é o <strong>CLS (Cumulative Layout Shift)</strong>, que soma os "pulos" de layout. O
        valor considerado bom é até 0,1.
      </p>
    </template>
  </SecaoGuia>
</template>
