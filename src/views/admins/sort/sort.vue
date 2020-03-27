<template>
  <div class="continer">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>书籍分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div>
      <el-tabs v-model="majorName" @tab-click="handleClick" style="margin-top: 10px;">
        <el-tab-pane label="课程分类" name="majorsort">
          <div>
            <el-input @keyup.enter.native="doCourseSearch" placeholder="请输入课程分类名称" v-model="courseSearch"
              class="searchInput" clearable>
              <el-button @click="doCourseSearch" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button style="margin-left: 10px;" type="primary" @click="showCourseDialogVisible">添加课程分类</el-button>
          </div>
          <el-table ref="singleTable" :data="tableData.slice((current_page-1)*per_page,current_page*per_page)"
            style="width: 100%; margin-top: 10px;" border stripe>
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column property="majorsort_name" label="专业分类" width="320">
            </el-table-column>
            <el-table-column property="subjectsort_name" label="学科分类" width="320">
            </el-table-column>
            <el-table-column property="coursesort_name" label="课程分类" width="330">
            </el-table-column>
            <el-table-column label="操作" width="205" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="updateCourseDialogVisible(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="courseSortDelete(scope.row.coursesort_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 10px;">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
              :current-page="current_page" :page-sizes="[1, 2, 5, 10, 20]" :page-size="per_page"
              layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="学科分类" name="subjectsort">
          <div>
            <el-input @keyup.enter.native="doSubjectSearch" placeholder="请输入学科分类名称" v-model="subjectSearch"
              class="searchInput" clearable>
              <el-button @click="doSubjectSearch" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button style="margin-left: 10px;" type="primary" @click="showSubjectDialogVisible">添加学科分类</el-button>
          </div>
          <el-table ref="singleTable" :data="tableData2.slice((current_page2-1)*per_page2,current_page2*per_page2)"
            style="width: 100%; margin-top: 10px;" border stripe>
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column property="majorsort_name" label="专业分类" width="485">
            </el-table-column>
            <el-table-column property="subjectsort_name" label="学科分类" width="485">
            </el-table-column>
            <el-table-column label="操作" width="205" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="updateSubjectDialogVisible(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="subjectSortDelete(scope.row.subjectsort_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 10px;">
            <el-pagination @size-change="handleSizeChange2" @current-change="handleCurrentChange2"
              :current-page="current_page2" :page-sizes="[1, 2, 5, 10, 20]" :page-size="per_page2"
              layout="total, sizes, prev, pager, next, jumper" :total="total2">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="专业分类" name="coursesort">
          <div>
            <el-input @keyup.enter.native="doMajorSearch" placeholder="请输入专业分类名称" v-model="majorSearch"
              class="searchInput" clearable>
              <el-button @click="doMajorSearch" slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button style="margin-left: 10px;" type="primary" @click="addMajorDialogVisible = true">添加专业分类
            </el-button>
          </div>
          <el-table ref="singleTable" :data="tableData3.slice((current_page3-1)*per_page3,current_page3*per_page3)"
            style="width: 100%; margin-top: 10px;" border stripe>
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column property="majorsort_name" label="专业分类" width="780">
            </el-table-column>
            <el-table-column label="操作" width="400" fixed="right">
              <template slot-scope="scope">
                <el-button size="mini" @click="showMajorDialogVisible(scope.row)">编辑</el-button>
                <el-button size="mini" type="danger" @click="majorSortDelete(scope.row.majorsort_id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div style="margin-top: 10px;">
            <el-pagination @size-change="handleSizeChange3" @current-change="handleCurrentChange3"
              :current-page="current_page3" :page-sizes="[1, 2, 5, 10, 20]" :page-size="per_page3"
              layout="total, sizes, prev, pager, next, jumper" :total="total3">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <!-- 专业分类修改对话框 -->
    <el-dialog title="专业分类修改" :visible.sync="majorDialogFormVisible">
      <el-form :model="majorForm" ref="updateMajorRef" :rules="updateMajorFormRules">
        <el-form-item label="专业分类" prop="majorsort_name" label-width="100px">
          <el-input v-model="majorForm.majorsort_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="majorDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateMajor">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 学科分类修改对话框 -->
    <el-dialog title="学科分类修改" :visible.sync="subjectDialogFormVisible">
      <el-form :model="subjectForm" ref="updateSubjectRef" :rules="updateSubjectFormRules">
        <el-form-item label="专业分类" style="padding-left: 30px;">
          <el-select v-model="subjectForm.majorsort_id" label-width="100px">
            <el-option v-for="option in options" :key="option.majorsort_id" :label="option.majorsort_name"
              :value="option.majorsort_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学科分类" prop="subjectsort_name" label-width="100px">
          <el-input v-model="subjectForm.subjectsort_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="subjectDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateSubject">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 课程分类修改对话框 -->
    <el-dialog title="课程分类修改" :visible.sync="courseDialogFormVisible">
      <el-form :model="courseForm" ref="updateCourseRef" :rules="updateCourseFormRules">
        <el-form-item label="专业分类" style="padding-left: 30px;">
          <el-select v-model="courseForm.majorsort_id" label-width="100px">
            <el-option v-for="option in options" :key="option.majorsort_id" :label="option.majorsort_name"
              :value="option.majorsort_id" @click.native="guodu(courseForm.majorsort_id)">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学科分类" style="padding-left: 30px;">
          <el-select v-model="courseForm.subjectsort_id" label-width="100px">
            <el-option v-for="option in optionss" :key="option.subjectsort_id" :label="option.subjectsort_name"
              :value="option.subjectsort_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程分类" prop="coursesort_name" label-width="100px">
          <el-input v-model="courseForm.coursesort_name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="courseDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateCourse">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加专业分类的对话框 -->
    <el-dialog class="box" title="添加专业分类" :visible.sync="addMajorDialogVisible" width="50%"
      @close="addMajorDialogClose">
      <!-- 内容主题区域 -->
      <el-form :model="addMajorForm" :rules="addMajorFormRules" ref="addMajorFormRef" label-width="70px">
        <el-form-item label="专业分类名称" label-width="150px" prop="majorsort_name">
          <el-input v-model="addMajorForm.majorsort_name" clearable></el-input>
        </el-form-item>
      </el-form>
      <!-- 对话框底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addMajor">确 定</el-button>
        <el-button @click="addMajorDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 添加学科分类的对话框 -->
    <el-dialog class="box" title="添加学科分类" :visible.sync="addSubjectDialogVisible" width="50%"
      @close="addSubjectDialogClose">
      <!-- 添加分类的表单 -->
      <el-form :model="addSubjectForm" :rules="addSubjectFormRules" ref="addSubjectFormRef" label-width="70px">
        <el-form-item label-width="150px" label="选择专业分类">
          <el-select v-model="addSubjectForm.majorsort_id">
            <el-option label="请选择专业分类" :value="-1">
            </el-option>
            <el-option v-for="option in options" :key="option.majorsort_id" :label="option.majorsort_name"
              :value="option.majorsort_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="专业分类名称" label-width="150px" prop="subjectsort_name">
          <el-input v-model="addSubjectForm.subjectsort_name" clearable></el-input>
        </el-form-item>
      </el-form>
      <!-- 对话框底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addSubjectSort">确 定</el-button>
        <el-button @click="addSubjectDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>
    <!-- 添加课程分类的对话框 -->
    <el-dialog class="box" title="添加课程分类" :visible.sync="addCourseDialogVisible" width="50%"
      @close="addCourseDialogClose">
      <!-- 添加分类的表单 -->
      <el-form :model="addCourseForm" :rules="addCourseFormRules" ref="addCourseFormRef" label-width="70px">
        <el-form-item label-width="150px" label="选择专业分类">
          <el-select v-model="addCourseForm.majorsort_id">
            <el-option label="请选择专业分类" :value="-1">
            </el-option>
            <el-option v-for="option in options" :key="option.majorsort_id" :label="option.majorsort_name"
              :value="option.majorsort_id" @click.native="guodu(addCourseForm.majorsort_id)">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item>
          <div class="parent-btn" style="margin-bottom: 10px;">
            <div class="btn">
              <el-button type="primary" @click="guodu(addCourseForm.majorsort_id)">确 定</el-button>
              <el-button @click="addCourseDialogVisible = false">取 消</el-button>
            </div>
          </div>
        </el-form-item> -->
        <el-form-item>
        </el-form-item>
        <el-form-item label-width="150px" label="选择学科分类">
          <el-select v-model="addCourseForm.subjectsort_id">
            <el-option label="请选择学科分类" :value="-1">
            </el-option>
            <el-option v-for="option in optionss" :key="option.subjectsort_id" :label="option.subjectsort_name"
              :value="option.subjectsort_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程分类名称" label-width="150px" prop="coursesort_name">
          <el-input v-model="addCourseForm.coursesort_name" clearable></el-input>
        </el-form-item>
      </el-form>
      <!-- 对话框底部按钮区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addCourseSort">确 定</el-button>
        <el-button @click="addCourseDialogVisible = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    data() {
      return {
        tableData: [],
        courseSearch: '',
        // 分页  当前页数
        current_page: 1,
        // 分页  当前每页显示几条数据
        per_page: 10,
        //总页数
        total: 0,
        tableData2: [],
        subjectSearch: '',
        // 分页  当前页数
        current_page2: 1,
        // 分页  当前每页显示几条数据
        per_page2: 10,
        //总页数
        total2: 0,
        tableData3: [],
        majorSearch: '',
        // 分页  当前页数
        current_page3: 1,
        // 分页  当前每页显示几条数据
        per_page3: 10,
        //总页数
        total3: 0,
        // 控制添加专业分类的对话框的显示与隐藏
        addMajorDialogVisible: false,
        // 添加专业分类的表单数据
        addMajorForm: {
          majorsort_name: ''
        },
        // 添加专业表单的验证规则对象
        addMajorFormRules: {
          majorsort_name: [{
            required: true,
            message: '请输入专业分类名称',
            trigger: 'blur'
          }]
        },
        // 控制添加学科分类的对话框的显示与隐藏
        addSubjectDialogVisible: false,
        // 添加专业分类的表单数据
        addSubjectForm: {
          majorsort_id: -1,
          majorsort_name: '',
          subjectsort_name: '',
        },
        // 添加学科分类表单的验证规则对象
        addSubjectFormRules: {
          subjectsort_name: [{
            required: true,
            message: '请输入学科分类名称',
            trigger: 'blur'
          }]
        },
        // 存储所有专业分类
        options: [],
        // 控制添加学科分类的对话框的显示与隐藏
        addCourseDialogVisible: false,
        // 添加专业分类的表单数据
        addCourseForm: {
          majorsort_id: -1,
          majorsort_name: '',
          subjectsort_id: -1,
          subjectsort_name: '',
          coursesort_name: '',
        },
        // 添加学科分类表单的验证规则对象
        addCourseFormRules: {
          coursesort_name: [{
            required: true,
            message: '请输入课程分类名称',
            trigger: 'blur'
          }]
        },
        // 存储所有专业分类
        optionss: [],
        // 控制加载提示的现实与隐藏
        loading: true,
        majorName: 'majorsort',
        majorDialogFormVisible: false,
        majorForm: {
          majorsort_id: 0,
          majorsort_name: ''
        },
        updateMajorFormRules: {
          majorsort_name: [{
            required: true,
            message: '请输入专业分类名称',
            trigger: 'blur'
          }]
        },
        subjectDialogFormVisible: false,
        subjectForm: {
          majorsort_id: 0,
          subjectsort_id: 0,
          subjectsort_name: ''
        },
        updateSubjectFormRules: {
          subjectsort_name: [{
            required: true,
            message: '请输入学科分类名称',
            trigger: 'blur'
          }]
        },
        courseDialogFormVisible: false,
        courseForm: {
          majorsort_id: 0,
          subjectsort_id: 0,
          coursesort_id: 0,
          coursesort_name: ''
        },
        updateCourseFormRules: {
          coursesort_name: [{
            required: true,
            message: '请输入学科分类名称',
            trigger: 'blur'
          }]
        },
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
        const params2 = {
          current_page: this.current_page2,
          per_page: this.per_page2
        }
        const params3 = {
          current_page: this.current_page3,
          per_page: this.per_page3
        }
        const res = await this.$axios.get('/coursesortlist', {
          params
        })
        const res2 = await this.$axios.get('/subjectsortlist', {
          params2
        })
        const res3 = await this.$axios.get('/majorsortlist', {
          params3
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

        if (res2.data.status === 200) {
          // 表格数据
          this.tableData2 = res2.data.data.data
          // 总数据条数
          this.total2 = res2.data.data.total
        } else {
          this.$message.error('获取数据失败')
        }

        if (res3.data.status === 200) {
          // 表格数据
          this.tableData3 = res3.data.data.data
          // 总数据条数
          this.total3 = res3.data.data.total
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
      // 分页功能  监听pagesize改变的事件
      handleSizeChange2(val) {
        this.per_page2 = val;
        // 当每页条数发生变化，修改当前页码为第一页
        this.current_page2 = 1;
        this.loadData();
        // size发生变化
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange2(val) {
        this.current_page2 = val;
        this.loadData();
        // 页码发生变化
        console.log(`当前页: ${val}`);
      },
      // 分页功能  监听pagesize改变的事件
      handleSizeChange3(val) {
        this.per_page3 = val;
        // 当每页条数发生变化，修改当前页码为第一页
        this.current_page3 = 1;
        this.loadData();
        // size发生变化
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange3(val) {
        this.current_page3 = val;
        this.loadData();
        // 页码发生变化
        console.log(`当前页: ${val}`);
      },
      // 监听添加专业分类的对话框关闭事件
      addMajorDialogClose() {
        this.$refs.addMajorFormRef.resetFields()
      },
      // 点击按钮添加新专业分类
      addMajor() {
        this.$refs.addMajorFormRef.validate(async valid => {
          if (!valid) {
            return
          } else {
            // 可以发起添加专业分类的网络请求
            const res = await this.$axios.post('/addmajorsort', this.addMajorForm)
            if (res.data.status === 201) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              // 隐藏添加的对话框
              this.addMajorDialogVisible = false
              //重新刷新分类列表的数据
              this.loadData()
            } else {
              this.$message.error('添加专业分类失败')
            }
          }
        })
      },
      //点击按钮，展示添加学科分类的对话框
      async showSubjectDialogVisible() {
        //再展示出对话框
        this.addSubjectDialogVisible = true
        const res = await this.$axios.get('/majorsortlist')
        this.options = res.data.data.data
      },
      // 监听添加学科分类的对话框关闭事件
      addSubjectDialogClose() {
        this.$refs.addSubjectFormRef.resetFields()
      },
      //   添加学科分类
      async addSubjectSort() {
        this.$refs.addSubjectFormRef.validate(async valid => {
          if (!valid) {
            return
          }
          const res = await this.$axios.post('/addsubjectsort', this.addSubjectForm)
          //   console.log(this.addSubjectForm)
          if (res.data.status === 201) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            // 隐藏添加的对话框
            this.addSubjectDialogVisible = false
            //重新刷新分类列表的数据
            this.loadData()
          } else {
            this.$message.error('添加专业分类失败')
          }
        })
      },
      //点击按钮，展示添加课程分类的对话框
      async showCourseDialogVisible() {
        //再展示出对话框
        this.addCourseDialogVisible = true
        const res = await this.$axios.get('/majorsortlist')
        this.options = res.data.data.data

        const res2 = await this.$axios.get('/subjectsortlist')
        this.optionss = res2.data.data.data
      },
      async guodu(majorsort_id) {
        const res = await this.$axios.post(`/guodu?majorsort_id=${majorsort_id}`)
        if (res.data.status === 201) {
          this.optionss = res.data.data
        } else {
          this.$message.error('获取学科分类失败')
        }
      },
      // 监听添加课程分类的对话框关闭事件
      addCourseDialogClose() {
        this.$refs.addCourseFormRef.resetFields()
      },
      //   添加课程分类 
      async addCourseSort() {
        this.$refs.addCourseFormRef.validate(async valid => {
          if (!valid) {
            return
          }
          const res = await this.$axios.post('/addcoursesort', this.addCourseForm)
          //   console.log(this.addCourseForm)
          if (res.data.status === 201) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
            // 隐藏添加的对话框
            this.addCourseDialogVisible = false
            // 当每页条数发生变化，修改当前页码为第一页
            this.current_page = 1;
            //重新刷新分类列表的数据
            this.loadData()
          } else {
            this.$message.error('添加专业分类失败')
          }
        })
      },
      // 搜索专业分类功能
      async doMajorSearch() {
        const params = {
          current_page: this.current_page3,
          per_page: this.per_page3,
          query: this.majorSearch
        }
        const res = await this.$axios.get('/majorsortsearch', {
          params
        })
        if (res.data.status === 200) {
          // 表格数据
          this.tableData3 = res.data.data.data
          // 总数据条数
          this.total3 = res.data.data.total
        } else {
          this.$message.error('搜索失败')
        }
      },
      // 搜索学科分类功能
      async doSubjectSearch() {
        const params = {
          current_page: this.current_page2,
          per_page: this.per_page2,
          query: this.subjectSearch
        }
        const res = await this.$axios.get('/subjectsortsearch', {
          params
        })
        if (res.data.status === 200) {
          // 表格数据
          this.tableData2 = res.data.data.data
          // 总数据条数
          this.total2 = res.data.data.total
        } else {
          this.$message.error('搜索失败')
        }
      },
      // 搜索专业分类功能
      async doCourseSearch() {
        const params = {
          current_page: this.current_page,
          per_page: this.per_page,
          query: this.courseSearch
        }
        const res = await this.$axios.get('/coursesortsearch', {
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
      // 专业分类修改
      showMajorDialogVisible(major) {
        this.majorDialogFormVisible = true
        this.majorForm = major
      },
      async updateMajor() {
        // 验证表单
        this.$refs.updateMajorRef.validate(async (valid) => {
          // 验证失败
          if (!valid) {
            this.$message.error('请完善内容')
            return
          } else {
            const res = await this.$axios.put('/majorsortupdate', this.majorForm)
            if (res.data.status === 200) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              this.majorDialogFormVisible = false
              // 重新加载数据
              this.loadData()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          }
        })
      },
      // 学科分类修改
      async updateSubjectDialogVisible(subject) {
        this.subjectDialogFormVisible = true
        this.subjectForm = subject
        const res = await this.$axios.get('/majorsortlist')
        this.options = res.data.data.data
      },
      async updateSubject() {
        // 验证表单
        this.$refs.updateSubjectRef.validate(async (valid) => {
          // 验证失败
          if (!valid) {
            this.$message.error('请完善内容')
            return
          } else {
            const res = await this.$axios.put('/subjectsortupdate', this.subjectForm)
            if (res.data.status === 200) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              this.subjectDialogFormVisible = false
              // 重新加载数据
              this.loadData()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          }
        })
      },
      async updateCourseDialogVisible(course) {
        this.courseDialogFormVisible = true
        this.courseForm = course
        const res = await this.$axios.get('/majorsortlist')
        this.options = res.data.data.data

        const res2 = await this.$axios.get('/subjectsortlist')
        this.optionss = res2.data.data.data
      },
      async updateCourse() {
        // 验证表单
        this.$refs.updateCourseRef.validate(async (valid) => {
          // 验证失败
          if (!valid) {
            this.$message.error('请完善内容')
            return
          } else {
            const res = await this.$axios.put('/coursesortupdate', this.courseForm)
            if (res.data.status === 200) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
              this.courseDialogFormVisible = false
              // 重新加载数据
              this.loadData()
            } else {
              this.$message({
                type: 'error',
                message: res.data.msg
              })
            }
          }
        })
      },
      // 根据id删除专业分类
      async majorSortDelete(majorsort_id) {
        this.$confirm('是否确定删除该分类', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 删除操作
          const res = await this.$axios.delete(`/majorsortdelete?majorsort_id=${majorsort_id}`)
          if (res.data.status === 200) {
            // 删除成功
            this.$message.success(res.data.msg)
            this.current_page3 = 1
            // 重新加载数据
            this.loadData()
          } else {
            // 删除失败
            this.$message.error(res.data.msg)
          }
        })
      },
      // 根据id删除学科分类
      async subjectSortDelete(subjectsort_id) {
        this.$confirm('是否确定删除该分类', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 删除操作
          const res = await this.$axios.delete(`/subjectsortdelete?subjectsort_id=${subjectsort_id}`)
          if (res.data.status === 200) {
            // 删除成功
            this.$message.success(res.data.msg)
            this.current_page2 = 1
            // 重新加载数据
            this.loadData()
          } else {
            // 删除失败
            this.$message.error(res.data.msg)
          }
        })
      },
      // 根据id删除课程分类
      async courseSortDelete(coursesort_id) {
        this.$confirm('是否确定删除该分类', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 删除操作
          const res = await this.$axios.delete(`/coursesortdelete?coursesort_id=${coursesort_id}`)
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
      },
      handleClick(tab, event) {
        // console.log(tab, event);
      }
    }
  }

</script>

<style scoped>
  .continer {
    min-width: 1000px;
  }

  .searchInput {
    width: 350px;
  }

  .box {
    min-width: 1000px;
  }

  .parent-btn {
    position: relative;
  }

  .btn {
    position: absolute;
    right: 0;
  }

</style>
