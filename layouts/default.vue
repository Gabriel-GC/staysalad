<template>
  <div class="layout">
    <header class="header" :class="{ 'header--scrolled': isScrolled }">
      <div class="container header__content">
        <NuxtLink to="/" class="header__logo">Stay<span>Salad</span></NuxtLink>
        
        <nav class="header__nav d-none-mobile">
          <NuxtLink to="/" class="header__link" exact-active-class="is-active">Início</NuxtLink>
          <NuxtLink to="/produtos" class="header__link" active-class="is-active">Produtos</NuxtLink>
          <NuxtLink to="/quem-somos" class="header__link" active-class="is-active">Quem Somos</NuxtLink>
          <NuxtLink to="/contato" class="header__link" active-class="is-active">Contato</NuxtLink>
        </nav>

        <div class="header__actions">
          <button class="header__btn d-none-desktop" @click="$scrollTo('#cardapio')">
            <span class="icon">🥗</span>
          </button>
          <NuxtLink to="/produtos" class="btn btn--primary btn--sm d-none-mobile">Pedir Agora</NuxtLink>
        </div>
      </div>
    </header>

    <main class="main">
      <Nuxt />
    </main>

    <MainFooter />
    <MobileFooter class="d-none-desktop" />
    <CookieConsent />
  </div>
</template>

<script>
export default {
  data() {
    return {
      isScrolled: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    }
  }
}
</script>

<style scoped>
.layout {
  padding-bottom: 0; 
}

@media (max-width: 1023px) {
  .layout {
    padding-bottom: 80px; /* Space for fixed footer on mobile */
  }
}

.header {
  position: sticky;
  top: 0;
  background: transparent;
  width: 100%;
  z-index: 1000;
  padding: 20px 0;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.header--scrolled {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(12px) saturate(180%);
  padding: 12px 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.header__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header__logo {
  font-size: 28px;
  font-weight: 800;
  letter-spacing: -0.5px;
  color: var(--text-dark);
}

.header__logo span {
  color: var(--primary);
}

.header__nav {
  display: flex;
  gap: 32px;
}

.header__link {
  font-weight: 600;
  font-size: 15px;
  color: var(--text-dark);
  position: relative;
  transition: opacity 0.3s ease;
}

.header__link:hover {
  opacity: 0.7;
}

.header__link.is-active::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--primary);
  border-radius: 2px;
}

.btn--sm {
  padding: 10px 20px;
  font-size: 14px;
}
</style>
