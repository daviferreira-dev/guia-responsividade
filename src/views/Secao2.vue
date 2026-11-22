<script setup>
import SecaoGuia from '../components/SecaoGuia.vue'
import LabUnidades from '../components/LabUnidades.vue'

const codigo = `/* rem: relativo ao font-size do <html>. Ótimo para fontes e espaços */
html { /* NÃO fixe font-size em px aqui: isso desliga a preferência da pessoa */ }
h1   { font-size: 2rem; }     /* 2 x 16px = 32px */
.card { padding: 1.5rem; }

/* em: relativo à fonte do próprio elemento. Bom para padding de botão */
.botao { font-size: 1rem; padding: 0.5em 1em; }

/* %: relativo ao tamanho do pai */
.coluna { width: 50%; }

/* fr: fração do espaço livre em um grid */
.grade { display: grid; grid-template-columns: 1fr 2fr; }

/* vw / vh: 1% da largura / altura da janela */
.faixa { height: 50vh; }

/* dvh: altura "dinâmica", considera a barra do navegador no celular */
.tela-cheia { min-height: 100dvh; }

/* ch: largura do caractere "0". Perfeito para limitar linhas de texto */
.artigo { max-width: 65ch; }`

const fontes = [
  { texto: 'MDN: Valores e unidades CSS', url: 'https://developer.mozilla.org/pt-BR/docs/Learn_web_development/Core/Styling_basics/Values_and_units' },
  { texto: 'MDN: Unidades de viewport (vw, vh, dvh)', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS/length#relative_length_units_based_on_viewport' },
  { texto: 'web.dev: Unidades de viewport dinâmicas', url: 'https://web.dev/blog/viewport-units' },
]
</script>

<template>
  <SecaoGuia
    :numero="2"
    titulo="Unidades CSS"
    pergunta="Uma pessoa com baixa visão aumenta a fonte nas configurações do navegador. Por que o texto em px continua igual e o texto em rem aumenta?"
    :codigo="codigo"
    :fontes="fontes"
  >
    <p>
      O <code>px</code> é fixo. As outras unidades são <strong>relativas</strong>: o valor depende de outra
      medida, e é isso que deixa a página flexível.
    </p>
    <ul>
      <li><code>rem</code>: múltiplo da fonte do <code>&lt;html&gt;</code> (padrão 16px). Use em fontes e espaçamentos.</li>
      <li><code>em</code>: múltiplo da fonte do próprio elemento. Use em paddings que devem crescer com o texto.</li>
      <li><code>%</code>: fração do tamanho do pai. Use em larguras.</li>
      <li><code>fr</code>: fração do espaço livre no grid. Só existe em <code>grid-template-columns</code>.</li>
      <li><code>vw</code> e <code>vh</code>: 1% da largura e da altura da janela. Use em blocos grandes.</li>
      <li><code>dvh</code>: como o vh, mas acompanha a barra do navegador que aparece e some no celular.</li>
      <li><code>ch</code>: largura de um caractere. Use no <code>max-width</code> de textos (60 a 75ch).</li>
    </ul>

    <template #lab>
      <LabUnidades />
    </template>

    <template #resposta>
      <p>
        O <code>px</code> é um valor absoluto: 16px são sempre 16px, não importa a preferência da pessoa. O
        <code>rem</code> é relativo à fonte do elemento raiz, e por padrão essa fonte <em>herda a preferência de
        tamanho de fonte do navegador</em>. Se a pessoa muda de 16px para 24px, <code>1rem</code> passa a valer
        24px e tudo que usa rem cresce junto.
      </p>
      <p>
        Por isso nunca se deve escrever <code>html { font-size: 16px }</code>: isso troca a preferência da pessoa
        por um valor fixo.
      </p>
    </template>
  </SecaoGuia>
</template>
