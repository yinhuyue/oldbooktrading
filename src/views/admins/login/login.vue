<template>
  <div class="login">
    <el-form class="login-form" label-position="top" ref="form" :model="form" label-width="80px">
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="form.adminname"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input @keyup.enter.native='dologin' type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" @click="dologin" type="primary">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
        return {
            form: {
                adminname: '',
                password: ''
            }
        }
    },
    methods: {
        async dologin() {
          const res = await this.$axios.post('login', this.form)
          const data = res.data
          if (data.meta.status === 200) {
            this.$message.success('登陆成功')
            sessionStorage.setItem('token', data.data.token)
            // 跳转
            this.$router.push({
              name: 'home'
            })
          } else {
            this.$message.error('登陆失败')
          }
        }
    },
  }

</script>

<style scoped>
.login {
    background-color: #324152;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.login .login-form {
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;
}
.login-btn {
    width: 100%;
}
</style>
