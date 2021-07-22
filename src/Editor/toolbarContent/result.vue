<template>
  <el-dialog
    title="查看报告"
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
        style="width: 750px">
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
          width='100px'
        >
          <template slot-scope="scope">
            <el-button v-show='scope.row[5] === 1' @click="handleClick(scope.row)" type="text" size="small">查看电流曲线
            </el-button>
          </template>
        </el-table-column>

      </el-table>
    </template>

    <span slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary">确 定</el-button>
    </span>

    <el-dialog
      width="550px"
      title="电流曲线"
      :destroy-on-close="true"
      :visible.sync="innerVisible"
      append-to-body>
      <div v-loading='loading' id='ShortCircuit' style="height: 400px"></div>
    </el-dialog>
  </el-dialog>
</template>

<script>
  import {
    startCalc,
    getCalcRes
  } from '../../../src/api/svg'
  import * as echarts from 'echarts/core'
  import {
    BarChart
    ,
    LineChart
  } from 'echarts/charts'
  // 引入提示框，标题，直角坐标系组件，组件后缀都为 Component
  import {
    TitleComponent,
    TooltipComponent,
    GridComponent
  } from 'echarts/components'
  import { CanvasRenderer } from 'echarts/renderers'
  // 注意，新的接口中默认不再包含 Canvas 渲染器，需要显示引入，如果需要使用 SVG 渲染模式则使用 SVGRenderer
  echarts.use(
    [TitleComponent, LineChart, TooltipComponent, GridComponent, BarChart, CanvasRenderer]
  )
  export default {
    name: 'upload',
    props: ['show'],
    watch: {
      async show (val) {
        if (val) {
          let data = await startCalc()
          this.tableData = (data.data || []).map((item, index) => {
            item[ 2 ] = item[ 2 ].toFixed(4)
            item[ 3 ] = item[ 3 ].toFixed(4)
            item[ 4 ] = item[ 4 ].toFixed(4)
            return item
          })
        }
      }
    },
    data () {
      return {
        innerVisible: false,
        loading: false,
        tableHead: [
          {
            prop: '0',
            label: '设备idx'
          },
          {
            prop: '1',
            label: '设备名'
          },
          {
            prop: '2',
            label: '对称短路电流'
          },
          {
            prop: '3',
            label: '短路电流上包线'
          },
          {
            prop: '4',
            label: '功率因数'
          }
        ],
        tableData: [{}]
      }
    },
    computed: {},
    methods: {

      generateData (data) {
        const temp = data.map((item, index) => {
          return [index, item.toFixed(4)]
        })
        return temp
      },
      async drawChart (data) {
        const option = {
          animation: true,
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            top: 30,
            left: 30,
            right: 30,
            bottom: 30
          },
          xAxis: {
            name: 'x',
            minorTick: {
              show: true
            },
            minorSplitLine: {
              show: true
            }
          },
          yAxis: {
            name: 'y',
            min: -5,
            max: 20,
            minorTick: {
              show: true
            },
            minorSplitLine: {
              show: true
            }
          },
          dataZoom: [{
            show: true,
            type: 'inside',
            filterMode: 'none',
            xAxisIndex: [0],
            startValue: -20,
            endValue: 20
          }, {
            show: true,
            type: 'inside',
            filterMode: 'none',
            yAxisIndex: [0],
            startValue: -20,
            endValue: 20
          }],
          series: [
            {
              type: 'line',
              showSymbol: false,
              clip: true,
              data: this.generateData(data[ 0 ])
            },
            {
              type: 'line',
              showSymbol: false,
              clip: true,
              data: this.generateData(data[ 1 ])
            },
            {
              type: 'line',
              showSymbol: false,
              clip: true,
              data: this.generateData(data[ 2 ])
            },
            {
              type: 'line',
              showSymbol: false,
              clip: true,
              data: this.generateData(data[ 3 ])
            }
          ]
        }
        const myChart = echarts.init(document.getElementById('ShortCircuit'))
        myChart.setOption(option)
      },
      async handleClick (row) {
        if (!String(row[ 0 ])) this.$Message.error('该设备的idx不存在，请检查！')
        this.innerVisible = true
        this.loading = true
        try {
          const data = await getCalcRes(row[ 0 ])
          await this.$nextTick()
          await this.drawChart(data.data)
          this.loading = false
        } catch (e) {
          console.log(e)
          this.loading = false
        }
      },
      close () {
        this.$emit('update:show', false)
      }
    }
  }
</script>

<style scoped>

</style>
