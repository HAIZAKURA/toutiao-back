<template>
  <div class="expire-cover">
    <div class="expire-cover-content">
      <div class="expire-cover-content-text">
        <span><i class="el-icon-warning-outline"></i>会话已过期</span>
      </div>
      <div class="expire-cover-content-btn">
        <el-button type="primary" @click="reLogin">重新登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: "ExpireCover",
    methods: {
      reLogin() {
        this.setUid(null)
        this.setUname(null)
        this.setAid(null)
        this.$router.push({ path: '/login' })
      },
      ...mapActions(['setUid', 'setUname', 'setAid'])
    }
  }
</script>

<style lang="stylus" scoped>
  .expire-cover
    position absolute
    top 0
    left 0
    height 100vh
    width 100vw
    background-color rgba(255, 255, 255, 0.4)
    backdrop-filter blur(10px)
    z-index 99
    &-content
      margin-top 15%
      &-text
        font-size 60px
        height 100px
        line-height 100px
        display inline
        letter-spacing 16px
      &-btn
        height 100px
        line-height 100px
</style>