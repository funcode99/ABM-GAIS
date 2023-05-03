import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'

import VueCookies from 'vue-cookies';
import VueAwesomePaginate from 'vue-awesome-paginate'
import VueDatePicker from '@vuepic/vue-datepicker'
import Vue3TagsInput from 'vue3-tags-input';
import vClickOutside from "click-outside-vue3"
import '@vuepic/vue-datepicker/dist/main.css'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueAwesomePaginate)
app.use(VueCookies)
app.use(Vue3TagsInput)
app.use(vClickOutside)
app.component('VueDatePicker', VueDatePicker);
app.mount('#app')

$cookies.config('7d', '', '', true)
