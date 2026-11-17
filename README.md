# AUREA ESTATES

Site de portfólio para uma marca de imóveis de luxo, com catálogo, filtros e identidade editorial.

## Tecnologia

O projeto usa HTML, CSS e JavaScript sem framework para carregar rápido e permanecer simples de hospedar como site estático.  
As interações usam APIs nativas do navegador, sem dependências, backend, analytics ou serviços pagos.

## Executar localmente

Requer Node.js 18 ou posterior e npm.

```bash
npm install
npm run dev
```

Abra `http://localhost:5173`. Para validar a versão de publicação:

```bash
npm run build
npm run preview
```

## Recursos

- Navegação fixa com menu móvel acessível e aparência adaptada à rolagem.
- Catálogo de imóveis com filtros por tipo e valor, detalhes em modal e formulário de interesse.
- Formulário preparado localmente; nenhuma informação é enviada ou armazenada.
- Revelações no scroll, parallax discreto, accordion nativo e suporte a `prefers-reduced-motion`.
- Metadados SEO/Open Graph, favicon SVG e layout responsivo.

## Imagens

Quatro fotografias fornecidas para o projeto foram otimizadas para JPEG e integradas no hero, catálogo, sobre e galeria. A galeria possui cinco posições e reutiliza uma imagem com outro enquadramento. O conjunto ocupa aproximadamente 1,4 MiB.

Os arquivos estão em `public/images/`. Os nomes previstos para futuras versões WebP são `hero.webp`, `ambiente.webp`, `destaque-01.webp`, `destaque-02.webp` e `detalhe.webp`. Ao converter, atualize as referências de arquivo em `index.html` e `app.js`.

As miniaturas de `imagens-referencia/` servem somente como referência visual e não são usadas no site.

## Estrutura

```text
02-aurea-estates/
├── index.html
├── styles.css
├── app.js
├── favicon.svg
├── server.mjs
├── build.mjs
├── package.json
├── README.md
└── public/images/
```

O comando `npm run build` monta os arquivos estáticos em `dist/`; `npm run preview` serve essa versão localmente.

## Publicar na Vercel

1. Importe o repositório GitHub na Vercel e selecione **Other** como preset.
2. Configure `npm run build` como comando de build e `dist` como diretório de saída.
3. Publique e associe um domínio próprio se desejar.
