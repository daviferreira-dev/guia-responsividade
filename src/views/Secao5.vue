<script setup>
import SecaoGuia from '../components/SecaoGuia.vue'
import LabKey from '../components/LabKey.vue'

const codigo = `<!-- Cartao.vue: nome em PascalCase com 2+ palavras, props tipadas e evento -->
<script setup>
defineProps({
  titulo: { type: String, required: true },
  destaque: { type: Boolean, default: false },
})
defineEmits(['remover']) // o filho avisa, o pai decide
<\/script>

<template>
  <li :class="{ destaque }">
    {{ titulo }}
    <button @click="$emit('remover')">Remover</button>
  </li>
</template>

<!-- Lista.vue: :key único e estável (id), nunca o índice -->
<Cartao v-for="a in animais" :key="a.id" :titulo="a.nome" @remover="remover(a.id)" />

/* design tokens: cores e espaços definidos uma vez */
:root { --cor-destaque: #b83a0a; --esp-3: 1rem; }
.botao { background: var(--cor-destaque); padding: var(--esp-3); }

// rota carregada sob demanda: o código só baixa quando a página é aberta
{ path: '/sobre', component: () => import('./views/Sobre.vue') }`

const fontes = [
  { texto: 'Vue: Lista com v-for e :key', url: 'https://vuejs.org/guide/essentials/list.html#maintaining-state-with-key' },
  { texto: 'Vue: Guia de estilo', url: 'https://vuejs.org/style-guide/' },
  { texto: 'Vue Router: carregamento sob demanda', url: 'https://router.vuejs.org/guide/advanced/lazy-loading.html' },
  { texto: 'web.dev: Core Web Vitals', url: 'https://web.dev/articles/vitals' },
]
</script>

<template>
  <SecaoGuia
    :numero="5"
    titulo="Boas práticas em projetos Vue"
    pergunta="Uma lista de animais usa v-for sem :key, e cada item tem um campo de texto. A pessoa digita no campo do segundo animal e depois o primeiro animal é removido. O que pode acontecer com o texto digitado, e por quê?"
    :codigo="codigo"
    :fontes="fontes"
  >
    <ul>
      <li><strong>Pastas:</strong> <code>views/</code> para páginas (uma por rota), <code>components/</code> para peças reutilizáveis, <code>composables/</code> para lógica compartilhada, <code>assets/</code> para CSS e imagens.</li>
      <li><strong>Nomes:</strong> componentes em PascalCase com duas palavras (<code>SliderCampo</code>), para não confundir com tags HTML.</li>
      <li><strong>Props tipadas e eventos:</strong> o pai manda dados por props e o filho avisa por eventos.</li>
      <li><strong><code>:key</code> no v-for:</strong> dá identidade a cada item. Use um id estável.</li>
      <li><strong>Variáveis CSS como tokens:</strong> cores e espaços em <code>:root</code>; mudou ali, mudou no site todo.</li>
      <li><strong>Core Web Vitals:</strong> LCP (quando o maior conteúdo aparece, bom até 2,5 s), INP (resposta aos cliques, bom até 200 ms) e CLS (pulos de layout, bom até 0,1).</li>
      <li><strong>Rotas sob demanda:</strong> <code>() =&gt; import()</code> faz o navegador baixar só a página aberta, melhorando o LCP.</li>
    </ul>

    <template #lab>
      <LabKey />
    </template>

    <template #resposta>
      <p>
        Sem <code>:key</code>, o Vue reaproveita os elementos do DOM <strong>pela posição</strong>. Ao remover o
        primeiro animal, ele não apaga o primeiro elemento: atualiza o 1º com os dados do 2º, o 2º com os do 3º e
        apaga o último elemento.
      </p>
      <p>
        O texto digitado vive dentro do elemento do navegador (o campo), não nos dados. Então o texto escrito para o
        segundo animal <strong>fica no campo da posição 2, que agora mostra o terceiro animal</strong>: o texto
        aparece na linha errada. Com <code>:key="animal.id"</code>, o Vue sabe qual elemento pertence a qual animal
        e remove o certo, mantendo cada texto no seu animal.
      </p>
    </template>
  </SecaoGuia>
</template>
