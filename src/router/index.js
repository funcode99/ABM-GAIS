import { createRouter, createWebHistory } from 'vue-router'

// auth
import Login from "@/views/auth/Login.vue"
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import Profile from '@/views/auth/Profile.vue'

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

import RequestTrip from '@/views/request-trip/ListRequest.vue'
import FormView from '@/views/request-trip/FormView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // auth pages
    {
      path: '/',
      name: 'login',
      component: Login,
      meta: {
        title: "Welcome",
      },
      beforeEnter: (to, from, next) => {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
  
        if (user && token) {
          return next('/user')
        }
  
        return next()
      }
    },
    {
      path: '/forgot',
      name: 'forgotPassword',
      component: ForgotPassword,
      meta: {
        title: 'Forgot Password'
      }
    },
    {
      path: '/profile',
      name: 'profileDetails',
      component: Profile,
      meta: {
        title: 'Profile'
      }
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        title: "Dashboard",
      }
    },

    //reference pages
    {
      path: '/brand',
      name: 'brand',
      component: ListBrand,
      meta: {
        title: "Brand",
      }
    },
    {
      path: '/car',
      name: 'car',
      component: ListCar,
      meta: {
        title: "Car Pool",
      }
    },
    {
      path: '/company',
      name: 'company',
      component: ListCompany,
      meta: {
        title: "Company",
      }
    },
    {
      path: '/currency',
      name: 'currency',
      component: ListCurrency,
      meta: {
        title: "Currency",
      }
    },
    {
      path: '/departement',
      name: 'departement',
      component: ListDepartement,
      meta: {
        title: "Departement",
      }
    },
    {
      path: '/employee',
      name: 'employee',
      component: List,
      meta: {
        title: "Employee",
      }
    },
    {
      path: '/flight',
      name: 'flight',
      component: ListFlight,
      meta: {
        title: "Flight Entitlement",
      }
    },
    {
      path: '/job',
      name: 'job',
      component: ListJob,
      meta: {
        title: "Job Band",
      }
    },
    {
      path: '/pagu',
      name: 'pagu',
      component: ListPagu,
      meta: {
        title: "Pagu",
      }
    },
    {
      path: '/reimbursement',
      name: 'reimbursement',
      component: ListReimbursement,
      meta: {
        title: "Reimbursement",
      }
    },
    {
      path: '/site',
      name: 'site',
      component: ListSite,
      meta: {
        title: "Site",
      }
    },
    {
      path: '/uom',
      name: 'uom',
      component: ListUom,
      meta: {
        title: "Unit Of Measure Categories",
      }
    },
    {
      path: '/warehouse',
      name: 'warehouse',
      component: ListWarehouse,
      meta: {
        title: "Warehouse",
      }
    },
    {
      path: '/zona',
      name: 'zona',
      component: ListZona,
      meta: {
        title: "Zona / Tunjangan Lokasi Kerja",
      }
    },


    // system-configuration page  
    {
      path: '/user',
      name: 'user',
      component: ListUser,
      meta: {
        title: "User",
      }
    },
    {
      path: '/role',
      name: 'role',
      component: ListRole,
      meta: {
        title: "Role",
      }
    },
    {
      path: '/approval',
      name: 'approval',
      component: ListApproval,
      meta: {
        title: "Approval",
      }
    },
    {
      path: '/menu',
      name: 'menu',
      component: ListMenu,
      meta: {
        title: "Menu",
      }
    },

    // request-trip page
    {
      path: '/request',
      name: 'request trip',
      component: RequestTrip,
      meta: {
        title: 'Request Trip'
      }
    },
    {
      path: '/view-request',
      name: 'form view request trip',
      component: FormView,
      meta : {
        title : 'View Request Trip'
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `GAIS || ${to.meta.title}`;
  next();
})

export default router