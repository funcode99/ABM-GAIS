import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"
import List from "../views/reference/karyawan/List.vue"
import Edit from "../views/reference/karyawan/Edit.vue"
import ListCompany from "../views/reference/company/ListCompany.vue"
import EditCompany from "../views/reference/company/EditCompany.vue"
import ListDepartement from "../views/reference/departemen/ListDepartement.vue"
import EditDepartement from "../views/reference/departemen/EditDepartement.vue"
import ListFlight from "../views/reference/flight/ListFlight.vue"
import EditFlight from "../views/reference/flight/EditFlight.vue"
import ListHotel from "../views/reference/hotel/ListHotel.vue"
import EditHotel from "../views/reference/hotel/EditHotel.vue"
import ListReimbursement from "../views/reference/reimbursement/ListReimbursement.vue"
import EditReimbursement from "../views/reference/reimbursement/EditReimbursement.vue"

import ListUser from '@/views/system-configuration/user/ListUser.vue'

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
    {
      path: '/departement',
      name: 'departement',
      component: ListDepartement
    },
    {
      path: '/editdepartement',
      name: 'departementedit',
      component: EditDepartement
    },
    {
      path: '/flight',
      name: 'flight',
      component: ListFlight
    },
    {
      path: '/editflight',
      name: 'flightedit',
      component: EditFlight
    },
    {
      path: '/hotel',
      name: 'hotel',
      component: ListHotel
    },
    {
      path: '/edithotel',
      name: 'hoteltedit',
      component: EditHotel
    },
    {
      path: '/reimbursement',
      name: 'reimbursement',
      component: ListReimbursement
    },
    {
      path: '/editreimbursement',
      name: 'reimbursementedit',
      component: EditReimbursement
    },
    {
      path: '/user',
      name: 'listUser',
      component: ListUser      
    }
  ]
})

export default router
