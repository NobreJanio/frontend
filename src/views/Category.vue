<template>
  <div>
    <h2 class="category-title">Produtos - {{ category | capitalize }}</h2>
    <div class="product-grid">
      <div class="product-card" v-for="product in products" :key="product._id">
        <img :src="product.imageUrl" alt="Imagem do produto" class="product-image" />
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p class="product-price">R$ {{ product.price / 100 }}</p>
          <button @click="addToCart(product)" class="add-to-cart">Adicionar ao Carrinho</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchProductsByCategory } from '../services/productService';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      products: [],
      category: this.$route.params.category,
    };
  },
  async created() {
    this.products = await fetchProductsByCategory(this.category);
  },
  methods: {
    ...mapActions(['addToCart']),
  },
};
</script>

<style scoped>
.category-title {
  text-align: center;
  margin: 20px 0;
  font-size: 24px;
  font-weight: bold;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
  padding: 20px;
}

.product-card {
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
}

.product-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-price {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin: 10px 0;
}

.add-to-cart {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-to-cart:hover {
  background-color: #45a049;
}
</style>