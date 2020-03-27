<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
    </el-breadcrumb>
    <div style="margin-top: 10px;">
      <el-input @keyup.enter.native='doSearch' v-model="searchInput" placeholder="请输入活动名称" class="searchInput"
        clearable>
        <el-button @click="doSearch" slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button style="margin-left: 10px;" type="primary" @click="addActivityDialogVisible = true">添加活动</el-button>
    </div>
    <div style="margin-top: 10px;">
      <el-table v-loading="loading" ref="singleTable" :data="tableData.slice((current_page-1)*per_page,current_page*per_page)" style="width: 100%" border stripe>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column property="activity_name" label="活动名称" width="120">
        </el-table-column>
        <el-table-column :show-overflow-tooltip="true" property="activity_content" label="活动内容" width="500">
        </el-table-column>
        <el-table-column property="activity_activitytime" label="活动发起日期" width="200">
        </el-table-column>
        <el-table-column property="activity_effecttime" label="有效时间" width="120">
        </el-table-column>
        <el-table-column label="活动状态" width="100">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.activity_state"
              @change="(val) => activityStateChange(scope.row.activity_id, val)" :active-value="1" :inactive-value="0"
              active-color="#ff4949" inactive-color="rgb(221, 235, 241)">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="155" fixed="right">
          <template slot-scope="scope">
            <!-- {{scope.row}} -->
            <el-button size="mini" @click="showActivityDialogVisible(scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="activityDelete(scope.row.activity_id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 添加活动的对话框 -->
    <el-dialog title="添加活动" :visible.sync="addActivityDialogVisible">
      <el-form :rules="addActivityRules" ref="addActivityRef" label-position="left" label-width="120px"
        :model="addActivityFormData">
        <el-form-item label="活动名称" prop="activity_name">
          <el-input v-model="addActivityFormData.activity_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动内容" prop="activity_content">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="addActivityFormData.activity_content">
          </el-input>
        </el-form-item>
        <el-form-item label="活动时间" prop="activity_activitytime">
          <el-col>
            <el-date-picker type="date" placeholder="选择活动日期" value-format="yyyy-MM-dd"
              v-model="addActivityFormData.activity_activitytime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动有效时间" prop="activity_effecttime">
          <el-input v-model="addActivityFormData.activity_effecttime" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addActivityDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addActivity">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改活动的对话框 -->
    <el-dialog title="修改活动" :visible.sync="updateActivityDialogVisible">
      <el-form :rules="updateActivityRules" ref="updateActivityRef" :model="updateActivityFormData"
        label-position="left" label-width="120px">
        <el-form-item label="活动名称" prop="activity_name">
          <el-input v-model="updateActivityFormData.activity_name" autocomplete="off"></el-input>
        </el-form-item> 
        <el-form-item label="活动内容" prop="activity_content">
          <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="updateActivityFormData.activity_content">
          </el-input>
        </el-form-item>
        <el-form-item label="活动时间" prop="activity_activitytime">
          <el-col>
            <el-date-picker type="date" placeholder="选择活动日期" value-format="yyyy-MM-dd"
              v-model="updateActivityFormData.activity_activitytime" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="活动有效时间" prop="activity_effecttime">
          <el-input v-model="updateActivityFormData.activity_effecttime" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="updateActivityDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateActivity">确 定</el-button>
      </div>
    </el-dialog>
    <!-- <div style="margin-top: 10px;"> -->
      <!-- <el-pagination background layout="prev, pager, next" :total="1000">
      </el-pagination> -->
      <el-pagination 
      @size-change="handleSizeChange" 
      @current-change="handleCurrentChange" 
      :current-page="current_page"
      :page-sizes="[1,2, 5, 10, 20]" 
      :page-size="per_page" 
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
    <!-- </div> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        // 列表的数据
        tableData: [],
        // 搜索的数据
        searchInput: '',
        // 分页  当前页数
        current_page: 1,
        // 分页  当前每页显示几条数据
        per_page: 10,
        //总页数
        total: 0,
        // 控制加载提示的现实与隐藏
        loading: true,
        // 控制添加活动对话框是否显示
        addActivityDialogVisible: false,
        addActivityFormData: {
          activity_name: '',
          activity_content: '',
          activity_activitytime: '',
          activity_effecttime: ''
        },
        // 表单验证的规则
        addActivityRules: {
          activity_name: [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 18,
              message: '长度在 3 到 18 个字',
              trigger: 'blur'
            }
          ],
          activity_content: [{
              required: true,
              message: '请输入活动内容',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 200,
              message: '长度在 1 到 200 个字',
              trigger: 'blur'
            }
          ],
          activity_activitytime: [{
            // type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          activity_effecttime: [{
            required: true,
            message: '请输入活动有效时间',
            trigger: 'blur'
          }, ]
        },
        updateActivityDialogVisible: false,
        updateActivityFormData: {
          activity_id: '',
          activity_name: '',
          activity_content: '',
          activity_activitytime: '',
          activity_effecttime: ''
        },
        // 表单验证的规则
        updateActivityRules: {
          activity_name: [{
              required: true,
              message: '请输入活动名称',
              trigger: 'blur'
            },
            {
              min: 3,
              max: 18,
              message: '长度在 3 到 18 个字',
              trigger: 'blur'
            }
          ],
          activity_content: [{
              required: true,
              message: '请输入活动内容',
              trigger: 'blur'
            },
            {
              min: 1,
              max: 200,
              message: '长度在 1 到 200 个字',
              trigger: 'blur'
            }
          ],
          activity_activitytime: [{
            // type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }],
          activity_effecttime: [{
            // type: 'number',
            required: true,
            message: '请输入活动有效时间',
            trigger: 'blur'
          }, ]
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
      // 分页功能  监听pagesize改变的事件
      handleSizeChange(val) {
        this.per_page = val;
        // 当每页条数发生变化，修改当前页码为第一页
        this.current_page = 1;
        this.loadData()
        // size发生变化
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        this.current_page = val;
        this.loadData()
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
        const res = await this.$axios.get('/activitylist', {
          params
        })
        // console.log(params)
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
        const res = await this.$axios.get('/activitysearch', {
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
      // 活动状态改变  监听swich开关状态的改变
      async activityStateChange(id, val) {
        const res = await this.$axios.put(`/activityban?activity_id=${id}&activity_state=${val}`)
        if (res.data.status === 200) {
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
      },
      // 活动添加
      async addActivity() {
        // 验证表单
        this.$refs.addActivityRef.validate(async (valid) => {
          // 验证失败
          if (!valid) {
            this.$message.error('请完善内容')
            return
          } else {
            const res = await this.$axios.post('/activityadd', this.addActivityFormData)
            if (res.data.status === 200) {
              // 活动添加成功
              this.$message.success(res.data.msg)
              // 重新加载数据
              this.loadData()
              // 关闭对话框
              this.addActivityDialogVisible = false
              // 清空文本框的值
              for (let key in this.addActivityFormData) {
                this.addActivityFormData[key] = ''
              }
            } else if (res.data.status === 505) {
              // 活动添加失败
              this.$message.error(res.data.msg)
            } else {
              // 活动添加失败
              this.$message.error(res.data.msg)
            }
          }
        })
      },
      // 点击编辑按钮，打开活动修改对话框并显示要修改的信息；
      showActivityDialogVisible(activity) {
        this.updateActivityDialogVisible = true
        this.updateActivityFormData = activity
      },
      //修改活动信息
      async updateActivity() {
        // 验证表单
        this.$refs.updateActivityRef.validate(async (valid) => {
          // 验证失败
          if (!valid) {
            this.$message.error('请完善内容')
            return
          } else {
            this.updateActivityDialogVisible = false
            const res = await this.$axios.put('/activityupdate', this.updateActivityFormData)
            if (res.data.status === 200) {
              this.$message({
                type: 'success',
                message: res.data.msg
              })
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
      // 根据id删除活动
      async activityDelete(activity_id) {
        this.$confirm('是否确定删除该活动', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          // 删除操作
          const res = await this.$axios.delete(`/activitydelete?activity_id=${activity_id}`)
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
