<template>
  <el-container>
    <el-header>
      <Header></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu default-active="/">
          <el-menu-item index="/">项目介绍</el-menu-item>
          <el-menu-item index="/user">用户列表</el-menu-item>
          <el-menu-item index="/role">角色列表</el-menu-item>
          <el-menu-item index="/auth">权限列表</el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue';
</script>

<style lang="less" scoped>
/*
  el-container 包含 el-header 时，el-container 会被添加 .is-vertical，
  利用这个class可以精准的为最外层的 el-container 添加样式，而不会影响到内层的 el-container
*/
.el-container.is-vertical {
  height: 100%;
}

.el-menu {
  height: 100%;
}

.el-header {
  margin-bottom: 5px;
  padding: 0;
  overflow: hidden;
}
</style>
