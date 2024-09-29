<!-- src/views/ProductDetails.vue -->
<template>
    <div class="product-details">
      <h1>Detalhes do Produto</h1>
      <div v-if="product">
        <img :src="product.image" alt="Product Image" />
        <h2>{{ product.name }}</h2>
        <p>Preço: R$ {{ (product.price / 100).toFixed(2) }}</p>
        <p>{{ product.description }}</p>
        <button @click="addToCart(product)">Adicionar ao Carrinho</button>
      </div>
      <div v-else>
        <p>Produto não encontrado.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProductDetails',
    data() {
      return {
        product: null, // Aqui você irá buscar os detalhes do produto
      };
    },
    created() {
      // Simulando a busca de um produto, substitua por uma chamada de API real
      const productId = this.$route.params.id;
      // Aqui você pode usar a lógica para buscar o produto baseado no productId
      this.product = {
        id: productId,
        name: 'Camiseta Masculina',
        price: 2999,
        image: 'link_to_image',
        description: 'Uma camiseta confortável e estilosa.',
      };
    },
    methods: {
      addToCart(product) {
        // Lógica para adicionar ao carrinho
        console.log(`Adicionado ao carrinho: ${product.name}`);
      }
    }
  };
  </script>
  
  <style scoped>
  .product-details {
    padding: 20px;
    text-align: center;
  }
  
  .product-details img {
    max-width: 100%;
    height: auto;
  }
  </style>
  