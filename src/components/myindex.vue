<template>
  <!-- <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img class="logo" src="" alt="">
          </div>
        </el-col>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            <div class="title">校园二手书交易网站后台管理系统</div>
          </div>
        </el-col>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <a class="logout" href="#">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="side" width="230px">
        <el-menu id="menu" :router="true" default-active="1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
          <el-menu-item class="item" index="1">
            <i class="el-icon-menu"></i>
            <span class="title" slot="title">用户信息管理</span>
          </el-menu-item>
          <el-menu-item class="item" index="2">
            <i class="el-icon-menu"></i>
            <span class="title" slot="title">分类管理</span>
          </el-menu-item>
          <el-menu-item class="item" index="3">
            <i class="el-icon-menu"></i>
            <span class="title" slot="title">待出售书籍管理</span>
          </el-menu-item>
          <el-menu-item class="item" index="4">
            <i class="el-icon-menu"></i>
            <span class="title" slot="title">已出售书籍管理</span>
          </el-menu-item>
          <el-menu-item class="item" index="5">
            <i class="el-icon-menu"></i>
            <span class="title" slot="title">评论管理</span>
          </el-menu-item>
          <el-menu-item class="item" index="5">
            <i class="el-icon-menu"></i>
            <span class="title" slot="title">活动管理</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
          <router-view></router-view>
      </el-main>
    </el-container>
  </el-container> -->

  <el-container class="container">
    <el-aside class="side" width="250px">
      <!-- <el-menu id="menu"  :router="true" text-color="#bdc2c8" active-text-color="#409EFF" default-active="0" 
      class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"> -->
      <el-menu id="menu" :router="true" default-active="/home" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <div class="block">
          <img class="logo" src="../assets/img/1.jpg">
          <p class="funtitle">
            <span class="cname">后台功能信息管理</span>
            <span class="ename">Function Management</span>
          </p>
        </div>
        <el-menu-item class="item" index="/home">
          <i class="el-icon-user"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item class="item" index="/users">
          <i class="el-icon-user"></i>
          <span slot="title">用户信息管理</span>
        </el-menu-item>
        <el-menu-item class="item" index="2">
          <i class="el-icon-sort"></i>
          <span slot="title">书籍分类管理</span>
        </el-menu-item>
        <el-menu-item class="item" index="3">
          <i class="el-icon-sell"></i>
          <span slot="title">待出售书籍管理</span>
        </el-menu-item>
        <el-menu-item class="item" index="4">
          <i class="el-icon-s-cooperation"></i>
          <span slot="title">已出售书籍管理</span>
        </el-menu-item>
        <el-menu-item class="item" index="5">
          <i class="el-icon-message"></i>
          <span slot="title">评论管理</span>
        </el-menu-item>
        <el-menu-item class="item" index="6">
          <i class="el-icon-goods"></i>
          <span slot="title">活动管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-container>
      <el-header class="header">
        <el-row>
          <el-col :span="20">
            <div class="grid-content bg-purple">
              <div class="title">校园二手书交易网站后台管理系统</div>
            </div>
          </el-col>
          <el-col :span="4">
            <div class="grid-content bg-purple">
              <a class="logout" href="#">退出</a>
            </div>
          </el-col>
        </el-row>
      </el-header>
      <el-main class="main">
        <!-- <span>欢迎来到校园二手书交易网站后台管理系统!!!</span> -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
  export default {
    // // 判断是否登录
    // beforeCreate() {
    //     // 判断sessionStorage中是否有token，如果没有则认为没有登陆
    //     const token = sessionStorage.getItem('token')
    //     if(!token) {
    //         // 跳转回登录页面并且要提示
    //         this.$router.push({
    //             name: 'login'
    //         })
    //         this.$message.info('请先登录')
    //     }
    // }
  }

</script>

<style scoped>
  .container {
    height: 100%;
  }

  .header {
    background-color: #b3c0d1;
    padding: 0;
  }

  .header .title {
    text-align: center;
    line-height: 60px;
    font-size: 24px;
    color: #fff;
  }

  .header .logout {
    position: absolute;
    right: 10px;
    color: #fff;
    line-height: 60px;
    text-decoration: none;
    font-size: 24px;
    margin-right: 10px;
  }

  .side {
    background-color: #d3dce6;
  }

  #menu {
    height: 100%;
    /* background-color: rgba(0, 0, 0, 0.884); */
  }

  .block {
    width: 100%;
    height: 120px;
    border-bottom: 1px solid rgba(194, 194, 194, 0.884);
    display: inline-block;
  }

  .logo {
    width: 27%;
    height: 50%;
    margin-left: 10px;
    margin-right: 10px;
    margin-top: 30px;
    float: left;
  }

  .funtitle {
    color: #bdc2c8;
    text-align: left;
    padding-top: 20px;
  }

  .cname {
    font-size: 18px;
    font-weight: bold;
  }

  .ename {
    font-size: 14px;
  }

  .item {
    border-bottom: 1px solid rgba(194, 194, 194, 0.884);
  }

  .main {
    height: 100%;
    background-color: #e9eef3;
    /* text-align: center;
    font-size: 48px;
    padding-top: 250px; */
  }

</style>
