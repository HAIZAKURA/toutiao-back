<template>
  <div class="notice-mgr">
    <div class="title">
      <span class="title-text">通&nbsp;知&nbsp;管&nbsp;理</span>
      <span class="title-text-small">Notice Management</span>
      <div class="title-btn">
        <el-tooltip class="item" effect="dark" content="新增通知" placement="left">
          <el-button type="success" icon="el-icon-plus" circle @click="handleCreateOpen"></el-button>
        </el-tooltip>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="notice" ref="noticeTable">
      <el-table
        :data="noticeList"
        :max-height="noticeListHeight"
        v-loading="noticeLoading"
        style="width: 100%"
      >
        <el-table-column
          prop="nid"
          label="ID"
          min-width="30"
          sortable
        ></el-table-column>
        <el-table-column
          prop="ncont"
          label="内容"
          min-width="80"
        ></el-table-column>
        <el-table-column
          prop="ntime"
          label="时间"
          min-width="50"
          sortable
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column
          prop="uid"
          label="用户ID"
          min-width="30"
          sortable
        ></el-table-column>
        <el-table-column
          label="操作"
          min-width="40"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row.nid)"
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
      <div class="createNoticeDiv">
        <el-form ref="createNotice" label-position="left" :model="noticeCreate" label-width="80px">
          <el-form-item label="用户ID">
            <el-input
              v-model="noticeCreate.uid"
            ></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              type="textarea"
              maxlength="192"
              v-model="noticeCreate.ncont"
              :autosize="{ minRows: 6, maxRows: 10 }"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="handleCreateClose">取&nbsp;消</el-button>
        <el-button type="primary" @click="createNotice">确&nbsp;定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import moment from "moment-timezone";

  export default {
    name: "NoticeMgr",
    data() {
      return {
        noticeList: [],
        noticeListHeight: window.innerHeight * 0.75,
        noticeLoading: true,
        noticeCreate: {
          ncont: "",
          uid: 0
        },
        createDialogVisible: false
      }
    },
    created() {
      this.getNoticeList()
    },
    methods: {
      handleCreateOpen() {
        this.noticeCreate.uid = 0
        this.noticeCreate.ncont = ""
        this.createDialogVisible = true
      },
      handleCreateClose() {
        this.noticeCreate.uid = 0
        this.noticeCreate.ncont = ""
        this.createDialogVisible = false
      },
      handleDelete(nid) {
        this.$confirm('确认删除通知（ID：' + nid + '）?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteNotice(nid)
        })
      },
      dateFormat: function (row, column) {
        let data = row[column.property]
        if (data === undefined) {
          return ""
        }
        return moment(data).tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss")
      },
      getNoticeList() {
        this.noticeLoading = true
        this.$axios.get('/api/notice')
          .then(res => {
            if (res.data.code === 1) {
              this.noticeList = res.data.data
            } else {
              this.$message({
                message: "系统错误",
                type: "error"
              })
            }
            this.noticeLoading = false
          })
          .catch(() => {
            this.$message({
              message: "网络错误",
              type: "error"
            })
          })
      },
      deleteNotice(nid) {
        this.$axios.delete('/api/notice/' + nid)
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
            this.getNoticeList()
          })
          .catch(() => {
            this.$message({
              message: "网络错误",
              type: "error"
            })
          })
      },
      createNotice() {
        this.$axios.post('/api/notice', this.noticeCreate)
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
            this.getNoticeList()
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