<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>

      <router-link to="/categories/men">Masculinos</router-link>
      <router-link to="/categories/women">Femininos</router-link>
      <router-link to="/categories/kids">Infantis</router-link>
      <router-link to="/cart">Carrinho ({{ cartCount }})</router-link>
    </nav>
    <nav class="nav-2">
      <input type="text" v-model="searchQuery" placeholder="Buscar produtos..." class="search-input" @input="onSearch"
        v-if="$route.path !== '/'" />
      <router-link to="/contact" class="fale_conosco">Fale conosco</router-link>
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
    ...mapGetters(['cartCount']),
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
  background-image: url("/images/hero-background.jpg");
}

.search-input {
  padding: 8px;
  border: 1px solid #333;
  border-radius: 10px;
  width: 300px;
  display: block;
  /* Faz o input se comportar como um bloco */
  margin: 0 auto;
  /* Centraliza horizontalmente */
  position: absolute;
}

.fixed-footer {
  bottom: 0px;
  top: 20px;
  left: 0;
  margin-top: 20px;
  background-color: #333;
  color: white;
  padding: 10px;
  text-align: center;


}

nav {
  background-color: #93e5a1;
  padding: 8px;
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.nav-2 {
  border-radius: 0 0 8px 8px;
}

nav a {
  text-decoration: none;
  color: #2a5934;
  /* Tom de verde escuro */
  font-size: 20px;
  font-weight: 500;
  padding: 10px 20px;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;
}

nav a:hover {
  background-color: #8bc34a;
  /* Verde mais claro ao passar o mouse */
  color: white;
}

nav a.active {
  background-color: #4caf50;
  /* Tom de verde para o link ativo */
  color: white;
}

nav a:not(.active):hover {
  background-color: #81c784;
  /* Verde intermediário no hover */
}

nav a:not(.active) {
  background-color: transparent;
}

.fale_conosco {
  display: block;
  margin-left: 80%;
}
</style>