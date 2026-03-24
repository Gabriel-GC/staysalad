import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'https://placehold.co/600x400?text=Indisponivel',
  loading: 'https://placehold.co/600x400?text=Carregando...',
  attempt: 1
})
