<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/categories/men">Masculinos</router-link>
      <router-link to="/categories/women">Femininos</router-link>
      <router-link to="/categories/kids">Infantis</router-link>
      <router-link to="/cart">Carrinho ({{ cartCount }})</router-link>
    </nav>
    <router-view />
    <div id="footer" class="fixed-footer">
      <!-- footer content here -->
      &copy; 2024 Dev JanioJunior
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['cartItems']),
    cartCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0); // Conta o total de itens no carrinho
    },
  },
};
</script>

<style scoped>
/* Estilos para o menu */
nav {
  display: flex;
  justify-content: space-between;
  background-color: #333;
  padding: 10px;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 10px;
}

nav a:hover {
  background-color: #444;
}

.fixed-footer {

  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: center;
}
</style>
