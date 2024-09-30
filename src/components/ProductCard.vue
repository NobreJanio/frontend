<template>
  <div class="product-card" @mouseover="hover = true" @mouseout="hover = false">
    <header>
      <img v-if="product" :src="getImageUrl(product.imageUrl)" alt="Product Image" class="product-image" />
      <h3 v-if="product">{{ product.name }}</h3>
    </header>
    <p v-if="product">{{ product.description }}</p>
    <footer v-if="product">
      <p class="price">R$ {{ (product.price / 100).toFixed(2) }}</p>
      <button @click="addToCart(product)" class="add-to-cart">Adicionar ao Carrinho</button>
    </footer>
    <div v-else>
      <p>Produto não encontrado.</p>
    </div>
  </div>
</template>

<script>
import store from '../store/index';
import products from '../data/products.json'; // Importando os produtos

export default {
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      hover: false,
      product: null, // Inicializa como null
    };
  },
  mounted() {
    this.fetchProduct();
  },
  methods: {
    fetchProduct() {
      // Busca o produto diretamente do JSON importado
      this.product = products.products.find(product => product._id === this.productId) || null;
      if (!this.product) {
        console.error('Produto não encontrado');
      }
    },
    addToCart(product) {
      store.dispatch('addToCart', product);
    },
    getImageUrl(imageUrl) {
      return `/${imageUrl}`;
    },
  },
};
</script>

<style scoped>
.product-card {
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  width: 250px;
  height: 280px;

}

.product-card:hover {
  transform: scale(1.05);
  border: #4CAF50 solid 2px;
}

.product-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 10px;
  display: block;
  margin: 0 auto;
}

.add-to-cart {
  background-image: linear-gradient(to right, #4CAF50, #2ECC71);
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
  transition: transform 0.2s;
}

.add-to-cart:hover {
  background-image: linear-gradient(to right, #3e8e41, #2ECC71);
  transform: scale(1.1);
}
</style>