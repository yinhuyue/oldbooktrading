<template>
  <div>
    <el-breadcrumb separator="/" style="padding-top: 8px; margin-bottom: 15px;">
      <el-breadcrumb-item :to="{ path: '/userbooklist' }">总书籍列表</el-breadcrumb-item>
      <el-breadcrumb-item>{{sortName.coursesort_name}}书籍列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 10px;">
      <el-input @keyup.enter.native='doSearch' v-model="searchInput" placeholder="请输入书籍名称" class="searchInput"
        clearable>
        <el-button @click="doSearch" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="book-list" style="margin-top: 10px;">
      <ul>
        <li v-for="(item,index) in bookListMessageForm.slice((current_page-1)*per_page,current_page*per_page)"
          :key="index" @click="doDetail(item.book_id)">
          <div class="book-img">
            <img class="book-pic" :src="item.book_pic">
          </div>
          <div class="book-msg">
            <div class="msg1">
              <span>{{item.book_name}}</span>
            </div>
            <div class="msg2">
              <span class="msg2-span">作者：{{item.book_author}}</span>
              <span class="msg2-span">原价：{{item.book_oldprice}} 元</span>
              <span class="msg2-span">现价：{{item.book_newprice}} 元</span>
            </div>
            <div class="msg2">
              <span class="msg2-span">出版社：{{item.book_publish}}</span>
              <span class="msg2-span">出版时间：{{item.book_publishtime | fmtDate('YYYY-MM-DD')}}</span>
            </div>
            <div class="msg3">
              <span class="intro">简介：{{item.book_introduce}}</span>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <div class="book-page" style="margin-top: 10px;margin-bottom: 20px;">
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
        // 搜索的数据
        searchInput: '',
        // 分页  当前页数
        current_page: 1,
        // 分页  当前每页显示几条数据
        per_page: 1,
        //总页数
        total: 0,
        // 列表的数据
        bookListMessageForm: [],
        // 控制加载提示的现实与隐藏
        loading: true,
        coursesort_id: 0,
        sortName: []
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
        this.coursesort_id = this.$route.params.coursesort_id
      },
      async loadData() {
        // 数据请求开始
        this.loading = true
        const params = {
          current_page: this.current_page,
          per_page: this.per_page
        }
        const res = await this.$axios.post(`/usercoursesortbooklist?id=${this.coursesort_id}`, {
          params
        })
        this.loading = false
        if (res.data.status === 200) {
          // 表格数据
          this.bookListMessageForm = res.data.data.data
          // 总数据条数
          this.total = res.data.data.total
          this.sortName = res.data.data.data[0]
        } else {
          this.$message.error('获取出售书籍信息列表失败')
        }
      },
      doDetail(book_id) {
        this.$router.push({
          name: 'userbookdetail',
          params: {
            id: book_id
          }
        })
      },
      async doSearch() {
        const params = {
          current_page: this.current_page,
          per_page: this.per_page,
          query: this.searchInput
        }
        const res = await this.$axios.get('userbooklistsearch', {
          params
        })
        if (res.data.status === 200) {
          // 表格数据
          this.bookListMessageForm = res.data.data.data
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
    }
  }

</script>

<style scoped>
  .searchInput {
    width: 450px;
  }

  .book-list>ul>li {
    padding-bottom: 10px;
    border-bottom: 1px solid #000;
    margin-bottom: 10px;
    cursor: pointer;
  }

  .book-img {
    float: left;
    margin-right: 10px;
  }

  .book-img>img {
    width: 120px;
    height: 150px;
  }

  .msg1 {
    font-size: 22px;
    font-weight: bold;
    margin-bottom: 5px;
  }

  .msg2 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 5px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* （希望显示N行-webkit-line-clamp的变为N） */
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  .msg2-span {
    display: inline;
    margin-right: 25px;
  }

  .intro {
    font-size: 16px;
    /* margin-bottom: 10px; */
    display: block;
    height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* （希望显示N行-webkit-line-clamp的变为N） */
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .book-page {
    clear: both;
  }

</style>