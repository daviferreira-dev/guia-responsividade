# Caderno de Responsividade

Guia interativo em Vue 3 + Vite que ensina a criar páginas responsivas. Projeto da disciplina de Responsividade.

- **Site publicado:** https://guia-responsividade.vercel.app/
- **Repositório:** https://github.com/daviferreira-dev/guia-responsividade
- **Dupla:** Davi Ferreira da Cunha e João Vitor Charleaux

## Seções

1. Por que responsividade importa (media queries e meta viewport) — lab: largura da tela
2. Unidades CSS — lab: conversor para px
3. Flexbox e Grid — labs: flex e grid (contagem de colunas)
4. Imagens responsivas — lab: imagem com e sem width/height
5. Boas práticas em Vue — lab: `:key` no `v-for`
6. Acessibilidade e testes (**tema provisório**, conferir com o PDF)
7. Desafio

O indicador no canto da tela mostra a largura da janela e o breakpoint ativo.

## Decisões técnicas

- CSS mobile-first, media queries só com `min-width`, fontes e espaços em `rem`, tokens em `:root` (`src/assets/main.css`).
- Uma rota por seção (Vue Router), todas com carregamento sob demanda. Usa hash (`#/secao/1`) para funcionar em qualquer hospedagem sem configuração.
- Menu vira botão no celular (`aria-expanded`).

## Rodar

```bash
npm install
npm run dev      # desenvolvimento
npm run build    # gera dist/
```

## Publicar

Vercel ou Netlify: importar o repositório, root `guia-responsivo`, build `npm run build`, saída `dist`.
