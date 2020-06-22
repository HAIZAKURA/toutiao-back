<template>
  <div class="forum-mgr">
    <div class="title">
      <span class="title-text">分&nbsp;区&nbsp;管&nbsp;理</span>
      <span class="title-text-small">Forum Management</span>
      <div class="title-btn">
        <el-tooltip class="item" effect="dark" content="新增分区" placement="left">
          <el-button type="success" icon="el-icon-plus" circle @click="handleCreateOpen"></el-button>
        </el-tooltip>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="forum" ref="forumTable">
      <el-table
        :data="forumList"
        :max-height="forumListHeight"
        v-loading="forumLoading"
        style="width: 100%"
      >
        <el-table-column
          prop="fid"
          label="ID"
          min-width="30"
          sortable
        ></el-table-column>
        <el-table-column
          prop="fname"
          label="名称"
          min-width="40"
        ></el-table-column>
        <el-table-column
          prop="fdesc"
          label="描述"
        ></el-table-column>
        <el-table-column
          label="操作"
          min-width="40"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="success"
              @click="handleEditOpen(scope.row.fid)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row.fid)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- Create Dialog -->
    <el-dialog
      title="新 增 分 区"
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
        <el-form ref="createForm" label-position="left" :model="forumCreate" label-width="80px">
          <el-form-item label="名称">
            <el-input
              maxlength="8"
              v-model="forumCreate.fname"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              type="textarea"
              maxlength="96"
              v-model="forumCreate.fdesc"
              :autosize="{ minRows: 6, maxRows: 10 }"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="handleCreateClose">取&nbsp;消</el-button>
        <el-button type="primary" @click="createForum">确&nbsp;定</el-button>
      </span>
    </el-dialog>

    <!-- Edit Dialog -->
    <el-dialog
      title="修 改 分 区"
      :visible.sync="editDialogVisible"
      width="40%"
      top="15vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :destroy-on-close="true"
      center
    >
      <div class="editormDiv">
        <el-form ref="createForm" label-position="left" :model="forumDetail" label-width="80px">
          <el-form-item label="名称">
            <el-input
              maxlength="8"
              v-model="forumDetail.fname"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              type="textarea"
              maxlength="96"
              v-model="forumDetail.fdesc"
              :autosize="{ minRows: 6, maxRows: 10 }"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="handleEditClose">取&nbsp;消</el-button>
        <el-button type="primary" @click="editForum(forumDetail.fid)">确&nbsp;定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  export default {
    name: "ForumMgr",
    data() {
      return {
        forumList: [],
        forumDetail: {
          fid: 1,
          fname: "",
          fdesc: ""
        },
        forumCreate: {
          fname: "",
          fdesc: ""
        },
        forumListHeight: window.innerHeight * 0.75,
        forumLoading: true,
        createDialogVisible: false,
        editDialogVisible: false
      }
    },
    created() {
      this.getForumList()
    },
    methods: {
      handleEditOpen(fid) {
        this.getForumDetail(fid)
        this.editDialogVisible = true
      },
      handleEditClose() {
        this.forumDetail.fid = 1
        this.forumDetail.fname = ""
        this.forumDetail.fdesc = ""
        this.editDialogVisible = false
      },
      handleDelete(fid) {
        this.$confirm('确认删除分区（ID：' + fid + '）?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteForum(fid)
        })
      },
      handleCreateOpen() {
        this.forumCreate.fname = ""
        this.forumCreate.fdesc = ""
        this.createDialogVisible = true
      },
      handleCreateClose() {
        this.forumCreate.fname = ""
        this.forumCreate.fdesc = ""
        this.createDialogVisible = false
      },
      getForumList() {
        this.forumLoading = true
        this.$axios.get('/api/forum')
        .then(res => {
          if (res.data.code === 1) {
            this.forumList = res.data.data
          } else {
            this.$message({
              message: "系统错误",
              type: "error"
            })
          }
          this.forumLoading = false
        })
        .catch(() => {
          this.$message({
            message: "网络错误",
            type: "error"
          })
        })
      },
      getForumDetail(fid) {
        this.$axios.get('/api/forum/' + fid)
        .then(res => {
          if (res.data.code === 1) {
            this.forumDetail = res.data.data
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
      },
      deleteForum(fid) {
        this.$axios.delete('/api/forum/' + fid)
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: "删除成功",
                type: "success"
              })
            } else {
              this.$message({
                message: "系统错误或权限不足",
                type: "error"
              })
            }
            this.getForumList()
          })
          .catch(() => {
            this.$message({
              message: "网络错误",
              type: "error"
            })
          })
      },
      createForum() {
        this.$axios.post('/api/forum', this.forumCreate)
        .then(res => {
          if (res.data.code === 1) {
            this.$message({
              message: "新增成功",
              type: "success"
            })
          } else {
            this.$message({
              message: "系统错误或权限不足",
              type: "error"
            })
          }
          this.handleCreateClose()
          this.getForumList()
        })
        .catch(() => {
          this.$message({
            message: "网络错误",
            type: "error"
          })
        })
      },
      editForum(fid) {
        this.$axios.put('/api/forum/' + fid, this.forumDetail)
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: "修改成功",
                type: "success"
              })
            } else {
              this.$message({
                message: "系统错误或权限不足",
                type: "error"
              })
            }
            this.handleEditClose()
            this.getForumList()
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
</style>