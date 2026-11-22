<script setup>
import SecaoGuia from '../components/SecaoGuia.vue'

// ATENÇÃO: tema provisório. Trocar pelo título/pergunta da seção 6 do PDF do professor.
const codigo = `<!-- Botão de menu acessível -->
<button
  type="button"
  aria-controls="menu"          <!-- qual elemento este botão controla -->
  :aria-expanded="aberto"       <!-- anuncia "expandido" ou "recolhido" -->
>
  Menu                          <!-- texto visível: o leitor de tela lê isto -->
</button>

/* Se o botão só tiver um ícone, dê um nome a ele: aria-label="Abrir menu" */

/* alvo de toque confortável */
button { min-height: 2.75rem; }   /* 2.75rem = 44px */

/* foco visível para quem navega pelo teclado */
:focus-visible { outline: 3px solid #b83a0a; outline-offset: 2px; }

/* respeita quem desativou animações no sistema */
@media (prefers-reduced-motion: reduce) {
  * { animation: none !important; transition: none !important; }
}`

const fontes = [
  { texto: 'MDN: Acessibilidade em CSS e JavaScript (aria-expanded)', url: 'https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-expanded' },
  { texto: 'W3C: Tamanho mínimo de alvo (WCAG 2.2)', url: 'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html' },
  { texto: 'Chrome DevTools: simular dispositivos móveis', url: 'https://developer.chrome.com/docs/devtools/device-mode' },
]
</script>

<template>
  <SecaoGuia
    :numero="6"
    titulo="Acessibilidade e testes"
    pergunta="O botão do menu tem só o ícone ☰, sem texto. Uma pessoa com leitor de tela ouve apenas 'botão'. O que falta nele, e para que serve o aria-expanded?"
    :codigo="codigo"
    :fontes="fontes"
  >
    <p>
      Responsivo também é usável: botões que dá para tocar com o dedo, foco visível para quem usa o teclado, texto
      que cresce com a preferência da pessoa, contraste suficiente entre texto e fundo.
    </p>
    <p>Como testar:</p>
    <ul>
      <li>No navegador, abra o modo dispositivo do DevTools (F12) e teste de 320px até 1280px.</li>
      <li>Confira que não existe rolagem horizontal em 320px.</li>
      <li>Aumente o zoom para 200% e a fonte nas configurações do navegador.</li>
      <li>Abra o site publicado em um <strong>celular de verdade</strong>: o DevTools não mostra tudo.</li>
    </ul>

    <template #resposta>
      <p>
        Falta um <strong>nome acessível</strong>. O leitor de tela lê o texto do botão; se existir só um ícone, ele
        não tem o que ler. A solução é colocar texto (como o "Menu" deste site) ou um <code>aria-label</code>, como
        "Abrir menu".
      </p>
      <p>
        O <code>aria-expanded</code> informa o <strong>estado</strong>: "expandido" quando o menu está aberto e
        "recolhido" quando está fechado. Sem ele, a pessoa aperta o botão e não sabe se algo mudou.
      </p>
    </template>
  </SecaoGuia>
</template>
