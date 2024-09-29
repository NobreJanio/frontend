import { createApp } from 'vue';
import App from './App.vue';
import router from './routes'; // Importando o router
import store from './store'; // Se estiver usando Vuex

const app = createApp(App);
app.use(router);
app.use(store); // Se estiver usando Vuex
app.mount('#app');

