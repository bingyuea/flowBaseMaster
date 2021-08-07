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
        v-loading = 'loading'
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
    deleteJSON
  } from '../../../src/api/svg'

  export default {
    name: 'manageGUI',
    props: ['show'],
    watch: {
      show (val) {
        if (val) this.query()
      }
    },
    methods: {
      loadFn (row) {
        this.$emit('loadJson', row)
      },
      deleteFn (row) {
        if (row && row.topologyId) {
          this.$alert('是否删除', '提示', {
            confirmButtonText: '确定',
            type: 'warning',
            callback: async action => {
              await deleteJSON({ topologyId: row.topologyId })
              this.query()
            }
          })
        }
      },
      async copyFn (row) {
        const obj = { ...row, userId: 1, projectId: 0, action: 2 }
        await this.$emit('copyFn', obj)
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
      async query () {
        this.loading = true
        try {
          const { data } = await getjsons({ userId: 1 })
          this.loading = false
          if (!data) return
          console.log(JSON.parse(data))
          this.tableData = JSON.parse(data)
        } catch (e) {
          this.loading = false
        }
      },
      close () {
        this.$emit('update:show', false)
      }
    },
    data () {
      return {
        loading: false,
        tableHead: [
          {
            prop: 'projectId',
            label: '项目名'
          },
          {
            prop: 'topologyId',
            label: '拓扑id'
          },
          {
            prop: 'name',
            label: '拓扑名'
          },
          {
            prop: 'version',
            label: '当前版本'
          },
          {
            prop: 'newTime',
            label: '创建时间'
          },
          {
            prop: 'modifiedTime',
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
