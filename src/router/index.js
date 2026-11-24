import { createRouter, createWebHashHistory } from 'vue-router'
import { secoes } from '../secoes.js'

// Uma rota por seção, todas carregadas sob demanda (import dinâmico):
// o navegador só baixa o código da seção quando a pessoa abre a página.
const views = {
  '/secao/1': () => import('../views/Secao1.vue'),
  '/secao/2': () => import('../views/Secao2.vue'),
  '/secao/3': () => import('../views/Secao3.vue'),
  '/secao/4': () => import('../views/Secao4.vue'),
  '/secao/5': () => import('../views/Secao5.vue'),
  '/desafio': () => import('../views/Desafio.vue'),
}

export default createRouter({
  // Hash (#/secao/1): funciona em Vercel, Netlify e GitHub Pages sem configurar redirecionamento.
  history: createWebHashHistory(),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/Home.vue') },
    ...secoes.map((s) => ({ path: s.rota, component: views[s.rota], meta: { titulo: s.titulo } })),
  ],
  scrollBehavior: () => ({ top: 0 }),
})
