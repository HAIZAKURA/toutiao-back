<template>
  <div class="thread-mgr">
    <div class="title">
      <span class="title-text">主&nbsp;题&nbsp;管&nbsp;理</span>
      <span class="title-text-small">Thread Management</span>
    </div>
    <el-divider></el-divider>
    <div class="thread" ref="threadTable">
      <el-table
        :data="threadList"
        :max-height="threadListHeight"
        v-loading="threadLoding"
        style="width: 100%"
      >
        <el-table-column
          prop="tid"
          label="ID"
          min-width="20"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="tname"
          label="标题"
          min-width="70"
        >
        </el-table-column>
        <el-table-column
          prop="ttime"
          label="时间"
          min-width="50"
          :formatter="dateFormat"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="ttop"
          label="置顶"
          min-width="20"
          :formatter="topFormat"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="fid"
          label="分区"
          min-width="30"
          :formatter="forumFormat"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="uid"
          label="用户ID"
          min-width="30"
          sortable
        >
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="50"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              type="success"
              @click="handleEditOpen(scope.row.tid)"
            ></el-button>
            <el-button
              v-if="scope.row.ttop === 0"
              size="mini"
              icon="el-icon-top"
              type="primary"
              @click="setTopThread(scope.row.tid)"
            ></el-button>
            <el-button
              v-else
              size="mini"
              icon="el-icon-bottom"
              type="primary"
              @click="setDetopThread(scope.row.tid)"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.row.tid)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="thread-pagination" ref="threadPag">
      <el-pagination
        layout="total, prev, pager, next"
        :current-page="query.pageIndex"
        :page-size="query.pageSize"
        :total="pageTotal"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>

    <div class="create-btn">
      <el-tooltip class="item" effect="dark" content="创建主题" placement="left">
        <el-button type="success" icon="el-icon-plus" circle></el-button>
      </el-tooltip>
    </div>

    <!-- Edit Dialog -->
    <el-dialog
      title="修 改 主 题"
      :visible.sync="editDialogVisable"
      width="60%"
      top="6vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :destroy-on-close="true"
      center
    >
      <div class="editFormDiv">
        <el-form ref="editForm" :model="threadDetail" label-width="80px">
          <el-form-item label="标题">
            <el-input
              maxlength="40"
              v-model="threadDetail.tname"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              type="textarea"
              maxlength="10000"
              v-model="threadDetail.tcont"
              :autosize="{ minRows: 10, maxRows: 18 }"
              show-word-limit
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="handleEditClose">取&nbsp;消</el-button>
        <el-button type="primary" @click="handleEditConfirm(threadDetail.tid)">确&nbsp;定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import moment from "moment"

  export default {
    name: "ThreadMgr",
    data() {
      return {
        query: {
          pageIndex: 1,
          pageSize: 20
        },
        pageTotal: 0,
        forumList: [],
        threadListHeight: window.innerHeight * 0.75,
        threadList: [],
        threadLoding: true,
        threadDetail: "",
        editDialogVisable: false
      }
    },
    created() {
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
        })
        .catch(() => {
          this.$message({
            message: "网络错误",
            type: "error"
          })
        })
      this.getThreadList(this.query.pageIndex)
    },
    methods: {
      handleEditOpen(tid) {
        this.getThreadDetail(tid)
        this.editDialogVisable = true
      },
      handleEditClose() {
        this.threadDetail = ""
        this.editDialogVisable = false
      },
      handleEditConfirm(tid) {
        this.$axios.put('/api/thread/' + tid, this.threadDetail)
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: "修改成功",
                type: "success"
              })
              this.handleEditClose()
            } else {
              this.$message({
                message: "系统错误或权限不足",
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
      handleDelete(tid) {
        this.$confirm('确认删除主题（ID：' + tid + '）?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteThread(tid)
        })
      },
      handleDeltetClose() {
        console.log("")
      },
      dateFormat: function (row, column) {
        let data = row[column.property]
        if (data === undefined) {
          return ""
        }
        return moment(data).format("YYYY-MM-DD HH:mm:ss")
      },
      topFormat: function (row, column) {
        let data = row[column.property]
        if (data === undefined) {
          return ""
        }
        return data === 1 ? "是" : "否"
      },
      delFormat: function (row, column) {
        let data = row[column.property]
        if (data === undefined) {
          return ""
        }
        return data === 1 ? "是" : "否"
      },
      forumFormat: function (row, column) {
        let data = row[column.property]
        if (data === undefined) {
          return ""
        }
        function checkFid(item) {
          return item.fid === data
        }
        return this.forumList[this.forumList.findIndex(checkFid)].fname
      },
      getThreadList(currentPage) {
        this.threadLoding = true
        this.$axios.get('/api/thread', { params: { page: currentPage } })
          .then(res => {
            if (res.data.code === 1) {
              this.threadList = res.data.data.list
              this.pageTotal = res.data.data.total
              this.threadLoding = false
            }
          })
      },
      handleCurrentChange(value) {
        this.query.pageIndex = value
        this.getThreadList(this.query.pageIndex)
      },
      getThreadDetail(tid) {
        this.$axios.get('/api/thread/' + tid)
          .then(res => {
            if (res.data.code === 1) {
              this.threadDetail = res.data.data
            } else {
              this.$message({
                message: "系统错误",
                type: "error"
              })
              this.threadDetail = ""
            }
          })
          .catch(() => {
            this.$message({
              message: "网络错误",
              type: "error"
            })
            this.threadDetail = ""
          })
      },
      setTopThread(tid) {
        this.$axios.put('/api/top/' + tid)
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: "主题置顶成功",
                type: "success"
              })

            } else {
              this.$message({
                message: "系统错误或权限不足",
                type: "error"
              })
            }
            this.getThreadList(this.query.pageIndex)
          })
          .catch(() => {
            this.$message({
              message: "网络错误",
              type: "error"
            })
          })
      },
      setDetopThread(tid) {
        this.$axios.delete('/api/top/' + tid)
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: "主题已取消置顶",
                type: "success"
              })
            } else {
              this.$message({
                message: "系统错误或权限不足",
                type: "error"
              })
            }
            this.getThreadList(this.query.pageIndex)
          })
          .catch(() => {
            this.$message({
              message: "网络错误",
              type: "error"
            })
          })
      },
      deleteThread(tid) {
        this.$axios.delete('/api/thread/' + tid)
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: "主题已删除",
                type: "success"
              })
            } else {
              this.$message({
                message: "系统错误或权限不足",
                type: "error"
              })
            }
            this.getThreadList(this.query.pageIndex)
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

  .thread-pagination
    margin-top 1em

  .create-btn
    position absolute
    bottom 3em
    right 4em
</style>