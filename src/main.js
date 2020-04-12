// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 全局样式表
import './assets/css/global.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from './store'
// 配置发起请求的根路径
axios.defaults.baseURL = 'http://localhost:8888/api/'
// 将axios挂载到vue的原型对象上,这样每一个vue组件都能直接通过this.$http，发起ajax请求。
Vue.prototype.$http = axios

// 请求拦截器
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = 'Bearer ' + store.getters.getToken
//   return config
// })
// 请求拦截器
axios.interceptors.request.use(
  config => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    config.headers.authorization = 'Bearer ' + store.getters.getToken
    return config
  },
  error => {
    return Promise.error(error)
  })
// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  // 服务器状态码不是200的情况
  error => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          ElementUI.MessageBox({
            type: 'error',
            title: '提示',
            message: '身份过期，请重新登录'
          })
          console.log('请重新登录')
          sessionStorage.clear()
          store.dispatch('SET_TOKEN', null)
          store.dispatch('asyncUpdateUser', null)
          router.replace({
            path: '/login',
            query: { redirect: router.currentRoute.fullPath }
          })
          break
          // 其他错误，直接抛出错误提示
        default:
          this.$message.error(error)
      }
      return Promise.reject(error.response)
    }
  }
)
/**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   */
export const get = (url, ...params) => {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        reject(err.data)
      })
  })
}

Vue.config.productionTip = false
/* eslint-disable no-new */
Vue.use(ElementUI)
Vue.use(Vuex)
new Vue({
  el: '#app',
  components: { App },
  render: h => h(App),
  router,
  store,
  template: '<App/>'
})
