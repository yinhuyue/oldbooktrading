<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户信息管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 10px;">
      <el-input @keyup.enter.native='doSearch' v-model="searchValue" placeholder="请输入用户名称" class="searchInput" clearable>
        <el-button @click="doSearch" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div style="margin-top: 10px;">
      <el-table :data="tableData.slice((current_page-1)*per_page,current_page*per_page)" border style="width: 100%" stripe>
        <el-table-column type="index" width="40">
        </el-table-column>
        <el-table-column prop="user_account" label="账号" width="150">
        </el-table-column>
        <el-table-column prop="user_name" label="昵称" width="150">
        </el-table-column>
        <el-table-column prop="user_telephone" label="电话" width="150">
        </el-table-column>
        <el-table-column prop="user_email" label="邮箱" width="230">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" prop="user_address" label="地址" width="380">
        </el-table-column>
        <el-table-column fixed="right" label="禁用" width="110">
          <template slot-scope="scope">
            <!-- 获取的是当前行绑定的数据对象 -->
            <!-- {{scope.row.user_id}} -->
            <!-- 获取的是当前行的索引，从 0 开始 -->
            <!-- {{scope.$index}} -->
            <!-- {{scope.row.user_state}} -->
            <el-switch v-model="scope.row.user_state" @change="(val) => userStateChange(scope.row.user_id, val)" :active-value="1"
              :inactive-value="0" active-color="#ff4949" inactive-color="rgb(221, 235, 241)">
            </el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页组件 -->
    <!-- <div class="block" style="margin-top: 10px;"> -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current_page"
      :page-sizes="[1, 2, 5, 10, 20]" :page-size="per_page" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- </div> -->
  </div>
</template>

<script>
  export default {
    name: 'user',
    data() {
      return {
        tableData: [],
        // 分页  当前页数
        current_page: 1,
        // 分页  当前每页显示几条数据
        per_page: 10,
        //总页数
        total: 0,
        // 搜索的数据
        searchValue: '',
        // 控制加载提示的现实与隐藏
        loading: true,
      }
    },
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
        const params = {
          current_page: this.current_page,
          per_page: this.per_page
        }
        const res = await this.$axios.get('/userlist', {
          params
        })
        // 数据请求已经结束
        this.loading = false
        if (res.data.status === 200) {
          // 表格数据
          this.tableData = res.data.data.data
          // 总数据条数
          this.total = res.data.data.total
        } else {
          this.$message.error('获取数据失败')
        }
      },
      // 搜索功能
      async doSearch() {
        const params = {
          current_page: this.current_page,
          per_page: this.per_page,
          query: this.searchValue
        }
        const res = await this.$axios.get('/search', {params})
        // const res = await this.$axios.get('/search', this.searchValue)
        if (res.data.status === 200) {
          // 表格数据
          this.tableData = res.data.data.data
          // 总数据条数
          this.total = res.data.data.total
        } else {
          this.$message.error('搜索失败')
        }
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
      // 用户状态改变  监听swich开关状态的改变
      async userStateChange(id, val) {
        const res = await this.$axios.put(`/ban?user_id=${id}&user_state=${val}`)
        if(res.data.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      }
    }
  }

</script>

<style scoped>
  .searchInput {
    width: 350px;
  }

</style>
