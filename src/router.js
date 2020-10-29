import { createWebHistory, createRouter } from "vue-router"
import HostedHapps from "pages/HostedHapps.vue"
import HappDetails from "pages/HappDetails.vue"

const routes = [
  {
    path: "/",
    name: "HostedHapps",
    component: HostedHapps,
  },
  {
    path: "/happ/:id",
    name: "HappDetails",
    component: HappDetails,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
