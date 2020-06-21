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
        >
        </el-table-column>
        <el-table-column
          prop="tname"
          label="标题"
          min-width="80"
        >
        </el-table-column>
        <el-table-column
          prop="ttime"
          label="时间"
          min-width="40"
          :formatter="dateFormat"
        >
        </el-table-column>
        <el-table-column
          prop="ttop"
          label="置顶"
          min-width="20"
          :formatter="topFormat"
        >
        </el-table-column>
        <el-table-column
          prop="tdel"
          label="已删除"
          min-width="20"
          :formatter="delFormat"
        >
        </el-table-column>
        <el-table-column
          prop="fid"
          label="分区"
          min-width="20"
          :formatter="forumFormat"
        >
        </el-table-column>
        <el-table-column
          prop="uid"
          label="用户ID"
          min-width="20"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          min-width="60"
        >
          <template slot-scope="scope">
            <el-button size="mini" icon="el-icon-search" @click="handleView(scope.row.tid)"></el-button>
            <el-button size="mini" icon="el-icon-edit" type="success" @click="handleEdit(scope.row.tid)"></el-button>
            <el-button size="mini" icon="el-icon-top" type="primary" @click="handleTop(scope.row.tid)"></el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.tid)"></el-button>
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
        threadLoding: true
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
      handleView(index) {
        console.log(index)
      },
      handleEdit(index) {
        console.log(index)
      },
      handleTop(index) {
        console.log(index)
      },
      handleDelete(index) {
        console.log(index)
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
</style>