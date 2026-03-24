<template>
  <div class="product-card fade-in-up">
    <div class="product-card__image-wrapper" v-lazy-container="{ selector: 'img' }">
      <img :data-src="product.image" :alt="product.name" class="product-card__image">
      <span v-if="product.promo" class="product-card__badge">Promoção</span>
    </div>
    <div class="product-card__content">
      <h3 class="product-card__title">{{ product.name }}</h3>
      <p class="product-card__description">{{ product.shortDescription }}</p>
      <div class="product-card__footer">
        <span class="product-card__price">R$ {{ product.price.toFixed(2).replace('.', ',') }}</span>
        <button class="btn btn--primary btn--icon" @click="$emit('open-modal', product)">
          <span>+</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.product-card {
  background: var(--white);
  border-radius: var(--radius);
  overflow: hidden;
  box-shadow: var(--shadow);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  margin-bottom: 20px;
}

@media (min-width: 1024px) {
  .product-card:hover {
    transform: translateY(-10px);
    box-shadow: var(--shadow-lg);
  }
}

.product-card:active {
  transform: scale(0.98);
}

.product-card__image-wrapper {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
  background: #eee;
}

.product-card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.product-card__badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background: var(--accent);
  color: var(--white);
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.product-card__content {
  padding: 15px;
}

.product-card__title {
  font-size: 18px;
  margin-bottom: 5px;
}

.product-card__description {
  font-size: 13px;
  color: var(--text-muted);
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 15px;
}

.product-card__footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-card__price {
  font-size: 18px;
  font-weight: 700;
  color: var(--primary);
}

.btn--icon {
  width: 36px;
  height: 36px;
  padding: 0;
  border-radius: 50%;
  font-size: 20px;
}
</style>
