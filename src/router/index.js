import Vue from 'vue'
import Router from 'vue-router'

// 导入登录组件
import Login from '@/views/admins/login/login'
//导入home组件
import Home from '@/views/admins/home/home'

// 注册Vue-Router的插件
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: 'home',
      component: Home
    }
  ]
})
