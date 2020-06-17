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
                <el-input type="text" clearable v-model="loginForm.uname"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input type="password" clearable v-model="loginForm.upass"></el-input>
              </el-form-item>
            </el-form>
            <el-button type="primary">登录</el-button>
          </div>
        </el-card>
      </div>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Login',
    data() {
      return {
        loginForm: {
          uname: '',
          upass: ''
        }
      }
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
