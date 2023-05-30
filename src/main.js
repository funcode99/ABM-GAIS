import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './index.css'

// Vuetify
// import 'vuetify/styles'
// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'

// import Multiselect from 'vue-multiselect'
// import Multiselect from '@vueform/multiselect'
import VueCookies from 'vue-cookies';
import VueAwesomePaginate from 'vue-awesome-paginate'
import VueDatePicker from '@vuepic/vue-datepicker'
import Vue3TagsInput from 'vue3-tags-input';
import vClickOutside from "click-outside-vue3"
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@vuepic/vue-datepicker/dist/main.css'

// const vuetify = createVuetify({
//   components,
//   directives,
// })

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(VueAwesomePaginate)
app.use(VueCookies)
app.use(Vue3TagsInput)
app.use(vClickOutside)
// app.use(vuetify)
// app.component('multiselect', Multiselect)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

$cookies.config('7d', '', '', true)
