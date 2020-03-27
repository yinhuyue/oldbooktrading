<template>
  <div>
    <!-- <el-card class="box-card"> -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>首页</el-breadcrumb-item>
        <!-- <el-breadcrumb-item></el-breadcrumb-item> -->
      </el-breadcrumb>
    <!-- </el-card> -->
    <div class="menu">
      <p>欢迎来到校园二手书交易网站后台管理系统!!!</p>
    </div>
  </div>
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
          name: 'login'
        })
        this.$message.info('请先登录')
      }
    }
  }

</script>

<style scoped>
  .menu {
    position: relative;
    text-align: center;
    font-size: 48px;
    padding-top: 210px;
  }

</style>
