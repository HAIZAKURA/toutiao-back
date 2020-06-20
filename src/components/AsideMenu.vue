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
      <div class="aside-title">
        <div class="blank10"></div>
        <span>控&nbsp;制&nbsp;面&nbsp;板</span>
        <div class="blank20"></div>
      </div>
      <el-menu-item class="aside-menu-item" index="/">
        <i class="el-icon-odometer"></i>
        <span>&nbsp;监&nbsp;控</span>
      </el-menu-item>
<!--      <el-submenu class="aside-menu-item" index="2">-->
<!--        <template slot="title">-->
<!--          <i class="el-icon-coin"></i>-->
<!--          <span>&nbsp;设&nbsp;备</span>-->
<!--        </template>-->
<!--        <el-menu-item class="aside-submenu-item" index="devlist">-->
<!--          <span>设&nbsp;备&nbsp;列&nbsp;表</span>-->
<!--        </el-menu-item>-->
<!--        <el-menu-item class="aside-submenu-item" index="devmap">-->
<!--          <span>设&nbsp;备&nbsp;地&nbsp;图</span>-->
<!--        </el-menu-item>-->
<!--      </el-submenu>-->
      <el-menu-item class="aside-menu-item" index="/thread">
        <i class="el-icon-document-copy"></i>
        <span>&nbsp;主&nbsp;题</span>
      </el-menu-item>
      <el-menu-item class="aside-menu-item" index="/comm">
        <i class="el-icon-chat-dot-square"></i>
        <span>&nbsp;评&nbsp;论</span>
      </el-menu-item>
      <el-submenu class="aside-menu-item" index="4">
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
      <el-menu-item class="aside-menu-item" index="about">
        <i class="el-icon-help"></i>
        <span>&nbsp;关&nbsp;于</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
  export default {
    name: "AsideMenu"
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

  .aside-title
    margin-top 0.5em
    width 180px
    display grid
    border-bottom 1px solid #2b2c30
    color #ffffff
    font-size 1.5em
    span
      width 180px
      margin auto

  .el-menu-item.is-active
    background-color #393a3e !important
</style>