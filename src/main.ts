import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { VueSpinnersPlugin } from 'vue3-spinners';
import App from './App.vue'
import VueAwesomePaginate from "vue-awesome-paginate";
import router from './router'
import { useToast } from 'vue-toast-notification'
import "vue-awesome-paginate/dist/style.css";
import "vue-toast-notification/dist/theme-sugar.css"

const $toast = useToast({
    duration: 3000,
    position: 'bottom-left'
})


const app = createApp(App).use(VueAwesomePaginate)

app.use(createPinia())
app.use(router)
app.use(VueSpinnersPlugin);
app.provide('toast', $toast)
app.mount('#app')
