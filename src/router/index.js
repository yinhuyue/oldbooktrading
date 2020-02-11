import Vue from 'vue'
import Router from 'vue-router'

// 导入组件
import Login from '@/views/admins/login/login'

// 注册Vue-Router的插件
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: {name: 'login'}
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
