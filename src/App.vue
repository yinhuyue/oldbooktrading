<template>
  <div id="app">
    <!-- 头部组件 -->
    <!-- <my-header></my-header> -->
    <router-view></router-view>
    <!-- <my-index></my-index> -->
  </div>
</template>

<script>
// 导入头部组件
// import MyHeader from '@/components/myheader.vue'
// 导入侧边栏组件
// import MySide from '@/components/myside.vue'
// 导入home组件
// import Index from '@/components/myindex.vue'

export default {
  name: 'App',
  // 注册局部组件
  // components: {
  //   MyHeader,
  //   MySide,
  //   Index
  // }
}
</script>

<style>
#app {
  height: 100%;
}
</style>
