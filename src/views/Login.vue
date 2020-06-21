<template>
  <div class="login">
    <el-container>
      <div class="login-div">
        <el-card class="login-box box-card">
          <div slot="header" class="clearfix">
            <span>管理系统登录</span>
          </div>
          <div class="item">
            <el-form
              label-position="left"
              label-width="60px"
              :model="loginForm"
            >
              <el-form-item label="用户名">
                <el-input type="text" ref="unameInput" clearable v-model="loginForm.uname"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" clearable v-model="loginForm.upass" @keyup.enter.native="loginFunc"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary" @click="loginFunc">登录</el-button>
          </div>
        </el-card>
      </div>
    </el-container>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'

  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          uname: '',
          upass: ''
        }
      }
    },
    computed: {
      ...mapGetters(['uid', 'uname', 'aid'])
    },
    created: function() {
      this.$axios.get('/api/check')
        .then(res => {
          if (res.data.code === 1) {
            this.setUid(res.data.data.uid)
            this.setUname(res.data.data.uname)
            this.setAid(res.data.data.aid)
            this.$router.push({ path: '/' })
          } else {
            this.setUid(null)
            this.setUname(null)
            this.setAid(null)
          }
        })
        .catch(() => {
          this.$message({
            message: '网络错误',
            type: 'error'
          })
        })
    },
    mounted: function () {
      this.$refs.unameInput.focus()
    },
    methods: {
      loginFunc() {
        this.$axios.post('/api/admin/login', this.loginForm)
          .then(res => {
            if (res.data.code === 1) {
              this.setUid(res.data.data.uid)
              this.setUname(res.data.data.uname)
              this.setAid(res.data.data.aid)
              this.$message({
                message: '登录成功，跳转中...',
                type: 'success'
              })
              setTimeout(() => {
                this.$router.push({ path: '/' })
              }, 1000)
            } else {
              this.$message({
                message: '用户名或密码错误',
                type: 'error'
              })
            }
          })
          .catch(() => {
            this.$message({
              message: '网络错误',
              type: 'error'
            })
          })
      },
      ...mapActions(['setUid', 'setUname', 'setAid'])
    }
  }
</script>

<style lang="stylus" scoped>
  .login
    background-color #242327
    height 100vh
    width 100vw

  .clearfix:before,
  .clearfix:after
    display table
    content ""

  .clearfix:after
    clear both

  .item
    margin-bottom 1em

  .login-div
    margin-left auto
    margin-right auto
    margin-top 15%

  .login-box
    min-width 400px
</style>
