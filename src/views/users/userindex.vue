<template>
  <div>
    <el-row type="flex" class="row-bg header">
      <el-col :span="2" class="header-title">
        <div class="grid-content bg-purple">
        </div>
      </el-col>
      <el-col :span="6" class="header-title">
        <div class="grid-content bg-purple">
          您好，欢迎 <span class="header-title-name">{{userForm.user_name}}</span> 来到校园二手书交易网站！
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple-light">
        </div>
      </el-col>
      <el-col :span="2" class="header-title2">
        <div class="grid-content bg-purple">
          <i class="el-icon-user-solid"></i>
          <span slot="title" @click="userCenter">个人中心</span>
        </div>
      </el-col>
      <el-col :span="2" class="header-title3">
        <div class="grid-content bg-purple" @click="logout">
          <i class="el-icon-error"></i>
          <span slot="title">退出</span>
        </div>
      </el-col>
      <el-col :span="2" class="header-title">
        <div class="grid-content bg-purple">
        </div>
      </el-col>
    </el-row>
    <!-- 头部组件 -->
    <!-- <my-header></my-header> -->

    <el-row type="flex" class="row-bg shoulder">
      <el-col :span="2" class="header-title">
        <div class="grid-content bg-purple">
        </div>
      </el-col>
      <el-col :span="5" class="shoulder-img">
        <div class="grid-content bg-purple">
          <img class="logo" src="../../assets/img/1.jpg">
        </div>
      </el-col>
      <el-col :span="15" class="shoulder-activity">
        <div class="shoulder-activity-h">
          网站活动
        </div>
        <div class="grid-content bg-purple"
          v-for="(item, index) in activityForm.slice((current_page-1)*per_page,current_page*per_page)" :key="index">
          <div class="shoulder-activity-title">
            {{item.activity_name}}
          </div>
          <div class="shoulder-activity-content" :show-overflow-tooltip="true">
            {{item.activity_content}}
          </div>
          <div class="shoulder-activity-time">
            活动发起时间：{{item.activity_avtivitytime | fmtDate('YYYY-MM-DD') }}
          </div>
          <div class="shoulder-activity-effecttime">
            有效时间：{{item.activity_effecttime}}
          </div>
        </div>
        <div>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
            :current-page.sync="current_page" :page-size="per_page" layout="total, prev, pager, next" :total="total">
          </el-pagination>
        </div>
      </el-col>
      <el-col :span="2" class="header-title">
        <div class="grid-content bg-purple">
        </div>
      </el-col>
    </el-row>

    <el-row type="flex" class="row-bg content">
      <el-col :span="2">
        <div class="grid-content bg-purple">
        </div>
      </el-col>
      <el-col :span="20">
        <div class="grid-content bg-purple-light">
          <!-- <el-container class="content-container"> -->
          <el-col>
            <div class="sontent-sort">
              <div class="content-sort-title">
                <p>
                  <span>图书分类</span>
                </p>
              </div>
              <div @mouseout="closeAll" class="content-sort-tab">
                <ul>
                  <li @mouseover="openCon(item.majorsort_id,index)" v-for="(item,index) in majorSortForm"
                    :key="item.majorsort_id" :class="{active:num==index}" @click="doMajorList(item.majorsort_id)">
                    <span>{{item.majorsort_name}}</span>
                  </li>
                </ul>
              </div>
              <div @mouseover="open2" @mouseleave="closeCon" class="content-sort-content" v-show="sortCon">
                <ul>
                  <li @mouseover="openCon2(item2.subjectsort_id,index2)" :class="{active:num2==index2}"
                    v-for='(item2,index2) in subjectSortForm' :key="item2.subjectsort_id"
                    @click="doSubjectList(item2.majorsort_id,item2.subjectsort_id)">
                    <span>{{item2.subjectsort_name}}</span>
                  </li>
                </ul>
              </div>
              <div @mouseover="open3" @mouseleave="closeCon2" class="content-sort-content2" v-show="sortCon2">
                <ul>
                  <li v-for='(item3,index3) in courseSortForm' :key="item3.coursesort_id" @mouseover="openAll(index3)"
                    :class="{active:num3==index3}" @click="doCourseList(item3.coursesort_id)">
                    <span>{{item3.coursesort_name}}</span>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
          <el-col :span="18">
            <div class="grid-content bg-purple content-main">
              <!-- <el-main class="content-main"> -->
              <router-view></router-view>
              <!-- </el-main> -->
            </div>
          </el-col>
          <!-- </el-container> -->
        </div>
      </el-col>
      <el-col :span="2" class="header-title">
        <div class="grid-content bg-purple">
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  // 导入头部组件
  // import MyHeader from '@/components/myheader.vue'

  export default {
    // 注册局部组件
    // components: {
    //   MyHeader,
    // },
    data() {
      return {
        userForm: {},
        activityForm: [],
        // 分页  当前页数
        current_page: 1,
        // 分页  当前每页显示几条数据
        per_page: 1,
        //总页数
        total: 0,
        num: -1,
        num2: -1,
        num3: -1,
        sortCon: false,
        sortCon2: false,
        majorSortForm: [],
        subjectSortForm: [],
        courseSortForm: [],
        defaultActive: '',
        tabPosition: 'left',
        iscollapse: false,
      }
    },
    // // 判断是否登录
    // beforeCreate() {
    //   // 判断sessionStorage中是否有token，如果没有则认为没有登陆
    //   const token = sessionStorage.getItem('token')
    //   if (!token) {
    //     // 跳转回登录页面并且要提示
    //     this.$router.push({
    //       name: 'login'
    //     })
    //     this.$message.info('请先登录')
    //   }
    // },
    mounted() {
      // 获取列表数据
      this.loadData()
    },
    methods: {
      async loadData() {
        // 获取用户名称
        const userID = sessionStorage.getItem('data')
        const res = await this.$axios.post(`/usertitle?user_id=${userID}`)
        // console.log(res)
        if (res.data.status === 200) {
          // 表格数据
          this.userForm = res.data.data
        } else {
          this.$message.error('获取数据失败')
        }

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
      // 获取学科分类
      async openCon(majorsort_id, index) {
        this.num = index
        this.sortCon = true
        const res = await this.$axios.post(`/usersubjectsort?majorsort_id=${majorsort_id}`)

        if (res.data.status === 200) {
          this.subjectSortForm = res.data.data.data
        } else {
          this.$message.error('获取数据失败')
        }
      },
      async openCon2(subjectsort_id, index2) {
        this.num2 = index2
        this.sortCon = true
        this.sortCon2 = true
        const res2 = await this.$axios.post(`/usercoursesort?subjectsort_id=${subjectsort_id}`)
        if (res2.data.status === 200) {
          this.courseSortForm = res2.data.data.data
        } else {
          this.$message.error('获取数据失败')
        }
      },
      closeAll() {
        // this.num = -1
        this.num2 = -1
        this.num3 = -1
        this.sortCon = false
        this.sortCon2 = false
      },
      closeCon() {
        this.num3 = -1
        this.sortCon = false
        this.sortCon2 = false
      },
      openAll(index3) {
        this.num3 = index3
        this.sortCon = true
        this.sortCon2 = true
      },
      open2() {
        this.sortCon = true
      },
      open3() {
        this.sortCon = true
        this.sortCon2 = true
      },
      closeCon2() {
        // this.num = -1
        this.num3 = -1
        this.sortCon = false
        this.sortCon2 = false
      },
      doMajorList(majorsort_id) {
        this.$router.push({
          name: 'booklist',
          params: {
            id: majorsort_id,
          }
        })
      },
      doSubjectList(majorsort_id,subjectsort_id) {
        this.$router.push({
          name: 'booklist',
          params: {
            id: subjectsort_id
          }
        })
      },
      doCourseList(coursesort_id) {
        this.$router.push({
          name: 'booklist',
          params: {
            id: coursesort_id
          }
        })
      },
      // 分页功能  监听pagesize改变的事件
      handleSizeChange(val) {
        this.per_page = val;
        // 当每页条数发生变化，修改当前页码为第一页
        this.current_page = 1;
        this.loadData();
        // size发生变化
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.current_page = val;
        this.loadData();
        // 页码发生变化
        console.log(`当前页: ${val}`);
      },
      userCenter() {
        this.$router.push({
          name: 'myinfor'
        })
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      logout() {
        this.$confirm('是否要退出系统？', '退出提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 1. 删除token
          sessionStorage.removeItem('token')
          sessionStorage.removeItem('data')
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
  .header {
    min-width: 100%;
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

  .header-title3 {
    line-height: 35px;
    font-size: 14px;
    padding-left: 40px;
    white-space: nowrap;
    cursor: pointer;
  }

  .shoulder {
    height: 220px;
    background-color: lavender;
  }

  .shoulder-img img {
    width: 100%;
    height: 200px;
    padding-top: 10px;
  }

  .shoulder-activity {
    font-size: 16px;
    margin-left: 20px;
    margin-top: 10px;
  }

  .shoulder-activity-h {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .shoulder-activity-title {
    margin-bottom: 5px;
  }

  .shoulder-activity-content {
    margin-bottom: 5px;
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

  .content {
    height: 100%;
  }

  .sontent-sort {
    width: 230px;
    float: left;
    z-index: 5;
    position: absolute;
    left: 8%;
  }

  .content-sort-title {
    font-size: 22px;
    font-weight: bold;
    padding-left: 10px;
  }

  .active {
    color: #fff;
    background: #e74c3c;
  }

  .content-sort-tab {
    width: 100%;
    height: 0;
  }

  .content-sort-tab>ul {
    margin: 0;
    padding: 0;
  }

  .content-sort-tab>ul>li {
    height: 45px;
    font-size: 18px;
    list-style: none;
    line-height: 45px;
    border: 1px solid #d8a59f;
    cursor: pointer;
    text-indent: 1em;
  }

  .content-sort-content {
    margin-left: 100%;
    width: 230px;
    height: 0;
  }

  .content-sort-content>ul {
    margin: 0;
    padding: 0;
    height: 300px;
  }

  .content-sort-content>ul>li {
    width: 100%;
    height: 50px;
    font-size: 18px;
    list-style: none;
    line-height: 50px;
    border: 1px solid blue;
    cursor: pointer;
    text-indent: 1em;
  }

  .content-sort-content2 {
    margin-left: 200%;
    width: 230px;
  }

  .content-sort-content2>ul {
    margin: 0;
    padding: 0;
    height: 400px;
  }

  .content-sort-content2>ul>li {
    width: 100%;
    height: 50px;
    font-size: 18px;
    list-style: none;
    padding-left: 10px;
    line-height: 50px;
    border: 1px solid #d8a59f;
    cursor: pointer;
    text-indent: 1em;
  }


  .content-main {
    width: 100%;
    margin-left: 250px;
    margin-top: 20px;
  }

</style>
