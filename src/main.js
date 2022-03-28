import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import crypto from 'vue-cryptojs'

createApp(App).use(router).use(crypto).mount('#app')