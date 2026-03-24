<template>
  <div class="admin-product-form">
    <h1 class="mb-4">Editar Produto</h1>
    
    <div class="card shadow-sm p-4 bg-white rounded">
      <form @submit.prevent="saveProduct">
        <div class="grid">
          <div class="col-12 col-8">
            <div class="form-group mb-3">
              <label>Nome do Produto</label>
              <input v-model="product.name" type="text" class="form-control" required>
            </div>
            <div class="form-group mb-3">
              <label>Descrição</label>
              <textarea v-model="product.description" class="form-control" rows="3" required></textarea>
            </div>
            <div class="grid">
              <div class="col-6">
                <div class="form-group mb-3">
                  <label>Preço (R$)</label>
                  <input v-model="product.price" type="number" step="0.01" class="form-control" required>
                </div>
              </div>
              <div class="col-6">
                <div class="form-group mb-3">
                  <label>Categoria</label>
                  <select v-model="product.category" class="form-control" required>
                    <option v-for="cat in categories" :key="cat._id" :value="cat._id">
                      {{ cat.name }}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="col-12 col-4">
            <div class="form-group mb-3">
              <label>URL da Imagem</label>
              <input v-model="product.image" type="text" class="form-control">
              <div v-if="product.image" class="mt-3">
                <img :src="product.image" class="img-preview rounded shadow-sm">
              </div>
            </div>
            <div class="form-group mb-3">
              <label class="d-flex align-items-center gap-2">
                <input type="checkbox" v-model="product.isFeatured"> Destaque na Home
              </label>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <button type="submit" class="btn btn--primary" :disabled="saving">
            {{ saving ? 'Salvando...' : 'Salvar Alterações' }}
          </button>
          <NuxtLink to="/admin/produtos" class="btn btn--secondary ml-1">Cancelar</NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios, params }) {
    try {
      const [categoriesRes, productRes] = await Promise.all([
        $axios.get('/api/categories'),
        $axios.get(`/api/products/${params.id}`)
      ])
      
      return {
        categories: categoriesRes.data.data,
        product: productRes.data.data
      }
    } catch (e) {
      console.error(e)
      return { categories: [], product: {} }
    }
  },
  data() {
    return {
      saving: false
    }
  },
  methods: {
    async saveProduct() {
      this.saving = true
      try {
        await this.$axios.patch(`/api/products/${this.product._id}`, this.product)
        this.$noty.success('Produto atualizado com sucesso!')
        this.$router.push('/admin/produtos')
      } catch (e) {
        this.$noty.error('Erro ao atualizar produto')
      } finally {
        this.saving = false
      }
    }
  }
}
</script>

<style scoped>
.form-control { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; }
.img-preview { width: 100%; height: 200px; object-fit: cover; }
.ml-1 { margin-left: 10px; }
</style>
