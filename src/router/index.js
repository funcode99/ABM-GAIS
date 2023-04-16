import { createRouter, createWebHistory } from 'vue-router'

import Login from "@/views/Login.vue"
import Dashboard from "@/views/Dashboard.vue"

import ListBrand from "@/views/reference/brand/ListBrand.vue"
import ListCar from "@/views/reference/car/ListCar.vue"
import ListCompany from "@/views/reference/company/ListCompany.vue"
import ListCurrency from "@/views/reference/currency/ListCurrency.vue"
import ListDepartement from "@/views/reference/departemen/ListDepartement.vue"
import List from "@/views/reference/employee/List.vue"
import ListFlight from "@/views/reference/flight/ListFlight.vue"
import ListJob from "@/views/reference/jobband/ListJob.vue"
import ListPagu from "@/views/reference/pagu/ListPagu.vue"
import ListReimbursement from "@/views/reference/reimbursement/ListReimbursement.vue"
import ListSite from "@/views/reference/sites/ListSite.vue"
import ListUom from "@/views/reference/uom/ListUom.vue"
import ListWarehouse from "@/views/reference/warehouse/ListWarehouse.vue"
import ListZona from "@/views/reference/zona/ListZona.vue"

import ListUser from '@/views/system-configuration/user/ListUser.vue'
import ListRole from '@/views/system-configuration/role/ListRole.vue'
import ListApproval from '@/views/system-configuration/approval/ListApproval.vue'
import ListMenu from '@/views/system-configuration/menu/ListMenu.vue'
// import ListSequence from '@/views/system-configuration/sequence/ListSequence.vue'

import HeroPagination from '@/views/experiment/pagination.vue'

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

    //reference pages
    {
      path: '/brand',
      name: 'brand',
      component: ListBrand
    },
    {
      path: '/car',
      name: 'car',
      component: ListCar
    },
    {
      path: '/company',
      name: 'company',
      component: ListCompany
    },
    {
      path: '/currency',
      name: 'currency',
      component: ListCurrency
    },
    {
      path: '/departement',
      name: 'departement',
      component: ListDepartement
    },
    {
      path: '/employee',
      name: 'employee',
      component: List
    },
    {
      path: '/flight',
      name: 'flight',
      component: ListFlight
    },
    {
      path: '/job',
      name: 'job',
      component: ListJob
    },
    {
      path: '/pagu',
      name: 'pagu',
      component: ListPagu
    },
    {
      path: '/reimbursement',
      name: 'reimbursement',
      component: ListReimbursement
    },
    {
      path: '/site',
      name: 'site',
      component: ListSite
    },
    {
      path: '/uom',
      name: 'uom',
      component: ListUom
    },
    {
      path: '/warehouse',
      name: 'warehouse',
      component: ListWarehouse
    },
    {
      path: '/zona',
      name: 'zona',
      component: ListZona
    },


    // system-configuration page  
    {
      path: '/user',
      name: 'user',
      component: ListUser
    },
    {
      path: '/role',
      name: 'role',
      component: ListRole
    },
    {
      path: '/approval',
      name: 'approval',
      component: ListApproval
    },
    {
      path: '/menu',
      name: 'menu',
      component: ListMenu
    },
    // {
    //   path: '/sequence',
    //   name: 'sequence',
    //   component: ListSequence
    // },
    {
      path: '/hero',
      name: 'HeroPagination',
      component: HeroPagination
    }
  ]
})

export default router