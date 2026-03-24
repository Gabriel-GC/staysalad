import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _42784a67 = () => interopDefault(import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages/admin/index" */))
const _38996a16 = () => interopDefault(import('..\\pages\\contato.vue' /* webpackChunkName: "pages/contato" */))
const _62e60b44 = () => interopDefault(import('..\\pages\\produtos.vue' /* webpackChunkName: "pages/produtos" */))
const _37f0ac90 = () => interopDefault(import('..\\pages\\quem-somos.vue' /* webpackChunkName: "pages/quem-somos" */))
const _9609dc72 = () => interopDefault(import('..\\pages\\admin\\categorias\\index.vue' /* webpackChunkName: "pages/admin/categorias/index" */))
const _365000de = () => interopDefault(import('..\\pages\\admin\\configuracoes.vue' /* webpackChunkName: "pages/admin/configuracoes" */))
const _0c1fed7e = () => interopDefault(import('..\\pages\\admin\\login.vue' /* webpackChunkName: "pages/admin/login" */))
const _561481cd = () => interopDefault(import('..\\pages\\admin\\produtos\\index.vue' /* webpackChunkName: "pages/admin/produtos/index" */))
const _6cdd43e2 = () => interopDefault(import('..\\pages\\admin\\produtos\\novo.vue' /* webpackChunkName: "pages/admin/produtos/novo" */))
const _df254484 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))
const _3c829375 = () => interopDefault(import('..\\pages\\admin\\produtos\\_id.vue' /* webpackChunkName: "pages/admin/produtos/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _42784a67,
    name: "admin"
  }, {
    path: "/contato",
    component: _38996a16,
    name: "contato"
  }, {
    path: "/produtos",
    component: _62e60b44,
    name: "produtos"
  }, {
    path: "/quem-somos",
    component: _37f0ac90,
    name: "quem-somos"
  }, {
    path: "/admin/categorias",
    component: _9609dc72,
    name: "admin-categorias"
  }, {
    path: "/admin/configuracoes",
    component: _365000de,
    name: "admin-configuracoes"
  }, {
    path: "/admin/login",
    component: _0c1fed7e,
    name: "admin-login"
  }, {
    path: "/admin/produtos",
    component: _561481cd,
    name: "admin-produtos"
  }, {
    path: "/admin/produtos/novo",
    component: _6cdd43e2,
    name: "admin-produtos-novo"
  }, {
    path: "/",
    component: _df254484,
    name: "index"
  }, {
    path: "/admin/produtos/:id",
    component: _3c829375,
    name: "admin-produtos-id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
