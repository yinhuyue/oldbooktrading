<template>
  <div class="login">
    <el-form class="login-form" label-position="top" :rules="rules" ref="formRef" :model="form" label-width="80px">
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="user_account">
        <el-input v-model="form.user_account"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="user_password">
        <el-input @keyup.enter.native='dologin' type="password" v-model="form.user_password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" @click="dologin" type="primary">登录</el-button>
        <el-button class="login-btn" @click="dialogRegisterFormVisible = true" type="primary" style="margin-top: 15px">
          注册</el-button>
      </el-form-item>
    </el-form>

    <el-dialog title="用户注册" :visible.sync="dialogRegisterFormVisible">
      <el-form :model="registerForm" :rules="registerRules" ref="registerRef" label-position="left" label-width="120px">
        <el-form-item label="用户名" prop="user_account">
          <el-input placeholder="请输入用户名" v-model="registerForm.user_account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="user_account">
          <el-input placeholder="请输入密码" v-model="registerForm.user_password" show-password></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="user_name">
          <el-input placeholder="请输入用户昵称" v-model="registerForm.user_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户地址" prop="user_address">
          <el-input placeholder="请输入用户地址" v-model="registerForm.user_address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" prop="user_telephone">
          <el-input placeholder="请输入用户电话" v-model="registerForm.user_telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="user_email">
          <el-input placeholder="请输入用户邮箱" v-model="registerForm.user_email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doregister">注册</el-button>
        <el-button @click="dialogRegisterFormVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      let isMobileNumber = (rule, value, callback) => {
        if (!value) {
          return new Error("请输入电话号码")
        } else {
          const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
          const isPhone = reg.test(value);
          value = Number(value); //转换为数字
          if (typeof value === "number" && !isNaN(value)) { //判断是否为数字
            value = value.toString(); //转换成字符串
            if (value.length < 0 || value.length > 12 || !isPhone) { //判断是否为11位手机号
              callback(new Error("手机号码格式如:138xxxx8754"))
            } else {
              callback()
            }
          } else {
            callback(new Error("请输入电话号码"))
          }
        }
      }
      let isEmail = (rule, value, callback) => {
        if (!value) {
          callback()
        } else {
          const reg = /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/
          const email = reg.test(value);
          if (!email) {
            callback(new Error("邮箱格式如:admin@163.com"))
          } else {
            callback()
          }
        }
      }
      return {
        form: {
          user_account: '',
          user_password: ''
        },
        rules: {
          user_account: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 8,
              max: 36,
              message: '长度在 8 到 36 个字符',
              trigger: 'blur'
            }
          ],
          user_password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 25,
              message: '长度在 6 到 25 个字符',
              trigger: 'blur'
            }
          ]
        },
        dialogRegisterFormVisible: false,
        registerForm: {
          user_account: '',
          user_password: '',
          user_name: '',
          user_address: '',
          user_telephone: '',
          user_email: ''
        },
        registerRules: {
          user_account: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 8,
              max: 36,
              message: '长度在 8 到 36 个字符',
              trigger: 'blur'
            }
          ],
          user_password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 25,
              message: '长度在 6 到 25 个字符',
              trigger: 'blur'
            }
          ],
          user_name: [{
              required: true,
              message: '请输入用户昵称',
              trigger: 'blur'
            }
          ],
          user_address: [{
              required: true,
              message: '请输入地址',
              trigger: 'blur'
            }
          ],
          user_telephone: [{
              required: true,
              message: "请输入手机号码",
              trigger: "blur"
            },
            {
              validator: isMobileNumber,
              trigger: "blur"
            }
          ],
          user_email: [{
              required: true,
              message: "请输入邮箱",
              trigger: "blur"
            },
            {
              validator: isEmail,
              trigger: "blur"
            }
          ]
        },
        user: []
      }
    },
    methods: {
      async dologin() {
        this.$refs.formRef.validate(async (valid) => {
          if (!valid) {
            return;
          } else {
            const res = await this.$axios.post('/userlogin', this.form)
            if (res.data.status === 200) {
              // console.log(res)
              this.$message.success('登陆成功')
              const user = res.data.data.user_id
              sessionStorage.setItem('token', JSON.stringify(res.data.token))
              sessionStorage.setItem('data', JSON.stringify(user))
              // 跳转
              this.$router.push({
                name: 'list'
              })
            } else {
              this.$message.error(res.data.msg)
            }
          }
        })
      },
      async doregister() {
        this.$refs.registerRef.validate(async (valid) => {
          if (!valid) {
            return;
          } else {
            const res = await this.$axios.post('/userregister', this.registerForm)
            if (res.data.status === 200) {
              console.log(res)
              this.$message.success(res.data.msg)
              this.dialogRegisterFormVisible = false
            } else if (res.data.status === 501) {
              this.$message.warning(res.data.msg)
            } else if (res.data.status === 502) {
              this.$message.warning(res.data.msg)
            } else {
              this.$message.error(res.data.msg)
            }
          }
        })
      },

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
    padding-left: 0;
    margin-left: 0;
  }

</style>
