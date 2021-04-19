/**
* Created by OXOYO on 2019/6/28.
*
* MaterialsEditor 物料编辑器
*/

<style scoped lang="less" rel="stylesheet/less">
.materials-editor {
  display: inline-block;
  width: 100%;
  height: 100%;
  user-select: none;
  overflow: hidden;
  background: #f8f9fa;
}
.run {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f8f9fa;

  .sketchpad-box {
    left: 0 !important;
    overflow-x: hidden;


    .sketchpad {
      width: 100% !important;
      height: 100% !important;
      left: 0% !important;
      margin-left: 0 !important;
      margin-top: 0px !important;
      margin-bottom: 0px !important;
    }

  }

  .right_content {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 300px;
    right: 0;
  }

  .button_content {
    padding: 10px;
  }
}
</style>

<template>
  <div v-if="mode === 'run'" class="run">
    <Sketchpad :sketchpadStyle="{
        width: '100%',
        height: '100%',
        position: 'absolute',
        left: 0,
        marginLeft: 0,
        marginTop: 0,
        marginBottom: 0
      }"></Sketchpad>
    <div class="right_content">

      <div class='button_content'>
        <el-button @click="dialogVisible = true">开始仿真</el-button>
        <el-button type="" @click='getRegtogglers'>获取开关倒闸方案</el-button>
        <div style="margin-top: 10px">
          <el-button @click='settoggleractionFn'>开关设置</el-button>
          <el-button @click='getelementparasFn'>查看仿真波形</el-button>
        </div>
      </div>
      <div class="flex_layout">
        <div class="table flex—item">
          <el-divider content-position="left">负荷转供倒闸方案</el-divider>
          <el-card class="box-card">
            <el-table
              :data="tableData"
              border
              empty-text='暂无数据'
              height="250px"
              style="width: 100%">
              <el-table-column
                v-for='item in tableHeader'
                align="center"
                :prop="item.prop"
                :label="item.label">
              </el-table-column>

            </el-table>
          </el-card>
        </div>

        <div class='history flex—item'>
          <el-divider content-position="left">操作轨迹</el-divider>
          <el-card class="box-card">
          </el-card>
        </div>

        <div class="flex—item">
          <el-divider content-position="left">曲线图</el-divider>
          <div id="main" style="height: 100%">
          </div>
        </div>
      </div>
    </div>

    <!---设置运行参数-->
    <el-dialog
      title="设置运行参数"
      :visible.sync="dialogVisible"
      width="30%"
    >
      <el-form
        :model="formData"
        label-width="110px"
      >
        <el-form-item
          label="文件名："
          prop="file"
        >
          <el-select v-model="formData.file" style="width: 100%;">
            <el-option label="文件一" value="fileName"></el-option>
            <el-option label="文件二" value="fileName1"></el-option>
          </el-select>
        </el-form-item>


        <el-form-item
          label="故障路线编号："
          prop="lineNo"
        >
          <el-input v-model="formData.lineNo"/>
        </el-form-item>

        <el-form-item
          label="比例："
          prop="ratio"
        >
          <el-input v-model="formData.ratio"/>
        </el-form-item>

        <el-form-item
          label="故障时间："
          prop="faultTime"
        >
          <el-input v-model="formData.faultTime"/>
        </el-form-item>


      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="settingparametersFn">确 定</el-button>
      </span>
    </el-dialog>

  </div>

  <div class="materials-editor" @click="handleEditorClick" @contextmenu.stop.prevent v-else>
    <ToolBar :editorData="editorData" :toolList="toolList" :currentItem="currentItem"></ToolBar>
    <Sketchpad></Sketchpad>
    <PanelLeft :materialList="materialList"></PanelLeft>
    <PanelRight :editorConfig="editorConfig" :toolList="toolList" :currentItem="currentItem" :originDataObj='originDataObj' :eventItem='eventItem' :mode = 'mode'></PanelRight>
    <PreviewModel></PreviewModel>
    <ContextMenu :editorData="editorData" :toolList="toolList"></ContextMenu>
    <ShortcutList ref="shortcutList" :toolList="toolList" :shortcutMap="shortcutMap"></ShortcutList>
    <History ref="history" @on-revert="doRevert"></History>
  </div>
</template>

