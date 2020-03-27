<template>
  <div>
    <el-breadcrumb separator="">
      <el-breadcrumb-item :to="{ path: '/list' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍分类列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 10px;">
      <el-input @keyup.enter.native='doSearch' v-model="searchInput" placeholder="请输入书籍名称" class="searchInput"
        clearable>
        <el-button @click="doSearch" slot="append" icon="el-icon-search"></el-button>
      </el-input>
    </div>
    <div class="book-list" style="margin-top: 10px;">
      <ul>
        <li v-for="item in bookListMessageForm.slice((current_page-1)*per_page,current_page*per_page)"
          :key="item.book_id">
          <div class="book-img">
            <img src="../../../assets/img/1.jpg" @click="doBookDetail(item.book_id)">
          </div>
          <div class="book-msg">
            <div class="msg1">
              <span>{{item.book_name}}</span>
            </div>
            <div class="msg2">
              <span class="msg2-span">作者：{{item.book_author}}</span>
              <span class="msg2-span">出版社：{{item.book_publish}}</span>
              <span class="msg2-span">出版时间：{{item.book_publishtime | fmtDate('YYYY-MM-DD')}}</span>
              <span class="msg2-span">总页数：{{item.book_pages}}页</span>
              <span class="msg2-span">总重量：{{item.book_weight}}克(g)</span>
            </div>
            <div class="msg3">
              <span class="intro">简介：{{item.book_introduce}}</span>
            </div>
            <div class="msg4">
              <span class="price">现价：55元</span>
              <span class="price">原价：102元</span>
              <button>添加购物车</button>
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
        book_sort_id: 0,
        // book_sort_id2: 0
      }
    },
    mounted() {
      //   this.loadData(this.$route.params.id)
      this.getId()
      this.loadData()
    },
    watch: {
      '$route': ['getId','loadData']
    },
    methods: {
      getId() {
        this.book_sort_id = this.$route.params.id
      },
      // async loadData() {
      //   // 数据请求开始
      //   this.loading = true
      //   const params = {
      //     current_page: this.current_page,
      //     per_page: this.per_page
      //   }
      //   const res = await this.$axios.post(`/userbookmajorsortlist?id=${this.book_sort_id}`, {
      //     params
      //   })
      //   const res2 = await this.$axios.post(`/userbooksubjectsortlist?id=${this.book_sort_id2}`, {
      //     params
      //   })
      //   const res3 = await this.$axios.post(`/userbooksoursesortlist?id=${this.book_coursesort_id}`, {
      //     params
      //   })
      //   this.loading = false
      //   if (res.data.status === 200) {
      //     // 表格数据
      //     this.bookListMessageForm = res.data.data.data
      //     // 总数据条数
      //     this.total = res.data.data.total
      //   } else if(res2.data.status === 201) {
      //     // 表格数据
      //     this.bookListMessageForm = res2.data.data.data
      //     // 总数据条数
      //     this.total = res2.data.data.total
      //   } else if(res3.data.status === 200) {
      //     // 表格数据
      //     this.bookListMessageForm = res3.data.data.data
      //     // 总数据条数
      //     this.total = res3.data.data.total
      //   }
      //   else {
      //     this.$message.error('获取出售书籍信息列表失败')
      //   }
      // },
      async loadData() {
        // 数据请求开始
        this.loading = true
        const params = {
          current_page: this.current_page,
          per_page: this.per_page
        }
        const res = await this.$axios.post(`/userbooksortlist?id=${this.book_sort_id}`, {
          params
        })
        this.loading = false
        if (res.data.status === 200) {
          // 表格数据
          this.bookListMessageForm = res.data.data.data
          // 总数据条数
          this.total = res.data.data.total
        } else {
          this.$message.error('获取出售书籍信息列表失败')
        }
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
      doBookDetail(book_id) {
          this.$router.push({
            name: 'detail',
            params: {
              id: book_id
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
  .searchInput {
    width: 350px;
  }

  .book-list ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  .book-list>ul>li {
    padding-bottom: 30px;
    border-bottom: 1px solid #000;
    margin-bottom: 10px;
  }

  .book-img {
    float: left;
    margin-right: 10px;
  }

  .book-img>img {
    width: 120px;
    height: 140px;
  }

  .msg1 {
    font-size: 18px;
    font-weight: bold;
    padding-top: 5px;
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
    /* display: inline; */
    margin-right: 15px;
  }

  .msg3 {
    font-size: 16px;
    margin-bottom: 10px;
  }

  .intro {
    display: block;
    height: 60px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* （希望显示N行-webkit-line-clamp的变为N） */
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }

  .msg4 {
    font-size: 16px;
    font-weight: bold;
    float: right;
    margin-right: 20px;
  }

  .price {
    display: initial;
    margin-right: 40px;
  }

  .book-page {
    clear: both;
  }

</style>
