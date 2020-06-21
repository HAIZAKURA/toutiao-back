<template>
  <div class="dash-card">
    <el-card>
      <div slot="header" class="clearfix">
        <i :class="icon"></i>
        <span>&nbsp;{{ title }}</span>
      </div>
      <div>
        <span class="text">{{ num }}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: "DashCard",
    props: {
      icon: String,
      title: String,
      num: Number
    }
  }
</script>

<style lang="stylus" scoped>
  .clearfix:before,
  .clearfix:after
    display table
    content ""

  .clearfix:after
    clear both

  .clearfix
    font-size 1.5em

  .text
    font-size 3em
</style>