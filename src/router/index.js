import { createRouter, createWebHistory } from 'vue-router'

// auth
import Login from "@/views/auth/Login.vue"
import ForgotPassword from '@/views/auth/ForgotPassword.vue'
import Profile from '@/views/auth/Profile.vue'

//dashboard
import Dashboard from "@/views/Dashboard.vue"
import NotFound from '@/views/NotFoundPage.vue'

//reference
import ListBrand from "@/views/reference/brand/ListBrand.vue"
import ListGl from "@/views/reference/gl-account/ListGl.vue"
import ListCompany from "@/views/reference/company/ListCompany.vue"
import ListCurrency from "@/views/reference/currency/ListCurrency.vue"
import ListDepartement from "@/views/reference/departemen/ListDepartement.vue"
import List from "@/views/reference/employee/List.vue"
import ListFlight from "@/views/reference/flight/ListFlight.vue"
import ListJob from "@/views/reference/jobband/ListJob.vue"
import ListCity from "@/views/reference/city/ListCity.vue"
import ListReimbursement from "@/views/reference/reimbursement/ListReimbursement.vue"
import ListSite from "@/views/reference/sites/ListSite.vue"
import ListUom from "@/views/reference/uom/ListUom.vue"
import ListWarehouse from "@/views/reference/warehouse/ListWarehouse.vue"
import ListZona from "@/views/reference/zona/ListZona.vue"

//system configuration
import ListUser from '@/views/system-configuration/user/ListUser.vue'
import ListRole from '@/views/system-configuration/role/ListRole.vue'
import ListApproval from '@/views/system-configuration/approval/ListApproval.vue'
import ListMenu from '@/views/system-configuration/menu/ListMenu.vue'
import ListSequence from '@/views/system-configuration/sequence/ListSequence.vue'

//travel management system
import RequestTrip from '@/views/request-trip/ListRequest.vue'
import FormView from '@/views/request-trip/FormView.vue'
import TravelList from '@/views/travel-management/cash-advance/TravelList.vue'
import TravelView from '@/views/travel-management/cash-advance/TravelView.vue'
import NonTravelList from '@/views/travel-management/cash-advance-non-travel/NonTravelList.vue'
import NonTravelView from '@/views/travel-management/cash-advance-non-travel/NonTravelView.vue'

//approval
import CaTravelList from "@/views/approval/cash-advance-travel/CaTravelList.vue"
import CaTravelView from "@/views/approval/cash-advance-travel/CaTravelView.vue"
import CaNonTravelList from "@/views/approval/cash-advance-nontravel/CaNonTravelList.vue"
import CaNonTravelView from "@/views/approval/cash-advance-nontravel/CaNonTravelView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    // Not found Page
    {
      path: '/:pathMatch(.*)*',
      name: 'Not Found Page',
      component: NotFound,
      meta: {
        title: 'Not Found X('
      }
    },

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
      path: '/glaccount',
      name: 'gl account',
      component: ListGl,
      meta: {
        title: "GL Account",
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
      path: '/city',
      name: 'city',
      component: ListCity,
      meta: {
        title: "City",
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
    {
      path: '/sequence',
      name: 'sequence',
      component: ListSequence,
      meta: {
        title: "Sequence",
      }
    },

    // travel management system
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
      meta: {
        title: 'View Request Trip'
      }
    },
    {
      path: '/cashadvancetravel',
      name: 'cash advance travel',
      component: TravelList,
      meta: {
        title: 'CA Travel'
      }
    },
    {
      path: '/viewcashadvancetravel',
      name: 'view cash advance travel',
      component: TravelView,
      meta: {
        title: 'View CA Travel'
      }
    },
    {
      path: '/cashadvancenontravel',
      name: 'cash advance non travel',
      component: NonTravelList,
      meta: {
        title: 'CA Non Travel'
      }
    },
    {
      path: '/viewcashadvancenontravel',
      name: 'view cash advance non travel',
      component: NonTravelView,
      meta: {
        title: 'View CA Non Travel'
      }
    },

    //approval page
    {
      path: '/approvalcatravel',
      name: 'approval cash advance travel',
      component: CaTravelList,
      meta: {
        title: 'Approval CA Travel'
      }
    },
    {
      path: '/viewapprovalcatravel',
      name: 'view approval cash advance travel',
      component: CaTravelView,
      meta: {
        title: 'View Approval CA Travel'
      }
    },
    {
      path: '/approvalcanontravel',
      name: 'approval cash advance non travel',
      component: CaNonTravelList,
      meta: {
        title: 'Approval CA Non Travel'
      }
    },
    {
      path: '/viewapprovalcanontravel',
      name: 'view approval cash advance non travel',
      component: CaNonTravelView,
      meta: {
        title: 'View Approval CA Non Travel'
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  document.title = `GAIS || ${to.meta.title}`;
  next();
})

export default router