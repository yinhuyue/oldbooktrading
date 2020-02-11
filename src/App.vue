<template>
  <div id="app">
    <!-- 头部组件 -->
    <!-- <my-header></my-header> -->
    <router-view></router-view>
  </div>
</template>

<script>
// 导入头部组件
import MyHeader from '@/components/myheader.vue'
// 导入侧边栏组件
import MySide from '@/components/myside.vue'

export default {
  name: 'App',
  // 注册局部组件
  components: {
    MyHeader,
    MySide
  }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
