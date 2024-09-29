<template>
    <div>
      <h2>Produtos Disponíveis</h2>
      <ul>
        <li v-for="product in products" :key="product._id">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
          <p>Preço: R$ {{ product.price / 100 }}</p>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  import { fetchProducts } from '../services/productService';
  
  export default {
    data() {
      return {
        products: [],
      };
    },
    async created() {
      this.products = await fetchProducts();
    },
  };
  </script>