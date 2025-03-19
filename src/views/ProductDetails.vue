<template>
  <div class="product-details">
    <h1 class="page-title">Detalhes do Produto</h1>
    <div v-if="product" class="product-container">
      <div class="product-image-container">
        <img :src="formatImagePath(product.imageUrl)" alt="Product Image" class="product-image" />
      </div>
      <div class="product-info">
        <h2 class="product-name">{{ product.name }}</h2>
        <p class="product-price">Preço: R$ {{ formatPrice(product.price) }}</p>
        <p class="product-description">{{ product.description }}</p>
        <button @click="addToCart(product)" class="add-to-cart-btn">Adicionar ao Carrinho</button>
      </div>
    </div>
    <div v-else class="not-found">
      <p>Produto não encontrado.</p>
    </div>
  </div>
</template>
  
<script>
import { mapActions } from 'vuex';
import products from '../data/products.json';
import { formatImagePath } from '../utils/imageUtils';

export default {
  name: 'ProductDetails',
  data() {
    return {
      product: null,
    };
  },
  created() {
    this.fetchProduct();
  },
  methods: {
    ...mapActions(['addToCart']),
    fetchProduct() {
      const productId = this.$route.params.id;
      this.product = products.products.find(product => product._id === productId) || null;
      
      if (!this.product) {
        console.error('Produto não encontrado');
      }
    },
    formatPrice(price) {
      return (price / 100).toFixed(2);
    },
    formatImagePath
  }
};
  </script>
  
<style scoped>
.product-details {
  padding: 30px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-title {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 2rem;
}

.product-container {
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  align-items: flex-start;
}

.product-image-container {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
}

.product-image {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.product-info {
  flex: 1;
  min-width: 300px;
  text-align: left;
}

.product-name {
  font-size: 1.8rem;
  margin-bottom: 15px;
  color: #333;
}

.product-price {
  font-size: 1.4rem;
  font-weight: bold;
  color: #2a5934;
  margin-bottom: 20px;
}

.product-description {
  font-size: 1rem;
  line-height: 1.6;
  color: #555;
  margin-bottom: 30px;
}

.add-to-cart-btn {
  background-image: linear-gradient(to right, #4CAF50, #2ECC71);
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 25px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
}

.add-to-cart-btn:hover {
  background-image: linear-gradient(to right, #3e8e41, #2ECC71);
  transform: scale(1.03);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.not-found {
  text-align: center;
  padding: 50px;
  color: #666;
  font-style: italic;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .product-container {
    flex-direction: column;
    align-items: center;
  }
  
  .product-info {
    text-align: center;
  }
}
</style>
  