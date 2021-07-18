<template>
  <el-dialog
    title="查看报告"
    :visible="show"
    :destroy-on-close='true'
    width="798px"
    @close = 'close'
  >
    <template>
      <el-table
        :data="tableData"
        height="400"
        border
        fit
        style="width: 100%">
        <el-table-column
          v-for = '(item,key) in tableHead'
          :key="key"
          show-overflow-tooltip
          :prop="item.prop"
          :label="item.label"
          >
        </el-table-column>

        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看电流曲线</el-button>
          </template>
        </el-table-column>

      </el-table>
    </template>

    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>

    <el-dialog
      width="600px"
      title="电流曲线"
      :visible.sync="innerVisible"
      append-to-body>

      <img src="@/assets/images/line.png" alt="" style = 'width: 100%'>
    </el-dialog>
  </el-dialog>
</template>

<script>
  export default {
    name: 'upload',
    props: ['show'],
    data () {
      return {
        innerVisible: false,
        loading: false,
        tableHead: [
          { prop: '1', label: '设备idx' },
          { prop: '2', label: '设备名' },
          { prop: '3', label: '对称短路电流' },
          { prop: '4', label: '短路电流上包线' },
          { prop: '5', label: '功率因数' }
        ],
        tableData: [
          {

          }
        ]
      }
    },
    computed: {
    },
    methods: {
      handleClick (row) {
        this.innerVisible = true
      },
      close () {
        this.$emit('update:show', false)
      }
    }
  }
</script>

<style scoped>

</style>
