<template>
  <div class="cart">
    <h2>Carrinho de Compras</h2>
    <div v-if="cartItems.length === 0">
      <p>Seu carrinho está vazio.</p>
    </div>
    <div v-else>
      <ul>
        <li v-for="item in cartItems" :key="item.product._id" class="cart-item">
          <img :src="item.product.imageUrl" alt="Product Image" class="cart-image" />
          <div class="cart-details">
            <h3>{{ item.product.name }}</h3>
            <p>R$ {{ (item.product.price / 100).toFixed(2) }} x {{ item.quantity }}</p>
            <button @click="removeFromCart(item.product._id)">-</button>
            <button @click="addToCart(item.product)">+</button>
          </div>
        </li>
      </ul>
      <div class="total">
        <h3>Total: R$ {{ (totalPrice / 100).toFixed(2) }}</h3>
      </div>
      <button @click="clearCart" class="clear-cart">Limpar Carrinho</button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

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
    clearCart() {
      this.$store.commit('CLEAR_CART');
    },
  },
};
</script>

<style scoped>
.cart {
  padding: 20px;
}

.cart-item {
  display: flex;
  align-items: center;
  margin: 10px 0;
}

.cart-image {
  width: 100px;
  height: auto;
  margin-right: 10px;
}

.cart-details {
  flex-grow: 1;
}

.total {
  margin-top: 20px;
  font-weight: bold;
}

.clear-cart {
  background-color: #ff5722;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.clear-cart:hover {
  background-color: #e64a19;
}
</style>
