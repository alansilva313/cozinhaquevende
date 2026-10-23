# Cozinha que Rende

Plataforma em React, TypeScript e Vite com uma biblioteca de 50 guias de negócios culinários, leitor interativo e ferramentas locais de planejamento.

## Executar

Requer Node.js e npm.

```bash
npm install
npm run dev
```

Para validar ou gerar a versão de publicação:

```bash
npm test
npm run build
npm run preview
```

Os arquivos prontos para publicação ficam em `dist/`.

## Publicar na Cloudflare Pages

Este repositório já contém o conteúdo do site na raiz. Na Cloudflare Pages, configure:

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Root directory:** `/` (raiz do repositório).

O arquivo `public/_redirects` configura o fallback para as rotas do React Router e é copiado para `dist/_redirects` no build.

## Conteúdo

- 50 negócios em cinco categorias, cada um com um guia de 12 capítulos.
- O guia de Açaí no Copo tem conteúdo editorial aprofundado. Os outros 49 têm foco, modelo de venda, equipamento, operação, uma ficha de preparo própria, cardápio, exemplos, plano de 7 dias e checklist próprios.
- Capas ilustradas usam ícones correspondentes ao produto e ao formato do negócio; a capa editorial deixa de repetir uma foto genérica para produtos diferentes.
- Leitor com progresso, favoritos, checklist, tema e tamanho do texto salvos localmente.
- Ferramentas para preço, cenário de vendas, lista de compras, checklist, cardápio imprimível e mensagens.
- Primeiro acesso demonstrativo salvo no navegador: cria um perfil local com hash de senha e mantém a sessão no mesmo dispositivo.

As receitas dos guias são fichas-piloto educativas, não receitas comercialmente testadas. Os rendimentos são estimativas a validar na cozinha do usuário. Custos e resultados dependem da região e da operação. Os guias não prometem renda, não definem validade e não substituem avaliação técnica ou consulta às autoridades locais.

## Acesso local e vendas

O primeiro acesso pede usuário e senha, cria um perfil neste navegador e mantém a sessão no dispositivo. A senha não é enviada ao servidor; o site guarda um hash local. Como a versão é estática e não consulta uma lista de compradores, esse fluxo não valida pagamentos nem protege o conteúdo contra quem obtiver o endereço ou alterar os dados locais. Para restringir o acesso a compradores, conecte uma autenticação e validação de pagamento antes da venda.
