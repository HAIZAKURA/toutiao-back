<template>
  <div class="home">
<!--    <img alt="Vue logo" src="../assets/logo.png">-->
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <el-container>
      <el-aside class="aside">
        <aside-menu></aside-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <header-menu></header-menu>
        </el-header>
        <el-main class="main">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
    <expire-cover v-if="isExpire"></expire-cover>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import ExpireCover from "src/components/ExpireCover"
import AsideMenu from "src/components/AsideMenu"
import HeaderMenu from "src/components/HeaderMenu"

export default {
  name: 'Home',
  components: {
    ExpireCover,
    AsideMenu,
    HeaderMenu
  },
  data() {
    return {
      isExpire: false
    }
  },
  computed: {
    ...mapGetters(['uid', 'uname', 'aid'])
  },
  mounted: function() {
    this.$axios.get('/api/check')
      .then(res => {
        if (res.data.code === 1) {
          this.setUid(res.data.data.uid)
          this.setUname(res.data.data.uname)
          this.setAid(res.data.data.aid)
        } else {
          this.setUid(null)
          this.setUname(null)
          this.setAid(null)
          this.$router.push({ path: '/login' })
        }
      })
      .catch(() => {
        this.$message({
          message: '网络错误',
          type: 'error'
        })
      })
    let expireChecker = setInterval(() => {
      this.$axios.get('/api/check')
        .then(res => {
          if (res.data.code === 1) {
            this.setUid(res.data.data.uid)
            this.setUname(res.data.data.uname)
            this.setAid(res.data.data.aid)
          } else {
            this.setUid(null)
            this.setUname(null)
            this.setAid(null)
            this.isExpire = true
            clearInterval(expireChecker)
          }
        })
    }, 60000)
  },
  methods: {
    ...mapActions(['setUid', 'setUname', 'setAid'])
  }
}
</script>

<style lang="stylus" scoped>
  .aside
    height 100%
    max-width 180px
    overflow-x hidden
    z-index 1

  .header
    padding 0
    margin 0
    width 100%

</style>
