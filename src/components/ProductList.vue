<template>
  <div class="product-list">
    <transition-group name="fade" tag="div" class="product-list-container">
      <div v-if="products.length === 0" class="no-results" key="no-results">
        <p>Nenhum produto encontrado.</p>
      </div>
      <div class="product-card" v-for="(product, index) in products" :key="product._id"
           :style="{ animationDelay: index * 0.1 + 's' }">
        <img :src="formatImagePath(product.imageUrl)" alt="Product Image" class="product-image" />
        <h2 class="product-title">{{ product.name }}</h2>
        <p class="product-description">{{ product.description }}</p>
        <p class="product-price">R$ {{ formatPrice(product.price) }}</p>
        <button @click="addToCart(product)" class="add-to-cart-btn">
          <span class="btn-text">Adicionar ao Carrinho</span>
          <span class="btn-icon">+</span>
        </button>
      </div>
    </transition-group>
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
    formatImagePath,
    handleAddToCart(product) {
      // Adiciona uma classe temporária para animação
      const button = event.target.closest('.add-to-cart-btn');
      if (button) {
        button.classList.add('clicked');
        setTimeout(() => {
          button.classList.remove('clicked');
          this.addToCart(product);
        }, 300);
      } else {
        this.addToCart(product);
      }
    }
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
  perspective: 1000px;
}

.product-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 100%;
}

.product-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 15px;
  width: 220px;
  height: 400px; /* Altura fixa para todos os cards */
  text-align: center;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
              box-shadow 0.4s ease, 
              opacity 0.4s ease;
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  z-index: 1;
  animation: cardEntrance 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
  opacity: 0;
  transform-origin: center bottom;
  margin-bottom: 10px; /* Espaço adicional entre as fileiras */
}

.product-card:hover {
  transform: translateY(-5px) rotateX(5deg);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  z-index: 2;
}

@keyframes cardEntrance {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

/* Animações para transition-group */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: contain;
  border-radius: 4px;
  transition: transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), filter 0.3s ease;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.product-card:hover .product-image {
  transform: translateY(-5px) scale(1.05);
  filter: drop-shadow(0 5px 8px rgba(0, 0, 0, 0.15));
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
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: bold;
  margin-top: auto;
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-to-cart-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transition: left 0.7s ease;
}

.add-to-cart-btn:hover {
  background-color: #3e8e41;
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.add-to-cart-btn:hover::before {
  left: 100%;
}

.add-to-cart-btn:active {
  transform: scale(0.98);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2);
}

.add-to-cart-btn.clicked {
  animation: buttonPulse 0.3s ease;
}

@keyframes buttonPulse {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

.btn-text {
  position: relative;
  z-index: 2;
}

.btn-icon {
  position: absolute;
  right: 15px;
  opacity: 0;
  transform: translateX(-10px);
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover .btn-icon {
  opacity: 1;
  transform: translateX(0);
}

.no-results {
  width: 100%;
  text-align: center;
  color: #888;
  padding: 40px;
  font-style: italic;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
