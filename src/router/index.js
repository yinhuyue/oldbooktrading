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


// 登录注册组件
import UserLogin from '@/views/users/login/userlogin'

//未登录时总书籍列表
import UserLoginBookList from '@/views/users/login/userloginbooklist'
//未登录时专业分类书籍列表
import UserLoginMajorSortList from '@/views/users/login/userloginmajorsortlist'
//未登录时学科分类书籍列表
import UserLoginSubjectSortList from '@/views/users/login/userloginsubjectsortlist'
//未登录时课程分类书籍列表
import UserLoginCourseSortList from '@/views/users/login/userlogincoursesortlist'

// 登录后首页
import UserIndex from '@/views/users/home/userindex'
// 登录后总书籍列表
import UserBookList from '@/views/users/home/userbooklist'
// 登陆后专业书籍列表
import UserMajorSortList from '@/views/users/home/usermajorsortlist'
//登录后学科分类书籍列表
import UserSubjectSortList from '@/views/users/home/usersubjectsortlist'
//登录后课程分类书籍列表
import UserCourseSortList from '@/views/users/home/usercoursesortlist'
// 登陆后书籍详情页
import UserBookDetail from '@/views/users/home/userbookdetail'


// 个人中心组件
import MyIndex from '@/views/users/user/myindex'
// 用户信息组件
import MyInfor from '@/views/users/user/myinfor'
// 出售书籍组件
import MySellBook from '@/views/users/user/mysellbook'
// 出售书籍列表组件
import MyBookList from '@/views/users/user/mybooklist'
// 出售书籍详情组件
import MyBookDetail from '@/views/users/user/mybookdetail'
// 我的购物车组件
import MyShop from '@/views/users/user/myshop'
// 购物车中书籍详情组件
import MyShopDetail from '@/views/users/user/myshopdetail'
// 我的评论组件
import MyComment from '@/views/users/user/mycomment'

// 注册Vue-Router的插件
Vue.use(Router)

export default new Router({
  routes: [{
      path: '/userlogin',
      name: 'userlogin',
      component: UserLogin,
      children: [
        // 子路由
        {
          path: '/userloginbooklist',
          name: 'userloginbooklist',
          component: UserLoginBookList
        },
        {
          path: '/userloginmajorsortlist/:majorsort_id',
          name: 'userloginmajorsortlist',
          component: UserLoginMajorSortList
        },
        {
          path: '/userloginsubjectsortlist/:subjectsort_id',
          name: 'userloginsubjectsortlist',
          component: UserLoginSubjectSortList
        },
        {
          path: '/userlogincoursesortlist/:coursesort_id',
          name: 'userlogincoursesortlist',
          component: UserLoginCourseSortList
        },
      ]
    },
    {
      path: '/userindex',
      name: 'userindex',
      component: UserIndex,
      children: [
        // 子路由
        {
          path: '/userbooklist',
          name: 'userbooklist',
          component: UserBookList
        },
        {
          path: '/usermajorsortlist/:majorsort_id',
          name: 'usermajorsortlist',
          component: UserMajorSortList
        },
        {
          path: '/usersubjectsortlist/:subjectsort_id',
          name: 'usersubjectsortlist',
          component: UserSubjectSortList
        },
        {
          path: '/usercoursesortlist/:coursesort_id',
          name: 'usercoursesortlist',
          component: UserCourseSortList
        },
        {
          path: '/userbookdetail/:id',
          name: 'userbookdetail',
          component: UserBookDetail
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
          path: '/myshop',
          name: 'myshop',
          component: MyShop
        },
        {
          path: '/myshopdetail/:id',
          name: 'myshopdetail',
          component: MyShopDetail
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
