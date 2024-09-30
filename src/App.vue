<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/categories/men">Masculinos</router-link>
      <router-link to="/categories/women">Femininos</router-link>
      <router-link to="/categories/kids">Infantis</router-link>
      <router-link to="/cart">Carrinho ({{ cartCount }})</router-link>
    </nav>

    <!-- Campo de busca -->
    <div class="search-container">
      <input type="text" placeholder="Buscar produtos..." v-model="searchQuery" @input="debouncedFilterProducts" />
    </div>

    <router-view />
    <div id="footer" class="fixed-footer">
      <!-- footer content here -->
      &copy; 2024 Dev JanioJunior
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import productsData from './data/products.json'; // Importa os dados dos produtos


export default {

  data() {
    return {
      searchQuery: '', // Armazena a consulta de busca
      products: productsData.products, // Armazena todos os produtos
      filteredProducts: [], // Armazena os produtos filtrados
    };
  },

  computed: {
    ...mapGetters(['cartItems']),
    cartCount() {
      return this.cartItems.reduce((total, item) => total + item.quantity, 0); // Conta o total de itens no carrinho
    },
  },

  methods: {
    filterProducts() {
      if (this.searchQuery) {
        // Filtra os produtos com base na consulta
        this.filteredProducts = this.products.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      } else {
        this.filteredProducts = this.products; // Se a consulta estiver vazia, mostra todos os produtos
      }
    },
  },
  mounted() {
    this.filteredProducts = this.products; // Inicializa com todos os produtos
  },
};
</script>

<style scoped>
#app {
  background-image: url("/public/images/hero-background.jpg");
}

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

/* Estilos para o campo de busca */
.search-container {
  padding: 10px;
}

.search-container input {
  width: 98%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
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
