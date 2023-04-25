import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OfficeViewer from "@/components/OfficeViewer";
import MarkdownViewer from "@/components/MarkdownViewer";

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/mainControl/:filePath*',
    component: () => import('@/views/MainControl')
  },
  {
    path: '/office',
    component: OfficeViewer
  },
  {
    path: '/markdown',
    component: MarkdownViewer
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
