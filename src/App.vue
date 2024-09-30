<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <input type="text" v-model="searchQuery" placeholder="Buscar..." class="search-input">
      <router-link to="/categories/men">Masculinos</router-link>
      <router-link to="/categories/women">Femininos</router-link>
      <router-link to="/categories/kids">Infantis</router-link>
      <router-link to="/cart">Carrinho ({{ cartCount }})</router-link>
    </nav>

    <router-view :searchQuery="searchQuery" />

    <div id="footer" class="fixed-footer">
      &copy; 2024 Dev JanioJunior
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { debounce } from 'lodash'; // Importa a função debounce
import productsData from './data/products.json'; // Assuming this is your product data
import ProductCard from './components/ProductCard.vue';

export default {
  components: {
    ProductCard
  },
  data() {
    return {
      allProducts: productsData,
      searchQuery: '',
    };
  },
  computed: {
    filteredProducts() {
      const lowerQuery = this.searchQuery.toLowerCase();
      // Filtra apenas pela busca, sem filtrar por categoria
      return this.allProducts.filter(product =>
        product.name.toLowerCase().includes(lowerQuery) ||
        product.description.toLowerCase().includes(lowerQuery)
      );
    },
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    // Debounce the search to avoid excessive calls
    debouncedSearch: debounce(function () {
      // You can add any actions you want to perform on search here
    }, 500),
  },
  watch: {
    searchQuery() {
      this.debouncedSearch();
    },
  },
};
</script>

<style scoped>
#app {
  background-image: url("/public/images/hero-background.jpg");
}

nav {
  display: flex;
  justify-content: space-between;
  background-color: #333;
  padding: 10px;
  align-items: center;
}

nav a {
  color: white;
  text-decoration: none;
  padding: 10px;
}

nav a:hover {
  background-color: #444;
}

.search-input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 200px;
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