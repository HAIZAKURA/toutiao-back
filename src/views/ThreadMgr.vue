<template>
  <div class="thread-mgr">
    <div class="title">
      <span class="title-text">主&nbsp;题&nbsp;管&nbsp;理</span>
      <span class="title-text-small">Thread Management</span>
      <div class="title-btn">
        <el-tooltip class="item" effect="dark" content="创建主题" placement="left">
          <el-button type="success" icon="el-icon-plus" circle @click="handleCreateOpen"></el-button>
        </el-tooltip>
      </div>
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
          prop="fname"
          label="分区"
          min-width="30"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="uname"
          label="用户"
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

    <!-- Edit Dialog -->
    <el-dialog
      title="修 改 主 题"
      :visible.sync="editDialogVisible"
      width="60%"
      top="6vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :destroy-on-close="true"
      center
    >
      <div class="editFormDiv">
        <el-form ref="editForm" label-position="left" :model="threadDetail" label-width="80px">
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

    <!-- Create Dialog -->
    <el-dialog
      title="新 增 主 题"
      :visible.sync="createDialogVisible"
      width="60%"
      top="6vh"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      :destroy-on-close="true"
      center
    >
      <div class="createFormDiv">
        <el-form ref="createForm" label-position="left" :model="threadCreate" label-width="80px">
          <el-form-item label="标题">
            <el-input
              maxlength="40"
              v-model="threadCreate.tname"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="内容">
            <el-input
              type="textarea"
              maxlength="10000"
              v-model="threadCreate.tcont"
              :autosize="{ minRows: 8, maxRows: 16 }"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item label="分区">
            <el-select v-model="threadCreate.fid" placeholder="请选择">
              <el-option
                v-for="item in forumList"
                :key="item.fid"
                :label="item.fname"
                :value="item.fid">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="handleCreateClose">取&nbsp;消</el-button>
        <el-button type="primary" @click="createThread">确&nbsp;定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import moment from "moment-timezone"

  export default {
    name: "ThreadMgr",
    data() {
      return {
        query: {
          pageIndex: 1,
          pageSize: 20
        },
        pageTotal: 0,
        threadListHeight: window.innerHeight * 0.75,
        threadList: [],
        threadLoding: true,
        threadDetail: {
          tid: "",
          tname: "",
          tcont: ""
        },
        threadCreate: {
          tname: "",
          tcont: "",
          fid: 1
        },
        editDialogVisible: false,
        createDialogVisible: false
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
        this.editDialogVisible = true
      },
      handleEditClose() {
        this.threadDetail = ""
        this.editDialogVisible = false
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
      handleCreateOpen() {
        this.threadCreate.tname = ""
        this.threadCreate.tcont = ""
        this.threadCreate.fid = 1
        this.createDialogVisible = true
      },
      handleCreateClose() {
        this.threadCreate.tname = ""
        this.threadCreate.tcont = ""
        this.threadCreate.fid = 1
        this.createDialogVisible = false
      },
      dateFormat: function (row, column) {
        let data = row[column.property]
        if (data === undefined) {
          return ""
        }
        return moment(data).tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss")
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
      },
      createThread() {
        this.$axios.post('/api/thread', this.threadCreate)
          .then(res => {
            if (res.data.code === 1) {
              this.$message({
                message: "新增主题成功",
                type: "success"
              })
            } else {
              this.$message({
                message: "系统错误或权限不足",
                type: "error"
              })
            }
            this.getThreadList(this.query.pageIndex)
            this.handleCreateClose()
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

  .thread-pagination
    margin-top 1em
</style>