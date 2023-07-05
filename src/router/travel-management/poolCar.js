// import { RouterView } from "vue-router"
import AdminLayout from "@/components/layout/AdminLayout.vue"

const poolCarRoutes = [
  {
    name: "PoolCar",
    path: "/pool-car",
    component: AdminLayout,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("token")

      if (token) {
        return next()
      }

      return next("/")
    },
    children: [
      {
        path: "management",
        name: "PoolCarManagement",
        component: () =>
          import(
            "@/views/travel-management/pool-car/management/PoolCarList.vue"
          ),
        meta: {
          title: "Pool Car Management",
        },
      },
      {
        path: "request",
        name: "PoolCarRequest",
        component: () =>
          import("@/views/travel-management/pool-car/request/PoolCarList.vue"),
        meta: {
          title: "Pool Car Request",
        },
      },
      {
        path: "request/:id",
        name: "PoolCarRequestDetail",
        component: () =>
          import("@/views/travel-management/pool-car/request/PoolCarView.vue"),
        meta: {
          title: "Pool Car Request",
        },
      },
    ],
  },
]

export default poolCarRoutes
