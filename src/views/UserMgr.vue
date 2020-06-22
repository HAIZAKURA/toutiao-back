<template>
  <div class="user-mgr">
    <div class="title">
      <span class="title-text">用&nbsp;户&nbsp;管&nbsp;理</span>
      <span class="title-text-small">User Management</span>
      <div class="title-btn">
        <el-tooltip class="item" effect="dark" content="创建用户" placement="left">
          <el-button type="success" icon="el-icon-plus" circle @click="handleCreateOpen"></el-button>
        </el-tooltip>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="user" ref="userTable">
      <el-table
        :data="userList"
        :max-height="userListHeight"
        v-loading="userLoding"
        style="width: 100%"
      >
        <el-table-column
          prop="uid"
          label="ID"
          min-width="30"
          sortable
        ></el-table-column>
        <el-table-column
          prop="uname"
          label="用户名"
          min-width="40"
        ></el-table-column>
        <el-table-column
          prop="umail"
          label="邮箱"
          min-width="60"
        ></el-table-column>
        <el-table-column
          prop="utime"
          label="注册时间"
          min-width="40"
          sortable
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column
          prop="aid"
          label="用户组"
          min-width="20"
          sortable
          :formatter="authFormat"
        ></el-table-column>
        <el-table-column
          prop="ustat"
          label="状态"
          min-width="30"
          sortable
          :formatter="statusFormat"
        ></el-table-column>
        <el-table-column
          label="操作"
          min-width="20"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              v-if="scope.row.ustat === 0"
              @click="handleDelete(scope.row.uid)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="user-pagination" ref="userPag">
      <el-pagination
        layout="total, prev, pager, next"
        :current-page="query.pageIndex"
        :page-size="query.pageSize"
        :total="pageTotal"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <!-- Create Dialog -->
    <el-dialog
      title="新 增 用 户"
      :visible.sync="createDialogVisible"
      width="40%"
      top="15vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :destroy-on-close="true"
      center
    >
      <div class="createFormDiv">
        <el-form ref="createForm" label-position="left" :model="userCreate" label-width="80px">
          <el-form-item label="用户名">
            <el-input
              maxlength="18"
              v-model="userCreate.uname"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              type="password"
              maxlength="24"
              v-model="userCreate.upass"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input
              maxlength="56"
              v-model="userCreate.umail"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="用户组">
            <el-select v-model="userCreate.aid" placeholder="请选择">
              <el-option
                v-for="item in authList"
                :key="item.aid"
                :label="item.aname"
                :value="item.aid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="handleCreateClose">取&nbsp;消</el-button>
        <el-button type="primary" @click="createUser">确&nbsp;定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import moment from "moment-timezone";

  export default {
    name: "UserMgr",
    data() {
      return {
        query: {
          pageIndex: 1,
          pageSize: 20
        },
        pageTotal: 0,
        authList: [
          {
            aid: 1,
            aname: "用户"
          }
        ],
        userListHeight: window.innerHeight * 0.75,
        userList: [],
        userCreate: {
          uname: "",
          upass: "",
          umail: "",
          aid: 1
        },
        userLoding: true,
        createDialogVisible: false
      }
    },
    created() {
      this.$axios.get('/api/auth')
        .then(res => {
          if (res.data.code === 1) {
            this.authList = res.data.data
          } else {
            this.$message({
              message: "系统错误",
              type: "error"
            })
          }
        })
        .catch(() => {
          this.$message({
            message: "网络错误",
            type: "error"
          })
        })
      this.getUserList(this.query.pageIndex)
    },
    methods: {
      handleDelete(uid) {
        this.$confirm('确认删除/封禁用户（ID：' + uid + '）?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteUser(uid)
        })
      },
      handleCurrentChange(value) {
        this.query.pageIndex = value
        this.getUserList(this.query.pageIndex)
      },
      handleCreateOpen() {
        this.userCreate.uname = ""
        this.userCreate.upass = ""
        this.userCreate.umail = ""
        this.userCreate.aid = 1
        this.createDialogVisible = true
      },
      handleCreateClose() {
        this.userCreate.uname = ""
        this.userCreate.upass = ""
        this.userCreate.umail = ""
        this.userCreate.aid = 1
        this.createDialogVisible = false
      },
      dateFormat: function (row, column) {
        let data = row[column.property]
        if (data === undefined) {
          return ""
        }
        return moment(data).tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss")
      },
      authFormat: function (row, column) {
        let data = row[column.property]
        if (data === undefined) {
          return ""
        }
        function checkAid(item) {
          return item.aid === data
        }
        return this.authList[this.authList.findIndex(checkAid)].aname
      },
      statusFormat: function (row, column) {
        let data = row[column.property]
        if (data === undefined) {
          return ""
        }
        return data === 1 ? "删除/封禁" : "正常"
      },
      getUserList(currentPage) {
        this.userLoding = true
        this.$axios.get('/api/users', { params: { page: currentPage } })
          .then(res => {
            if (res.data.code === 1) {
              this.userList = res.data.data.list
              this.pageTotal = res.data.data.total
              this.userLoding = false
            }
          })
      },
      deleteUser(uid) {
        this.$axios.delete('/api/users/' + uid)
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: "删除/封禁用户成功",
                type: "success"
              })
            } else {
              this.$message({
                message: "系统错误或权限不足",
                type: "error"
              })
            }
            this.getUserList(this.query.pageIndex)
          })
          .catch(() => {
            this.$message({
              message: "网络错误",
              type: "error"
            })
          })
      },
      createUser() {
        this.$axios.post('/api/users', this.userCreate)
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: "添加用户成功",
                type: "success"
              })
            } else {
              this.$message({
                message: "系统错误或权限不足",
                type: "error"
              })
            }
            this.handleCreateClose()
            this.getUserList(this.query.pageIndex)
          })
          .catch(() => {
            this.$message({
              message: "网络错误",
              type: "error"
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
    &-btn
      height 2em
      line-height 2em
      float right

  .user-pagination
    margin-top 1em
</style>