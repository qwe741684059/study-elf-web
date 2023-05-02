import {createRouter, createWebHashHistory, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import OfficeViewer from "@/components/OfficeViewer";
import MarkdownViewer from "@/components/MarkdownViewer";
import ConfigView from "@/views/ConfigView";

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
  },
  {
    path: '/config',
    component: ConfigView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
