<template>
    <el-row type="flex" class="row-bg header">
      <el-col :span="2" class="header-title">
        <div class="grid-content bg-purple">
        </div>
      </el-col>
      <el-col :span="6" class="header-title">
        <div class="grid-content bg-purple">
          您好，欢迎 <span class="header-title-name">{{userForm.user_name}}</span> 来到校园二手书交易网站！
        </div>
      </el-col>
      <el-col :span="10">
        <div class="grid-content bg-purple-light">
        </div>
      </el-col>
      <el-col :span="2" class="header-title2">
        <div class="grid-content bg-purple">
          <i class="el-icon-user-solid"></i>
          <span slot="title" @click="userCenter">个人中心</span>
        </div>
      </el-col>
      <el-col :span="2" class="header-title3">
        <div class="grid-content bg-purple" @click="logout">
          <i class="el-icon-error"></i>
          <span slot="title">退出</span>
        </div>
      </el-col>
      <el-col :span="2" class="header-title">
        <div class="grid-content bg-purple">
        </div>
      </el-col>
    </el-row>
</template>

<script>
export default {
    name: 'myheader'
}
</script>

<style scoped>

</style>