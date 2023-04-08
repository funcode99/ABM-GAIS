import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"
import Notification from "../views/Notification.vue"
import List from "../views/karyawan/List.vue"
import Edit from "../views/karyawan/Edit.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/inbox',
      name: 'inbox',
      component: Notification
    },
    {
      path: '/karyawan',
      name: 'karyawan',
      component: List
    },
    {
      path: '/editkaryawan',
      name: 'karyawanedit',
      component: Edit
    },
  ]
})

export default router
