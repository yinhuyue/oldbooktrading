<template>
  <div class="box">
    <el-row type="flex" class="row-bg header">
      <el-col :span="2">
      </el-col>
      <el-col :span="6" class="header-title">
        <div class="grid-content bg-purple">
          您好，欢迎来到校园二手书交易网站！
        </div>
      </el-col>
      <el-col :span="12">
      </el-col>
      <el-col :span="2" class="header-title2">
        <div class="grid-content bg-purple">
          <span class="login" slot="title" @click="dialogLoginFormVisible = true">登录</span>
          <span class="register" slot="title" @click="dialogRegisterFormVisible = true">注册</span>
        </div>
      </el-col>
      <el-col :span="2">
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg shoulder">
      <el-col :span="2">
      </el-col>
      <el-col :span="20">
        <div class="shoulder-img">
          <img class="logo" src="../../../assets/img/1.jpg">
        </div>
        <div class="shoulder-activity"
          v-for="(item, index) in activityForm.slice((current_page-1)*per_page,current_page*per_page)" :key="index">
          <div class="shoulder-activity-header">
            网站活动
          </div>
          <div class="shoulder-activity-title">
            <span>活动名称：</span>
            {{item.activity_name}}
          </div>
          <div class="shoulder-activity-content">
            <div class="shoulder-activity-content-title">活动内容：</div>
            <div class="shoulder-activity-content-content">
              {{item.activity_content}}
            </div>
          </div>
          <div class="shoulder-activity-time">
            <span>活动时间：</span>
            {{item.activity_avtivitytime | fmtDate('YYYY-MM-DD') }}
          </div>
          <div class="shoulder-activity-effecttime">
            <span>有效时间：</span>
            {{item.activity_effecttime}}
          </div>
        </div>
        <div>
          <el-pagination style="margin-left: 20px;" @size-change="handleSizeChange"
            @current-change="handleCurrentChange" :current-page.sync="current_page" :page-size="per_page"
            layout="total, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="2" class="header-title">
        <div class="grid-content bg-purple">
        </div>
      </el-col>
    </el-row>
    <el-row type="flex" class="row-bg">
      <el-col :span="2">
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">
          <div class="content-sort">
            <div class="content-sort-title">
              <span>图书分类</span>
            </div>
            <div class="content-majorsort" @mouseout="closeAllSort">
              <ul>
                <li @mouseover="openSubjectSort(item.majorsort_id,index)" v-for="(item,index) in majorSortForm"
                  :key="item.majorsort_id" :class="{active:num==index}" @click="doMajorList(item.majorsort_id,index)">
                  <span>{{item.majorsort_name}}</span>
                </li>
              </ul>
            </div>
            <div class="content-subject" @mouseleave="closeSubjectSort" v-show="sortSubject">
              <ul>
                <li @mouseover="openCourseSort(item2.subjectsort_id,index2)" :class="{active:num2==index2}"
                  v-for='(item2,index2) in subjectSortForm' :key="item2.subjectsort_id"
                  @click="doSubjectList(item2.subjectsort_id)">
                  <span>{{item2.subjectsort_name}}</span>
                </li>
              </ul>
            </div>
            <div @mouseover="openCourse" @mouseleave="closeCourseSort" class="content-course" v-show="sortCourse">
              <ul>
                <li @mouseover="openAll(index3)" v-for='(item3,index3) in courseSortForm' :key="item3.coursesort_id"
                  :class="{active:num3==index3}" @click="doCourseList(item3.coursesort_id)">
                  <span>{{item3.coursesort_name}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="grid-content bg-purple content-main">
            <router-view></router-view>
          </div>
        </div>
      </el-col>
      <el-col :span="2" class="header-title">
      </el-col>
    </el-row>
    
    <el-dialog title="用户登录" :visible.sync="dialogLoginFormVisible" :before-close="closeLoginDialog">
      <el-form class="login-form" label-position="top" :rules="loginFormRules" ref="loginFormRef" :model="loginForm"
        label-width="80px">
        <el-form-item label="用户名" prop="user_account">
          <el-input v-model="loginForm.user_account"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="user_password">
          <el-input @keyup.enter.native='doLogin' type="password" v-model="loginForm.user_password"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="doLogin">登录</el-button>
        <el-button @click="closeLoginDialog">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="用户注册" :visible.sync="dialogRegisterFormVisible" :before-close="closeRegisterDialog">
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
        <el-button type="primary" @click="doRegister">注册</el-button>
        <el-button @click="closeRegisterDialog">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
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
        //登录
        loginForm: {
          user_account: '',
          user_password: ''
        },
        dialogLoginFormVisible: false,
        loginFormRules: {
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
        //注册
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
        //活动信息
        activityForm: [],
        // 分页  当前页数
        current_page: 1,
        // 分页  当前每页显示几条数据
        per_page: 1,
        //总页数
        total: 0,
        //分类标记
        num: -1,
        num2: -1,
        num3: -1,
        //分类展开
        sortSubject: false,
        sortCourse: false,
        //分类信息
        majorSortForm: [],
        subjectSortForm: [],
        courseSortForm: [],
      }
    },
    mounted() {
      // 获取列表数据
      this.loadData()
    },
    methods: {
      closeLoginDialog() {
        this.dialogLoginFormVisible = false
        this.$refs.loginFormRef.clearValidate();
        this.$refs.loginFormRef.resetFields();
      },
      async doLogin() {
        this.$refs.loginFormRef.validate(async (valid) => {
          if (!valid) {
            return
          } else {
            const res = await this.$axios.post('/userlogin', this.loginForm)
            if (res.data.status === 200) {
              this.$message.success('登陆成功')
              const user = res.data.data.user_id
              sessionStorage.setItem('token', JSON.stringify(res.data.token))
              sessionStorage.setItem('data', JSON.stringify(user))
              // 跳转
              this.$router.push({
                name: 'userbooklist'
              })
            } else {
              this.$message.error(res.data.msg)
            }
          }
        })
      },
      closeRegisterDialog() {
        this.dialogRegisterFormVisible = false
        this.$refs.registerRef.clearValidate();
        this.$refs.registerRef.resetFields();
      },
       async doRegister() {
        this.$refs.registerRef.validate(async (valid) => {
          if (!valid) {
            return;
          } else {
            const res = await this.$axios.post('/userregister', this.registerForm)
            if (res.data.status === 200) {
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
      async loadData() {
        // 获取活动信息
        const params = {
          current_page: this.current_page,
          per_page: this.per_page
        }
        const res2 = await this.$axios.get('/useractivity', {
          params
        })
        if (res2.data.status === 200) {
          // 表格数据
          this.activityForm = res2.data.data.data
          // 总数据条数
          this.total = res2.data.data.total
        } else {
          this.$message.error('获取数据失败')
        }
        // 获取分类信息
        const res3 = await this.$axios.get('/usermajorsort')
        if (res3.data.status === 200) {
          this.majorSortForm = res3.data.data.data
        } else {
          this.$message.error('获取数据失败')
        }
      },
      // 获取学科分类，打开学科分类
      async openSubjectSort(majorsort_id, index) {
        this.num = index
        this.sortSubject = true
        const res = await this.$axios.post(`/usersubjectsort?majorsort_id=${majorsort_id}`)

        if (res.data.status === 200) {
          this.subjectSortForm = res.data.data.data
        } else {
          this.$message.error('获取数据失败')
        }
      },
      openCourse() {
        this.sortSubject = true
        this.sortCourse = true
      },
      //获取课程分类，打开课程分类
      async openCourseSort(subjectsort_id, index2) {
        this.num2 = index2
        this.sortSubject = true
        this.sortCourse = true
        const res2 = await this.$axios.post(`/usercoursesort?subjectsort_id=${subjectsort_id}`)
        if (res2.data.status === 200) {
          this.courseSortForm = res2.data.data.data
        } else {
          this.$message.error('获取数据失败')
        }
      },
      //保持所有分类处于展开状态
      openAll(index3) {
        this.num3 = index3
        this.sortSubject = true
        this.sortCourse = true
      },
      //关闭所有分类展开状态
      closeAllSort() {
        this.sortSubject = false
        this.sortCourse = false
      },
      //关闭所有分类展开状态
      closeSubjectSort() {
        this.sortSubject = false
        this.sortCourse = false
      },
      //关闭所有分类展开状态
      closeCourseSort() {
        this.sortSubject = false
        this.sortCourse = false
      },
      //点击进入专业书籍分类列表页
      doMajorList(majorsort_id, index) {
        this.sortSubject = false
        this.num = index
        this.$router.push({
          name: 'userloginmajorsortlist',
          params: {
            majorsort_id: majorsort_id
          }
        })
      },
      //点击进入学科书籍分类列表页
      doSubjectList(subjectsort_id) {
        this.sortSubject = false
        this.$router.push({
          name: 'userloginsubjectsortlist',
          params: {
            subjectsort_id: subjectsort_id
          }
        })
      },
      //点击进入课程书籍分类列表页
      doCourseList(coursesort_id) {
        this.sortSubject = false
        this.sortCourse = false
        this.$router.push({
          name: 'userlogincoursesortlist',
          params: {
            coursesort_id: coursesort_id
          }
        })
      },
      // 分页功能  监听pagesize改变的事件
      handleSizeChange(val) {
        this.per_page = val;
        // 当每页条数发生变化，修改当前页码为第一页
        this.current_page = 1;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.current_page = val;
        this.loadData();
      },
    }
  }

</script>

<style scoped>
  /* .box {
    background-color: cornsilk;
  } */

  .header {
    height: 35px;
    background-color: khaki;
  }

  .header-title {
    line-height: 35px;
    font-size: 18px;
    white-space: nowrap;
  }

  .header-title-name {
    color: blue;
  }

  .header-title2 {
    line-height: 35px;
    font-size: 14px;
    padding-left: 10px;
    white-space: nowrap;
    cursor: pointer;
  }

  .login {
    font-size: 18px;
    display: inline-block;
    margin-right: 15px;
  }

  .register {
    font-size: 18px;
    display: inline-block;
  }

  .header-title3 {
    line-height: 35px;
    font-size: 14px;
    padding-left: 40px;
    white-space: nowrap;
    cursor: pointer;
  }

  .shoulder {
    margin-top: 20px;
  }

  .shoulder-img img {
    width: 235px;
    height: 200px;
    float: left;
    margin-right: 15px;
  }

  .shoulder-activity {
    height: 175px;
    font-size: 16px;
  }

  .shoulder-activity span {
    font-weight: bold;
  }

  .shoulder-activity-header {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .shoulder-activity-title {
    margin-bottom: 5px;
  }

  .shoulder-activity-content {
    /* height: 60px; */
    margin-bottom: 5px;
  }

  .shoulder-activity-content-title {
    float: left;
    font-weight: bold;
  }

  .shoulder-activity-content-content {
    padding-left: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* （希望显示N行-webkit-line-clamp的变为N） */
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .shoulder-activity-time {
    margin-bottom: 5px;
  }

  .shoulder-activity-effecttime {
    margin-bottom: 5px;
  }

  .content-sort {
    width: 230px;
    float: left;
    z-index: 5;
    position: absolute;
  }

  .content-sort-title {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .active {
    color: blue;
    /* background-color: #e74c3c; */
  }

  .content-majorsort {
    width: 100%;
    height: 0;

  }

  .content-majorsort>ul>li {
    height: 45px;
    font-size: 18px;
    line-height: 45px;
    border: 1px solid #000;
    cursor: pointer;
    text-indent: 1em;
    background-color: #f1d9d9;
  }

  .content-subject {
    margin-left: 100%;
    width: 230px;
    height: 0;
  }

  .content-subject>ul {
    height: 200px;
  }

  .content-subject>ul>li {
    height: 45px;
    font-size: 18px;
    line-height: 45px;
    border: 1px solid blue;
    cursor: pointer;
    text-indent: 1em;
    background-color: gold;
  }

  .content-course {
    margin-left: 200%;
    width: 230px;
  }

  .content-course>ul {
    height: 300px;
  }

  .content-course>ul>li {
    height: 45px;
    font-size: 18px;
    padding-left: 10px;
    line-height: 45px;
    border: 1px solid #d8a59f;
    cursor: pointer;
    text-indent: 1em;
    background: mediumaquamarine;
  }

  .content-main {
    margin-left: 250px;
    margin-top: 20px;
  }

</style>
