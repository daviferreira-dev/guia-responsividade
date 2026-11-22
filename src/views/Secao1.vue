<script setup>
import SecaoGuia from '../components/SecaoGuia.vue'
import LabLargura from '../components/LabLargura.vue'

const codigo = `<!-- No <head> do HTML: sem esta linha o celular finge ter ~980px -->
<meta name="viewport" content="width=device-width, initial-scale=1">

/* CSS mobile-first: o que está fora de media query é o celular */
.cartoes {
  display: grid;
  gap: 1rem; /* 1 coluna por padrão */
}

/* A partir de 48rem (768px) a regra abaixo passa a valer */
@media (min-width: 48rem) {
  .cartoes {
    grid-template-columns: 1fr 1fr; /* 2 colunas */
  }
}`

const fontes = [
  { texto: 'MDN: Usando media queries', url: 'https://developer.mozilla.org/pt-BR/docs/Web/CSS/CSS_media_queries/Using_media_queries' },
  { texto: 'MDN: Meta tag viewport', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Viewport_meta_tag' },
  { texto: 'web.dev: Design responsivo (conceitos)', url: 'https://web.dev/learn/design/' },
]
</script>

<template>
  <SecaoGuia
    :numero="1"
    titulo="Por que responsividade importa"
    pergunta="Um site tem media queries bem escritas, mas não tem a meta tag viewport. Por que no celular ele aparece como a versão de computador, só que minúscula, e o que a meta viewport muda?"
    :codigo="codigo"
    :fontes="fontes"
  >
    <p>
      Uma página <strong>responsiva</strong> se adapta à tela: a mesma página serve para um celular de 360px e para
      um monitor de 1920px, sem rolagem horizontal e sem conteúdo cortado. Isso importa porque muita gente acessa
      pelo celular, e uma página que obriga a dar zoom e arrastar para os lados é ruim de usar.
    </p>
    <p>
      A ferramenta principal é a <strong>media query</strong>: um "se" do CSS. Ela diz "só aplique estas regras se a
      tela tiver pelo menos tanta largura". Usamos o jeito <em>mobile-first</em>: o CSS normal é o do celular e as
      media queries com <code>min-width</code> vão acrescentando ajustes para telas maiores.
    </p>
    <p>
      A <strong>meta viewport</strong> é uma linha no HTML que avisa o celular para usar a largura real da tela.
      Sem ela, nada do que escrevemos em media query funciona como esperado. Teste no laboratório abaixo.
    </p>

    <template #lab>
      <LabLargura />
    </template>

    <template #resposta>
      <p>
        Sem a meta viewport, o navegador do celular usa um <strong>viewport virtual de cerca de 980px</strong>,
        pensado para sites antigos. A página é montada como se a tela tivesse 980px e depois reduzida para caber
        nos 360px reais. Por isso aparece o layout de computador, só que minúsculo. As media queries também são
        avaliadas com 980px, então as regras "de celular" nunca entram.
      </p>
      <p>
        Com <code>width=device-width</code>, o viewport passa a ter a largura real do aparelho em pixels CSS, e as
        media queries enxergam 360px. O <code>initial-scale=1</code> começa sem zoom.
      </p>
    </template>
  </SecaoGuia>
</template>
