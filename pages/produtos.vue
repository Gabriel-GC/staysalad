<template>
  <div class="products-page">
    <section class="section">
      <div class="container">
        <header class="section-header text-center mb-4">
          <h1 class="fade-in-up">Nosso Cardápio</h1>
          <p class="fade-in-up" style="animation-delay: 0.1s">Escolha o seu bowl favorito e sinta o frescor.</p>
        </header>

        <!-- Filtros Desktop -->
        <nav class="filters mb-4 fade-in-up" style="animation-delay: 0.2s">
          <button 
            v-for="cat in categories" 
            :key="cat._id"
            class="filter-btn" 
            :class="{ 'is-active': activeCategory === cat.name }"
            @click="activeCategory = cat.name"
          >
            {{ cat.name }}
          </button>
        </nav>

        <div class="products-grid">
          <div
            v-for="p in filteredProducts"
            :key="p.id"
            class="products-grid__item"
          >
            <ProductCard
              :product="p"
              @open-modal="showDetails"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Modal de Detalhes (Vue JS Modal) -->
    <v-modal 
      name="product-modal" 
      height="auto" 
      :adaptive="true" 
      :scrollable="true"
      :width="modalWidth"
    >
      <div class="modal-content" v-if="selectedProduct">
        <div class="modal-header">
          <button class="modal-close" @click="$modal.hide('product-modal')">✕</button>
          <img :src="selectedProduct.image" :alt="selectedProduct.name" class="modal-image">
        </div>
        <div class="modal-body">
          <h2>{{ selectedProduct.name }}</h2>
          <p class="modal-price">R$ {{ selectedProduct.price.toFixed(2).replace('.', ',') }}</p>
          <p class="modal-description">{{ selectedProduct.fullDescription }}</p>
          
          <div class="modal-ingredients">
            <h4>Ingredientes:</h4>
            <ul>
              <li v-for="ing in selectedProduct.ingredients" :key="ing">{{ ing }}</li>
            </ul>
          </div>

          <button class="btn btn--primary btn--full mt-4" @click="addToCart">
            Adicionar ao Pedido
          </button>
        </div>
      </div>
    </v-modal>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    try {
      const [categories, products] = await Promise.all([
        $axios.get('/api/categories'),
        $axios.get('/api/products')
      ])
      return {
        categories: [{ name: 'Todos', _id: 'all' }, ...categories.data.data],
        products: products.data.data
      }
    } catch (e) {
      console.error(e)
      return { categories: [], products: [] }
    }
  },
  data() {
    return {
      selectedProduct: null,
      activeCategory: 'Todos'
    }
  },
  computed: {
    filteredProducts() {
      if (this.activeCategory === 'Todos') {
        return this.products
      }
      return this.products.filter(p => p.category && p.category.name === this.activeCategory)
    },
    modalWidth() {
      if (process.client) {
        return window.innerWidth > 1024 ? 800 : '90%'
      }
      return '90%'
    }
  },
  methods: {
    showDetails(product) {
      this.selectedProduct = product
      this.$modal.show('product-modal')
    },
    addToCart() {
      this.$noty.success(`Pronto! ${this.selectedProduct.name} foi adicionado.`)
      this.$modal.hide('product-modal')
    }
  }
}
</script>

<style scoped>
.products-grid {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;
}

.products-grid__item {
  width: 100%;
  padding: 0 10px;
}

@media (min-width: 768px) {
  .products-grid__item {
    width: 50%;
  }
}

@media (min-width: 1024px) {
  .products-grid__item {
    width: 25%;
  }
}

.filters {
  display: flex;
  justify-content: center;
  gap: 15px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.filter-btn {
  padding: 10px 24px;
  border-radius: 50px;
  background: var(--white);
  color: var(--text-dark);
  font-weight: 600;
  border: 1px solid rgba(0,0,0,0.05);
  white-space: nowrap;
}

.filter-btn.is-active {
  background: var(--primary);
  color: var(--white);
}

.modal-content {
  background: white;
  border-radius: 20px;
  overflow: hidden;
}

@media (min-width: 1024px) {
  .modal-content {
    display: flex;
    max-height: 80vh;
  }
  
  .modal-header {
    width: 50%;
    height: auto !important;
  }
  
  .modal-body {
    width: 50%;
    overflow-y: auto;
    padding: 40px !important;
  }
}

.modal-header {
  position: relative;
  height: 250px;
}

.modal-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.modal-close {
  position: absolute;
  top: 15px;
  right: 15px;
  background: white;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 10;
}

.modal-body {
  padding: 25px;
}

.modal-price {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary);
  margin-bottom: 10px;
}

.modal-description {
  color: var(--text-muted);
  margin-bottom: 20px;
}

.modal-ingredients h4 {
  margin-bottom: 10px;
}

.modal-ingredients ul {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.modal-ingredients li {
  background: var(--bg-light);
  padding: 4px 12px;
  border-radius: 50px;
  font-size: 12px;
  color: var(--primary);
  border: 1px solid rgba(45, 90, 39, 0.1);
}

.btn--full {
  width: 100%;
}
</style>
