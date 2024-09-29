<template>
  <div class="home">
    <!-- Menu de navegação -->
    <nav class="menu">
      <ul>
        <li><router-link to="/" exact>Home</router-link></li>
        <li><router-link to="/categories/men">Masculinos</router-link></li>
        <li><router-link to="/categories/women">Femininos</router-link></li>
        <li><router-link to="/categories/kids">Infantis</router-link></li>
        <li><router-link to="/contact">Contato</router-link></li>
      </ul>
    </nav>

    <div class="hero">
      <h1>Bem-vindo ao E-commerce de Roupas</h1>
      <p>Explore nossas categorias de produtos e encontre o que você ama!</p>
    </div>

    <!-- Produtos em Destaque -->
    <div v-for="category in uniqueCategories" :key="category" class="featured-products">
      <div class="featured-list">
        <ProductCard v-for="product in limitedFeaturedProducts(category)" :key="product._id" :productId="product._id"
          :product="product" @add-to-cart="addToCart" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
import products from "../data/products.json";

export default {
  components: {
    ProductCard,
  },
  data() {
    return {
      allProducts: products.products,
    };
  },
  computed: {
    // Obter categorias únicas dos produtos
    uniqueCategories() {
      const categories = new Set(this.allProducts.map(product => product.category));
      return Array.from(categories);
    },
  },
  methods: {
    // Método para limitar os produtos exibidos a dois por categoria
    limitedFeaturedProducts(category) {
      return this.allProducts
        .filter(product => product.category === category)
        .slice(0, 2); // Limitar a dois produtos
    },
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
  },
};
</script>


/* Estilos personalizados para a exibição de produtos */

<style scoped>
.home {
  text-align: center;
  background-image: url("../assets/images/hero-background.jpg");
  padding: 20px;
}

.hero {
  background-size: cover;
  background-position: center;
  color: rgb(71, 70, 70);
  padding: 60px 20px;
}

h1 {
  font-size: 3em;
  margin: 0;
}

p {
  font-size: 1.2em;
}

.menu {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}

.menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.menu li {
  margin: 0 10px;
}

.menu a {
  color: rgb(71, 70, 70);
  text-decoration: none;
  transition: color 0.2s ease;
}

.menu a:hover {
  color: #e64a19;
}

.featured-products {
  margin-top: 40px;
}

.featured-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  border: 1px solid red;

}



.product-card {
  flex: 0 2 calc(25% - 1rem);
  /* Cada card ocupa 25% da largura, menos o espaçamento */
  max-width: 220px;
  /* Largura máxima para os cards */
}
</style>
