<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/myshop' }">我的购物车</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/myshopdetail' }">出售书籍详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 15px;">
      <el-form ref="bookDetailRef" v-model="bookDetailMessage" label-width="100px">
        <el-row>
          <el-col :span="6">
            <div class="detail-msg">
              <div class="detail-msg1">
                {{bookDetailMessage.book_name}}
              </div>
              <div class="book-img">
                <img class="book-pic" :src="bookDetailMessage.book_pic">
              </div>
              <div class="detail-btn">
                <el-button type="primary" style="width: 120px" @click="addShop(bookDetailMessage)"
                  v-show="addShopButton">添加购物车</el-button>
                <el-button type="primary" style="width: 120px; margin-right: 10px" @click="deleteShop(bookDetailMessage)"
                  v-show="deleteShopButton">移除购物车</el-button>
              </div>
              <div class="detail-btn">
                <el-button type="primary" style="width: 120px" @click="showAddCommentDialogVisible(bookDetailMessage)">
                  发布评论</el-button>
              </div>
              <div class="detail-btn">
                <el-button type="primary" style="width: 120px">购买书籍</el-button>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail-msg2">
              <div class="detail-msg3">
                作者：{{bookDetailMessage.book_author}}
              </div>
              <div class="detail-msg3">
                出版社：{{bookDetailMessage.book_publish}}
              </div>
              <div class="detail-msg3">
                出版时间：{{bookDetailMessage.book_publishtime | fmtDate('YYYY-MM-DD')}}
              </div>
              <div class="detail-msg3">
                专业分类：{{bookDetailMessage.majorsort_name}}
              </div>
              <div class="detail-msg3">
                学科分类：{{bookDetailMessage.subjectsort_name}}
              </div>
              <div class="detail-msg3">
                课程分类：{{bookDetailMessage.coursesort_name}}
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="detail-msg2">
              <div class="detail-msg3">
                出售人：{{bookDetailMessage.user_name}}
              </div>
              <div class="detail-msg3">
                原价：{{bookDetailMessage.book_oldprice}} 元
              </div>
              <div class="detail-msg3">
                现价：{{bookDetailMessage.book_newprice}} 元
              </div>
              <div class="detail-msg3">
                页数：{{bookDetailMessage.book_pages}} 张
              </div>
              <div class="detail-msg3">
                重量：{{bookDetailMessage.book_weight}} 克(g)
              </div>
              <div class="detail-msg3">
                审核状态：
                <el-tag type="success" effect="dark" v-if="bookDetailMessage.book_auditstate==1">审核通过</el-tag>
              </div>
            </div>
          </el-col>
          <el-col :span="16">
            <div class="detail-msg-intro">
              简介：{{bookDetailMessage.book_introduce}}
            </div>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div style="margin-top: 10px;">
      <el-table ref="singleTable"
        :data="bookDetailCommentMessage.slice((current_page-1)*per_page,current_page*per_page)" style="width: 100%"
        border stripe>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column property="book_name" label="评论书籍" width="140">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" property="comment_content" label="评论内容" width="470">
        </el-table-column>
        <el-table-column property="user_name" label="评论人" width="155">
        </el-table-column>
        <el-table-column property="comment_createtime" label="评论时间" width="200">
        </el-table-column>
      </el-table>
    </div>
    <div class="book-page" style="margin-top: 10px;margin-bottom: 40px;">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="current_page"
        :page-sizes="[1, 2, 5, 10, 20]" :page-size="per_page" layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <!-- 发布评论 -->
    <el-dialog title="发布评论" :visible.sync="addCommentDialogVisible">
      <el-form :model="addCommentForm" :rules="addCommentRules" ref="addCommentRef" label-width="100px">
        <el-form-item label="评论书籍">
          <el-input v-model="addCommentForm.book_name" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="评论内容" prop="comment_content">
          <el-input type="textarea" :rows="5" v-model="addCommentForm.comment_content" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addComment">确 定</el-button>
        <el-button @click="addCommentDialogVisible = false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 分页  当前页数
        current_page: 1,
        // 分页  当前每页显示几条数据
        per_page: 10,
        //总页数
        total: 0,
        // 书籍信息
        bookDetailMessage: {},
        // 书籍评论信息
        bookDetailCommentMessage: [],
        // 控制加载提示的现实与隐藏
        loading: true,
        book_id: '',
        addCommentDialogVisible: false,
        addCommentForm: {
          user_id: 0,
          book_id: 0,
          book_name: '',
          comment_content: ''
        },
        addCommentRules: {
          comment_content: [{
              required: true,
              message: '请输入评论内容',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 250,
              message: '评论内容长度在 1 到 250 个字',
              trigger: 'blur'
            }
          ],
        },
        addShopForm: {
          user_id: 0,
          book_id: 0,
          shop_state: 0
        },
        addShopButton: false,
        deleteShopButton: false
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
    mounted() {
      this.getId()
      this.loadData()
    },
    watch: {
      '$route': ['getId', 'loadData']
    },
    methods: {
      getId() {
        this.book_id = this.$root.$route.params.id
        console.log(this.book_id)
      },
      async loadData() {
        // 数据请求开始
        this.loading = true
        const params = {
          current_page: this.current_page,
          per_page: this.per_page
        }
        const res = await this.$axios.post(`/userbookdetail?id=${this.book_id}`)
        const res2 = await this.$axios.post(`/userbookdetailcomment?id=${this.book_id}`, {
          params
        })
        const userID = sessionStorage.getItem('data')
        const res3 = await this.$axios.post(`/getshop?user_id=${userID}&book_id=${this.book_id}`)
        this.loading = false
        if (res.data.status === 200) {
          this.bookDetailMessage = res.data.data
          console.log(this.bookDetailMessage)
        } else {
          this.$message.error(res.data.msg)
        }
        if (res2.data.status === 200) {
          this.bookDetailCommentMessage = res2.data.data.data
          this.total = res2.data.data.total
        } else {
          this.$message.error(res2.data.msg)
        }
        if (res3.data.status === 200) {
          this.addShopButton = false
          this.deleteShopButton = true
        } else {
          this.addShopButton = true
        }
      },
      async addShop(bookDetailMessage) {
        this.addShopForm = bookDetailMessage
        const userID = sessionStorage.getItem('data')
        this.addShopForm.user_id = userID
        const res = await this.$axios.post('/addshop', this.addShopForm)
        if (res.data.status === 200) {
          this.$message({
            type: 'success',
            message: res.data.msg
          })
          this.addShopButton = false
          this.deleteShopButton = true
        } else {
          this.$message({
            type: 'error',
            message: res.data.msg
          })
        }
      },
      async deleteShop(bookDetailMessage) {
        this.$confirm('是否确定将此书籍移除购物车', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
        // 删除操作
        const bookID = this.bookDetailMessage.book_id
        const userID = sessionStorage.getItem('data')
        const res = await this.$axios.delete(`/deleteshop?user_id=${userID}&book_id=${bookID}`)
        if (res.data.status === 200) {
          // 删除成功
          this.$message.warning(res.data.msg)
          this.addShopButton = true
          this.deleteShopButton = false
        } else {
          // 删除失败
          this.$message.error(res.data.msg)
        }
        })
      },
      showAddCommentDialogVisible(bookDetailMessage) {
        this.addCommentDialogVisible = true
        this.addCommentForm = bookDetailMessage
      },
      async addComment() {
        // 验证表单
        this.$refs.addCommentRef.validate(async (valid) => {
          // 验证失败
          if (!valid) {
            this.$message.error('请输入活动内容')
            return
          } else {
            const userID = sessionStorage.getItem('data')
            this.addCommentForm.user_id = userID
            const res = await this.$axios.post('/useraddcomment', this.addCommentForm)
            if (res.data.status === 200) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              // 重新加载数据
              this.loadData()
              this.addCommentDialogVisible = false
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
    }
  }

</script>

<style scoped>
  .detail-msg1 {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    margin-top: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* （希望显示N行-webkit-line-clamp的变为N） */
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .book-img {
    display: block;
    width: 90%;
    margin-top: 10px;
    padding-left: 20px;
  }

  .book-img img {
    width: 100%;
    height: 250px;
  }

  .detail-btn {
    margin-top: 15px;
    text-align: center;
    display: block;
  }

  .detail-msg2 {
    font-size: 18px;
    margin-top: 50px;
    margin-left: 30px;
  }

  .detail-msg3 {
    margin-top: 25px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* （希望显示N行-webkit-line-clamp的变为N） */
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .detail-msg-intro {
    font-size: 14px;
    margin-top: 25px;
    margin-left: 30px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* （希望显示N行-webkit-line-clamp的变为N） */
    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
  }

  .comment-list {
    width: 100%;
    font-size: 18px;
    border: 1px solid #000;
  }

  .comment-list-title {
    margin-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    border-bottom: 1px solid #000;
  }

  .comment-list-user {
    margin-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
    border-bottom: 1px solid #000;
  }

  .comment-list-content {
    margin-top: 10px;
    padding-bottom: 5px;
    padding-left: 15px;
    padding-right: 15px;
    border-bottom: 1px solid #000;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: break-word;
    white-space: normal !important;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
  }

  .comment-list-time {
    margin-top: 10px;
    padding-bottom: 10px;
    padding-left: 15px;
  }

</style>
