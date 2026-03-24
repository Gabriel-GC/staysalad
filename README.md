# StaySalad - Cardápio Virtual

Este é o boilerplate completo para o cardápio virtual da saladaria **StaySalad**, desenvolvido com Nuxt.js (Vue 2) focado em performance mobile, SEO e conversão.

## 🚀 Como Executar

### Pré-requisitos
- Node.js v16 (recomendado via NVM)
- Docker e Docker Compose (opcional para ambiente isolado)

### Via Docker (Recomendado)
Para rodar o ambiente completo em `0.0.0.0:3000`:
```bash
docker-compose up --build
```

### Via Terminal Local
1. Instale as dependências:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Inicie o servidor de desenvolvimento:
   > [!IMPORTANT]
   > Como o ambiente possui Node 20+, você deve habilitar o suporte legado ao OpenSSL:
   ```bash
   # Windows (PowerShell)
   $env:NODE_OPTIONS = "--openssl-legacy-provider"
   npm run dev

   # Linux/Mac/Git Bash
   export NODE_OPTIONS=--openssl-legacy-provider
   npm run dev
   ```
3. Acesse `http://localhost:3000`.

## 📂 Estrutura do Projeto
- `components/`: Componentes reutilizáveis (ProductCard, MobileFooter, CookieConsent).
- `pages/`: Rotas da aplicação (Home, Produtos, Quem Somos, Contato).
- `layouts/`: Layout mobile-first com header e footer fixos.
- `plugins/`: Integração de bibliotecas (Splide, Noty, Modal, Zoom, etc).
- `assets/css/`: Design System e variáveis globais.

## 🛠 Tech Stack & Plugins
- **Framework:** Nuxt.js 2 (SSR)
- **Estilização:** CSS Moderno (BEM + Variáveis)
- **Sliders:** Splide.js
- **Imagens:** Vue Lazyload + Vue Inner Image Zoom
- **Interação:** Vue JS Modal + VueJS Noty
- **Formulários:** V-Mask + V-Money
- **Marketing:** Vue Awesome Countdown

## 📝 Notas de Design
- **Mobile-First:** Experiência otimizada para smartphones.
- **Micro-interações:** Feedback visual em cliques e scrolls.
- **Copywriting:** Textos persuasivos gerados em português focados em frescor e saúde.