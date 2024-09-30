<template>
  <div class="home">
    <div class="featured-products">
      <h2 class="featured-title">Infantis</h2>

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

      return productsToShow.filter(product => product.category === 'kids');
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
.featured-title {
  font-size: 28px;

  font-weight: bold;

  color: #2a5934;

  text-align: center;

  margin: 20px 0;

  padding: 10px;

  position: relative;
}

.featured-title::after {
  content: '';

  display: block;

  width: 10%;

  height: 2px;

  background-color: #195e24;

  margin: 10px auto 0;

}

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