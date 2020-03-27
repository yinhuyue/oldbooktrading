<template>
  <div class="login">
    <el-form class="login-form" label-position="top" :rules="rules" ref="form" :model="form" label-width="80px">
      <h2>管理员登录</h2>
      <el-form-item label="账号" prop="admin_account">
        <el-input v-model="form.admin_account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="admin_password">
        <el-input @keyup.enter.native='dologin' type="password" v-model="form.admin_password"></el-input>
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
          admin_account: '',
          admin_password: ''
        },
        rules: {
          admin_account: [{
              required: true,
              message: '请输入账号',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 8,
              message: '长度在 3 到 8 个字符',
              trigger: 'blur'
            }
          ],
          admin_password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 11,
              message: '长度在 6 到 11 个字符',
              trigger: 'blur'
            }
          ]
        }
      }
    },
    methods: {
      async dologin() {
        this.$refs.form.validate(async (valid) => {
          if (!valid) {
            return;
          } else {
            const res = await this.$axios.post('/login', this.form)
            if (res.data.status === 200) {
              console.log(res)
              this.$message.success('登陆成功')
              sessionStorage.setItem('token', res.data.data)
              // 跳转
              this.$router.push({
                name: 'home'
              })
            } else {
              this.$message.error('登陆失败')
            }
          }
        })
      }
    }
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
