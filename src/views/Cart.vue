<template>
  <div class="cart-container">
    <div class="cart">
      <h2 class="cart-title">Carrinho de Compras</h2>
      <div v-if="cartItems.length === 0" class="empty-cart">
        <i class="empty-cart-icon">🛒</i>
        <p>Seu carrinho está vazio.</p>
        <router-link to="/" class="continue-shopping">Continuar Comprando</router-link>
      </div>
      <div v-else class="cart-content">
        <div class="cart-header">
          <span class="header-product">Produto</span>
          <span class="header-price">Preço</span>
          <span class="header-quantity">Quantidade</span>
          <span class="header-total">Subtotal</span>
        </div>
        <ul class="cart-items">
          <li v-for="item in cartItems" :key="item.product._id" class="cart-item">
            <div class="item-image-container">
              <img :src="formatImagePath(item.product.imageUrl)" alt="Product Image" class="cart-image" />
            </div>
            <div class="item-details">
              <h3 class="item-name">{{ item.product.name }}</h3>
              <p class="item-category" v-if="item.product.category">{{ item.product.category }}</p>
            </div>
            <div class="item-price">R$ {{ (item.product.price / 100).toFixed(2) }}</div>
            <div class="item-quantity">
              <button @click="removeFromCart(item.product._id)" class="quantity-btn decrease">-</button>
              <span class="quantity-value">{{ item.quantity }}</span>
              <button @click="addToCart(item.product)" class="quantity-btn increase">+</button>
            </div>
            <div class="item-subtotal">R$ {{ ((item.product.price * item.quantity) / 100).toFixed(2) }}</div>
            <button @click="removeItem(item.product._id)" class="remove-item">×</button>
          </li>
        </ul>
        <div class="cart-summary">
          <div class="cart-actions">
            <router-link to="/" class="continue-shopping">Continuar Comprando</router-link>
            <button @click="clearCart" class="clear-cart">Limpar Carrinho</button>
          </div>
          <div class="order-summary">
            <h3 class="summary-title">Resumo do Pedido</h3>
            <div class="summary-row">
              <span>Subtotal:</span>
              <span>R$ {{ (totalPrice / 100).toFixed(2) }}</span>
            </div>
            <div class="summary-row">
              <span>Frete:</span>
              <span>Grátis</span>
            </div>
            <div class="summary-row total">
              <span>Total:</span>
              <span>R$ {{ (totalPrice / 100).toFixed(2) }}</span>
            </div>
            <button class="checkout-btn">Finalizar Compra</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { formatImagePath } from '../utils/imageUtils';

export default {
  computed: {
    ...mapGetters(['cartItems', 'totalPrice']),
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    removeFromCart(productId) {
      this.$store.dispatch('removeFromCart', productId);
    },
    removeItem(productId) {
      // Remove o item completamente do carrinho
      this.$store.commit('REMOVE_ITEM', productId);
    },
    clearCart() {
      this.$store.commit('CLEAR_CART');
    },
    formatImagePath,
  },
};
</script>

<style scoped>
.cart-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cart {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
  padding: 30px;
}

.cart-title {
  color: #333;
  font-size: 1.8rem;
  margin-bottom: 30px;
  text-align: center;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
}

/* Empty cart styles */
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
  text-align: center;
}

.empty-cart-icon {
  font-size: 4rem;
  color: #ccc;
  margin-bottom: 20px;
}

.empty-cart p {
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

/* Cart header */
.cart-header {
  display: grid;
  grid-template-columns: 3fr 1fr 1.5fr 1fr 0.5fr;
  padding: 15px 0;
  border-bottom: 2px solid #eee;
  font-weight: bold;
  color: #555;
}

.header-product {
  grid-column: 1 / span 2;
  padding-left: 10px;
}

/* Cart items */
.cart-items {
  list-style: none;
  padding: 0;
  margin: 0;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr 1fr 1.5fr 1fr 0.5fr;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  position: relative;
  transition: background-color 0.2s;
}

.cart-item:hover {
  background-color: #f9f9f9;
}

.item-image-container {
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
}

.cart-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.item-details {
  grid-column: 2;
}

.item-name {
  font-size: 1rem;
  margin: 0 0 5px 0;
  color: #333;
}

.item-category {
  color: #888;
  font-size: 0.85rem;
  margin: 0;
}

.item-price {
  grid-column: 3;
  color: #555;
  font-weight: 500;
}

.item-quantity {
  grid-column: 4;
  display: flex;
  align-items: center;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #ddd;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.2s;
}

.quantity-btn:hover {
  background-color: #f0f0f0;
}

.decrease {
  color: #ff5722;
}

.increase {
  color: #4CAF50;
}

.quantity-value {
  margin: 0 10px;
  font-weight: 500;
  min-width: 20px;
  text-align: center;
}

.item-subtotal {
  grid-column: 5;
  font-weight: bold;
  color: #2a5934;
}

.remove-item {
  grid-column: 6;
  background: none;
  border: none;
  color: #ccc;
  font-size: 1.5rem;
  cursor: pointer;
  transition: color 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.remove-item:hover {
  color: #ff5722;
}

/* Cart summary */
.cart-summary {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  flex-wrap: wrap;
}

.cart-actions {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.continue-shopping {
  background-color: #fff;
  color: #4CAF50;
  border: 2px solid #4CAF50;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
  transition: all 0.3s;
  font-weight: 500;
}

.continue-shopping:hover {
  background-color: #f0f9f0;
  transform: translateY(-2px);
}

.clear-cart {
  background-color: #fff;
  color: #ff5722;
  border: 2px solid #ff5722;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.3s;
  font-weight: 500;
}

.clear-cart:hover {
  background-color: #fff0ed;
  transform: translateY(-2px);
}

/* Order summary */
.order-summary {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  width: 300px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.summary-title {
  font-size: 1.2rem;
  margin-top: 0;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
  color: #333;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  color: #555;
}

.summary-row.total {
  font-weight: bold;
  font-size: 1.2rem;
  color: #333;
  margin-top: 10px;
  padding-top: 15px;
  border-top: 1px solid #eee;
}

.checkout-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 12px 0;
  width: 100%;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.checkout-btn:hover {
  background-color: #3e8e41;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

/* Responsive styles */
@media (max-width: 768px) {
  .cart-header {
    display: none;
  }
  
  .cart-item {
    grid-template-columns: 80px 1fr;
    grid-template-rows: auto auto auto;
    gap: 10px;
    padding: 15px 0;
  }
  
  .item-image-container {
    grid-row: 1 / span 3;
    margin-right: 0;
  }
  
  .item-details {
    grid-column: 2;
    grid-row: 1;
  }
  
  .item-price {
    grid-column: 2;
    grid-row: 2;
  }
  
  .item-quantity {
    grid-column: 2;
    grid-row: 3;
  }
  
  .item-subtotal {
    display: none;
  }
  
  .remove-item {
    position: absolute;
    top: 10px;
    right: 10px;
    grid-column: auto;
  }
  
  .cart-summary {
    flex-direction: column;
    gap: 20px;
  }
  
  .order-summary {
    width: 100%;
  }
}
</style>
