<template>
  <transition name="slide-up">
    <div v-if="!accepted" class="cookie-consent">
      <div class="cookie-consent__content">
        <p>Utilizamos cookies para melhorar sua experiência em nosso cardápio.</p>
        <button class="btn btn--primary btn--sm" @click="accept">Aceitar</button>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      accepted: false
    }
  },
  mounted() {
    this.accepted = localStorage.getItem('cookieAccepted') === 'true'
  },
  methods: {
    accept() {
      localStorage.setItem('cookieAccepted', 'true')
      this.accepted = true
      this.$noty.success('Obrigado por aceitar nossos cookies!')
    }
  }
}
</script>

<style scoped>
.cookie-consent {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--text-dark);
  color: var(--white);
  padding: 15px 20px;
  z-index: 2000;
  font-size: 12px;
}

.cookie-consent__content {
  max-width: 480px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
}

.btn--sm {
  padding: 8px 16px;
  font-size: 12px;
}

.slide-up-enter-active, .slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter, .slide-up-leave-to {
  transform: translateY(100%);
}
</style>