<script>
  import ToolBar from './containers/ToolBar'
  import Sketchpad from './containers/Sketchpad'
  import PanelLeft from './containers/PanelLeft'
  import PanelRight from './containers/PanelRight'
  import PreviewModel from './containers/PreviewModel'
  import ContextMenu from './containers/ContextMenu'
  import ShortcutList from './containers/ShortcutList'
  import History from './containers/History'
  import utils from '@/global/g6/utils'
  // 扩展了节点、边的G6
  import G6 from '@/global/g6/index'
  import * as G6Util from '@antv/util'
  // 自定义栅格插件
  // import XGrid from '@/global/g6/plugins/XGrid'
  // 背景图
  import XBackground from '@/global/g6/plugins/XBackground'
  // 全屏
  import screenfull from 'screenfull'
  // 热键
  import Mousetrap from 'mousetrap'
  import XLSX from 'xlsx'
  import moment from 'moment'
  import {
    getDevice,
    getSvgById
  } from '../api/svg'
  import {
    settingparameters,
    startrunning,
    regtogglers,
    settoggleraction,
    getelementparas
  } from '../api/yuTao'
  import _ from 'lodash'
  import {
    iconStyle,
    shapeControl
  } from '../config/icon'

  export default {
    name: 'MaterialsEditor',
    components: {
      ToolBar,
      Sketchpad,
      PanelLeft,
      PanelRight,
      PreviewModel,
      ContextMenu,
      ShortcutList,
      History
    },
    props: {
      maxLogSize: {
        type: Number,
        default: 20
      }
    },
    data () {
      return {
        dialogVisible: false,
        formData:
          {"faultTime": 0.2, "ratio": 0.6, "lineNo": 111, "file": "filename"}
        ,
        tableData: [],
        tableHeader: [
          {
            label: '开关编号',
            prop: 'name'
          },
          {
            label: '操作时间',
            prop: 'date'
          }
        ],
        eventItem: {},
        originDataObj: {},
        editorInfo: {},
        defInfo: {
          // 编辑器状态：add || edit || preview
          status: 'add'
        },
        editor: null,
        mode: 'edit',
        isFullScreen: false,
        clipboard: {
          data: null,
          // 粘贴计数器
          count: 0
        },
        // 工具列表
        toolList: [],
        // 快捷键列表
        shortcutMap: {},
        // 物料列表
        materialList: [],
        // 当前激活元素
        currentItem: [],
        materials: []
      }
    },
    computed: {
      editorData () {
        return this.editor && this.editor.$D ? this.editor.$D : null
      },
      editorConfig () {
        return this.editor && this.editor.$C ? this.editor.$C : null
      }
    },
    methods: {
      settingparametersFn(){
        console.log(this.formData)
        settingparameters({...this.formData}).then(() => {
          startrunning()
        })
      },
      getelementparasFn() {
        getelementparas({"eleNo": 123})
        let res = {
          "element_paras": {
            "qSlack": 777,
            "aBus": 444,
            "pSlack": 666,
            "time": 15129,
            "deltaGENROU": 30,
            "vBou": 555,
            "omegaGENROU": 45,
            "iLine": 5
          }
        }
        let option = {
          xAxis: {
            type: 'category',
            data: ['15129', '15130', '15131', '15132', '15133', '15134', '15135']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [620, 732, 801, 934, 1090, 1130, 1320],
            type: 'line',
            smooth: true
          }]
        };
        this.drawChart(option)
      },
      settoggleractionFn() {
        settoggleraction({"togglerNo": 123})
      },
      getRegtogglers() {
        regtogglers().then(res => {
          this.tableData = res.reg_togglers.map(item => {
            return {
              name: item,
              date: moment().format("YYYY-MM-DD")
            }
          })
        })
      },
      async drawChart(option) {
        if (option) {
          let myChart = echarts.init(document.getElementById("main"));
          myChart.setOption(option);
        }
      },
      getOriginData (id) {
        const originDataObj = JSON.parse(localStorage.getItem('originDataObj' + String(id)))
        if (originDataObj) {
          this.originDataObj = { ...originDataObj }
        } else {
          getSvgById(id).then(res => {
            this.originDataObj = {
              originData: res.data,
              originId: id
            }
            localStorage.setItem('originDataObj' + String(id), JSON.stringify({
              originData: res.data,
              originId: id
            }))
          })
        }
      },
      getDevices () {
        const res = {
          data: ''
        }
        if (localStorage.getItem('devices')) {
          res.data = JSON.parse(localStorage.getItem('devices'))
          this.devices = _.groupBy(res.data, 'typeId')
        } else {
          getDevice().then(res => {
            localStorage.setItem('devices', JSON.stringify(res.data))
            this.devices = _.groupBy(res.data, 'typeId')
            window.location.reload()
          })
        }
        this.devices = _.groupBy(res.data, 'typeId')
        const materials = []
        if (this.devices && Object.entries(this.devices).length) {
          for (const k in this.devices) {
            const temp = {
              name: this.devices[k][0].type || '',
              label: this.devices[k][0].type || '',
              icon: '',
              enable: true,
              children: this.devices[k].map(item => {
                  const height = iconStyle[item.name].height
                  const width = iconStyle[item.name].width
                  return {
                    shape: item.name,
                    type: item.name,
                    originId: item.id,
                    label: item.name,
                    data: JSON.stringify(item),
                    defaultLabel: '',
                    enable: true,
                    width: Number(width) / 2,
                    height: Number(height) / 2,
                    anchorPoints: iconStyle[item.name].anchorPoints,
                    shapeControl: shapeControl,
                    img: item.imgUrl
                  }
                }
              )
            }
            materials.push(temp)
          }
        }
        this.materials = materials
      },
      init () {
        this.getDevices()
        const _t = this
        // 初始化存储数据
        const {
          toolList,
          shortcutMap
        } = _t.$X.config.tools
        const materials = this.materials
        _t.$X.config.materials = this.materials
        _t.toolList = toolList
        _t.shortcutMap = shortcutMap
        _t.materialList = materials
        _t.$X.utils.storage.set('toolList', toolList, _t.$X.config.storage.prefix)
        _t.$X.utils.storage.set('shortcutMap', shortcutMap, _t.$X.config.storage.prefix)
        _t.$X.utils.storage.set('materials', materials, _t.$X.config.storage.prefix)
        _t.$X.utils.storage.set('log', {
          current: null,
          list: []
        }, _t.$X.config.storage.prefix)
        const el = _t.$el
        // 画板
        const sketchpad = el.querySelector('#sketchpad')
        const plugins = []
        if (_t.$X.config.infoPanel.navigator.enable) {
          // 导航器
          const navigator = el.querySelector('#navigator')
          const size = [
            navigator.clientWidth,
            parseInt(navigator.clientWidth * sketchpad.clientHeight / sketchpad.clientWidth)
          ]
          const navigatorConfig = _t.$X.config.infoPanel.navigator.config || {}
          const minimap = new G6.Minimap({
            container: navigator,
            // FIXME 【BUG】type 为 keyShape 时导航图中元素显示错位，暂改为 delegate
            type: 'delegate',
            size: size,
            delegateStyle: {
              fill: '#ffffff',
              stroke: '#000000'
            },
            ...navigatorConfig
          })
          plugins.push(minimap)
        }
        const grid = new G6.Grid()
        const background = new XBackground()
        plugins.push(grid)
        plugins.push(background)
        // 生成编辑器实例
        _t.editor = new G6.Graph({
          plugins,
          container: sketchpad,
          width: sketchpad.clientWidth,
          height: sketchpad.clientHeight,
          fitView: true,
          fitViewPadding: 20,
          autoPaint: true,
          // renderer: 'svg',
          // 模式
          modes: {
            edit: [
              {
                type: 'node-control',
                config: {
                  shapeControlPoint: {
                    // 是否在缩放、旋转节点时更新所有与之相连的边
                    updateEdge: false
                  },
                  dragNode: {
                    // 是否在拖拽节点时更新所有与之相连的边
                    updateEdge: false
                  },
                  // 是否支持在节点上添加文本
                  nodeLabel: true,
                  // 是否支持在边上添加文本
                  edgeLabel: true,
                  // tooltip 是否启用
                  tooltip: {
                    shapeControl: true,
                    dragNode: true,
                    dragEdge: true
                  },
                  // 是否启用对齐线
                  alignLine: {
                    enable: true,
                    style: {
                      stroke: '#FFA500',
                      lineWidth: 1
                    }
                  }
                }
              }
            ],
            // 微调
            paramsEdit: [
              {
                type: 'params-control',
                config: {
                  dragNode: {
                    // 是否在拖拽节点时更新所有与之相连的边
                    updateEdge: false
                  },
                }
              }
            ],
            // 只读，
            preview: [
              'zoom-canvas',
              'drag-canvas',
              'preview-canvas'
            ],
          },
          // 分组样式
          groupType: 'rect',
          groupStyle: {
            default: {
              lineWidth: 1,
              stroke: '#29B6F2',
              // lineDash: [ 5, 5 ],
              strokeOpacity: 1,
              fill: '#29B6F2',
              fillOpacity: 0.1,
              opacity: 1,
              minDis: 0,
              maxDis: 0
            }
          }
        })
        // 挂载G6配置
        _t.editor.$C = G6.$C
        // 挂载编辑器$D命名空间，用于Vue组件与Graph之间传值
        _t.editor.$D = {
          fill: '#FFFFFF',
          fillOpacity: 1,
          lineColor: '#000000',
          strokeOpacity: 1,
          lineWidth: 1,
          lineType: 'x-line',
          lineDash: 'solid',
          startArrow: false,
          endArrow: false,
          lineAppendWidth: 10,
          autoRotate: true
        }
        // 关闭局部渲染
        // _t.editor.get('canvas').set('localRefresh', false)
        // 设置模式为编辑
        _t.doSetMode('edit')
        // 绑定事件
        _t.editor.on('canvas:mousedown', _t._canvasMousedown)
        // 绑定事件
        _t.editor.on('node:mousedown', _t._nodeMousedown)
        _t.editor.on('node:mouseover', _t._nodeHover)
        _t.editor.on('node:mouseout', _t._nodeOut)
        _t.editor.on('edge:mousedown', _t._edgeMousedown)
        _t.editor.on('editor:getItem', function (data) {
          _t.currentItem = data
        })
        _t.editor.on('editor:setItem', function (data) {
          data.forEach((item, index) => {
            const model = item.model
            // if (item.type === 'edge') {
            //   TODO 处理箭头
            // }
            const shapeItem = _t.editor.findById(item.id)
            if (!index) {
              // 更新第一个节点
              _t.editor.updateItem(shapeItem, model)
            } else {
              // FIXME 更新同组节点，只更新样式部分
              _t.editor.updateItem(shapeItem, {
                style: data[0].model.style
              })
            }
          })
          _t.editor.paint()
        })
        _t.editor.on('editor:contextmenu', function (data) {
          _t.$X.utils.bus.$emit('editor/contextmenu/open', data)
        })
        _t.editor.on('editor:record', function (from) {
          // console.log('editor:record from', from)
          // 更新操作日志
          _t.doUpdateLog({
            action: 'record',
            data: {
              time: new Date(),
              content: _t.editor.save()
            }
          })
        })
        // 绑定热键
        _t.bindShortcuts()
        // 绑定unload
        _t.bindUnload()
      },
      _canvasMousedown () {
        const _t = this
        _t.doClearAllStates()
        // 更新currentItem
        _t.currentItem = []
      },
      _nodeMousedown (event) {
        const _t = this
        _t.doClearAllStates()
        const id = event.item._cfg.model && event.item._cfg.model.originId
        this.eventItem = event.item
        if (id) this.getOriginData(id)
        _t.editor.setItemState(event.item, 'active', true)
      },
      _nodeHover (event) {
        const _t = this
        // FIXME 当节点未激活时才可设置hover true状态
        if (!event.item.hasState('active')) {
          _t.editor.setItemState(event.item, 'hover', true)
        }
      },
      _nodeOut (event) {
        const _t = this
        _t.editor.setItemState(event.item, 'hover', false)
      },
      _edgeMousedown (event) {
        const _t = this
        _t.doClearAllStates()
        // console.log('_edgeMousedown', event)
        if (event.item && !event.item.destroyed) {
          _t.editor.setItemState(event.item, 'active', !event.item.hasState('active'))
        }
      },
      // 清除所有状态
      doClearAllStates () {
        const _t = this
        if (!_t.editor) {
          return
        }
        // 批量操作时关闭自动重绘，以提升性能
        _t.editor.setAutoPaint(false)
        _t.editor.getNodes().forEach(function (node) {
          _t.editor.clearItemStates(node, ['active', 'hover', 'selected'])
        })
        _t.editor.getEdges().forEach(function (edge) {
          _t.editor.clearItemStates(edge, ['active', 'hover', 'selected'])
        })
        _t.editor.paint()
        _t.editor.setAutoPaint(true)
      },
      doZoom (info, position) {
        const _t = this
        // 缩放率
        let ratio = 1
        let center
        if (position) {
          center = position
        } else {
          const width = _t.editor.get('width')
          const height = _t.editor.get('height')
          center = {
            x: width / 2,
            y: height / 2
          }
        }
        if (info.name === 'zoom') {
          _t.editor.zoomTo(info.data, center)
        } else if (['zoomIn', 'zoomOut'].includes(info.name)) {
          const currentRatio = _t.editor.getZoom()
          const step = 0.1
          ratio = info.name === 'zoomOut' ? currentRatio - step : currentRatio + step
          ratio = ratio.toFixed(1)
          // 缩放视窗窗口到一个固定比例
          _t.editor.zoomTo(ratio, center)
          // 处理选中，更新toolList
          const toolList = []
          const toolListData = _t.$X.utils.storage.get('toolList', _t.$X.config.storage.prefix)
          if (Array.isArray(toolListData)) {
            toolListData.forEach(target => {
              if (target.enableTool) {
                if (target.name === 'zoom') {
                  target.selected = null
                  target.custom = {
                    ...target.custom,
                    enable: true,
                    label: (ratio * 1000 / 10) + '%',
                    data: ratio
                  }
                }
                toolList.push(target)
              }
            })
            _t.toolList = toolList
            _t.$X.utils.storage.set('toolList', toolList, _t.$X.config.storage.prefix)
          }
        } else if (info.name === 'actualSize') {
          ratio = 1
          _t.editor.zoomTo(ratio, center)
        }
      },
      doAddNode (info) {
        console.log(info, 'doAddNode')
        const _t = this
        const node = {
          ...info,
          id: G6Util.uniqueId(),
          draggable: true,
          label: info.defaultLabel,
          labelCfg: {
            position: 'center',
            style: {
              fontSize: 16,
              stroke: '#000000'
            }
          }
        }
        // 广播事件，通过自定义交互 node-control 添加节点
        _t.editor.emit('editor:addNode', node)
      },
      doSetMode (name) {
        console.log(name)
        const _t = this
        _t.mode = name
        _t.editor.setMode(name)
        // 更新toolList
        const toolList = []
        const toolListData = _t.$X.utils.storage.get('toolList', _t.$X.config.storage.prefix)
        if (Array.isArray(toolListData)) {
          toolListData.forEach(item => {
            if (item.enableTool) {
              if (item.hasOwnProperty('enableMode') && Array.isArray(item.enableMode)) {
                item.enable = item.enableMode.includes(name)
              }
              if (item.hasOwnProperty('disabledMode') && Array.isArray(item.disabledMode)) {
                item.disabled = !item.disabledMode.includes(name)
              }
              toolList.push(item)
            }
          })
          _t.toolList = toolList
          _t.$X.utils.storage.set('toolList', toolList, _t.$X.config.storage.prefix)
        }
      },
      handleToolTrigger (info) {
        const _t = this
        // 是否记录日志标识
        let isRecord = false
        switch (info.name) {
          case 'undo':
          case 'redo':
          case 'clearLog': {
            // 更新操作日志
            _t.doUpdateLog({
              action: info.name
            })
            if (['undo', 'redo'].includes(info.name)) {
              const log = _t.$X.utils.storage.get('log', _t.$X.config.storage.prefix)
              _t.$nextTick(function () {
                if (log.list.length) {
                  if (log.current === 0) {
                    const data = log.list[0]
                    if (data === null) {
                      // 清除
                      _t.editor.clear()
                      _t.editor.paint()
                    } else {
                      // 渲染
                      _t.editor.read(data.content)
                      _t.editor.paint()
                      // 缩放到实际大小
                      _t.doZoom({
                        name: 'actualSize'
                      })
                    }
                  } else {
                    const data = log.list[log.current]
                    // 渲染
                    _t.editor.read(data.content)
                    _t.editor.paint()
                    // 缩放到实际大小
                    _t.doZoom({
                      name: 'actualSize'
                    })
                  }
                }
              })
              // 更新currentItem
              _t.currentItem = []
            }
            break
          }
          case 'copy': {
            // FIXME 目前只支持节点的复制，不支持边的复制，边只能通过拖拽生成
            const data = _t.currentItem ? _t.currentItem.filter(item => item.type === 'node') : []
            _t.clipboard = {
              data,
              count: 0
            }
            break
          }
          case 'paste': {
            const data = _t.clipboard.data
            _t.clipboard.count++
            if (data.length) {
              data.forEach((item, index) => {
                const model = item.model
                // 计算坐标，添加一定偏移量，防止重叠
                let x = model.x + 10 * _t.clipboard.count
                let y = model.y + 10 * _t.clipboard.count
                // 如果通过右键菜单触发的，则获取触发菜单时的canvas坐标
                if (info && info.context === 'ContextMenu' && info.data) {
                  if (info.data.hasOwnProperty('canvasX')) {
                    x = model.x + info.data.canvasX - data[0].model.x
                  }
                  if (info.data.hasOwnProperty('canvasY')) {
                    y = model.y + info.data.canvasY - data[0].model.y
                  }
                }
                const node = {
                  ...model,
                  id: G6Util.uniqueId(),
                  groupId: '',
                  x,
                  y
                }
                _t.editor.addItem('node', node)
              })
            }
            break
          }
          case 'delete': {
            // 删除逻辑
            const nodes = []
            _t.editor.getNodes().forEach(node => {
              if (node.hasState('active')) {
                isRecord = true
                nodes.push(node)
              }
            })
            nodes.forEach(node => {
              _t.editor.removeItem(node)
            })
            _t.editor.getEdges().forEach(edge => {
              if (edge.hasState('active')) {
                isRecord = true
                _t.editor.removeItem(edge)
              }
            })
            // 更新currentItem
            _t.currentItem = []
            break
          }
          case 'zoom':
          case 'zoomIn':
          case 'zoomOut':
          case 'actualSize': {
            _t.doZoom(info)
            break
          }
          case 'fit': {
            _t.editor.fitView()
            break
          }
          case 'run':
            _t.doSetMode(info.data)
            console.log(info)
            break
          case 'preview': {
            console.log(info, 'preview')
            _t.doSetMode(info.data)
            break
          }
          case 'edit': {
            _t.doSetMode(info.name)
            break
          }
          case 'fill': {
            _t.editor.$D.fill = info.data
            _t.editor.getNodes().forEach(node => {
              if (node.hasState('active')) {
                isRecord = true
                const { style } = node.getModel()
                _t.editor.updateItem(node, {
                  style: {
                    ...style,
                    fill: info.data
                  }
                })
              }
            })
            break
          }
          case 'lineColor': {
            _t.editor.$D.lineColor = info.data
            // console.log('lineColor', info.data)
            _t.editor.getEdges().forEach(edge => {
              if (edge.hasState('active')) {
                isRecord = true
                const { style } = edge.getModel()
                // console.log('edge style', style)
                _t.editor.updateItem(edge, {
                  style: {
                    ...style,
                    stroke: info.data
                  }
                })
              }
            })
            _t.editor.getNodes().forEach(node => {
              if (node.hasState('active')) {
                isRecord = true
                const { style } = node.getModel()
                _t.editor.updateItem(node, {
                  style: {
                    ...style,
                    stroke: info.data
                  }
                })
              }
            })
            break
          }
          case 'lineWidth': {
            _t.editor.$D.lineWidth = info.data
            _t.editor.getEdges().forEach(edge => {
              if (edge.hasState('active')) {
                isRecord = true
                const { style } = edge.getModel()
                _t.editor.updateItem(edge, {
                  style: {
                    ...style,
                    lineWidth: info.data
                  }
                })
              }
            })
            _t.editor.getNodes().forEach(node => {
              if (node.hasState('active')) {
                isRecord = true
                const { style } = node.getModel()
                _t.editor.updateItem(node, {
                  style: {
                    ...style,
                    lineWidth: info.data
                  }
                })
              }
            })
            break
          }
          case 'lineDash': {
            const edgeConfig = _t.editor.$C.edge
            _t.editor.$D.lineDash = info.data
            _t.editor.getEdges().forEach(edge => {
              if (edge.hasState('active')) {
                isRecord = true
                const { style } = edge.getModel()
                _t.editor.updateItem(edge, {
                  style: {
                    ...style,
                    ...edgeConfig.type[info.data]
                  }
                })
              }
            })
            _t.editor.getNodes().forEach(node => {
              if (node.hasState('active')) {
                isRecord = true
                const { style } = node.getModel()
                _t.editor.updateItem(node, {
                  style: {
                    ...style,
                    ...edgeConfig.type[info.data]
                  }
                })
              }
            })
            break
          }
          case 'lineType': {
            _t.editor.$D.lineType = info.data
            _t.editor.getEdges().forEach(edge => {
              if (edge.hasState('active')) {
                isRecord = true
                _t.editor.updateItem(edge, {
                  type: info.data
                })
                _t.editor.refreshItem(edge)
              }
            })
            break
          }
          case 'startArrow':
          case 'endArrow': {
            // console.log('info', info)
            _t.editor.$D[info.name] = info.data
            const handleArrowStyle = function (data, lineColor) {
              if (!data) {
                // FIXME return false 无法在updateItem时清除箭头，暂使用如下方式清除
                return {
                  path: '',
                  d: 0,
                  fill: ''
                }
              }
              const arrowStyle = data.style
              // 处理箭头填充色
              if (typeof arrowStyle === 'object' && data.fill) {
                arrowStyle.fill = lineColor
                arrowStyle.stroke = lineColor
              }
              // console.log('arrowStyle', arrowStyle, data, lineColor)
              return arrowStyle
            }
            // 根据端点类型更新边
            _t.editor.getEdges().forEach(edge => {
              if (edge.hasState('active')) {
                isRecord = true
                const { style } = edge.getModel()
                // console.log('style', style, info.name)
                _t.editor.updateItem(edge, {
                  style: {
                    ...style,
                    [info.name]: handleArrowStyle(info.data, style.stroke)
                  }
                })
              }
            })
            break
          }
          case 'clear': {
            _t.$Modal.confirm({
              title: _t.$t('L10200'),
              // 确认清空画布？
              content: _t.$t('L10201'),
              onOk: function () {
                // 更新操作日志
                _t.doUpdateLog({
                  action: 'clear'
                })
                _t.editor.clear()
                _t.editor.paint()
              }
            })
            // 更新currentItem
            _t.currentItem = []
            break
          }
          case 'toFront':
          case 'toBack': {
            if (Array.isArray(info.data)) {
              info.data.forEach(data => {
                if (data.hasOwnProperty('id') && data.id) {
                  isRecord = true
                  const item = _t.editor.findById(data.id)
                  if (item && item[info.name]) {
                    // 执行操作
                    item[info.name]()
                    _t.editor.paint()
                  }
                }
              })
            }
            break
          }
          case 'fullscreen': {
            if (screenfull.enabled) {
              screenfull.toggle()
            }
            break
          }
          case 'upload': {
            _t.$Modal.confirm({
              title: _t.$t('L10200'),
              // 上传JSON数据将覆盖当前画布，确认上传？
              content: _t.$t('L10206'),
              onOk: function () {
                // 打开文件选择窗口
                const input = document.createElement('input')
                input.type = 'file'
                // 限定文件类型
                input.accept = '.json'
                input.click()
                input.onchange = function () {
                  const file = input.files[0]
                  // FileReader实例
                  const reader = new FileReader()
                  // 读取文件
                  reader.readAsText(file, 'UTF-8')
                  // 处理数据
                  reader.onload = function (event) {
                    try {
                      const fileString = event.target.result
                      const fileJson = JSON.parse(fileString)
                      // 清空画布
                      _t.editor.clear()
                      // 更新currentItem
                      _t.currentItem = []
                      // 设置数据
                      _t.editor.data(fileJson)
                      // 渲染
                      _t.editor.render()
                      _t.editor.getNodes().forEach(node => {
                        const model = node.getModel()
                        const radian = model.radian
                        const keyShape = node.getKeyShape()
                        keyShape.resetMatrix()
                        keyShape.rotate(radian)
                        const group = _t.editor.get('group')
                        // 更新shapeControl
                        utils.shapeControl.rotate(model, group, radian)
                        // 更新锚点
                        utils.anchor.rotate(model, group, radian)
                      })
                      // 缩放到实际大小
                      _t.doZoom({
                        name: 'actualSize'
                      })
                      // 加载数据后保存记录
                      // 更新操作日志
                      _t.doUpdateLog({
                        action: 'loadData',
                        data: {
                          time: new Date(),
                          content: _t.editor.save()
                        }
                      })
                    } catch (e) {
                      // 提示
                      _t.$Message.error(_t.$t('L10207'))
                      console.error(' EDITOR ERROR:: upload JSON failed!', e)
                    }
                  }
                }
              }
            })
            break
          }
          case 'download': {
            const fileName = _t.$X.utils.filters.formatDate(new Date(), 'YYYYMMDDhhmmss')
            if (info.data === 'image') {
              _t.editor.downloadImage(fileName)
            } else if (info.data === 'json') {
              let content = _t.editor.save()
              content = JSON.stringify(content)
              const blob = new Blob([content], {
                type: 'application/json;charset=UTF-8'
              })
              const url = URL.createObjectURL(blob)
              const link = document.createElement('a')
              link.textContent = 'download json'
              link.href = url
              link.download = fileName
              link.click()
              // no longer need to read the blob so it's revoked
              URL.revokeObjectURL(url)
            }else if (info.data === 'excel') {
              /!* create a new blank workbook *!/
              let wb = XLSX.utils.book_new();
              let dataList = []
              _t.editor.getNodes().forEach((node, index) => {
                const model = node.getModel()
                if (model.params) {
                  dataList.push(model.params)
                }
              })
              if (!dataList.length) return
              const excelData = _.groupBy(dataList, 'originId')
              Object.entries(excelData).forEach(sheet => {
                const sheetData = sheet[1]
                const sheetName = sheetData[0].form.modelName
                let s = sheetData.map((row, rowIndex) => {
                  let obj = {}
                  row.paramList.map(cell => {
                    const name = cell.name
                    obj = {
                      'uid': rowIndex, ...obj,
                      [name]: cell.defaultValue
                    }
                  });
                  return obj
                })
                console.log(s)
                XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(s), sheetName);
              })
              // let sheetData = [{department: "行政部", count: 2}, {department: "前端部", count: 2}];
              const workbookBlob = this.workbook2blob(wb);
              this.openDownloadDialog(workbookBlob, `GUI.xlsx`);
            }
            break
          }
          case 'selectAll': {
            const groupId = G6Util.uniqueId()
            _t.editor.getNodes().forEach(node => {
              // 更新节点
              _t.editor.updateItem(node, {
                groupId
              })
              _t.editor.setItemState(node, 'active', true)
            })
            break
          }
          case 'canvasBackground': {
            switch (info.data) {
              case 'default':
                _t.editor.emit('background:reset')
                break
              case 'image':
                // 打开文件选择窗口
                const input = document.createElement('input')
                input.type = 'file'
                // 限定文件类型
                input.accept = 'image/png, image/jpeg, image/jpg'
                input.click()
                input.onchange = function () {
                  const file = input.files[0]
                  // FileReader实例
                  const reader = new FileReader()
                  // 读取图片
                  if (file) {
                    reader.readAsDataURL(file)
                    // 处理数据
                    reader.onload = function (event) {
                      try {
                        const imgFile = reader.result
                        _t.editor.emit('background:update', imgFile)
                      } catch (e) {
                        console.error(' EDITOR ERROR:: update background failed!', e)
                      }
                    }
                  }
                }
                break
            }
            break
          }
          case 'up':
          case 'down':
          case 'left':
          case 'right': {
            _t.editor.getNodes().forEach(node => {
              if (node.hasState('active')) {
                isRecord = true
                const model = node.getModel()
                const position = {
                  x: model.x,
                  y: model.y
                }
                switch (info.name) {
                  case 'up':
                    position.y--
                    break
                  case 'down':
                    position.y++
                    break
                  case 'left':
                    position.x--
                    break
                  case 'right':
                    position.x++
                    break
                }
                _t.editor.updateItem(node, position)
              }
            })
            break
          }
          case 'layout': {
            _t.editor.updateLayout(info.data)
            break
          }
          case 'help': {
            if (['aboutXFC', 'shortcutList'].includes(info.data)) {
              const ref = _t.$refs[info.data]
              if (ref && ref.show) {
                ref.show()
              }
            }
            break
          }
          case 'language': {
            _t.$X.utils.storage.set('locale', info.data, _t.$X.config.storage.prefix)
            _t.$i18n.locale = info.data
            break
          }
          case 'history': {
            const ref = _t.$refs[info.name]
            if (ref && ref.show) {
              ref.show()
            }
          }
        }
        if (isRecord) {
          // 记录操作日志
          _t.editor.emit('editor:record', 'handleToolTrigger')
        }
        if (info.type === 'dropdown-list') {
          // 处理选中，更新toolList
          const toolList = []
          const toolListData = _t.$X.utils.storage.get('toolList', _t.$X.config.storage.prefix)
          if (Array.isArray(toolListData)) {
            toolListData.forEach(target => {
              if (target.enableTool) {
                if (target.name === info.name) {
                  target.selected = info.selected
                  // 更新自定义值
                  if (target.hasOwnProperty('custom')) {
                    target.custom = {
                      ...target.custom,
                      enable: false,
                      label: '',
                      data: ''
                    }
                  }
                }
                toolList.push(target)
              }
            })
            _t.toolList = toolList
            _t.$X.utils.storage.set('toolList', toolList, _t.$X.config.storage.prefix)
          }
        }
      },
      openDownloadDialog(blob, fileName) {
        if (typeof blob == "object" && blob instanceof Blob) {
          blob = URL.createObjectURL(blob); // 创建blob地址
        }
        var aLink = document.createElement("a");
        aLink.href = blob;
        // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
        aLink.download = fileName || "";
        var event;
        if (window.MouseEvent) event = new MouseEvent("click");
        //   移动端
        else {
          event = document.createEvent("MouseEvents");
          event.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        aLink.dispatchEvent(event);
      },
      workbook2blob(workbook) {
        // 生成excel的配置项
        var wopts = {
          // 要生成的文件类型
          bookType: "xlsx",
          // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
          bookSST: false,
          type: "binary"
        };
        var wbout = XLSX.write(workbook, wopts);

        // 将字符串转ArrayBuffer
        function s2ab(s) {
          var buf = new ArrayBuffer(s.length);
          var view = new Uint8Array(buf);
          for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
          return buf;
        }

        var blob = new Blob([s2ab(wbout)], {
          type: "application/octet-stream"
        });
        return blob;
      },
      initInfo (data = {}) {
        const _t = this
        _t.editorInfo = {
          ..._t.defInfo,
          ...data
        }
      },
      bindShortcuts () {
        const _t = this
        const toolListData = _t.$X.utils.storage.get('toolList', _t.$X.config.storage.prefix)
        if (Array.isArray(toolListData)) {
          toolListData.forEach(item => {
            if (item.enableTool && item.shortcuts) {
              Mousetrap.bind(item.shortcuts.key, function (e) {
                if (e.preventDefault) {
                  e.preventDefault()
                } else {
                  // internet explorer
                  e.returnValue = false
                }
                _t.handleToolTrigger({
                  name: item.name,
                  data: {}
                })
                return false
              })
            }
          })
        }
        // 绑定按键事件
        document.addEventListener('keyup', function () {
          _t.$X.utils.bus.$emit('editor/contextmenu/close')
        })
      },
      bindUnload () {
        window.onbeforeunload = function (event) {
          event.returnValue = false
          return false
        }
      },
      handleEditorClick () {
        const _t = this
        _t.$X.utils.bus.$emit('editor/contextmenu/close')
      },
      // 还原
      doRevert (data) {
        const _t = this
        if (!data) {
          return
        }
        // 清空画布
        _t.editor.clear()
        // 更新currentItem
        _t.currentItem = []
        // 设置数据
        _t.editor.data(data)
        // 渲染
        _t.editor.render()
        _t.editor.getNodes().forEach(node => {
          const model = node.getModel()
          const radian = model.radian
          const keyShape = node.getKeyShape()
          keyShape.resetMatrix()
          keyShape.rotate(radian)
          const group = _t.editor.get('group')
          // 更新shapeControl
          utils.shapeControl.rotate(model, group, radian)
          // 更新锚点
          utils.anchor.rotate(model, group, radian)
        })
        // 加载数据后保存记录
        // 更新操作日志
        _t.doUpdateLog({
          action: 'loadData',
          data: {
            time: new Date(),
            content: _t.editor.save()
          }
        })
      },
      // 更新log
      doUpdateLog (data) {
        const _t = this
        if (!data.hasOwnProperty('action') || !data.action) {
          return
        }
        const oldLog = JSON.parse(JSON.stringify(_t.$X.utils.storage.get('log', _t.$X.config.storage.prefix)))
        const log = {
          current: null,
          list: []
        }
        switch (data.action) {
          // 记录
          case 'record':
            if (data.data) {
              if (oldLog.current === null) {
                oldLog.list = []
              } else if (oldLog.list.length - 1 > oldLog.current) {
                const removeCount = oldLog.list.length - 1 - oldLog.current
                oldLog.list.splice(oldLog.current + 1, removeCount)
              }
              if (_t.maxLogSize !== null && oldLog.list.length > _t.maxLogSize) {
                oldLog.list.splice(0, 1)
              }
              log.list = [
                ...oldLog.list,
                JSON.parse(JSON.stringify(data.data))
              ]
              log.current = log.list.length - 1
            }
            break
          // 撤销
          case 'undo':
            log.list = [
              ...oldLog.list
            ]
            log.current = oldLog.current - 1 < 0 ? 0 : oldLog.current - 1
            break
          // 重做
          case 'redo':
            log.list = [
              ...oldLog.list
            ]
            if (oldLog.current === null) {
              log.current = oldLog.list.length ? 0 : null
            } else {
              log.current = oldLog.current + 1 > oldLog.list.length - 1 ? oldLog.list.length - 1 : oldLog.current + 1
            }
            break
          // 清空
          case 'clearLog':
            log.list = []
            log.current = null
            break
          case 'loadData':
            if (data.data) {
              if (oldLog.current === null) {
                log.list = [
                  JSON.parse(JSON.stringify(data.data))
                ]
              } else {
                if (oldLog.list.length - 1 > oldLog.current) {
                  const removeCount = oldLog.list.length - 1 - oldLog.current
                  oldLog.list.splice(oldLog.current + 1, removeCount)
                }
                if (_t.maxLogSize !== null && oldLog.list.length > _t.maxLogSize) {
                  oldLog.list.splice(0, 1)
                }
                log.list = [
                  ...oldLog.list,
                  JSON.parse(JSON.stringify(data.data))
                ]
              }
              log.current = log.list.length - 1
            }
            break
        }
        _t.$X.utils.storage.set('log', log, _t.$X.config.storage.prefix)
      }
    },
    created () {
      const _t = this
      // 处理操作类型，初始化编辑器
      _t.initInfo()
      _t.$nextTick(_t.init)

      _t.$X.utils.bus.$on('editor/add/node', _t.doAddNode)
      _t.$X.utils.bus.$on('editor/tool/trigger', _t.handleToolTrigger)
      _t.$X.utils.bus.$on('editor/currentItem/update', function (data) {
        _t.editor.emit('editor:setItem', data)
      })
    }
  }
</script>
