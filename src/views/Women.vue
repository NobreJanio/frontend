<template>
  <div class="home">
    <div class="featured-products">
      <h2>Masculino</h2>

      <div class="featured-list">
        <ProductCard v-for="product in displayProducts" :key="product._id" :productId="product._id" :product="product"
          @add-to-cart="addToCart" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from "../components/ProductCard.vue";
import products from "../data/products.json";

export default {
  components: {
    ProductCard
  },
  props: ['searchQuery'], // Recebe a prop do componente pai
  data() {
    return {
      allProducts: products.products,
    };
  },
  computed: {
    displayProducts() {
      let productsToShow = this.searchQuery
        ? this.allProducts.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          product.description.toLowerCase().includes(this.searchQuery.toLowerCase())
        )
        : this.allProducts;

      return productsToShow.filter(product => product.category === 'women');
    }
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    }
  }
};
</script>

<style scoped>
.featured-products {
  margin-top: 40px;
}

.featured-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 15px;
}
</style>