<template>
  <div class="comm-mgr">
    <div class="title">
      <span class="title-text">评&nbsp;论&nbsp;管&nbsp;理</span>
      <span class="title-text-small">Comment Management</span>
      <div class="title-tooltip">
        <el-input placeholder="请输入主题ID" v-model="tid">
          <template slot="prepend">主题ID</template>
          <el-button slot="append" icon="el-icon-search" @click="getCommList(1)"></el-button>
        </el-input>
      </div>
    </div>
    <el-divider></el-divider>
    <div class="comm" ref="commTable">
      <el-table
        :data="commList"
        :max-height="commListHeight"
        v-loading="commLoading"
        style="width: 100%"
      >
        <el-table-column
          prop="cid"
          label="ID"
          min-width="30"
          sortable
        ></el-table-column>
        <el-table-column
          prop="ccont"
          label="内容"
          min-width="80"
        ></el-table-column>
        <el-table-column
          prop="ctime"
          label="时间"
          min-width="50"
          sortable
          :formatter="dateFormat"
        ></el-table-column>
        <el-table-column
          prop="uname"
          label="用户"
          min-width="30"
          sortable
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
              @click="handleDelete(scope.row.cid)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="comm-pagination" ref="commPag">
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
  import moment from "moment-timezone";

  export default {
    name: "CommMgr",
    data() {
      return {
        tid: "",
        commList: [],
        commListHeight: window.innerHeight * 0.7,
        commLoading: false,
        pageTotal: 0,
        query: {
          pageIndex: 1,
          pageSize: 10
        }
      }
    },
    methods: {
      handleDelete(cid) {
        this.$confirm('确认删除评论（ID：' + cid + '）?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.deleteComm(cid)
        })
      },
      handleCurrentChange(value) {
        this.query.pageIndex = value
        this.getCommList(this.query.pageIndex)
      },
      dateFormat: function (row, column) {
        let data = row[column.property]
        if (data === undefined) {
          return ""
        }
        return moment(data).tz("Asia/Shanghai").format("YYYY-MM-DD HH:mm:ss")
      },
      getCommList(currentPage) {
        this.commLoading = true
        this.$axios.get('/api/tcomm/' + this.tid, { params: { page: currentPage } })
        .then(res => {
          if (res.data.code === 1) {
            this.commList = res.data.data.list
            this.pageTotal = res.data.data.total
            this.commLoading = false
          }
        })
      },
      deleteComm(cid) {
        this.$axios.delete('/api/comm/' + cid)
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
          this.getCommList(this.query.pageIndex)
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
    &-tooltip
      height 2em
      line-height 2em
      float right

  .comm-pagination
    margin-top 1em
</style>