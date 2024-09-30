<template>
  <div class="product-list">
    <div v-if="products.length === 0" class="no-results">
    </div>
    <div class="product-card" v-for="product in products" :key="product._id">
      <img :src="product.imageUrl" alt="Product Image" />
      <h2>{{ product.name }}</h2>
      <p>{{ product.description }}</p>
      <p>R$ {{ (product.price / 100).toFixed(2) }}</p>
      <button @click="addToCart(product)">Adicionar ao Carrinho</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    products: {
      type: Array,
      default: () => [], // Define um valor padrão como um array vazio
    },
  },
  methods: {
    ...mapActions(['addToCart']), // Mapeia a ação de adicionar ao carrinho
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.product-card {
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
  width: 200px;
  text-align: center;
}

.product-card img {
  width: 100%;
  height: auto;
}

.no-results {
  text-align: center;
  color: #888;
}
</style>
