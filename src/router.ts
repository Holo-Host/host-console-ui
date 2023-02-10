import { createWebHistory, createRouter, Router, RouteRecordRaw } from 'vue-router'
import { kAuthTokenLSKey } from './constants'
import DashboardPage from './pages/DashboardPage.vue'
import Earnings from './pages/EarningsPage.vue'
import HappDetails from './pages/HappDetails.vue'
import HAppsPage from './pages/HAppsPage.vue'
import HostingPreferences from './pages/HostingPreferences.vue'
import InvoicesPage from './pages/InvoicesPage.vue'
import LoginPage from './pages/LoginPage.vue'
import SettingsPage from './pages/SettingsPage.vue'

interface Routes {
  login: RouteRecordRaw
  dashboard: RouteRecordRaw
  happs: RouteRecordRaw
  happ: RouteRecordRaw
  accountSettings: RouteRecordRaw
  earnings: RouteRecordRaw
  paidInvoices: RouteRecordRaw
  unpaidInvoices: RouteRecordRaw
  hostingPreferences: RouteRecordRaw
  default: RouteRecordRaw
}

export const kRoutes: Routes = {
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
    name: 'HAppsPage',
    component: HAppsPage,
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

  paidInvoices: {
    path: '/earnings/invoices/paid',
    name: 'PaidInvoices',
    component: InvoicesPage,
    meta: {
      requiresAuth: true
    }
  },

  unpaidInvoices: {
    path: '/earnings/invoices/unpaid',
    name: 'UnpaidInvoices',
    component: InvoicesPage,
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
export const routerFactory = (): Router => {
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
      kRoutes.paidInvoices,
      kRoutes.unpaidInvoices,
      kRoutes.login
    ]
  })

  router.beforeEach((to, _, next) => {
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

export const happDetailsPath = ({ id }: { id: string }): string => `/happ/${encodeURIComponent(id)}`
