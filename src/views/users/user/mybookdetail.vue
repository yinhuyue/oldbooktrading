<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/mybooklist' }">出售书籍信息列表</el-breadcrumb-item>
      <el-breadcrumb-item>出售书籍信息详情</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="content">
      <el-form ref="bookDetailRef" :model="tableData" label-width="100px">
        <el-row>
          <el-col :span="8">
            <el-form-item class="content-infor" label="书籍名称:">
              {{tableData.book_name}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="content-infor" label="书籍作者:">
              {{tableData.book_author}}
            </el-form-item>
          </el-col>
          <!-- <el-col :span="8">
            <el-form-item class="content-infor" label="书籍出售人:">
              {{tableData.user_name}}
            </el-form-item>
          </el-col> -->
          <el-col :span="8">
            <el-form-item class="content-infor" label="书籍出版社:">
              {{tableData.book_publish}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="content-infor" label="书籍封面:">
              <img class="book-pic" src="../../../assets/img/1.jpg">
              <!-- <img :src="tableData.book_pic"> -->
              <!-- {{tableData.book_pic}} -->
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="content-infor" label="书籍专业分类:">
              {{tableData.majorsort_name}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="content-infor" label="书籍出版时间:">
              {{tableData.book_publishtime | fmtDate('YYYY-MM-DD')}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="content-infor" label="书籍学科分类:">
              {{tableData.subjectsort_name}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="content-infor" label="书籍原价:">
              {{tableData.book_oldprice}} 元
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="content-infor" label="书籍课程分类:">
              {{tableData.coursesort_name}}
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="content-infor" label="书籍现价:">
              {{tableData.book_newprice}} 元
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="content-infor" label="书籍页数:">
              {{tableData.book_pages}} 页
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="content-infor" label="书籍重量:">
              {{tableData.book_weight}} 克 (g)
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="content-infor" label="书籍审核状态:">
              <el-tag type="warning" effect="dark" v-if="tableData.book_auditstate==0">未审核</el-tag>
              <el-tag type="success" effect="dark" v-if="tableData.book_auditstate==1">审核通过</el-tag>
              <el-tag type="danger" effect="dark" v-if="tableData.book_auditstate==2">审核未通过</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item class="content-infor" label="书籍审核状态:">
              <el-tag type="success" effect="dark" v-if="tableData.book_sellstate==0">未出售</el-tag>
              <el-tag type="warning" effect="dark" v-if="tableData.book_sellstate==1">已出售</el-tag>
            </el-form-item>
          </el-col>
          <el-col :span="18">
            <el-form-item class="content-infor" label="书籍简介:">
              {{tableData.book_introduce}}
            </el-form-item>
          </el-col>
        </el-row>
        <el-button style="margin-left: 80px;" type="primary" @click="showBookDetailDialogVisible(tableData)">
          修改信息
        </el-button>
      </el-form>
    </div>
    <!-- 修改出售书籍信息的对话框 -->
    <el-dialog title="出售书籍信息修改" :visible.sync="updateBookDetailDialogVisible">
      <el-form :rules="updateBookDetailRules" ref="updateUserInforRef" :model="updateBookDetailFormData"
        label-width="120px">
        <el-row>
          <el-col :span="10">
            <el-form-item label="书籍名称" prop="book_name">
              <el-input v-model="updateBookDetailFormData.book_name" autocomplete="off">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="书籍作者" prop="book_author">
              <el-input v-model="updateBookDetailFormData.book_author" autocomplete="off">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="书籍作者" prop="book_pic">
              <el-upload action="http://127.0.0.1:8/oldbooktrading/public/index.php/uploadpic" :on-remove="handleRemove"
                :on-success="handleSuccess" :headers="{'Content-Type':'multipart/form-data'}" :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="书籍出版社" prop="book_publish">
              <el-input v-model="updateBookDetailFormData.book_publish" autocomplete="off">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="书籍出版时间" prop="book_name">
              <el-date-picker type="date" placeholder="选择活动日期" value-format="yyyy-MM-dd"
                v-model="updateBookDetailFormData.book_publishtime"  style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="书籍现价" prop="book_oldprice">
              <el-input v-model="updateBookDetailFormData.book_oldprice" autocomplete="off">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="书籍专业分类" prop="majorsort_name">
              <el-select v-model="updateBookDetailFormData.majorsort_id" label-width="100px">
                <el-option v-for="option in majoroptions" :key="option.majorsort_id" :label="option.majorsort_name"
                  :value="option.majorsort_id" @click.native="majorguodu(updateBookDetailFormData.majorsort_id)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="书籍原价" prop="book_newprice">
              <el-input v-model="updateBookDetailFormData.book_newprice" autocomplete="off">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="书籍学科分类" prop="subjectsort_name">
              <el-select v-model="updateBookDetailFormData.subjectsort_name" label-width="100px">
                <el-option v-for="option in subjectoptions" :key="option.subjectsort_id"
                  :label="option.subjectsort_name" :value="option.subjectsort_id"
                  @click.native="subjectguodu(updateBookDetailFormData.subjectsort_id)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="书籍页数" prop="book_pages">
              <el-input v-model="updateBookDetailFormData.book_pages" autocomplete="off">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="书籍课程分类" prop="book_author">
              <el-select v-model="updateBookDetailFormData.coursesort_name" label-width="100px">
                <el-option v-for="option in courseoptions" :key="option.coursesort_id" :label="option.coursesort_name"
                  :value="option.coursesort_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item label="书籍重量" prop="book_weight">
              <el-input v-model="updateBookDetailFormData.book_weight" autocomplete="off">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateBookDetailDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateBookDetail">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: {},
        // 控制加载提示的现实与隐藏
        loading: true,
        majoroptions: [],
        subjectoptions: [],
        courseoptions: [],
        updateBookDetailDialogVisible: false,
        updateBookDetailFormData: {

        },
        updateBookDetailRules: {
          book_name: [{
            required: true,
            message: '请书籍名称',
            trigger: 'blur'
          }]
        },
        fileList: [{
          name: '1.png',
          url: 'http://127.0.0.1:8/oldbooktrading/public/index.php/public/uploads/1.png'
        }],
        book_id: ''
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
      },
      async loadData() {
        // 数据请求开始
        this.loading = true
        // console.log(book_id)
        const res = await this.$axios.post(`mybookdetail?book_id=${this.book_id}`)
        // 数据请求已经结束
        this.loading = false
        if (res.data.status === 200) {
          this.tableData = res.data.data
        } else {
          this.$message.error('获取出售书籍信息详情失败')
        }
      },
      async showBookDetailDialogVisible(book) {
        const sellstate = book.book_sellstate
        if (sellstate === 1) {
          this.$message.warning('出售书籍信息修改失败，书籍已售卖')
        } else {
          this.updateBookDetailDialogVisible = true
          const book_id = book.book_id
          // 数据请求开始
          this.loading = true
          const res = await this.$axios.post(`mybookdetail?book_id=${book_id}`)

          const res2 = await this.$axios.get('/majorsortlist')
          this.majoroptions = res2.data.data.data

          // 数据请求已经结束
          this.loading = false
          if (res.data.status === 200) {
            this.updateBookDetailFormData = res.data.data
          } else {
            this.$message.error('获取出售书籍信息详情失败')
          }
        }
      },
      async majorguodu(majorsort_id) {
        const res = await this.$axios.post(`/majorsortguodu?majorsort_id=${majorsort_id}`)
        if (res.data.status === 201) {
          this.subjectoptions = res.data.data
        } else {
          this.$message.error('获取学科分类失败')
        }
      },
      async subjectguodu(subjectsort_id) {
        const res = await this.$axios.post(`/subjectsortguodu?subjectsort_id=${subjectsort_id}`)
        if (res.data.status === 201) {
          this.courseoptions = res.data.data
        } else {
          this.$message.error('获取课程分类失败')
        }
      },
      async updateBookDetail() {
        const res = await this.$axios.put('/mybookdetailupdate', this.updateBookDetailFormData)
        if (res.data.status === 200) {

        }
      },
      // 图片上传事件
      // 图片的移除
      handleRemove(file, fileList) {
        // file.response服务器返回的响应
        // file.response.data.tmp_path
        console.log(file)
        console.log(fileList)
      },
      // 图片上传成功
      handleSuccess(response, file, fileList) {
        console.log(response)
        console.log(file)
        console.log(fileList)
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
    font-size: 30px;
  }

  .book-pic {
    width: 60%;
  }

</style>
