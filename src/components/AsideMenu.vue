<template>
  <div class="aside-menu">
    <el-menu
      class="aside-el-menu"
      background-color="#242327"
      text-color="#fff"
      active-text-color="#ffd04b"
      default-active="/"
      unique-opened
      router
    >
      <div class="aside-logo">
        <div class="blank10"></div>
        <img src="../assets/logo.png" alt="Dashboard" />
        <div class="blank20"></div>
      </div>
      <el-menu-item class="aside-menu-item" index="/">
        <i class="el-icon-odometer"></i>
        <span>&nbsp;总&nbsp;览</span>
      </el-menu-item>
      <el-submenu class="aside-menu-item" index="1">
        <template slot="title">
          <i class="el-icon-document-copy"></i>
          <span>&nbsp;内&nbsp;容</span>
        </template>
        <el-menu-item class="aside-submenu-item" index="thread">
          <span>主&nbsp;题&nbsp;管&nbsp;理</span>
        </el-menu-item>
        <el-menu-item class="aside-submenu-item" index="forum">
          <span>分&nbsp;区&nbsp;管&nbsp;理</span>
        </el-menu-item>
        <el-menu-item class="aside-submenu-item" index="comm">
          <span>评&nbsp;论&nbsp;管&nbsp;理</span>
        </el-menu-item>
      </el-submenu>
      <el-submenu class="aside-menu-item" index="2" v-if="aid === 4 || aid === 3">
        <template slot="title">
          <i class="el-icon-user"></i>
          <span>&nbsp;用&nbsp;户</span>
        </template>
        <el-menu-item class="aside-submenu-item" index="user">
          <span>用&nbsp;户&nbsp;管&nbsp;理</span>
        </el-menu-item>
        <el-menu-item class="aside-submenu-item" index="blacklist">
          <span>封&nbsp;禁&nbsp;用&nbsp;户</span>
        </el-menu-item>
      </el-submenu>
      <el-menu-item class="aside-menu-item" index="notice" v-if="aid === 4 || aid === 3">
        <i class="el-icon-news"></i>
        <span>&nbsp;通&nbsp;知</span>
      </el-menu-item>
      <el-menu-item class="aside-menu-item" index="about">
        <i class="el-icon-help"></i>
        <span>&nbsp;关&nbsp;于</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: "AsideMenu",
    computed: {
      ...mapGetters(['uid', 'uname', 'aid'])
    },
  }
</script>

<style lang="stylus" scoped>
  .blank10
    height 10px

  .blank20
    height 20px

  .aside-el-menu
    height 100vh
    border-right none

  .aside-menu-item
    text-align left

  .aside-submenu-item
    text-align center

  .aside-logo
    margin-top 20px
    width 180px
    display grid
    border-bottom 1px solid #2b2c30
    img
      width 80px
      margin auto

  .el-menu-item.is-active
    background-color #393a3e !important
</style>