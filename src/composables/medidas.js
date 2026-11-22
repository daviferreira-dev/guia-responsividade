import { ref, onMounted, onUnmounted } from 'vue'

// Largura e altura atuais da janela.
export function useJanela() {
  const largura = ref(window.innerWidth)
  const altura = ref(window.innerHeight)
  const atualizar = () => {
    largura.value = window.innerWidth
    altura.value = window.innerHeight
  }
  onMounted(() => window.addEventListener('resize', atualizar))
  onUnmounted(() => window.removeEventListener('resize', atualizar))
  return { largura, altura }
}

// Largura real (em px) de um elemento, atualizada quando ele muda de tamanho.
export function useLargura(el) {
  const largura = ref(0)
  let observador
  onMounted(() => {
    observador = new ResizeObserver(([entrada]) => {
      largura.value = Math.round(entrada.contentRect.width)
    })
    observador.observe(el.value)
  })
  onUnmounted(() => observador?.disconnect())
  return largura
}
