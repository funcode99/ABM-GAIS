import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from "../views/Dashboard.vue"
import Notification from "../views/Notification.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: Notification
    }
  ]
})

export default router
