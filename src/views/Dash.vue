<template>
  <div class="dash">
    <div class="title">
      <span class="title-text">系&nbsp;统&nbsp;总&nbsp;览</span>
      <span class="title-text-small">Dashboard</span>
    </div>
    <el-divider></el-divider>
    <div class="dash-content">
      <el-row :gutter="20">
        <el-col :span="12">
          <dash-card title="用 户" :num="status.users" icon="el-icon-user"></dash-card>
          <br />
          <dash-card title="分 区" :num="status.forum" icon="el-icon-guide"></dash-card>
        </el-col>
        <el-col :span="12">
          <dash-card title="主 题" :num="status.thread" icon="el-icon-document"></dash-card>
          <br />
          <dash-card title="评 论" :num="status.comm" icon="el-icon-chat-dot-square"></dash-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import DashCard from "../components/DashCard"

  export default {
    name: "Dash",
    components: {
      DashCard
    },
    data() {
      return {
        status: {
          users: 0,
          thread: 0,
          comm: 0,
          forum: 0
        }
      }
    },
    created: function() {
      this.getStatus()
    },
    methods: {
      getStatus() {
        this.$axios.get('/api/status')
          .then(res => {
            if (res.data.code === 1) {
              this.status.users = res.data.data.users
              this.status.thread = res.data.data.thread
              this.status.comm = res.data.data.comm
              this.status.forum = res.data.data.forum
            }
          })
          .catch(() => {
            this.$message({
              message: '网络错误',
              type: 'error',
              offset: 70
            })
          })
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .title
    text-align left
    &-text
      font-size 2em
    &-text-small
      margin-left 0.5em
</style>