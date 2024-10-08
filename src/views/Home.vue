<template>
  <div class="home">
    <input type="text" v-model="searchQuery" placeholder="Buscar produtos..." class="search-input-home"
      @input="onSearch" />

    <!-- Exibe resultados da busca somente se houver uma busca -->
    <div v-if="filteredProducts.length > 0" class="search-results">
      <h2 class="featured-title">Resultados da Busca</h2>
      <div class="featured-list">
        <ProductCard v-for="product in filteredProducts" :key="product._id" :productId="product._id" :product="product"
          @add-to-cart="addToCart" />
      </div>
    </div>

    <!-- Swiper (banner) -->
    <swiper :style="{
      '--swiper-navigation-color': '#4CAF50',
      '--swiper-pagination-color': '#4CAF50',
    }" :slidesPerView="1" :spaceBetween="30" :loop="true" :parallax="true" :autoplay="{
      delay: 2500,
      disableOnInteraction: false,
    }" :pagination="{
      clickable: true,
    }" :navigation="true" :modules="modules" class="mySwiper">

      <div slot="container-start" class="parallax-bg" data-swiper-parallax="-23%"></div>
      <swiper-slide :style="{
        'background-image': 'url(/src/assets/images/banner-15.jpg)',
        'background-size': 'cover',
      }">

        <div class="title" data-swiper-parallax="-300">Não perca</div>
        <div class="subtitle" data-swiper-parallax="-200">Decontão até</div>
        <div class="text" data-swiper-parallax="-100">
          <p>
            30%
          </p>
        </div>
      </swiper-slide>

      <swiper-slide :style="{
        'background-image':
          'url(/src/assets/images/banner-25.jpg)',
        'background-size': 'cover',
      }">

        <div class="title" data-swiper-parallax="-300">Não perca</div>
        <div class="subtitle" data-swiper-parallax="-200">Decontão até</div>
        <div class="text" data-swiper-parallax="-100">
          <p>
            30%
          </p>
        </div>
      </swiper-slide>

      <swiper-slide :style="{
        'background-image':
          'url(/src/assets/images/banner-29.jpg)',
        'background-size': 'cover',
      }">

        <div class="title" data-swiper-parallax="-300">Não perca</div>
        <div class="subtitle" data-swiper-parallax="-200">Decontão até</div>
        <div class="text" data-swiper-parallax="-100">
          <p>
            30%
          </p>
        </div>
      </swiper-slide>

      <template #container-end>
        <div class="autoplay-progress">
          <svg viewBox="0 0 48 48" ref="progressCircle">
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref="progressContent"></span>
        </div>
      </template>
    </swiper>

    <div class="featured-products">
      <h2 class="featured-title">Produtos mais vendidos</h2>
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
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Parallax, Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


export default {
  components: {
    ProductCard,
    Swiper,
    SwiperSlide,
  },

  data() {
    return {
      allProducts: products.products,
      searchQuery: '',
    };
  },
  computed: {
    limitedFeaturedProducts() {
      const limitedProducts = [];
      const categories = [...new Set(this.allProducts.map(product => product.category))];

      categories.forEach(category => {
        const productsInCategory = this.allProducts.filter(product => product.category === category);
        limitedProducts.push(...productsInCategory.slice(0, 3)); // Adiciona até 2 produtos por categoria
      });

      return limitedProducts;
    },

    filteredProducts() {
      if (this.searchQuery) {
        return this.allProducts.filter(product => {
          return product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
            product.description.toLowerCase().includes(this.searchQuery.toLowerCase());
        });
      } else {
        return [];
      }
    }
  },

  setup() {
    const progressCircle = ref(null);
    const progressContent = ref(null);
    const onAutoplayTimeLeft = (s, time, progress) => {
      progressCircle.value.style.setProperty('--progress', 1 - progress);
      progressContent.value.textContent = `${Math.ceil(time / 1000)}s`;
    };
    return {
      onAutoplayTimeLeft,
      progressCircle,
      progressContent,
      modules: [Parallax, Autoplay, Pagination, Navigation],
    };
  },

  methods: {
    addToCart(product) {
      this.$store.dispatch('addToCart', product);
    },
    onSearch() {
      // adicionar lógica adicional aqui se necessário
    }
  },
};
</script>


/* Estilos personalizados para a exibição de produtos */

<style scoped>
.home {
  text-align: center;
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

.mySwiper {
  margin-bottom: 30px;
}

img {
  width: 100%;
  height: auto;
}

.featured-products {
  margin-top: 40px;
}

.featured-list {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.product-card {
  flex: 0 2 calc(25% - 1rem);
  /* Cada card ocupa 25% da largura, menos o espaçamento */
  max-width: 220px;
  /* Largura máxima para os cards */
}

.swiper {
  width: 100%;
  height: 600px;
}

.swiper-slide {
  font-size: 18px;
  color: black;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 200px 300px;

  /* Center slide text vertically */
  display: grid;
  justify-content: left;
  align-items: center;
}


.autoplay-progress {
  position: absolute;
  right: 16px;
  bottom: 16px;
  z-index: 10;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: var(--swiper-theme-color);
}

.autoplay-progress svg {
  --progress: 0;
  position: absolute;
  left: 0;
  top: 0px;
  z-index: 10;
  width: 100%;
  height: 100%;
  stroke-width: 4px;
  stroke: var(--swiper-theme-color);
  fill: none;
  stroke-dashoffset: calc(125.6px * (1 - var(--progress)));
  stroke-dasharray: 125.6;
  transform: rotate(-90deg);
}

.parallax-bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 130%;
  height: 100%;

}

.swiper-slide .title {
  font-size: 80px;
  font-weight: 300;
}

.swiper-slide .subtitle {
  font-size: 50px;
}

.swiper-slide .text {
  font-size: 120px;
  max-width: 400px;
  line-height: 0.2;
  color: red
}

.search-input-home {
  padding: 8px;
  border: 1px solid #333;
  border-radius: 10px;
  width: 300px;
  position: absolute;
  /* Altera o posicionamento para absoluto */
  top: 79px;
  /* Ajuste a distância do topo conforme necessário */
  left: 50%;
  /* Centraliza horizontalmente */
  transform: translateX(-50%);
  /* Ajusta a posição para centralizar */
  z-index: 10;
  /* Garante que o input fique acima do nav */
}

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

  width: 20%;

  height: 2px;

  background-color: #195e24;

  margin: 10px auto 0;

}
</style>
