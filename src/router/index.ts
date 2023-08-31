import type { RouteRecordRaw, Router } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'

// 设置NProgress样式
import 'nprogress/nprogress.css'

NProgress.configure({ easing: 'ease', speed: 500 })

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'BaseLayout',
    component: () => import('@/layout/BaseLayout.vue'),
    children: [
      {
        path: '/',
        name: 'Home',
        component: () => import('@/views/HomePage.vue'),
      },
    ],
  },
]

const router: Router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE),
  routes,
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router
