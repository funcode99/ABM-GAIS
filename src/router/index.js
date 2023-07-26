import { createRouter, createWebHistory } from "vue-router";

// auth
import Login from "@/views/auth/Login.vue";
import ForgotPassword from "@/views/auth/ForgotPassword.vue";
import Profile from "@/views/auth/Profile.vue";

//dashboard
import NotFound from "@/views/NotFoundPage.vue";

//notificarion
import ListNotifications from "@/views/notifications/ListNotifications.vue"

//reference
import ListBrand from "@/views/reference/brand/ListBrand.vue";
import ListGl from "@/views/reference/gl-account/ListGl.vue";
import ListCompany from "@/views/reference/company/ListCompany.vue";
import ListCurrency from "@/views/reference/currency/ListCurrency.vue";
import ListDepartement from "@/views/reference/departemen/ListDepartement.vue";
import List from "@/views/reference/employee/List.vue";
import ListFlight from "@/views/reference/flight/ListFlight.vue";
import ListJob from "@/views/reference/jobband/ListJob.vue";
import ListCity from "@/views/reference/city/ListCity.vue";
import ListReimbursement from "@/views/reference/reimbursement/ListReimbursement.vue";
import ListSite from "@/views/reference/sites/ListSite.vue";
import ListUom from "@/views/reference/uom/ListUom.vue";
import ListWarehouse from "@/views/reference/warehouse/ListWarehouse.vue";
import ListZona from "@/views/reference/zona/ListZona.vue";
import HotelList from "@/views/reference/hotel/HotelList.vue";

//system configuration
import ListUser from "@/views/system-configuration/user/ListUser.vue";
import ListRole from "@/views/system-configuration/role/ListRole.vue";
import ListApproval from "@/views/system-configuration/approval/ListApproval.vue";
import ListMenu from "@/views/system-configuration/menu/ListMenu.vue";
import ListSequence from "@/views/system-configuration/sequence/ListSequence.vue";

//travel management system
import RequestTripListTMS from "@/views/travel-management/request-trip/RequestTripList.vue";
import RequestTripViewTMS from "@/views/travel-management/request-trip/RequestTripView.vue";
import TravelList from "@/views/travel-management/cash-advance/TravelList.vue";
import TravelView from "@/views/travel-management/cash-advance/TravelView.vue";
import NonTravelList from "@/views/travel-management/cash-advance-non-travel/NonTravelList.vue";
import NonTravelView from "@/views/travel-management/cash-advance-non-travel/NonTravelView.vue";
import SettlementList from "@/views/travel-management/settlement/SettlementList.vue";
import SettlementView from "@/views/travel-management/settlement/SettlementView.vue";
import SettlementReport from "@/views/travel-management/settlement/SettlementReport.vue";

import ClaimReimbursementList from "@/views/travel-management/claim-reimbursement/ClaimReimbursementList.vue";
import ClaimReimbursementView from "@/views/travel-management/claim-reimbursement/ClaimReimbursementView.vue";

import poolCarRoutes from "./travel-management/poolCar";
import PoolcarReport from "@/views/travel-management/pool-car/PoolcarReport.vue";

//approval
import CaTravelList from "@/views/approval/cash-advance-travel/CaTravelList.vue";
import CaTravelView from "@/views/approval/cash-advance-travel/CaTravelView.vue";
import RequestTripList from "@/views/approval/request-trip/RequestTripList.vue";
import RequestTripView from "@/views/approval/request-trip/RequestTripView.vue";
import CaNonTravelList from "@/views/approval/cash-advance-nontravel/CaNonTravelList.vue";
import CaNonTravelView from "@/views/approval/cash-advance-nontravel/CaNonTravelView.vue";
import ApprovalSettlementList from "@/views/approval/settlement/SettlementList.vue";
import ApprovalSettlementView from "@/views/approval/settlement/SettlementView.vue";
import ApporvalReimbursementList from "@/views/approval/reimbursement/ReimbursementList.vue";
import ApporvalReimbursementView from "@/views/approval/reimbursement/ReimbursementView.vue";
import ApprovalAtkRequestList from "@/views/approval/atk-request/AtkRequestList.vue";
import ApprovalAtkRequestView from "@/views/approval/atk-request/AtkRequestView.vue";
import ApprovalDelegationList from "@/views/approval/approval-delegation/ApprovalDelegationList.vue";

