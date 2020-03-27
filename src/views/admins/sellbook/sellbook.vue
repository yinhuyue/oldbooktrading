<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>已出售书籍管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 10px;">
      <el-input @keyup.enter.native='doSearch' v-model="searchInput" placeholder="请输入已出售书籍名称" class="searchInput"
        clearable>
        <el-button @click="doSearch" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div style="margin-top: 10px;">
      <el-table ref="singleTable" :data="tableData.slice((current_page-1)*per_page,current_page*per_page)" style="width: 100%" border stripe>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column property="book_name" label="书名" width="120">
        </el-table-column>
        <el-table-column property="book_author" label="作者" width="120">
        </el-table-column>
        <el-table-column property="book_publish" label="出版社" width="160">
        </el-table-column>
        <el-table-column property="book_publishtime" label="出版时间" width="155">
        </el-table-column>
        <el-table-column property="book_oldprice" label="原价(元)" width="100">
        </el-table-column>
        <el-table-column property="book_newprice" label="现价(元)" width="100">
        </el-table-column>
        <el-table-column property="user_name" label="出售人" width="120">
        </el-table-column>
        <el-table-column property="book_sellstate" width="120" label="出售状态">
          <template slot-scope="scope">
            <el-tag type="success" effect="dark" v-if="scope.row.book_sellstate==1">已出售</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template slot-scope="scope">
            <el-button size="mini" type="danger"   @click="sellbookDelete(scope.row.book_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 10px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current_page"
      :page-sizes="[1, 2, 5, 10, 20]" :page-size="per_page" layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        searchInput: '',
        tableData: [],
        // 分页  当前页数
        current_page: 1,
        // 分页  当前每页显示几条数据
        per_page: 10,
        //总页数
        total: 0,
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
    created() {
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
        const res = await this.$axios.get('/sellbooklist', {
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
      // 搜索功能
      async doSearch() {
        const params = {
          current_page: this.current_page,
          per_page: this.per_page,
          query: this.searchInput
        }
        const res = await this.$axios.get('/sellbooksearch', {
          params
        })
        if (res.data.status === 200) {
          // 表格数据
          this.tableData = res.data.data.data
          // 总数据条数
          this.total = res.data.data.total
        } else {
          this.$message.error('搜索失败')
        }
      },
      // 根据id删除活动
      async sellbookDelete(book_id) {
        this.$confirm('是否确定删除该活动', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 删除操作
          const res = await this.$axios.delete(`/sellbookdelete?book_id=${book_id}`)
          if (res.data.status === 200) {
            // 删除成功
            this.$message.success(res.data.msg)
            // this.current_page=1
            // 重新加载数据
            this.loadData()
          } else {
            // 删除失败
            this.$message.error(res.data.msg)
          }
        })
      }
    }
  }

</script>

<style scoped>
  .searchInput {
    width: 350px;
  }

</style>
