import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import JwPagination from 'jw-vue-pagination'
import VueAwesomePaginate from "vue-awesome-paginate"

const app = createApp(App)

// app.use(JwPagination)
app.use(VueAwesomePaginate)
app.use(createPinia())
app.use(router)

app.mount('#app')
