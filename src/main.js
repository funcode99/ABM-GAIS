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

const inputStylingClass = 'py-2 px-4 border border-slate-300 rounded-lg shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm w-full font-JakartaSans font-semibold text-base'
const labelStylingClass = 'block mb-2 font-JakartaSans font-medium text-sm'

const app = createApp(App)

app.config.globalProperties.$inputStyling = inputStylingClass
app.config.globalProperties.$labelStyling = labelStylingClass

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
