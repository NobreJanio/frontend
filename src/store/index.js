import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            cart: [],
        };
    },
    mutations: {
        ADD_TO_CART(state, product) {
            const existingProduct = state.cart.find(item => item.product._id === product._id);
            if (existingProduct) {
                existingProduct.quantity += 1; // Aumenta a quantidade se o produto já estiver no carrinho
            } else {
                state.cart.push({ product, quantity: 1 }); // Adiciona novo produto ao carrinho
            }
        },
        REMOVE_FROM_CART(state, productId) {
            const existingProduct = state.cart.find(item => item.product._id === productId);
            if (existingProduct) {
                if (existingProduct.quantity > 1) {
                    existingProduct.quantity -= 1; // Reduz a quantidade se maior que 1
                } else {
                    state.cart = state.cart.filter(item => item.product._id !== productId); // Remove o produto se a quantidade for 0
                }
            }
        },
        CLEAR_CART(state) {
            state.cart = []; // Limpa o carrinho
        },
    },
    actions: {
        addToCart({ commit }, product) {
            commit('ADD_TO_CART', product);
        },
        removeFromCart({ commit }, productId) {
            commit('REMOVE_FROM_CART', productId);
        },
    },
    getters: {
        cartItems(state) {
            return state.cart;
        },
        totalPrice(state) {
            return state.cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
        },
    },
});

export default store;
