<template>
  <el-container class="container">
    <el-header class="header">
      <el-row type="flex" class="row-bg">
        <el-col :span="6" class="header-title">
          <div class="grid-content bg-purple">
            您好，欢迎来到个人中心
          </div>
        </el-col>
        <el-col :span="14">
          <div class="grid-content bg-purple-light">
          </div>
        </el-col>
        <el-col :span="2" class="header-title2">
          <div class="grid-content bg-purple">
            <i class="el-icon-user-solid"></i>
            <span slot="title" @click="bookWeb">网站首页</span>
          </div>
        </el-col>
        <el-col :span="2" class="header-title3">
          <div class="grid-content bg-purple" @click="logout">
            <i class="el-icon-error"></i>
            <span slot="title">退出</span>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="side" width="280px">
        <el-menu :router="true" default-active="/myinfor" class="el-menu-vertical-demo menu"
          background-color="rgb(65, 66, 70)" text-color="#fff" active-text-color="#ffd04b">
          <div class="block">
            <span class="cname">个人中心功能管理</span>
            <span class="ename">Personal function management</span>
          </div>
          <el-menu-item class="item" index="/myinfor">
            <i class="el-icon-user"></i>
            <span slot="title">用户基本信息</span>
          </el-menu-item>
          <el-menu-item class="item" index="/mysellbook">
            <i class="el-icon-user"></i>
            <span slot="title">出售书籍</span>
          </el-menu-item>
          <el-menu-item class="item" index="/mybooklist">
            <i class="el-icon-user"></i>
            <span slot="title">出售书籍信息</span>
          </el-menu-item>
          <el-menu-item class="item" index="/usersellbook">
            <i class="el-icon-user"></i>
            <span slot="title">我的购物车</span>
          </el-menu-item>
          <el-menu-item class="item" index="/usersellbook">
            <i class="el-icon-user"></i>
            <span slot="title">购买书籍信息</span>
          </el-menu-item>
          <el-menu-item class="item" index="/mycomment">
            <i class="el-icon-user"></i>
            <span slot="title">我的评论</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  export default {
    // 判断是否登录
    beforeCreate() {
      // 判断sessionStorage中是否有token，如果没有则认为没有登陆
      const token = sessionStorage.getItem('token')
      if (!token) {
        // 跳转回登录页面并且要提示
        this.$router.push({
          name: 'userlogin'
        })
        this.$message.info('请先登录')
      }
    },
    methods: {
      bookWeb() {
        this.$router.push({
          name: 'list'
        })
      },
      logout() {
        this.$confirm('是否要退出系统？', '退出提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 1. 删除token
          sessionStorage.removeItem('token')
          // 2. 跳转到登录
          this.$router.push({
            name: 'userlogin'
          })
          this.$message({
            type: 'success',
            message: '退出成功!'
          })
        })
      }
    }
  }

</script>

<style scoped>
  .container {
    height: 100%;
  }

  .header {
    min-width: 100%;
    background-color: #000;
    color: #fff;
  }

  .header-title {
    line-height: 60px;
    font-size: 24px;
    white-space: nowrap;
    margin-left: 20px;
  }

  .header-title-name {
    color: blue;
  }

  .header-title2 {
    line-height: 60px;
    font-size: 18px;
    padding-left: 10px;
    white-space: nowrap;
    cursor: pointer;
  }

  .header-title3 {
    line-height: 60px;
    font-size: 18px;
    padding-left: 40px;
    white-space: nowrap;
    cursor: pointer;
  }

  .menu {
    height: 100%;
  }

  .block {
    width: 100%;
    border-bottom: 1px solid rgba(194, 194, 194, 0.884);
    color: #bdc2c8;
    text-align: center;
    padding-top: 10px;
    padding-bottom: 10px;
  }

  .cname {
    font-size: 20px;
    font-weight: bold;
    display: block;
  }

  .ename {
    font-size: 16px;
    display: block;
    margin-top: 5px;
  }

  .item {
    font-size: 17px;
    height: 60px;
    border-bottom: 1px solid rgba(194, 194, 194, 0.884);
  }

  .main {
    background-color: #e9eef3;
  }

</style>
