<template>
  <el-container class="container">
    <el-header class="header">Header</el-header>
    <el-container>
      <el-aside class="side" width="200px">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
    // 判断是否登录
    beforeCreate() {
        // 判断sessionStorage中是否有token，如果没有则认为没有登陆
        const token = sessionStorage.getItem('token')
        if(!token) {
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
.container {
    height: 100%;
}

.header {
    background-color: #b3c0d1;
}

.side {
    background-color: #d3dce6;
}

.main {
    height: 100%;
    background-color: #e9eef3;
}
</style>
