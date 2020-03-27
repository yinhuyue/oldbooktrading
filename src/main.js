// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// 程序的入口
import Vue from 'vue'
// 根组件
import App from './App'
import router from './router'
// 导入elementUI
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 全局样式
import '@/assets/css/index.css'
// 导入moment
import moment from 'moment'


// 导入自己写的myaxios插件
import MyAxios from '@/plugins/myaxios'
// import axios from 'axios'

// 格式化日期的过滤器（全局）
Vue.filter('fmtDate', (value, fmtStr) => {
  return moment(value).format(fmtStr)
})

// 定义全局的时间过滤器
// 格式化时间的过滤器
// Vue.filter('fmtDate', (originVal) => {
//   const dt = new Date(originVal);
//   const y = dt.getFullYear();
//   const m = (dt.getMonth() + 1).toString().padStart(2, '0');
//   const d = dt
//     .getDate()
//     .toString()
//     .padStart(2, '0');

//   const hh = dt
//     .getHours()
//     .toString()
//     .padStart(2, '0');
//   const mm = dt
//     .getMinutes()
//     .toString()
//     .padStart(2, '0');
//   const ss = dt
//     .getSeconds()
//     .toString()
//     .padStart(2, '0');

//   return `${y}-${m}-${d} ${hh}:${mm}:${ss}`;
// });


// 全局配置ElementUI
Vue.use(ElementUI)

// 注册
// axios.defaults.withCredentials = true
// Vue.prototype.axios = axios
// Vue.prototype.$axios = axios;   // 在vue中使用axios，全局
Vue.use(MyAxios)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
