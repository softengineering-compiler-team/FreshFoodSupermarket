// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import echarts from 'echarts'
import VueChart from 'vue-chart-js'
//axios
import axios from 'axios'
import Qs from 'qs'
import $ from 'jquery'
Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;

Vue.prototype.$echarts = echarts
Vue.prototype.headconfig = {
  headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
  }
}
Vue.config.productionTip = false
Vue.use(iView)
Vue.use(VueChart)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
