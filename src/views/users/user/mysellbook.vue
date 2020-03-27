<template>
  <div>
    <el-breadcrumb separator="">
      <el-breadcrumb-item :to="{ path: '/mysellbook' }">出售书籍</el-breadcrumb-item>
      <el-breadcrumb-item></el-breadcrumb-item>
    </el-breadcrumb> 
    <div style="margin-top: 10px;">
      <el-form label-position="left" :model="bookForm" :rules="bookFormRules" ref="bookFormRef" label-width="110px"
        class="demo-ruleForm">
        <el-row>
          <el-col :span="9">
            <el-form-item label="书籍名称" prop="book_name">
              <el-input v-model="bookForm.book_name" placeholder="请输入书籍名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" style="margin-left: 50px;">
            <el-form-item label="书籍原价" prop="book_oldprice">
              <el-input v-model.number="bookForm.book_oldprice" placeholder="请输入书籍原价，单位为“元”"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item class="item-book-pic" label="书籍封面">
              <!-- action 
              1.必须是全部路径
              2.必须设置token -->
              <el-upload
                action="http://127.0.0.1:8/oldbooktrading/public/index.php/uploadpic"
                :on-remove="handleRemove"
                :on-success="handleSuccess"
                :headers="{'Content-Type':'multipart/form-data'}"
                :file-list="fileList"
                list-type="picture">
                <el-button size="small" type="primary">点击上传</el-button>
              </el-upload>
            </el-form-item>
          </el-col>
          <el-col :span="9" style="margin-left: 50px;">
            <el-form-item label="书籍现价" prop="book_newprice">
              <el-input v-model.number="bookForm.book_newprice" placeholder="请输入书籍现价，单位为“元”"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" style="margin-left: 50px;">
            <el-form-item label="书籍页数" prop="book_pages">
              <el-input v-model.number="bookForm.book_pages" placeholder="请输入书籍页数，单位为“张”"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" style="margin-left: 50px;">
            <el-form-item label="书籍重量" prop="book_weight">
              <el-input v-model.number="bookForm.book_weight" placeholder="请输入书籍重量，单位为“克”"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" style="margin-left: 50px;">
            <el-form-item label="书籍专业分类" prop="majorsort_id">
              <el-select v-model="bookForm.majorsort_id" placeholder="请选择专业分类">
                <el-option label="请选择专业分类" :value="0">
                </el-option>
                <el-option v-for="option in majoroptions" :key="option.majorsort_id" :label="option.majorsort_name"
                  :value="option.majorsort_id" @click.native="majorguodu(bookForm.majorsort_id)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="书籍作者" prop="book_author">
              <el-input v-model="bookForm.book_author" placeholder="请输入书籍作者名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" style="margin-left: 50px;">
            <el-form-item label="书籍学科分类" prop="subjectsort_id">
              <el-select v-model="bookForm.subjectsort_id" placeholder="请选择学科分类">
                <el-option label="请选择学科分类" :value="0">
                </el-option>
                <el-option v-for="option in subjectoptions" :key="option.subjectsort_id"
                  :label="option.subjectsort_name" :value="option.subjectsort_id"
                  @click.native="subjectguodu(bookForm.subjectsort_id)">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="书籍出版社" prop="book_publish">
              <el-input v-model="bookForm.book_publish" placeholder="请输入书籍出版社名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="9" style="margin-left: 50px;">
            <el-form-item label="书籍课程分类" prop="coursesort_id">
              <el-select v-model="bookForm.coursesort_id" placeholder="请选择课程分类">
                <el-option label="请选择课程分类" :value="0">
                </el-option>
                <el-option v-for="option in courseoptions" :key="option.coursesort_id" :label="option.coursesort_name"
                  :value="option.coursesort_id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="9">
            <el-form-item label="书籍出版时间" prop="book_publishtime">
              <el-date-picker v-model="bookForm.book_publishtime" type="date" placeholder="选择书籍出版时间">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="16">
            <el-form-item label="书籍简介" prop="book_introduce">
              <el-input type="textarea" style="height: 100px;" v-model="bookForm.book_introduce" :rows="5"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item style="margin-top: 15px;">
          <el-button type="primary" @click="sellbook">出售书籍</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    data() {
      return {
        bookForm: {
          majorsort_id: '',
          subjectsort_id: '',
          coursesort_id: '',
          book_name: '',
          book_pic: '',
          book_author: '',
          book_publish: '',
          book_publishtime: '',
          book_oldprice: '',
          book_newprice: '',
          book_pages: '',
          book_weight: '',
          book_introduce: ''
        },
        book_pic_name: '',
        // 上传文件的时候，设置请求头中的token
        tokenHeader: {
          token: sessionStorage.getItem('token')
        },
        majoroptions: [],
        subjectoptions: [],
        courseoptions: [],
        bookFormRules: {
          book_name: [{
            required: true,
            message: '请输入书籍名称',
            trigger: 'blur'
          }],
          book_author: [{
            required: true,
            message: '请输入书籍作者',
            trigger: 'blur'
          }],
          book_publish: [{
            required: true,
            message: '请输入书籍出版社',
            trigger: 'blur'
          }],
          book_publishtime: [{
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          book_oldprice: [{
            required: true,
            message: '请输入书籍原价，单位为“元”',
            trigger: 'blur'
          }],
          book_newprice: [{
            required: true,
            message: '请输入书籍现价，单位为“元”',
            trigger: 'blur'
          }],
          book_pages: [{
            required: true,
            message: '请输入书籍页数，单位为“张”',
            trigger: 'blur'
          }],
          book_weight: [{
            required: true,
            message: '请输入书籍重量，单位为“克”',
            trigger: 'blur'
          }],
          book_introduce: [{
            required: true,
            message: '请输入书籍简介',
            trigger: 'blur'
          }],
          majorsort_id: [{
            required: true,
            message: '请选择专业分类',
            trigger: 'change'
          }],
          subjectsort_id: [{
            required: true,
            message: '请选择学科分类',
            trigger: 'change'
          }],
          coursesort_id: [{
            required: true,
            message: '请选择课程分类',
            trigger: 'change'
          }],
        },
        fileList: []
      }
    },
    // // 判断是否登录
    // beforeCreate() {
    //   // 判断sessionStorage中是否有token，如果没有则认为没有登陆
    //   const token = sessionStorage.getItem('token')
      
    //   if (!token) {
    //     // 跳转回登录页面并且要提示
    //     this.$router.push({
    //       name: 'userlogin'
    //     })
    //     this.$message.info('请先登录')
    //   }
    // },
    mounted() {
      this.loadData()
    },
    methods: {
      async loadData() {
        console.log(this.tokenHeader)
        const res = await this.$axios.get('/bookmajorsort')
        if (res.data.status === 200) {
          this.majoroptions = res.data.data.data
        } else {
          this.$message.error('获取专业分类失败')
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
      async sellbook() {
        this.$refs.bookFormRef.validate(async valid => {
          if (!valid) {
            return
          } else {
            const res = await this.$axios.post('/mybookupload', this.bookForm)
            if (res.data.status === 200) {
              this.$message.success('售卖书籍成功')
              this.$router.push({
                name: 'mybooklist'
              })
            } else {
              this.$message.error('售卖书籍失败')
            }
          }
        })
      },
      // 图片上传，产生图片存储的地址
      async uploadPic(params) {
        
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
      handleSuccess(response, file ,fileList){
        console.log(response)
        console.log(file)
        console.log(fileList)
      }

    }
  }

</script>

<style scoped>
  .item-book-pic {
    height: 170px;
  }

</style>
