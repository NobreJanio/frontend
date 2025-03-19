<template>
  <div class="product-list">
    <div v-if="products.length === 0" class="no-results">
      <p>Nenhum produto encontrado.</p>
    </div>
    <div class="product-card" v-for="product in products" :key="product._id">
      <img :src="formatImagePath(product.imageUrl)" alt="Product Image" class="product-image" />
      <h2 class="product-title">{{ product.name }}</h2>
      <p class="product-description">{{ product.description }}</p>
      <p class="product-price">R$ {{ formatPrice(product.price) }}</p>
      <button @click="addToCart(product)" class="add-to-cart-btn">Adicionar ao Carrinho</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
import { formatImagePath } from '../utils/imageUtils';

export default {
  name: 'ProductList',
  props: {
    products: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    ...mapActions(['addToCart']),
    formatPrice(price) {
      return (price / 100).toFixed(2);
    },
    formatImagePath
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  padding: 20px;
}

.product-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  width: 220px;
  height: 400px; /* Altura fixa para todos os cards */
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  z-index: 1;
  margin-bottom: 10px; /* Espaço adicional entre as fileiras */
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  /* Removido o z-index: 2 que estava causando o problema */
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: contain;
  border-radius: 4px;
}

.product-title {
  font-size: 1.1rem;
  margin: 10px 0 5px;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 10px;
  height: 60px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.product-price {
  font-weight: bold;
  font-size: 1.2rem;
  color: #2a5934;
  margin: 10px 0;
}

.add-to-cart-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: bold;
  margin-top: auto;
}

.add-to-cart-btn:hover {
  background-color: #3e8e41;
}

.no-results {
  width: 100%;
  text-align: center;
  color: #888;
  padding: 40px;
  font-style: italic;
}
</style>
