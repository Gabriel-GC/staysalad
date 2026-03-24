<script>
export default {
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get('/api/settings')
      return { settings: data.data }
    } catch (e) {
      return { settings: { aboutPage: { richText: '' } } }
    }
  }
}
</script>
  <div class="about-page">
    <section class="section about-intro">
      <div class="container fade-in-up">
        <div class="grid align-items-center">
          <div class="col-12 col-6">
            <h1 class="mb-4">Nossa História</h1>
            <p class="mb-4 text-large" v-html="settings.aboutPage.richText">
            </p>
          </div>
          <div class="col-12 col-6">
            <img :src="settings.aboutPage.image || 'https://images.unsplash.com/photo-1510627958211-0f4fec900986?auto=format&fit=crop&w=1200&q=80'" alt="StaySalad Story" class="about-image about-image--offset">
          </div>
        </div>
      </div>
    </section>

    <section class="section about-mission bg-white">
      <div class="container">
        <div class="grid align-items-center flex-reverse-desktop">
          <div class="col-12 col-6">
            <img src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&w=1200&q=80" alt="StaySalad Ingredients" class="about-image">
          </div>
          <div class="col-12 col-6 p-desktop-lg">
            <p class="mb-4">
              Nossa jornada começou em cozinhas locais, selecionando rigorosamente fornecedores que compartilham nossa paixão pelo frescor. Cada ingrediente que chega à nossa mesa é escolhido à mão, garantindo que você sinta o sabor real da terra em cada bowl.
            </p>
            <blockquote>
              "Saudável é o novo sabor."
            </blockquote>
            <p class="mt-4">
              Nossa missão é provar que comer bem é uma escolha prazerosa. Seja no trabalho, em casa ou no pós-treino, a StaySalad está aqui para nutrir seu corpo e sua alma.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about-intro {
  padding-bottom: 0;
}

@media (min-width: 1024px) {
  .flex-reverse-desktop {
    flex-direction: row-reverse;
  }
  
  .p-desktop-lg {
    padding: 60px;
  }
}

.text-large {
  font-size: 18px;
  line-height: 1.8;
}

.about-image {
  width: 100%;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: block;
}

@media (min-width: 1024px) {
  .about-image--offset {
    transform: translateY(60px);
  }
}

.bg-white {
  background: white;
}

blockquote {
  border-left: 4px solid var(--primary);
  padding-left: 20px;
  font-style: italic;
  font-size: 20px;
  color: var(--primary);
  margin: 30px 0;
}
</style>
