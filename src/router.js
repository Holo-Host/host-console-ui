import { createWebHistory, createRouter } from "vue-router"
import Login from "pages/Login.vue"
import Dashboard from "pages/Dashboard.vue"
import HostedHapps from "pages/HostedHapps.vue"
import HappDetails from "pages/HappDetails.vue"
import Settings from "pages/Settings.vue"
import Earnings from "pages/Earnings.vue"
import EarningsInvoices from "pages/EarningsInvoices.vue"
import HostingPreferences from "pages/HostingPreferences.vue"

export const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/happs",
    name: "HostedHapps",
    component: HostedHapps,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/happ/:id",
    name: "HappDetails",
    component: HappDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/earnings",
    name: "Earnings",
    component: Earnings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/earnings/invoices",
    name: "EarningsInvoices",
    component: EarningsInvoices,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: "/preferences",
    name: "HostingPreferences",
    component: HostingPreferences,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/',
    redirect: '/dashboard'
  }
]

// used in loginFlow.integration.test.js
export const routerFactory = () => {
  const router = createRouter({
    history: createWebHistory(),
    routes
  })

  router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      // page only visible when logged in

      // Existence of AuthToken in localStorage is equal to being logged in
      if (localStorage.getItem('authToken') == null) {
        next({
          name: 'Login',
          params: { nextUrl: to.fullPath }
        })
      } else {
        next()
      }
    } else if (to.matched.some(record => record.meta.guest)) {

      // page only visible when *not* logged in
      if(localStorage.getItem('authToken') == null) {
          next()
      } else {
          next({ name: 'Dashboard'})
      }
    } else {
      // publicly visible page
      next()
    }
  })

  return router
}

const router = routerFactory()

export default router

export const happDetailsPath = ({ id }) => '/happ/' + encodeURIComponent(id)
