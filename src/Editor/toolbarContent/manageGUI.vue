<template>

  <el-dialog
    title="拓扑管理"
    :visible="show"
    :destroy-on-close='true'
    width="798px"
    @close='close'
  >
    <template>
      <el-table
        :data="tableData"
        height="400"
        border
        fit
        style="width: 800px">
        <el-table-column
          v-for='(item,key) in tableHead'
          :key="key"
          show-overflow-tooltip
          :prop="item.prop"
          :label="item.label"
        >
        </el-table-column>

        <el-table-column
          label="操作"
          width='200px'
          align="center"
        >
          <template slot-scope="scope">
            <el-button @click="loadFn(scope.row)" type="text" size="small">载入</el-button>
            <el-button @click="exportFn(scope.row)" type="text" size="small">导出</el-button>
            <el-button @click="deleteFn(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="copyFn(scope.row)" type="text" size="small">另存为</el-button>
          </template>
        </el-table-column>

      </el-table>
    </template>
  </el-dialog>

</template>

<script>
  import {
    getjsons,
    uploadjson,
    deleteJSON
  } from '../../../src/api/svg'

  export default {
    name: 'manageGUI',
    props: ['show'],
    methods: {
      loadFn (row) {
        if (row.jsonData) { this.$emit('loadJSON', row.jsonData) }
      },
      deleteFn (row) {
        if (row && row.topologyId) {
          this.$alert('是否删除？', '提示', {
            type: 'warning'
          }).then(() => {
            deleteJSON(row.topologyId)
          })
        }
      },
      copyFn () {
        uploadjson({
          userId: 1,
          projectId: 0,
          // 0 新建 1覆盖 2 另存为
          action: 2,
          name: '',
          version: '',
          jsonData: ''
        }).then(() => {
          this.$message.success('另存为副本成功')
          this.query()
        }).catch(() => {
          this.$message.error('另存为副本失败')
        })
      },
      exportFn (row) {
        const blob = row.jsonData
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.textContent = 'download json'
        link.href = url
        link.download = 'GUI'
        link.click()
      },
      query () {
        const data = getjsons({ userId: 1 })
        this.tableData = data
      },
      close () {
        this.$emit('update:show', false)
      }
    },
    mounted () {
      this.query()
    },
    data () {
      return {
        tableHead: [
          {
            prop: '0',
            label: '设备idx'
          },
          {
            prop: '1',
            label: '项目名'
          },
          {
            prop: '2',
            label: '拓扑id'
          },
          {
            prop: '3',
            label: '拓扑名'
          },
          {
            prop: '4',
            label: '当前版本'
          },
          {
            prop: '',
            label: '创建时间'
          },
          {
            prop: '',
            label: '修改时间'
          }
        ],
        tableData: [{}]
      }
    }
  }
</script>

<style scoped>

</style>
