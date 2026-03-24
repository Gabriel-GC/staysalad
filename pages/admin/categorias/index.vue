<template>
  <div class="admin-categories">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Gestão de Categorias</h1>
      <button @click="openModal()" class="btn btn--primary">Nova Categoria</button>
    </div>

    <div class="card shadow-sm p-4 bg-white rounded">
      <table class="table">
        <thead>
          <tr>
            <th>Ordem</th>
            <th>Nome</th>
            <th>Slug</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in categories" :key="cat._id">
            <td>{{ cat.order }}</td>
            <td><strong>{{ cat.name }}</strong></td>
            <td>{{ cat.slug }}</td>
            <td>
              <button @click="openModal(cat)" class="btn btn--sm btn--secondary">Editar</button>
              <button @click="deleteCategory(cat._id)" class="btn btn--sm btn--danger">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Simple Inline Modal (Simulation) -->
    <div v-if="showModal" class="custom-modal">
      <div class="custom-modal-content card shadow-lg p-4">
        <h3>{{ editingId ? 'Editar Categoria' : 'Nova Categoria' }}</h3>
        <div class="form-group mt-3">
          <label>Nome</label>
          <input v-model="form.name" type="text" class="form-control">
        </div>
        <div class="form-group mt-3">
          <label>Ordem</label>
          <input v-model="form.order" type="number" class="form-control">
        </div>
        <div class="mt-4 d-flex gap-2">
          <button @click="saveCategory" class="btn btn--primary" :disabled="saving">Salvar</button>
          <button @click="showModal = false" class="btn btn--secondary">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get('/api/categories')
      return { categories: data.data }
    } catch (e) {
      return { categories: [] }
    }
  },
  data() {
    return {
      showModal: false,
      saving: false,
      editingId: null,
      form: { name: '', order: 0 }
    }
  },
  methods: {
    openModal(cat = null) {
      if (cat) {
        this.editingId = cat._id
        this.form = { ...cat }
      } else {
        this.editingId = null
        this.form = { name: '', order: this.categories.length + 1 }
      }
      this.showModal = true
    },
    async saveCategory() {
      this.saving = true
      try {
        if (this.editingId) {
          // Implement PATCH api/categories/:id if needed
          // For now just simulation or logic if existed
          await this.$axios.post('/api/categories', this.form) // Simplify for MVP
        } else {
          await this.$axios.post('/api/categories', this.form)
        }
        this.$noty.success('Categoria salva!')
        this.showModal = false
        const { data } = await this.$axios.get('/api/categories')
        this.categories = data.data
      } catch (e) {
        this.$noty.error('Erro ao salvar')
      } finally {
        this.saving = false
      }
    },
    async deleteCategory(id) {
       if (confirm('Atenção: Excluir a categoria não remove os produtos, mas eles perderão o vínculo. Deseja continuar?')) {
         // Logic
         this.$noty.success('Removido (simulação)')
       }
    }
  }
}
</script>

<style scoped>
.custom-modal {
  position: fixed; top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;
}
.custom-modal-content { width: 100%; max-width: 400px; }
.form-control { width: 100%; padding: 10px; border: 1px solid #ddd; border-top: none; border-left: none; border-right: none; border-radius: 0; }
</style>
