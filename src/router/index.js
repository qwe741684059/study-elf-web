import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'


const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/mainControl/:filePath*',
    component: () => import('@/views/MainControl')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
