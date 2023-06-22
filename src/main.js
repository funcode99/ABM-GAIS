import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'
import 'vue-search-select/dist/VueSearchSelect.css'

import Vue3TagsInput from 'vue3-tags-input';
import vClickOutside from "click-outside-vue3"

import VueCookies from 'vue-cookies';
import VueAwesomePaginate from 'vue-awesome-paginate'
import VueDatePicker from '@vuepic/vue-datepicker'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueAwesomePaginate)
app.use(VueCookies)
app.use(Vue3TagsInput)
app.use(vClickOutside)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

$cookies.config('7d', '', '', true)