//facility service system
import ItemAtkList from "@/views/facility-services/atk-supplies/management-item-atk/ItemAtkList.vue";
import StockInAtkList from "@/views/facility-services/atk-supplies/stock-in-atk/StockInAtkList.vue";
import StockInAtkView from "@/views/facility-services/atk-supplies/stock-in-atk/StockInAtkView.vue";
import StockInAtkID from "@/views/facility-services/atk-supplies/stock-in-atk/StockInAtkId.vue";
import StockOpnameAtkID from "@/views/facility-services/atk-supplies/stock-opname-atk/StockOpnameAtkID.vue";
import ATKRequestList from "@/views/facility-services/atk-supplies/atk-request/ATK-Request.vue";
import ATKRequestView from "@/views/facility-services/atk-supplies/atk-request/ATKRequestView.vue";
import StockOpnameATKList from "@/views/facility-services/atk-supplies/stock-opname-atk/StockOpnameATKList.vue";
import StockOpnameATKView from "@/views/facility-services/atk-supplies/stock-opname-atk/StockOpnameATKView.vue";
import DOCDeliveryList from "@/views/facility-services/document-delivery/DOC-Delivery.vue";
import DOCDeliveryListID from "@/views/facility-services/document-delivery/DOCDeliveryView.vue";

import ManagementMeetingRoomList from "@/views/facility-services/meeting-room/ManagementMeetingRoomList.vue";
import BookingMeetingRoomList from "@/views/facility-services/meeting-room/booking/BookingMeetingRoomList.vue";
import BookingMeetingRoomView from "@/views/facility-services/meeting-room/booking/BookingMeetingRoomView.vue";
import DashboardMeetingRoom from "@/views/facility-services/meeting-room/dashboard/DashboardMeetingRoom.vue";

import MeetingRoomReports from "@/views/facility-services/reports/MeetingRoomReports.vue";
import StockReport from "@/views/facility-services/reports/StockReport.vue";
import AtkRequestReport from "@/views/facility-services/reports/AtkRequestReport.vue"
import DocumentDeliveryReport from "@/views/facility-services/reports/DocumentDeliveryReport.vue"

