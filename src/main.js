import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import crypto from 'vue-cryptojs'
import store from './store'

createApp(App).use(store).use(router).use(crypto).mount('#app')