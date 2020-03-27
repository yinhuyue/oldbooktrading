import Vue from 'vue'
import Router from 'vue-router'

// 导入login组件
import Login from '@/views/admins/login/login'
//导入index组件
import Index from '@/views/admins/index'
//导入home组件
import Home from '@/views/admins/home/home'
//导入users组件
import User from '@/views/admins/user/user'
// 导入sort组件
import Sort from '@/views/admins/sort/sort'
// 导入book组件
import Book from '@/views/admins/book/book'
// 导入sellbook组件
import SellBook from '@/views/admins/sellbook/sellbook'
// 导入comment组件
import Comment from '@/views/admins/comment/comment'
// 导入activity组件
import Activity from '@/views/admins/activity/activity'


// 导入userlogin组件
import UserLogin from '@/views/users/login/userlogin'
// 导入userindex组件
import UserIndex from '@/views/users/userindex'
// 导入list组件
import List from '@/views/users/home/list'
// 导入sellbook组件
import BookList from '@/views/users/home/booklist'
// 导入detail组件
import Detail from '@/views/users/home/detail'
// 导入userinforindex组件
import MyIndex from '@/views/users/user/myindex'
// 导入myinfor组件
import MyInfor from '@/views/users/user/myinfor'
// 导入mysellbook组件
import MySellBook from '@/views/users/user/mysellbook'
// 导入mybooklist组件
import MyBookList from '@/views/users/user/mybooklist'
// 导入userinfor组件
import MyBookDetail from '@/views/users/user/mybookdetail'
// 导入mycomment组件
import MyComment from '@/views/users/user/mycomment'

// 注册Vue-Router的插件
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'userlogin',
      component: UserLogin
    },
    {
      path: '/userindex',
      name: 'userindex',
      component: UserIndex,
      children: [
        // 子路由
        {
          path: '/list',
          name: 'list',
          component: List
        },
        {
          path: '/booklist/:id',
          name: 'booklist',
          component: BookList
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: Detail
        },
      ]
    },
    {
      path: '/myindex',
      name: 'myindex',
      component: MyIndex,
      children: [
        // 子路由
        {
          path: '/myinfor',
          name: 'myinfor',
          component: MyInfor
        },
        {
          path: '/mysellbook',
          name: 'mysellbook',
          component: MySellBook
        },
        {
          path: '/mybooklist',
          name: 'mybooklist',
          component: MyBookList
        },
        {
          path: '/mybookdetail/:id',
          name: 'mybookdetail',
          component: MyBookDetail
        },
        {
          path: '/mycomment',
          name: 'mycomment',
          component: MyComment
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      children: [
        // 子路由
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/user',
          name: 'user',
          component: User
        },
        {
          path: '/sort',
          name: 'sort',
          component: Sort
        },
        {
          path: '/book',
          name: 'book',
          component: Book
        },
        {
          path: '/sellbook',
          name: 'sellbook',
          component: SellBook
        },
        {
          path: '/comment',
          name: 'comment',
          component: Comment
        },
        {
          path: '/activity',
          name: 'activity',
          component: Activity
        }
      ]
    },
  ]
})
