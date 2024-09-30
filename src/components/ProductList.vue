<template>
  <div class="product-list">
    <div v-if="products.length === 0">Nenhum produto encontrado.</div>
    <div class="product" v-for="product in products" :key="product._id">
      <img :src="product.imageUrl" :alt="product.name" />
      <h3>{{ product.name }}</h3>
      <p>{{ product.description }}</p>
      <p>Preço: R$ {{ (product.price / 100).toFixed(2) }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    products: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
}

.product {
  width: 30%;
  /* Ajuste conforme necessário */
  margin: 1%;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 4px;
}

.product img {
  max-width: 100%;
  height: auto;
}
</style>
