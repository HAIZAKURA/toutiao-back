import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Dash',
        component: () => import('src/views/Dash')
      },
      {
        path: '/thread',
        name: 'ThreadMgr',
        component: () => import('src/views/ThreadMgr')
      },
      {
        path: '/forum',
        name: 'ForumMgr',
        component: () => import('src/views/ForumMgr')
      },
      {
        path: '/comm',
        name: 'CommMgr',
        component: () => import('src/views/CommMgr')
      },
      {
        path: '/user',
        name: 'UserMgr',
        component: () => import('src/views/UserMgr')
      },
      {
        path: '/blacklist',
        name: 'UserBlack',
        component: () => import('src/views/UserBlack')
      },
      {
        path: '/notice',
        name: 'NoticeMgr',
        component: () => import('src/views/NoticeMgr')
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ 'src/views/About.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('src/views/Login')
  }
]

const router = new VueRouter({
  routes
})

export default router
