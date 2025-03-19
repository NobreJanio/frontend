<template>
  <div class="home">
    <input type="text" v-model="searchQuery" placeholder="Buscar produtos..." class="search-input-home"
      @input="onSearch" />

    <!-- Exibe resultados da busca somente se houver uma busca -->
    <div v-if="filteredProducts.length > 0" class="search-results">
      <h2 class="featured-title">Resultados da Busca</h2>
      <div class="featured-list">
        <ProductCard v-for="product in filteredProducts" :key="product._id" :productId="product._id" :product="product"
          @add-to-cart="addToCart" class="product-card" />
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
        'background-image': `url(${bannerImage1})`,
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
          `url(${bannerImage2})`,
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
          `url(${bannerImage3})`,
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

import bannerImage1 from '@/assets/images/banner-15.jpeg';
import bannerImage2 from '@/assets/images/banner-25.jpeg';
import bannerImage3 from '@/assets/images/banner-29.jpeg';


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
      bannerImage1,
      bannerImage2,
      bannerImage3,
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
  gap: 1.5rem;
  padding: 0 20px;
  margin: 0 auto;
  max-width: 1200px;
}

@media (max-width: 1200px) {
  .featured-list {
    gap: 1.2rem;
  }
}

@media (max-width: 768px) {
  .featured-list {
    gap: 1rem;
  }
}

.swiper {
  width: 100%;
  height: 600px;
  margin-top: -19px;
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
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 25px;
  width: 300px;
  font-size: 14px;
  outline: none;
  transition: all 0.3s ease;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 79px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.search-input-home:focus {
  border-color: #4CAF50;
  box-shadow: 0 1px 8px rgba(76, 175, 80, 0.3);
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

.product-card {
  margin-bottom: 20px;
}
</style>
