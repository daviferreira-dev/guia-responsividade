<script setup>
import { ref } from 'vue'

// Lab 6: o que o :key faz. Digite no campo do 2º animal e remova o 1º.
const comKey = ref(false)
const inicial = () => [
  { id: 1, nome: 'Gato' },
  { id: 2, nome: 'Cachorro' },
  { id: 3, nome: 'Coelho' },
]
const animais = ref(inicial())

const remover = (id) => (animais.value = animais.value.filter((a) => a.id !== id))
const reiniciar = () => (animais.value = inicial())
</script>

<template>
  <div class="lab">
    <label class="opcao"><input v-model="comKey" type="checkbox" /> usar <code>:key="animal.id"</code></label>
    <ul>
      <!-- Os campos de texto NÃO usam v-model: o texto fica só dentro do elemento do navegador -->
      <li v-for="a in animais" :key="comKey ? a.id : undefined">
        <span>{{ a.nome }}</span>
        <input type="text" :aria-label="`Anotação sobre ${a.nome}`" placeholder="digite aqui" />
        <button type="button" @click="remover(a.id)">Remover</button>
      </li>
    </ul>
    <button type="button" @click="reiniciar">Reiniciar</button>
  </div>
</template>

<style scoped>
.opcao {
  display: flex;
  align-items: center;
  gap: var(--esp-2);
}

.opcao input {
  width: 1.5rem;
  min-height: 1.5rem;
  accent-color: var(--destaque);
}

ul {
  display: grid;
  gap: var(--esp-2);
  margin: var(--esp-3) 0;
  padding: 0;
  list-style: none;
}

li {
  display: grid;
  grid-template-columns: 5rem 1fr auto;
  align-items: center;
  gap: var(--esp-2);
}

li input {
  min-width: 0; /* deixa o campo encolher em telas pequenas */
}
</style>
