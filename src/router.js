import Earnings from 'pages/Earnings.vue'
import EarningsInvoices from 'pages/EarningsInvoices.vue'
import HappDetails from 'pages/HappDetails.vue'
import HostedHapps from 'pages/HostedHapps.vue'
import HostingPreferences from 'pages/HostingPreferences.vue'
import DashboardPage from 'src/pages/DashboardPage.vue'
import LoginPage from 'src/pages/LoginPage.vue'
import SettingsPage from 'src/pages/SettingsPage.vue'
import { createWebHistory, createRouter } from 'vue-router'
import { kAuthTokenLSKey } from '@/constants'

export const kRoutes = {
  login: {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: {
      guest: true
    }
  },

  dashboard: {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: {
      requiresAuth: true
    }
  },

  happs: {
    path: '/happs',
    name: 'HostedHapps',
    component: HostedHapps,
    meta: {
      requiresAuth: true
    }
  },

  happ: {
    path: '/happ/:id',
    name: 'HappDetails',
    component: HappDetails,
    meta: {
      requiresAuth: true
    }
  },

  accountSettings: {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage,
    meta: {
      requiresAuth: true
    }
  },

  earnings: {
    path: '/earnings',
    name: 'Earnings',
    component: Earnings,
    meta: {
      requiresAuth: true
    }
  },

  invoices: {
    path: '/earnings/invoices',
    name: 'EarningsInvoices',
    component: EarningsInvoices,
    meta: {
      requiresAuth: true
    }
  },

  hostingPreferences: {
    path: '/preferences',
    name: 'HostingPreferences',
    component: HostingPreferences,
    meta: {
      requiresAuth: true
    }
  },

  default: {
    path: '/',
    redirect: '/dashboard'
  }
}

// used in loginFlow.integration.test.js
export const routerFactory = () => {
  const router = createRouter({
    history: createWebHistory(),
    routes: [
      kRoutes.accountSettings,
      kRoutes.dashboard,
      kRoutes.default,
      kRoutes.earnings,
      kRoutes.happ,
      kRoutes.happs,
      kRoutes.hostingPreferences,
      kRoutes.invoices,
      kRoutes.login
    ]
  })

  router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // page only visible when logged in

      // Existence of AuthToken in localStorage is equal to user logged in
      if (localStorage.getItem(kAuthTokenLSKey) == null) {
        next({
          name: kRoutes.login.name,
          params: { nextUrl: to.fullPath }
        })
      } else {
        next()
      }
    } else if (to.matched.some((record) => record.meta.guest)) {
      // page only visible when *not* logged in
      if (localStorage.getItem(kAuthTokenLSKey) == null) {
        next()
      } else {
        next({ name: kRoutes.dashboard.name })
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

export const happDetailsPath = ({ id }) => `/happ/${encodeURIComponent(id)}`
