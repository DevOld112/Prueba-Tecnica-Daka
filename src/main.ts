import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueSpinnersPlugin } from 'vue3-spinners';

import App from './App.vue'
import VueAwesomePaginate from "vue-awesome-paginate";
import router from './router'

import "vue-awesome-paginate/dist/style.css";

const app = createApp(App).use(VueAwesomePaginate)

app.use(createPinia())
app.use(router)
app.use(VueSpinnersPlugin);

app.mount('#app')
