<template>
  <div class="admin-settings">
    <h1 class="mb-4">Configurações Gerais</h1>
    
    <div v-if="settings" class="card shadow-sm p-4 bg-white rounded">
      <form @submit.prevent="saveSettings">
        <div class="grid">
          <!-- Header Settings -->
          <div class="col-12 col-6">
            <h3>Cabeçalho</h3>
            <div class="form-group mb-3">
              <label>Texto Promocional</label>
              <input v-model="settings.header.promoText" type="text" class="form-control">
            </div>
            <div class="form-group mb-3">
              <label>Telefone de Contato</label>
              <input v-model="settings.header.contactPhone" type="text" class="form-control" v-mask="'+55 ## #####-####'">
            </div>
          </div>

          <!-- Footer Settings -->
          <div class="col-12 col-6">
            <h3>Rodapé</h3>
            <div class="form-group mb-3">
              <label>Endereço</label>
              <textarea v-model="settings.footer.address" class="form-control" rows="3"></textarea>
            </div>
            <div class="form-group mb-3">
              <label>Instagram URL</label>
              <input v-model="settings.footer.socialLinks.instagram" type="text" class="form-control">
            </div>
          </div>

          <!-- About Settings -->
          <div class="col-12">
            <hr class="my-4">
            <h3>Página Quem Somos</h3>
            <div class="form-group mb-3">
              <label>Texto Principal (Rich Text)</label>
              <textarea v-model="settings.aboutPage.richText" class="form-control" rows="6"></textarea>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <button type="submit" class="btn btn--primary" :disabled="saving">
            {{ saving ? 'Salvando...' : 'Salvar Alterações' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get('/api/settings')
      return { settings: data.data }
    } catch (e) {
      return { settings: null }
    }
  },
  data() {
    return {
      saving: false
    }
  },
  methods: {
    async saveSettings() {
      this.saving = true
      try {
        await this.$axios.patch('/api/settings', this.settings)
        this.$noty.success('Configurações salvas com sucesso!')
      } catch (e) {
        this.$noty.error('Erro ao salvar')
      } finally {
        this.saving = false
      }
    }
  }
}
</script>

<style scoped>
h3 { font-size: 18px; margin-bottom: 20px; color: var(--text-dark); }
.form-control { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; }
</style>
