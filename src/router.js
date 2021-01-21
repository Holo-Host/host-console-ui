import { createWebHistory, createRouter } from "vue-router"
import HostedHapps from "pages/HostedHapps.vue"
import HappDetails from "pages/HappDetails.vue"
import Login from "pages/Login.vue"
import Settings from "pages/Settings.vue"

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,  
    meta: {
      guest: true
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
    path: '/',
    redirect: '/happs'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // page only visible when logged in
    if (localStorage.getItem('isAuthed') == null) {
      next({
        name: 'Login',
        params: { nextUrl: to.fullPath }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    // page only visible when *not* logged in
    if(localStorage.getItem('isAuthed') == null) {
        next()
    } else{
        next({ name: 'HostedHapps'})
    }
  } else {
    // publicly visible page
    next()
  }
})

export default router