//experiment
// import addinputfield from '@/views/experiment/addinputfield.vue'
import avoidduplicatedropdown from "@/views/experiment/avoidduplicatedropdown.vue";
import experimentPage from "@/views/experiment/experiment.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/experiment",
      component: experimentPage,
    },
    ...poolCarRoutes,
    {
      path: "/addfield",
      // component: addinputfield,
      component: avoidduplicatedropdown,
    },

    // Not found Page
    {
      path: "/:pathMatch(.*)*",
      name: "Not Found Page",
      component: NotFound,
      meta: {
        title: "Not Found X(",
      },
    },

    // auth pages
    {
      path: "/",
      name: "login",
      component: Login,
      meta: {
        title: "Welcome",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next("/user");
        }

        return next();
      },
    },
    {
      path: "/forgot",
      name: "forgotPassword",
      component: ForgotPassword,
      meta: {
        title: "Forgot Password",
      },
      // beforeEnter: (to, from, next) => {
      //   const token = localStorage.getItem('token');

      //   if (token) {
      //     return next()
      //   }

      //   return next('/')
      // }
    },
    {
      path: "/profile",
      name: "profileDetails",
      component: Profile,
      meta: {
        title: "Profile",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: () => import("@/components/layout/AdminLayout.vue"),
      meta: {
        title: "Dashboard",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
      children: [
        {
          path: "",
          name: "DashboardPage",
          component: () => import("@/views/dashboard/Dashboard.vue"),
          meta: {
            title: "Dashboard",
          },
        },
      ],
    },

    //notification page
    {
      path: "/notification",
      name: "notification",
      component: ListNotifications,
      meta: {
        title: "Notification",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },

    //reference pages
    {
      path: "/brand",
      name: "brand",
      component: ListBrand,
      meta: {
        title: "Brand",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/glaccount",
      name: "gl account",
      component: ListGl,
      meta: {
        title: "GL Account",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/company",
      name: "company",
      component: ListCompany,
      meta: {
        title: "Company",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/currency",
      name: "currency",
      component: ListCurrency,
      meta: {
        title: "Currency",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/departement",
      name: "departement",
      component: ListDepartement,
      meta: {
        title: "Departement",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/employee",
      name: "employee",
      component: List,
      meta: {
        title: "Employee",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/classtransportation",
      name: "Class Transportation",
      component: ListFlight,
      meta: {
        title: "Class Transportation",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/job",
      name: "job",
      component: ListJob,
      meta: {
        title: "Job Band",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/city",
      name: "city",
      component: ListCity,
      meta: {
        title: "City",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/reimbursement",
      name: "reimbursement",
      component: ListReimbursement,
      meta: {
        title: "Reimbursement",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/site",
      name: "site",
      component: ListSite,
      meta: {
        title: "Site",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/uom",
      name: "uom",
      component: ListUom,
      meta: {
        title: "Unit Of Measure Categories",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/warehouse",
      name: "warehouse",
      component: ListWarehouse,
      meta: {
        title: "Warehouse",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/zona",
      name: "zona",
      component: ListZona,
      meta: {
        title: "Zona / Tunjangan Lokasi Kerja",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/hotel",
      name: "hotel",
      component: HotelList,
      meta: {
        title: "Hotel",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },

    // system-configuration page
    {
      path: "/user",
      name: "user",
      component: ListUser,
      meta: {
        title: "User",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/role",
      name: "role",
      component: ListRole,
      meta: {
        title: "Role",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/approval",
      name: "approval",
      component: ListApproval,
      meta: {
        title: "Approval",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/menu",
      name: "menu",
      component: ListMenu,
      meta: {
        title: "Menu",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/sequence",
      name: "sequence",
      component: ListSequence,
      meta: {
        title: "Sequence",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },

    // travel management system
    {
      path: "/request",
      name: "request trip",
      component: RequestTripListTMS,
      meta: {
        title: "Request Trip",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/request-view",
      name: "form view request trip",
      component: RequestTripViewTMS,
      meta: {
        title: "View Request Trip",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/cashadvancetravel",
      name: "cash advance travel",
      component: TravelList,
      meta: {
        title: "CA Travel",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/viewcashadvancetravel/:id",
      name: "view cash advance travel",
      component: TravelView,
      meta: {
        title: "View CA Travel",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/cashadvancenontravel",
      name: "cash advance non travel",
      component: NonTravelList,
      meta: {
        title: "CA Non Travel",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/viewcashadvancenontravel/:id",
      name: "view cash advance non travel",
      component: NonTravelView,
      meta: {
        title: "View CA Non Travel",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/settlement",
      name: "Settlement",
      component: SettlementList,
      meta: {
        title: "Settlement",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/settlement/:id",
      name: "View Settlement",
      component: SettlementView,
      meta: {
        title: "View Settlement",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/settlement-report",
      name: "Settlement Reports",
      component: SettlementReport,
      meta: {
        title: "Settlement Report",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/claimreimbursement",
      name: "Claim Reimbursement",
      component: ClaimReimbursementList,
      meta: {
        title: "Claim Reimbursement",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/viewclaimreimbursement/:id",
      name: "View Claim Reimbursement",
      component: ClaimReimbursementView,
      meta: {
        title: "View Claim Reimbursement",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },

    {
      path: "/poolcar-report",
      name: "Pool Car Reports",
      component: PoolcarReport,
      meta: {
        title: "Pool Car Reports",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },

    //approval page
    {
      path: "/approvalcatravel",
      name: "approval cash advance travel",
      component: CaTravelList,
      meta: {
        title: "Approval CA Travel",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/viewapprovalcatravel/:id",
      name: "view approval cash advance travel",
      component: CaTravelView,
      meta: {
        title: "View Approval CA Travel",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/approvalcanontravel",
      name: "approval cash advance non travel",
      component: CaNonTravelList,
      meta: {
        title: "Approval CA Non Travel",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/viewapprovalcanontravel/:id",
      name: "view approval cash advance non travel",
      component: CaNonTravelView,
      meta: {
        title: "View Approval CA Non Travel",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/approvalrequesttrip",
      name: "approval request trip",
      component: RequestTripList,
      meta: {
        title: "Approval Request Trip",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/viewapprovalrequesttrip/:id/:approvalid",
      name: "view approval request trip",
      component: RequestTripView,
      meta: {
        title: "View Approval Request Trip",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/approvalsettlement",
      name: "approval settlemet",
      component: ApprovalSettlementList,
      meta: {
        title: "Approval Settlement",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/viewapprovalsettlement/:id",
      name: "view approval settlement",
      component: ApprovalSettlementView,
      meta: {
        title: "View Approval Settlement",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/approvalreimbursement",
      name: "approval reimbursement",
      component: ApporvalReimbursementList,
      meta: {
        title: "Approval Reimbursement",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/viewapprovalreimbursement/:id",
      name: "view approval reimbursement",
      component: ApporvalReimbursementView,
      meta: {
        title: "View Approval Reimbursement",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/approvalatkrequest",
      name: "approval atk request",
      component: ApprovalAtkRequestList,
      meta: {
        title: "Approval ATK Request",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/viewapprovalatkrrequest/:id",
      name: "view approval atk request",
      component: ApprovalAtkRequestView,
      meta: {
        title: "View Approval ATK Request",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/approvaldelegation",
      name: "approval delegation",
      component: ApprovalDelegationList,
      meta: {
        title: "Approval Delegation",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },

    //facility service system
    {
      path: "/managementitem",
      name: "management item atk",
      component: ItemAtkList,
      meta: {
        title: "Management Item ATK",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/stockinatk",
      name: "stock in atk",
      component: StockInAtkList,
      meta: {
        title: "Stock In ATK",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/viewstockinatk",
      name: "viewstock in atk",
      component: StockInAtkView,
      meta: {
        title: "View Stock In ATK",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/viewstockinatk/:id",
      name: "viewstock_in_atk",
      component: StockInAtkID,
      meta: {
        title: "View Stock In ATK",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/stockOpname/:id",
      name: "stockOpname",
      component: StockOpnameAtkID,
      meta: {
        title: "View Stock Opname ATK",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/atkRequest/:id",
      name: "atk-request",
      component: ATKRequestView,
      meta: {
        title: "ATK Request",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/atk-request",
      name: "ATK Request",
      component: ATKRequestList,
      meta: {
        title: "View Request In ATK",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/doc-delivery/:type/:id",
      name: "doc-delivery-id",
      component: DOCDeliveryListID,
      meta: {
        title: "Detail Document Delivery",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/doc-delivery",
      name: "Doc-delivery",
      component: DOCDeliveryList,
      meta: {
        title: "View Document Delivery",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    // {
    //   path: '/atk-request-view',
    //   name: 'ATK Request View',
    //   component: ATKRequestView,
    //   meta: {
    //     title: 'Request ATK View'
    //   },
    //   beforeEnter: (to, from, next) => {
    //     const token = localStorage.getItem('token');

    //     if (token) {
    //       return next()
    //     }

    //     return next('/')
    //   }
    // },
    {
      path: "/stock-opname-atk",
      name: "stock-opname-atk",
      component: StockOpnameATKList,
      meta: {
        title: "Stock Opname ATK List",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/stock-opname-atk-view",
      name: "Stock Opname ATK View",
      component: StockOpnameATKView,
      meta: {
        title: "Stock Opname ATK View",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/management-meeting-room",
      name: "Management Meeting Room",
      component: ManagementMeetingRoomList,
      meta: {
        title: "Management Meeting Room",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/booking-meeting-room",
      name: "Booking Meeting Room",
      component: BookingMeetingRoomList,
      meta: {
        title: "Booking Meeting Room",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/booking-meeting-room/:id",
      name: "View Booking Meeting Room",
      component: BookingMeetingRoomView,
      meta: {
        title: "View Booking Meeting Room",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/dashboard-meeting-room",
      name: "Dashboard Meeting Room",
      component: DashboardMeetingRoom,
      meta: {
        title: "Dashboard Meeting Room",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/meetingroomreports",
      name: "Meeting Room Reports",
      component: MeetingRoomReports,
      meta: {
        title: "Meeting Room Reports",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/stockreport",
      name: "Stock Reports",
      component: StockReport,
      meta: {
        title: "Stock Reports",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/atkrequestreport",
      name: "ATK Request Reports",
      component: AtkRequestReport,
      meta: {
        title: "ATK Request Reports",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
    {
      path: "/documentdeliveryreports",
      name: "Document Delivery Report",
      component: DocumentDeliveryReport,
      meta: {
        title: "Document Delivery Report",
      },
      beforeEnter: (to, from, next) => {
        const token = localStorage.getItem("token");

        if (token) {
          return next();
        }

        return next("/");
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  document.title = `GAIS || ${to.meta.title}`;
  next();
});

export default router;
