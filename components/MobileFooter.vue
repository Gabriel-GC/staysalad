<template>
  <nav class="mobile-footer" v-if="isMobile">
    <div class="mobile-footer__content">
      <NuxtLink to="/" class="mobile-footer__item" exact-active-class="is-active">
        <span class="icon">🏠</span>
        <span class="label">Home</span>
      </NuxtLink>
      <NuxtLink to="/produtos" class="mobile-footer__item" active-class="is-active">
        <span class="icon">🥗</span>
        <span class="label">Cardápio</span>
      </NuxtLink>
      <NuxtLink to="/quem-somos" class="mobile-footer__item" active-class="is-active">
        <span class="icon">🌿</span>
        <span class="label">Nós</span>
      </NuxtLink>
      <a href="https://wa.me/5500000000000" class="mobile-footer__item mobile-footer__item--cta">
        <span class="icon">💬</span>
        <span class="label">Pedir</span>
      </a>
    </div>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMobile: true // Simplificado para o boilerplate
    }
  }
}
</script>

<style scoped>
.mobile-footer {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: var(--white);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  z-index: 1000;
  height: 70px;
  display: flex;
  align-items: center;
}

.mobile-footer__content {
  display: flex;
  width: 100%;
  justify-content: space-around;
  padding: 0 10px;
}

.mobile-footer__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  color: var(--text-muted);
  font-size: 11px;
  font-weight: 600;
  transition: color 0.3s ease;
}

.mobile-footer__item .icon {
  font-size: 20px;
}

.mobile-footer__item.is-active {
  color: var(--primary);
}

.mobile-footer__item--cta {
  background: var(--primary);
  color: var(--white) !important;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  justify-content: center;
  transform: translateY(-15px);
  box-shadow: 0 5px 15px rgba(45, 90, 39, 0.4);
}
</style>
