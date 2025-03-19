<template>
  <div class="product-card">
    <template v-if="product">
      <header>
        <img :src="formatImagePath(product.imageUrl)" alt="Product Image" class="product-image" />
        <h3>{{ product.name }}</h3>
      </header>
      <p class="description">{{ product.description }}</p>
      <footer>
        <p class="price">R$ {{ formatPrice(product.price) }}</p>
        <button @click="addToCart(product)" class="add-to-cart">Adicionar ao Carrinho</button>
      </footer>
    </template>
    <div v-else class="not-found">
      <p>Produto não encontrado.</p>
    </div>
  </div>
</template>

<script>
import store from '../store/index';
import products from '../data/products.json';
import { formatImagePath } from '../utils/imageUtils';

export default {
  name: 'ProductCard',
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      product: null,
    };
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    fetchProduct() {
      this.product = products.products.find(product => product._id === this.productId) || null;
      if (!this.product) {
        console.error('Produto não encontrado');
      }
    },
    addToCart(product) {
      store.dispatch('addToCart', product);
    },

    formatPrice(price) {
      return (price / 100).toFixed(2);
    },
    formatImagePath,
  },
};
</script>

<style scoped>
.product-card {
  background-color: #f7f7f7;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  width: 250px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  z-index: 1;
}

.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border: #4CAF50 solid 2px;
  z-index: 2;
}

.product-card header {
  margin-bottom: 10px;
}

.product-card h3 {
  margin: 10px 0;
  font-size: 1.1rem;
  height: 44px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: center;
}

.description {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 15px;
  height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.product-card footer {
  margin-top: auto;
}

.product-image {
  width: 200px;
  height: 180px;
  object-fit: contain;
  border-radius: 8px;
  display: block;
  margin: 0 auto;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.price {
  font-weight: bold;
  font-size: 1.2rem;
  color: #2a5934;
  margin: 10px 0;
}

.add-to-cart {
  background-image: linear-gradient(to right, #4CAF50, #2ECC71);
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  font-weight: bold;
}

.add-to-cart:hover {
  background-image: linear-gradient(to right, #3e8e41, #2ECC71);
  transform: scale(1.03);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.not-found {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #666;
  font-style: italic;
}
</style>