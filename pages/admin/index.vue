<template>
  <div class="admin-dashboard">
    <h1 class="mb-4">Dashboard</h1>
    <div class="grid">
      <div class="col-12 col-4">
        <div class="stat-card shadow-sm p-4 bg-white rounded">
          <p class="text-muted mb-1">Total de Produtos</p>
          <h3>{{ stats.productsCount }}</h3>
        </div>
      </div>
      <div class="col-12 col-4">
        <div class="stat-card shadow-sm p-4 bg-white rounded">
          <p class="text-muted mb-1">Categorias Ativas</p>
          <h3>{{ stats.categoriesCount }}</h3>
        </div>
      </div>
      <div class="col-12 col-4">
        <div class="stat-card shadow-sm p-4 bg-white rounded">
          <p class="text-muted mb-1">Banners na Home</p>
          <h3>{{ stats.bannersCount }}</h3>
        </div>
      </div>
    </div>

    <div class="mt-5 card shadow-sm p-4 bg-white rounded">
      <h4>Ações Rápidas</h4>
      <div class="d-flex gap-3 mt-3">
        <NuxtLink to="/admin/produtos/novo" class="btn btn--primary">Novo Produto</NuxtLink>
        <NuxtLink to="/admin/configuracoes" class="btn btn--secondary">Configurações Gerais</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  async asyncData({ $axios }) {
    try {
      const [products, categories, settings] = await Promise.all([
        $axios.get('/api/products'),
        $axios.get('/api/categories'),
        $axios.get('/api/settings')
      ])
      return {
        stats: {
          productsCount: products.data.data.length,
          categoriesCount: categories.data.data.length,
          bannersCount: settings.data.data.homeBanners.length
        }
      }
    } catch (e) {
      return { stats: { productsCount: 0, categoriesCount: 0, bannersCount: 0 } }
    }
  }
}
</script>
