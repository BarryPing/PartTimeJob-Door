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
