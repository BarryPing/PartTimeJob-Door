import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Login from '@/views/user/Login'
import Register from '@/views/user/Register'
import Index from '@/views/home/Index'
import Profile from '@/views/user/Profile'
import Account from '@/views/user/Account'
import Password from '@/views/user/account/Password'
import Private from '@/views/user/account/Private'
import Wechat from '@/views/user/account/Wechat'
Vue.use(Router)

const routes = [
  {
    path: '/', redirect: '/index'
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'register',
    path: '/register',
    component: Register

  },
  {
    name: 'index',
    path: '/index',
    component: Index,
    meta: {
      requireAuth: false
    }
  },
  {
    name: 'profile',
    path: '/profile',
    component: Profile,
    meta: {
      requireAuth: true
    }
  },
  {
    name: 'account',
    path: '/account',
    component: Account,
    meta: {
      requireAuth: true
    },
    children: [
      { path: '/account', redirect: '/password' },
      { path: '/password', component: Password },
      { path: '/private', component: Private },
      { path: '/wechat', component: Wechat }
    ]
  }

]
const router = new Router({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    if (store.getters.getToken) { // 通过vuex state获取当前的token是否存在
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
})
export default router
