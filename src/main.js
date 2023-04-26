import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'

import VueCookies from 'vue-cookies';
import VueAwesomePaginate from 'vue-awesome-paginate'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueAwesomePaginate)
app.use(VueCookies)
app.mount('#app')

$cookies.config('7d','','',true)
