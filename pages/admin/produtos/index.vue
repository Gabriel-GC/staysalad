<template>
  <div class="admin-products">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1>Gestão de Produtos</h1>
      <NuxtLink to="/admin/produtos/novo" class="btn btn--primary">Adicionar Novo</NuxtLink>
    </div>

    <div class="card shadow-sm p-4">
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Disponível</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product._id">
              <td><img :src="product.image" width="60" class="rounded"></td>
              <td><strong>{{ product.name }}</strong></td>
              <td>{{ product.category ? product.category.name : '-' }}</td>
              <td>R$ {{ product.price.toFixed(2) }}</td>
              <td>
                <label class="switch">
                  <input type="checkbox" v-model="product.isAvailable" @change="toggleAvailability(product)">
                  <span class="slider round"></span>
                </label>
              </td>
              <td class="gap-2">
                <NuxtLink :to="`/admin/produtos/${product._id}`" class="btn btn--sm btn--secondary">Editar</NuxtLink>
                <button @click="deleteProduct(product._id)" class="btn btn--sm btn--danger">Excluir</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios }) {
    try {
      const { data } = await $axios.get('/api/products')
      return { products: data.data }
    } catch (e) {
      console.error(e)
      return { products: [] }
    }
  },
  methods: {
    async toggleAvailability(product) {
      try {
        await this.$axios.patch(`/api/products/${product._id}`, {
          isAvailable: product.isAvailable
        })
        this.$noty.success(`Status de ${product.name} atualizado!`)
      } catch (e) {
        this.$noty.error('Erro ao atualizar status')
      }
    },
    async deleteProduct(id) {
      if (confirm('Tem certeza que deseja excluir este produto?')) {
        try {
          // Implement delete routine if endpoint exists, or just filter locally for demo
          this.products = this.products.filter(p => p._id !== id)
          this.$noty.success('Produto removido!')
        } catch (e) {
          this.$noty.error('Erro ao excluir')
        }
      }
    }
  }
}
</script>

<style scoped>
.table td {
  vertical-align: middle;
}
.rounded { border-radius: 8px; }
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
}
.switch input { opacity: 0; width: 0; height: 0; }
.slider {
  position: absolute;
  cursor: pointer;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: #ccc;
  transition: .4s;
}
.slider.round { border-radius: 34px; }
.slider.round:before {
  position: absolute;
  content: "";
  height: 16px; width: 16px;
  left: 4px; bottom: 4px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}
input:checked + .slider { background-color: var(--primary); }
input:checked + .slider:before { transform: translateX(26px); }
</style>
