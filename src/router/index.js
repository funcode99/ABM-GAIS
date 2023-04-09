import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"
import Notification from "../views/Notification.vue"
import List from "../views/karyawan/List.vue"
import Edit from "../views/karyawan/Edit.vue"
import ListCompany from "../views/company/ListCompany.vue"
import EditCompany from "../views/company/EditCompany.vue"

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
    {
      path: '/company',
      name: 'company',
      component: ListCompany
    },
    {
      path: '/editcompany',
      name: 'companyedit',
      component: EditCompany
    },
  ]
})

export default router
