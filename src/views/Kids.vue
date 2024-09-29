<template>
  <div class="home">
    <div class="featured-products">
      <h2>Infantis</h2>
      <div class="featured-list">
        <ProductCard v-for="product in limitedFeaturedProducts" :key="product._id" :productId="product._id"
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
    limitedFeaturedProducts() {
      // Filtrar apenas produtos da categoria "kids"
      return this.allProducts.filter(product => product.category === 'kids');
    },
  },
  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
  },
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