import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import './index.css'

import { plugin as formKitPlugin, defaultConfig } from '@formkit/vue'
import { createMultiStepPlugin } from '@formkit/addons'
import '@formkit/themes/genesis'
import '@formkit/addons/css/multistep'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(formKitPlugin, defaultConfig({plugins: [createMultiStepPlugin()]}))


app.mount('#app')
