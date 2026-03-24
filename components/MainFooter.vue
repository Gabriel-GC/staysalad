<template>
  <footer class="footer">
    <div class="container">
      <div class="grid footer__grid">
        <!-- Brand Column -->
        <div class="col-12 col-4 footer__brand">
          <NuxtLink to="/" class="footer__logo">Stay<span>Salad</span></NuxtLink>
          <p class="mt-4">{{ settings.footer.address }}</p>
          <div class="footer__social d-flex-desktop d-none-mobile mt-4">
            <a :href="settings.footer.socialLinks.instagram" class="social-icon">IG</a>
            <a :href="settings.footer.socialLinks.facebook" class="social-icon">FB</a>
            <a :href="`https://wa.me/${settings.header.contactPhone.replace(/\D/g,'')}`" class="social-icon">WA</a>
          </div>
        </div>

        <!-- Links Columns (Accordion on Mobile) -->
        <div class="col-12 col-8">
          <div class="grid">
            <div 
              v-for="(section, index) in sections" 
              :key="index" 
              class="col-12 col-4 footer__section"
            >
              <h4 class="footer__title" @click="toggle(index)">
                {{ section.title }}
                <span class="d-none-desktop">{{ activeIndex === index ? '−' : '+' }}</span>
              </h4>
              <ul class="footer__list" :class="{ 'is-open': activeIndex === index || isDesktop }">
                <li v-for="link in section.links" :key="link.label">
                  <NuxtLink :to="link.url" :class="{ 'is-highlight': link.highlight }">{{ link.label }}</NuxtLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="footer__bottom text-center">
        <p>&copy; 2026 StaySalad. Todos os direitos reservados. Feito com 🥗 em Joinville.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: null,
      isDesktop: false,
      settings: {
        header: { contactPhone: '' },
        footer: { address: '', socialLinks: { instagram: '#', facebook: '#', whatsapp: '#' } }
      },
      sections: [
        {
          title: 'Institucional',
          links: [
            { label: 'Início', url: '/' },
            { label: 'Quem Somos', url: '/quem-somos' },
            { label: 'Blog', url: '#' },
            { label: 'Carreiras', url: '#' }
          ]
        },
        {
          title: 'Cardápio',
          links: [
            { label: 'Todos os Bowls', url: '/produtos' },
            { label: 'Novidades', url: '#' },
            { label: 'Veganos', url: '#' },
            { label: 'Bebidas', url: '#' }
          ]
        },
        {
          title: 'Suporte',
          links: [
            { label: 'Contato', url: '/contato' },
            { label: 'FAQ', url: '#' },
            { label: 'Termos de Uso', url: '#' },
            { label: 'Área do Admin', url: '/admin', highlight: true }
          ]
        }
      ]
    }
  },
  async fetch() {
    try {
      const { data } = await this.$axios.get('/api/settings')
      this.settings = data.data
    } catch (e) {
      console.error(e)
    }
  },
  mounted() {
    this.checkDesktop()
    window.addEventListener('resize', this.checkDesktop)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkDesktop)
  },
  methods: {
    toggle(index) {
      if (this.isDesktop) return
      this.activeIndex = this.activeIndex === index ? null : index
    },
    checkDesktop() {
      this.isDesktop = window.innerWidth >= 1024
    }
  }
}
</script>

<style scoped>
.footer {
  background: #fff;
  padding: 60px 0 20px;
  border-top: 1px solid rgba(0,0,0,0.05);
  margin-top: 60px;
}

@media (min-width: 1024px) {
  .footer {
    padding: 100px 0 40px;
  }
}

.footer__logo {
  font-size: 32px;
  font-weight: 800;
  color: var(--text-dark);
}

.footer__logo span {
  color: var(--primary);
}

.footer__brand p {
  color: var(--text-muted);
  max-width: 300px;
}

.footer__title {
  font-size: 18px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

@media (min-width: 1024px) {
  .footer__title {
    cursor: default;
    pointer-events: none;
  }
}

.footer__list {
  list-style: none;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.4s ease;
}

.footer__list.is-open {
  max-height: 500px;
  margin-bottom: 20px;
}

@media (min-width: 1024px) {
  .footer__list {
    max-height: none;
  }
}

.footer__list li {
  margin-bottom: 12px;
}

.footer__list a {
  color: var(--text-muted);
  transition: color 0.3s ease;
}

.footer__list a:hover {
  color: var(--primary);
}

.footer__social {
  gap: 12px;
}

.social-icon {
  width: 40px;
  height: 40px;
  background: var(--bg-light);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 12px;
  color: var(--primary);
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: var(--primary);
  color: #fff;
}

.footer__bottom {
  margin-top: 60px;
  padding-top: 20px;
  border-top: 1px dotted rgba(0,0,0,0.1);
  font-size: 13px;
  color: var(--text-muted);
}
.footer__link.is-highlight {
  color: var(--primary);
  font-weight: 700;
}
</style>
