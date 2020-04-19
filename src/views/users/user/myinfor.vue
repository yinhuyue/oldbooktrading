<template>
  <div>
    <el-breadcrumb separator="">
      <el-breadcrumb-item :to="{ path: '/userinfor' }">用户基本信息</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-form ref="form" :model="userInforForm" label-width="80px">
        <el-form-item class="content-infor" label="用户名称:">
          {{userInforForm.user_name}}
        </el-form-item>
        <el-form-item class="content-infor" label="用户账号:">
          {{userInforForm.user_account}}
        </el-form-item>
        <el-form-item class="content-infor" label="用户地址:">
          {{userInforForm.user_address}}
        </el-form-item>
        <el-form-item class="content-infor" label="用户电话:">
          {{userInforForm.user_telephone}}
        </el-form-item>
        <el-form-item class="content-infor" label="用户邮箱:">
          {{userInforForm.user_email}}
        </el-form-item>
        <el-button style="margin-left: 80px;" type="primary" @click="showUserInforDialogVisible">修改信息
        </el-button>
        <el-button style="margin-left: 10px;" type="warning" @click="updateUserPasswordDialogVisible = true">修改密码
        </el-button>
      </el-form>
    </div>
    <!-- 修改用户信息的对话框 -->
    <el-dialog title="用户信息修改" :visible.sync="updateUserInforDialogVisible">
      <el-form :rules="updateUserInforRules" ref="updateUserInforRef" :model="updateUserInforFormData"
        label-position="left" label-width="120px">
        <el-form-item label="用户名称" prop="user_name">
          <el-input v-model="updateUserInforFormData.user_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="user_account">
          <el-input v-model="updateUserInforFormData.user_account" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户地址" prop="user_address">
          <el-input v-model="updateUserInforFormData.user_address" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" prop="user_telephone">
          <el-input v-model="updateUserInforFormData.user_telephone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="user_email">
          <el-input v-model="updateUserInforFormData.user_email" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateUserInforDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserInfor">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户信息的对话框 -->
    <el-dialog title="用户密码修改" :visible.sync="updateUserPasswordDialogVisible">
      <el-form :rules="updateUserPasswordRules" ref="updateUserPasswordRef" :model="updateUserPasswordFormData"
        label-position="left" label-width="120px">
        <el-form-item label="用户原密码" prop="user_old_password">
          <el-input v-model="updateUserPasswordFormData.user_old_password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户新密码" prop="user_new_password">
          <el-input v-model="updateUserPasswordFormData.user_new_password" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateUserPasswordDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateUserPassword">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'user',
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
        userInforForm: {
          user_id: '',
          user_name: '',
          user_account: '',
          user_password: '',
          user_address: '',
          user_telephone: '',
          user_email: ''
        },
        // 控制加载提示的现实与隐藏
        loading: true,
        updateUserInforDialogVisible: false,
        updateUserInforFormData: {
          user_name: '',
          user_account: '',
          user_address: '',
          user_telephone: '',
          user_email: ''
        },
        updateUserInforRules: {
          user_account: [{
              required: true,
              message: '请输入账号',
              trigger: 'blur'
            },
            {
              min: 8,
              max: 36,
              message: '长度在 8 到 36 个字符',
              trigger: 'blur'
            }
          ],
          user_name: [{
              required: true,
              message: '请输入用户昵称',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 36,
              message: '长度在 1 到 36 个字符',
              trigger: 'blur'
            }
          ],
          user_address: [{
            required: true,
            message: '请输入用户地址',
            trigger: 'blur'
          }],
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
        updateUserPasswordDialogVisible: false,
        updateUserPasswordFormData: {
          user_old_password: '',
          user_new_password: ''
        },
        updateUserPasswordRules: {
          user_old_password: [{
              required: true,
              message: '请输入原密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 25,
              message: '长度在 6 到 25 个字符',
              trigger: 'blur'
            }
          ],
          user_new_password: [{
              required: true,
              message: '请输入新密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 25,
              message: '长度在 6 到 25 个字符',
              trigger: 'blur'
            }
          ],
        }
      }
    },
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
    // 组件创建完毕，能够访问data中的成员
    created() {
      // 获取列表数据
      this.loadData()
    },
    methods: {
      async loadData() {
        // 数据请求开始
        this.loading = true
        const userID = sessionStorage.getItem('data')
        const res = await this.$axios.post(`/usertitle?user_id=${userID}`)
        // 数据请求已经结束
        this.loading = false
        if (res.data.status === 200) {
          // 表格数据
          this.userInforForm = res.data.data
        } else {
          this.$message.error('获取数据失败')
        }
      },
      async showUserInforDialogVisible() {
        this.updateUserInforDialogVisible = true
        const userID = sessionStorage.getItem('data')
        const res = await this.$axios.post(`/usertitle?user_id=${userID}`)
        if (res.data.status === 200) {
          // 表格数据
          this.updateUserInforFormData = res.data.data
        } else {
          this.$message.error('获取数据失败')
        }
      },
      // 用户信息修改
      async updateUserInfor() {
        // 验证表单
        this.$refs.updateUserInforRef.validate(async (valid) => {
          // 验证失败
          if (!valid) {
            this.$message.error('请完善内容')
            return
          } else {
            this.updateUserInforDialogVisible = false
            const userID = sessionStorage.getItem('data')
            const res = await this.$axios.put(`updateuserinfor?user_id=${userID}`, this.updateUserInforFormData)

            if (res.data.status === 200) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              // 重新加载数据
              this.loadData()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          }
        })
      },
      // 用户密码修改
      async updateUserPassword() {
        // 验证表单
        this.$refs.updateUserPasswordRef.validate(async (valid) => {
          // 验证失败
          if (!valid) {
            this.$message.error('请完善内容')
            return
          } else {
            const userID = sessionStorage.getItem('data')
            const res = await this.$axios.put(`updateuserpassword?user_id=${userID}`, this
              .updateUserPasswordFormData)
            if (res.data.status === 200) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              this.updateUserPasswordDialogVisible = false
              // 清空文本框的值
              for (let key in this.updateUserPasswordFormData) {
                this.updateUserPasswordFormData[key] = ''
              }
              // 重新加载数据
              this.loadData()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          }
        })
      }
    }
  }

</script>

<style scoped>
  .content {
    margin-top: 20px;
    margin-left: 20px;
  }

  .content-infor {
    font-size: 28px;
  }

</style>
