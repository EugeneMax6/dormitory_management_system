import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import './assets/css/global.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import VueSessionStorage from 'vue-sessionstorage'
import * as echarts from 'echarts'
import Notify from 'vue-notifyjs'
Vue.use(Notify)
Vue.config.productionTip = false
Vue.use(VueSessionStorage)
Vue.use(ElementUI)
Vue.prototype.$axios = axios
Vue.config.productionTip = false
Vue.prototype.$echarts = echarts
new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
