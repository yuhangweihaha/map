// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import axios from '../axios/api.js'
// import echarts from 'echarts'
import echarts from 'echarts-gl'
import liquidfill from 'echarts-liquidfill'
import 'babel-polyfill'
Vue.prototype.$echarts = echarts;
Vue.prototype.$http = axios;

require('./mock.js');
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
