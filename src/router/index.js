import { createRouter, createWebHistory } from 'vue-router'
import Login from "../views/Login.vue"
import Dashboard from "../views/Dashboard.vue"
import List from "../views/reference/employee/List.vue"
import Edit from "../views/reference/employee/Edit.vue"
import ListCompany from "../views/reference/company/ListCompany.vue"
import EditCompany from "../views/reference/company/EditCompany.vue"
import ListDepartement from "../views/reference/departemen/ListDepartement.vue"
import EditDepartement from "../views/reference/departemen/EditDepartement.vue"
import ListFlight from "../views/reference/flight/ListFlight.vue"
import EditFlight from "../views/reference/flight/EditFlight.vue"
import ListPagu from "../views/reference/pagu/ListPagu.vue"
import EditPagu from "../views/reference/pagu/EditPagu.vue"
import ListReimbursement from "../views/reference/reimbursement/ListReimbursement.vue"
import EditReimbursement from "../views/reference/reimbursement/EditReimbursement.vue"
import ListZona from "../views/reference/zona/ListZona.vue"
import ListJob from "../views/reference/jobband/ListJob.vue"

import ListUser from '@/views/system-configuration/user/ListUser.vue'
import EditUser from '@/views/system-configuration/user/EditUser.vue'

import ListApproval from '@/views/system-configuration/approval/ListApproval.vue'
import EditApproval from '@/views/system-configuration/approval/EditApproval.vue'

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
      path: '/employee',
      name: 'employee',
      component: List
    },
    {
      path: '/editemployee',
      name: 'employeeedit',
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
      path: '/pagu',
      name: 'pagu',
      component: ListPagu
    },
    {
      path: '/editpagu',
      name: 'paguedit',
      component: EditPagu
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

    // system-configuration page
    {
      path: '/zona',
      name: 'zona',
      component: ListZona
    },
    {
      path: '/job',
      name: 'job',
      component: ListJob
    },
    {
      path: '/user',
      name: 'listUser',
      component: ListUser      
    },
    {
      path: '/edituser',
      name: 'editUser',
      component: EditUser
    },
    {
      path: '/approval',
      name: 'approval',
      component: ListApproval
    },
    {
      path: '/editapproval',
      name: 'editApproval',
      component: EditApproval
    }
  ]
})

export default router