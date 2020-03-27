<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/mycomment'}">我的评论</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 10px;">
      <el-input @keyup.enter.native='doSearch' v-model="searchInput" placeholder="请输入评论书籍名称" class="searchInput"
        clearable>
        <el-button @click="doSearch" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div style="margin-top: 10px;">
      <el-table ref="singleTable" :data="tableData.slice((current_page-1)*per_page,current_page*per_page)" style="width: 100%" border stripe>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column property="book_name" label="评论书名" width="120">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true"  property="comment_content" label="评论内容" width="450">
        </el-table-column>
        <el-table-column property="user_name" label="评论人" width="120">
        </el-table-column>
        <el-table-column property="comment_createtime" label="评论时间" width="180">
        </el-table-column>
        <el-table-column property="comment_state" label="评论审核状态" width="120">
          <template slot-scope="scope">
            <el-tag type="success" effect="dark" v-if="scope.row.comment_state==0">已发布</el-tag>
            <el-tag type="error" effect="dark" v-if="scope.row.comment_state==1">被禁止</el-tag>
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="160">
          <template slot-scope="scope">
              <el-button size="mini" @click="showMyCommentDialogVisible(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger"  @click="commentDelete(scope.row.comment_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div style="margin-top: 10px;">
      <!-- <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination> -->
      <el-pagination 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :current-page="current_page"
      :page-sizes="[2, 5, 10, 20]" 
      :page-size="per_page" 
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    </div>
    <!-- 修改用户信息的对话框 -->
    <el-dialog title="评论修改" :visible.sync="updateMyCommentDialogVisible">
      <el-form :rules="updateMyCommentRules" ref="updateMyCommentRef" :model="updateMyCommentFormData"
        label-position="left" label-width="120px">
        <el-form-item label="评论书籍">
          {{updateMyCommentFormData.book_name}}
        </el-form-item>
        <el-form-item label="评论内容" prop="comment_content">
          <el-input type="textarea" :rows="5" v-model="updateMyCommentFormData.comment_content"></el-input>
        </el-form-item>
        <el-form-item label="评论人">
          {{updateMyCommentFormData.user_name}}
        </el-form-item>
        <el-form-item label="评论时间">
          {{updateMyCommentFormData.comment_createtime | fmtDate('YYYY-MM-DD HH:mm:ss')}}
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateMyCommentDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateMyComment">确 定</el-button>
      </div>
    </el-dialog>
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
        updateMyCommentDialogVisible: false,
        updateMyCommentFormData: {
          comment_id: 0,
          user_id: 0,
          book_name: '',
          user_name: '',
          comment_content: '',
          comment_state: 0
        },
        updateMyCommentRules: {
          comment_content: [{
              required: true,
              message: '请输入评论内容',
              trigger: 'blur'
            }
          ]
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
    created() {
      this.loadData()
    },
    methods: {
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
      async loadData() {
        // 数据请求开始
        this.loading = true
        const params = {
          current_page: this.current_page,
          per_page: this.per_page
        }
        const userID = sessionStorage.getItem('data')
        const res = await this.$axios.post(`/mycommentlist?user_id=${userID}`, {
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
          query: this.searchInput
        }
        const userID = sessionStorage.getItem('data')
        const res = await this.$axios.get(`/mycommentsearch?user_id=${userID}`, {
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
      showMyCommentDialogVisible(mycomment) {
        this.updateMyCommentDialogVisible = true
        this.updateMyCommentFormData = mycomment
        console.log(mycomment)
      },
      //修改活动信息
      async updateMyComment() {
        // 验证表单
        this.$refs.updateMyCommentRef.validate(async (valid) => {
          // 验证失败
          if (!valid) {
            this.$message.error('请完善内容')
            return
          } else {
            // const userID = sessionStorage.getItem('data')
            const res = await this.$axios.put('/mycommentupdate', this.updateMyCommentFormData)
            if (res.data.status === 200) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              // 重新加载数据
              this.loadData()
              this.updateMyCommentDialogVisible = false
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
              // 重新加载数据
              this.loadData()
            }
          }
        })
      },
      // 根据id删除活动
      async commentDelete(comment_id) {
        this.$confirm('是否确定删除该活动', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 删除操作
          const userID = sessionStorage.getItem('data')
          const res = await this.$axios.delete(`/mycommentdelete?user_id=${userID}&comment_id=${comment_id}`)
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
