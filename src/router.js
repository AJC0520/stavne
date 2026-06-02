import { createRouter, createWebHistory } from 'vue-router'
import HomeView from './views/HomeView.vue'
import Placeholder from './views/Placeholder.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/placeholder',
    name: 'placeholder',
    component: Placeholder,
    meta: {}
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
