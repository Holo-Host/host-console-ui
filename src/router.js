import Earnings from 'pages/Earnings.vue'
import EarningsInvoices from 'pages/EarningsInvoices.vue'
import HappDetails from 'pages/HappDetails.vue'
import HostedHapps from 'pages/HostedHapps.vue'
import HostingPreferences from 'pages/HostingPreferences.vue'
import Login from 'pages/Login.vue'
import DashboardPage from 'src/pages/DashboardPage.vue'
import SettingsPage from 'src/pages/SettingsPage.vue'
import { checkHpAdminKeypair } from 'src/utils/keyManagement'
import { createWebHistory, createRouter } from 'vue-router'

export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      guest: true
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/happs',
    name: 'HostedHapps',
    component: HostedHapps,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/happ/:id',
    name: 'HappDetails',
    component: HappDetails,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/settings',
    name: 'Settings',
    component: SettingsPage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/earnings',
    name: 'Earnings',
    component: Earnings,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/earnings/invoices',
    name: 'EarningsInvoices',
    component: EarningsInvoices,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/preferences',
    name: 'HostingPreferences',
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
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      // page only visible when logged in

      // isAuthed is true if the last keypair we generated was good. It persists across sessions.
      // checkHpAdminKeypair checks if we have a keypair in *this* session. If we don't, then we remove isAuthed
      // another way to handle this would be to store isAuthed in app state not local storage. Then we wouldn't need this line.
      if (!checkHpAdminKeypair()) {
        localStorage.removeItem('isAuthed')
      }

      if (localStorage.getItem('isAuthed') === null) {
        next({
          name: 'Login',
          params: { nextUrl: to.fullPath }
        })
      } else {
        next()
      }
    } else if (to.matched.some((record) => record.meta.guest)) {
      // page only visible when *not* logged in
      if (localStorage.getItem('isAuthed') === null) {
        next()
      } else {
        next({ name: 'Dashboard' })
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
