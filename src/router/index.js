import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/user/Login'
import Register from '@/views/user/Register'
import Index from '@/views/home/Index'
import Info from '@/views/user/Info'
import Account from '@/views/user/Account'
import Text from '@/views/text'
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
    component: Index
  },
  {
    name: 'info',
    path: '/info',
    component: Info
  },
  {
    name: 'account',
    path: '/account',
    component: Account
  },
  {
    name: 'text',
    path: '/text',
    component: Text
  }

]
// 挂载路由导航守卫
const router = new Router({
  routes
})
// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  const isLogin = sessionStorage.getItem('isLogin')
  // to 将要访问的路径
  // from 代表从哪一个路径跳转而来
  // next() 放行 next('/login') 强制跳转

  if (to.path === '/login') {
    if (isLogin === 'true') {
      return next({ path: '/index' })
    }
  }
  next()
})
export default router
