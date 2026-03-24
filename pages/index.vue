<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero section">
      <div class="container">
        <div class="grid align-items-center">
          <div class="col-12 col-6 text-center text-left-desktop">
            <h1 class="hero__title fade-in-up">StaySalad 🥗 <br><span>Natureza no Bowl.</span></h1>
            <p class="hero__subtitle fade-in-up" style="animation-delay: 0.2s">
              {{ settings.header.promoText }} Experimente o frescor real em cada garfada com nossos ingredientes selecionados.
            </p>
            <div class="hero__actions fade-in-up" :style="{ animationDelay: '0.4s' }">
              <NuxtLink to="/produtos" class="btn btn--primary">Ver Cardápio Completo</NuxtLink>
              <a :href="`https://wa.me/${settings.header.contactPhone.replace(/\D/g,'')}`" class="btn btn--secondary mt-mobile-only">Pedir no WhatsApp</a>
            </div>
          </div>
          <div class="col-6 d-none-mobile fade-in-up" :style="{ animationDelay: '0.6s' }">
            <div class="hero__image-wrapper" v-if="settings.homeBanners.length">
              <img :src="settings.homeBanners[0].imageUrl" alt="StaySalad Hero" class="hero__image">
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Splide Vitrine (Destaques da API) -->
    <section class="vitrine section d-none-mobile" v-if="featuredProducts.length">
      <div class="container overflow-visible">
        <h2 class="mb-4 text-center">Os Favoritos da Galera</h2>
        <splide :options="splideOptions">
          <splide-slide v-for="p in featuredProducts" :key="p._id">
            <ProductCard :product="p" />
          </splide-slide>
        </splide>
      </div>
    </section>

    <!-- Highlights Section -->
    <section class="highlights section">
      <div class="container">
        <div class="highlights__grid">
          <div class="highlight-item text-center">
            <span class="highlight-item__icon">🌿</span>
            <h3 class="highlight-item__title">Frescor Absoluto</h3>
            <p class="highlight-item__text">Ingredientes colhidos no dia, direto de produtores locais selecionados.</p>
          </div>
          <div class="highlight-item text-center">
            <span class="highlight-item__icon">⚡</span>
            <h3 class="highlight-item__title">Praticidade</h3>
            <p class="highlight-item__text">Alimentação saudável que se encaixa na sua rotina, sem complicação.</p>
          </div>
          <div class="highlight-item text-center">
            <span class="highlight-item__icon">😋</span>
            <h3 class="highlight-item__title">Muito Sabor</h3>
            <p class="highlight-item__text">Molhos artesanais e combinações que vão te fazer amar saladas novamente.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Promo Countdown -->
    <section class="promo section bg-primary-soft">
      <div class="container text-center">
        <h2 class="mb-2">Oferta Relâmpago! ⚡</h2>
        <p class="mb-4">Bowl de Atum Fresh com 20% OFF acaba em:</p>
        <div class="countdown">
          <vac :end-time="new Date().getTime() + 7200000">
            <template v-slot:process="{ timeObj }">
              <span class="countdown__timer">{{ timeObj.h }}:{{ timeObj.m }}:{{ timeObj.s }}</span>
            </template>
          </vac>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const [settings, products] = await Promise.all([
        $axios.get('/api/settings'),
        $axios.get('/api/products?featured=true')
      ])
      return {
        settings: settings.data.data,
        featuredProducts: products.data.data
      }
    } catch (e) {
      console.error(e)
      return { 
        settings: { header: { promoText: '', contactPhone: '' }, homeBanners: [] }, 
        featuredProducts: [] 
      }
    }
  },
  data() {
    return {
      splideOptions: {
        type: 'loop',
        perPage: 4,
        gap: '24px',
        pagination: false,
        arrows: true,
        breakpoints: {
          1024: { perPage: 2, arrows: false, pagination: true },
          640: { perPage: 1 }
        }
      }
    }
  }
}
</script>

<style scoped>
.hero {
  padding: 60px 0;
  background: radial-gradient(circle at top right, rgba(45, 90, 39, 0.05), transparent);
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.hero__title {
  font-size: 32px;
  line-height: 1.1;
  margin-bottom: 20px;
}

@media (min-width: 1024px) {
  .hero__title {
    font-size: 64px;
    margin-bottom: 30px;
  }
}

.hero__title span {
  color: var(--primary-light);
}

.hero__subtitle {
  font-size: 16px;
  color: var(--text-muted);
  margin-bottom: 40px;
}

@media (min-width: 1024px) {
  .hero__subtitle {
    font-size: 20px;
    max-width: 500px;
  }
}

.hero__actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

@media (min-width: 1024px) {
  .hero__actions {
    flex-direction: row;
  }
}

.hero__image-wrapper {
  position: relative;
  border-radius: 40px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.1);
}

.hero__image {
  width: 100%;
  display: block;
}

.mt-mobile-only {
  margin-top: 16px;
}

@media (min-width: 1024px) {
  .mt-mobile-only {
    margin-top: 0;
  }
}

.highlights__grid {
  display: grid;
  gap: 30px;
}

@media (min-width: 1024px) {
  .highlights__grid {
    grid-template-columns: repeat(3, 1fr);
    gap: 60px;
  }
}

.highlight-item__icon {
  font-size: 40px;
  display: block;
  margin-bottom: 10px;
}

.highlight-item__title {
  font-size: 20px;
  margin-bottom: 10px;
}

.highlight-item__text {
  font-size: 14px;
  color: var(--text-muted);
}

.bg-primary-soft {
  background-color: rgba(45, 90, 39, 0.03);
}

.countdown__timer {
  font-size: 48px;
  font-weight: 800;
  color: var(--accent);
}
</style>
