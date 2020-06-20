<template>
  <div class="header-menu">
    <div class="header-tool">
      <div class="header-tool-item">
        <span class="header-user">{{ uname }}</span>
        <el-button type="danger" size="medium" round @click="logout">登出</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: "HeaderMenu",
    computed: {
      ...mapGetters(['uid', 'uname', 'aid'])
    },
    methods: {
      logout() {
        this.$axios.get('/api/logout')
          .then(res => {
            if (res.data.code === 1) {
              this.setUid(null)
              this.setUname(null)
              this.setAid(null)
              this.$router.push({ path: '/login' })
            } else {
              this.$message({
                message: '系统错误',
                type: 'error',
                offset: 70
              })
            }
          })
          .catch(() => {
            this.$message({
              message: '网络错误',
              type: 'error',
              offset: 70
            })
          })
      },
      ...mapActions(['setUid', 'setUname', 'setAid'])
    }
  }
</script>

<style lang="stylus" scoped>
  .header-menu
    height 60px
    padding-right 32px
    &-item
      float right
      line-height 60px
      height 48px
      margin auto

  .header-user
    color #ffffff
    margin-right 32px

  .header-tool
    background-color #242327
    height 60px
    width 100%
    position absolute
    top 0
    right 0
    z-index 0
    padding-right 2em
    &-item
      float right
      line-height 60px
      height 60px
      margin auto
      z-index 0
</style>