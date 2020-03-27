<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>待出售书籍管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 10px;">
      <el-input @keyup.enter.native='doSearch' v-model="searchInput" placeholder="请输入出售书籍名称" class="searchInput"
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
        <el-table-column property="book_auditstate" label="审核状态" width="120">
          <template slot-scope="scope">
            <el-tag type="warning" effect="dark" v-if="scope.row.book_auditstate==0">未审核</el-tag>
            <el-tag type="success" effect="dark" v-if="scope.row.book_auditstate==1">审核通过</el-tag>
            <el-tag type="danger" effect="dark" v-if="scope.row.book_auditstate==2">审核未通过</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" @click="showBookAuditStateDialogVisible(scope.row)">审核</el-button>
            <el-button size="mini" type="danger" @click="bookDelete(scope.row.book_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 审核的对话框 -->
    <el-dialog class="box" title="书籍状态审核" :visible.sync="submitBookAuditStateDialogVisible" width="50%">
      <!-- 添加分类的表单 -->
      <el-form label-width="70px">
        <el-form-item label-width="150px" label="选择审核状态">
          <el-select v-model="bookAuditStateForm.book_auditstate">
            <el-option v-for="item in options" :key="item.book_auditstate" :label="item.label" :value="item.book_auditstate">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 对话框底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="changeBookAuditState(bookAuditStateForm.book_auditstate)">确
          定</el-button>
        <el-button @click="submitBookAuditStateDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
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
        submitBookAuditStateDialogVisible: false,
        bookAuditStateForm: {
          book_id: '',
          book_auditstate: ''
        },
        options: [
          // {
          //   value: 3,
          //   label: '请选择审核状态'
          // },
          {
            book_auditstate: 0,
            label: '未审核'
          }, {
            book_auditstate: 1,
            label: '审核通过'
          }, {
            book_auditstate: 2,
            label: '审核未通过'
          }
        ],
        // value: 3,
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
        const res = await this.$axios.get('/booklist', {
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
      //点击按钮，展示审核书籍状态的对话框
      async showBookAuditStateDialogVisible(book) {
        //再展示出对话框
        this.submitBookAuditStateDialogVisible = true
        // this.bookAuditStateForm.book_id = book.book_id
        // this.bookAuditStateForm.value = book.book_auditstate
        this.bookAuditStateForm = book
      },
      async changeBookAuditState(book_auditstate) {
        console.log(book_auditstate)
        const res = await this.$axios.put(`/bookauditstate?book_id=${this.bookAuditStateForm.book_id}&book_auditstate=${book_auditstate}`)
        if (res.data.status === 201) {
          // this.options = res.data.data
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          // 隐藏添加的对话框
          this.submitBookAuditStateDialogVisible = false
          //重新刷新分类列表的数据
          this.loadData()
        } else {
          // 隐藏添加的对话框
          this.submitBookAuditStateDialogVisible = false
          this.$message.error('审核失败')
        }
      },
      // 搜索功能
      async doSearch() {
        const params = {
          current_page: this.current_page,
          per_page: this.per_page,
          query: this.searchInput
        }
        const res = await this.$axios.get('/booksearch', {
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
      async bookDelete(book_id) {
        this.$confirm('是否确定删除该活动', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 删除操作
          const res = await this.$axios.delete(`/bookdelete?book_id=${book_id}`)
          if (res.data.status === 200) {
            // 删除成功
            this.$message.success(res.data.msg)
            this.current_page=1
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
