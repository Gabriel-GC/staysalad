export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'StaySalad - Cardápio Virtual Saudável',
    htmlAttrs: {
      lang: 'pt-BR'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0' },
      { hid: 'description', name: 'description', content: 'StaySalad - Refeições leves, frescas e deliciosas. Peça seu bowl agora!' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&display=swap' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/css/main.css',
    'vuejs-noty/dist/vuejs-noty.css',
    '@splidejs/splide/dist/css/splide.min.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '~/plugins/splide.client.js', mode: 'client' },
    { src: '~/plugins/lazyload.client.js', mode: 'client' },
    { src: '~/plugins/modal.client.js', mode: 'client' },
    { src: '~/plugins/noty.client.js', mode: 'client' },
    { src: '~/plugins/scroll-to.client.js', mode: 'client' },
    { src: '~/plugins/mask.client.js', mode: 'client' },
    { src: '~/plugins/money.client.js', mode: 'client' },
    { src: '~/plugins/countdown.client.js', mode: 'client' },
    { src: '~/plugins/scroll-lock.client.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // SSR no Docker: usa o nome do serviço definido no docker-compose
    baseURL: process.env.NODE_ENV === 'production' 
      ? 'http://staysalad_web:3000' 
      : 'http://localhost:3000',
    // Cliente: usa caminhos relativos a partir da raiz (as chamadas no código já incluem /api)
    browserBaseURL: '/'
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      name: 'StaySalad',
      lang: 'pt-BR',
      useWebmanifestExtension: false
    },
    icon: false
  },

  // Server Middleware
  serverMiddleware: [
    { path: '/api', handler: '~/server/index.js' }
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: ['@splidejs/vue-splide']
  },

  server: {
    port: 3000,
    host: '0.0.0.0'
  }
}
