import { createWebHistory, createRouter } from "vue-router"
import HostedHapps from "pages/HostedHapps.vue"
import HappDetails from "pages/HappDetails.vue"
import Login from "pages/Login.vue"

const routes = [
  {
    path: "/login",
    name: "Login",
    component: Login,  
    meta: {
      guest: true
    }
  },
  // {
  //   path: '/',
  //   redirect: '/happs'
  // },
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
  }  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (localStorage.getItem('auth_token') == null) {
      next({
        name: 'Login',
        params: { nextUrl: to.fullPath }
      })
    }
  } else if (to.matched.some(record => record.meta.guest)) {
      if(localStorage.getItem('auth_token') == null) {
          next()
      } else{
          next({ name: 'HostedHapps'})
      }
  } else {
      console.log("Properly logged in")
      next()
  }
})

export default router
