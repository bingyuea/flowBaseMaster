/**
* Created by OXOYO on 2019/6/28.
*
* MaterialsEditor 物料编辑器
*/
/* eslint-disable */
<style scoped lang="less" rel="stylesheet/less">
  .materials-editor {
    display: inline-block;
    width: 100%;
    height: 100%;
    user-select: none;
    overflow: hidden;
    background: #f8f9fa;
  }
</style>

<template>
  <div class="materials-editor" @click="handleEditorClick" @contextmenu.stop.prevent>
    <ToolBar :editorData="editorData" :sysList="sysList" :toolList="toolList" :functionlist="functionlist"
             :currentItem="currentItem"></ToolBar>
    <Sketchpad></Sketchpad>
    <PanelRight :editorConfig="editorConfig" :toolList="toolList" :currentItem="currentItem"
                :originDataObj='originDataObj' :toolbarInfo='toolbarInfo'
                :materialList="materialList" @show = 'showFn' @triggerTool = 'triggerTool'></PanelRight>
    <PanelLeft :materialList='materialList' :toolbarInfo='toolbarInfo'></PanelLeft>
    <PreviewModel></PreviewModel>
    <ContextMenu :editorData="editorData" :toolList="toolList"></ContextMenu>
    <ShortcutList ref="shortcutList" :toolList="toolList" :shortcutMap="shortcutMap"></ShortcutList>
    <History ref="history" @on-revert="doRevert"></History>

    <!--元件信息-->
    <!--:title="currentShape"-->
    <el-dialog
      :title="currentShape ? currentShape + '属性设置' : '属性设置'"
      :visible.sync="dialogVisible"
      width="398px"
      :close-on-click-modal = 'false'
      :close-on-press-escape = 'false'
    >
      <Details ref='details' :originDataObj='originDataObj' :currentItem="currentItem" :mode = 'mode'></Details>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <upload :show.sync="uploadShow"></upload>
    <!--"生成结果报告"-->
    <result :show.sync="resultShow"></result>
    <!--保存拓扑-->
    <saveGui :show.sync="saveGuiShow" :getJsonData = 'getJsonData' :jsonData = 'jsonData'></saveGui>
    <!--管理拓扑-->
    <manage-gui :show.sync="manageGuiShow" @loadJson = '(json) => loadJson(json)' @copyFn = 'copyFn'></manage-gui>
  </div>
</template>

<script>
  import ToolBar from './containers/ToolBar'
  import Sketchpad from './containers/Sketchpad'
  import PanelRight from './containers/PanelRight'
  import PanelLeft from './containers/PanelLeft'
  import PreviewModel from './containers/PreviewModel'
  import ContextMenu from './containers/ContextMenu'
  import ShortcutList from './containers/ShortcutList'
  import Details from './containers/Details'
  import History from './containers/History'
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
  import {
    iconStyle,
    shapeControl
  } from '../config/icon'

  import { icon, line } from '@/global/g6/node/devicesParams'
  import _ from 'lodash'
  import upload from './toolbarContent/upload'
  import result from './toolbarContent/result'
  import saveGui from './toolbarContent/saveGUI'
  import manageGui from './toolbarContent/manageGUI'
  // import { uploadFn } from '../api/svg'
  import axios from 'axios'
  import VAR from '../global/utils/var'

  export default {
    name: 'MaterialsEditor',
    components: {
      ToolBar,
      Sketchpad,
      PanelRight,
      PanelLeft,
      PreviewModel,
      ContextMenu,
      ShortcutList,
      History,
      Details,
      upload,
      result,
      saveGui,
      manageGui
    },
    props: {
      maxLogSize: {
        type: Number,
        default: 20
      }
    },
    data () {
      return {
        toolbarInfo: {},
        dialogVisible: false,
        currentShape: '--',
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
        sysList: [],
        functionlist: [],
        // 快捷键列表
        shortcutMap: {},
        // 物料列表
        materialList: [],
        // 当前激活元素
        currentItem: [],
        materials: [],
        uploadShow: false,
        resultShow: false,
        saveGuiShow: false,
        manageGuiShow: false,
        jsonData: ''
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
      getJsonData () {
        const _t = this
        let content = _t.editor.save()
        content = JSON.stringify(content)
        console.log(content, 'getJsonData')
        // 加密时 可以先将中文 encodeURIComponent 加密，然后再用 btoa 加密
        // 解密时可以先将 atob 解密，然后再将 decodeURIComponent 解密
        content = btoa(encodeURIComponent(content))
        return content
      },
      showFn (val) {
        this[val] = true
      },
      triggerTool (info) {
        this.handleToolTrigger(info)
      },
      getOriginData (id, model) {
        const originDataObj = JSON.parse(localStorage.getItem('originDataObj' + String(id)))
        // todo test
        if (originDataObj) {
          this.originDataObj = { ...originDataObj, model }
        } else {
          let originData
          originData = icon.find(item => item.id === id) && icon.find(item => item.id === id).originData
          // line 特殊处理
          if (id === 'x-broken') originData = line[0].originData
          this.originDataObj = {
            originData: originData,
            originId: id,
            model
          }
          localStorage.setItem('originDataObj' + String(id), JSON.stringify(this.originDataObj))
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
          localStorage.setItem('devices', JSON.stringify(icon))
          window.location.reload()
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
                  sheetName: item.sheetName ? item.sheetName : '',
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
          sysList,
          functionlist,
          shortcutMap
        } = _t.$X.config.tools
        const materials = this.materials
        _t.$X.config.materials = _t.$X.config.materials.concat(this.materials)
        _t.toolList = toolList
        _t.sysList = sysList
        _t.functionlist = functionlist
        _t.shortcutMap = shortcutMap
        // todo svg
        _t.materialList = materials
        // _t.materialList =  _t.$X.config.materials
        _t.$X.utils.storage.set('toolList', toolList, _t.$X.config.storage.prefix)
        _t.$X.utils.storage.set('functionlist', functionlist, _t.$X.config.storage.prefix)
        _t.$X.utils.storage.set('sysList', sysList, _t.$X.config.storage.prefix)
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
              'zoom-canvas',
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
            // 只读，
            preview: [
              'zoom-canvas',
              'drag-canvas',
              'preview-canvas'
            ]
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
          lineType: 'x-broken',
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
        _t.editor.on('node:dblclick', function () {
          _t.dialogVisible = true
        })
        _t.editor.on('node:mouseover', _t._nodeHover)
        _t.editor.on('node:mouseout', _t._nodeOut)
        _t.editor.on('edge:mousedown', _t._edgeMousedown)
        _t.editor.on('edge:dblclick', _t._edgeDblclick)
        _t.editor.on('editor:getItem', function (data) {
          _t.currentItem = data
        })
        _t.editor.on('wheelzoom', function (e) {
          const zoom = _t.editor.getZoom()
          _t.updateZoomToolbar(zoom.toFixed(1))
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
          console.log('editor:record from', from)
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
      onSubmit () {
        // 触发子节点方法
        this.$refs.details.onSubmit()
        this.dialogVisible = false
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
        const model = event.item.getModel()
        const id = model && model.originId
        this.currentShape = model.name
        // 需要存 model数据
        if (id) this.getOriginData(id, JSON.stringify(model))
        _t.editor.setItemState(event.item, 'active', true)
      },
      _edgeMousedown (event) {
        const _t = this
        _t.doClearAllStates()
        const model = event.item.getModel()
        const id = model && model.type
        this.currentShape = model.name
        debugger
        // 需要存 model数据
        if (id) this.getOriginData(id, JSON.stringify(model))
        if (event.item && !event.item.destroyed) {
          _t.editor.setItemState(event.item, 'active', !event.item.hasState('active'))
        }
      },
      _edgeDblclick () {
        this.dialogVisible = true
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
          this.updateZoomToolbar(ratio)
        } else if (info.name === 'actualSize') {
          ratio = 1
          _t.editor.zoomTo(ratio, center)
        }
      },

      updateZoomToolbar (ratio) {
        const _t = this
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
      },
      doAddNode (info) {
        // console.log(info, 'doAddNode')
        const _t = this
        const node = {
          ...info,
          id: G6Util.uniqueId(),
          idx: _t.editor.$C.idx.idx,
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
        _t.editor.$C.idx.setIdx()
        // console.log(node, 'doAddNode')
        // 广播事件，通过自定义交互 node-control 添加节点
        _t.editor.emit('editor:addNode', node)
      },
      doSetMode (name) {
        const _t = this
        _t.mode = name
        // console.log(name, '--------------')
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
        console.log(info, 'handleToolTrigger')
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
            debugger
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
                      _t.editor.refresh()
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
                    _t.editor.refresh()
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
                  idx: _t.editor.$C.idx.idx,
                  groupId: '',
                  x,
                  y
                }
                _t.editor.$C.idx.setIdx()
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
          case 'preview': {
            console.log(info, '不同模式')
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
                      _t.loadJson(fileString)
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
              const content = _t.getJsonData()
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
            } else if (info.data === 'excel') {
              const dataList = []
              // 图
              console.log('开始导出')
              _t.editor.getNodes().forEach((node, index) => {
                // 处理图的bus，母线没有bus，line的bus是起始连接点，元件的连接点是与之的line非自己的点
                const model = node.getModel()
                let busList = []
                if (model.name !== '交流母线') {
                  const edges = node.getEdges()
                  busList = _.cloneDeep(edges)
                }
                if (model.params) {
                  const paramsCopy = JSON.parse(model.params)
                  paramsCopy.busList = []
                  paramsCopy.busList = busList
                  dataList.push(paramsCopy)
                }
              })
              // 线路
              _t.editor.getEdges().forEach((edge, index) => {
                const model = edge.getModel()
                const busList = []
                busList.push(edge.getSource(), edge.getTarget())
                if (model.params) {
                  const paramsCopy = JSON.parse(model.params)
                  paramsCopy.busList = []
                  paramsCopy.busList = busList
                  dataList.push(paramsCopy)
                }
              })
              console.log('得到参数', dataList)
              if (!dataList.length) {
                this.$message.error('元件数据不存在，请先录入数据在导出！')
                return
              }
              const excelData = _.groupBy(dataList, 'originId')
              _t.$X.utils.exportExcel.createExcel(excelData)
            } else if (info.data === 'upload') {
              const dataList = []
              // 图
              _t.editor.getNodes().forEach((node, index) => {
                // 处理图的bus，母线没有bus，line的bus是起始连接点，元件的连接点是与之的line非自己的点
                const model = node.getModel()
                let busList = []
                if (model.name !== '交流母线') {
                  const edges = node.getEdges()
                  busList = _.cloneDeep(edges)
                }
                if (model.params) {
                  const paramsCopy = JSON.parse(model.params)
                  paramsCopy.busList = []
                  paramsCopy.busList = busList
                  dataList.push(paramsCopy)
                }
              })
              // 线路
              _t.editor.getEdges().forEach((edge, index) => {
                const model = edge.getModel()
                const busList = []
                busList.push(edge.getSource(), edge.getTarget())
                if (model.params) {
                  const paramsCopy = JSON.parse(model.params)
                  paramsCopy.busList = []
                  paramsCopy.busList = busList
                  dataList.push(paramsCopy)
                }
              })
              if (!dataList.length) {
                this.$message.error('元件数据不存在，请先录入数据在导出！')
                return
              }
              const excelData = _.groupBy(dataList, 'originId')
              const file = _t.$X.utils.exportExcel.createExcel(excelData, true)
              const newFile = new window.File([file], 'file', { type: 'xls' })
              const formData = new window.FormData()
              formData.append('file', newFile, 'fileName.xls')
              axios.request({
                url: VAR.baseURL + 'pyapi/upload',
                method: 'post',
                data: formData
              }).then(res => {
                _t.$message.success('计算成功！')
              })
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
            // console.log(info)
            _t.editor.emit('background:set', info.data)
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
            break
          }
          case '绘图模式': {
            this.$set(this, 'toolbarInfo', info)
            const mode = info.item.icon
            if (mode === '绘图模式') this.doSetMode('edit')
            if (mode !== '绘图模式') this.doSetMode('preview')
            break
          }
          case '系统': {
            console.log(info, '系统')
            if (info.label === '文件') {
              if (info.item.name === '新建') {
                // 如果gui有图，则提示是否保存
                const needClear = _t.editor.getNodes().length
                if (needClear) {
                  this.$confirm('你有正在编辑的拓扑，是否保存之后再新增？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                  }).then(() => {
                    _t.saveGUI()
                  })
                }
              }
              if (info.item.name === '导出') {
                let content = _t.editor.save()
                content = JSON.stringify(content)
                // 加密时 可以先将中文 encodeURIComponent 加密，然后再用 btoa 加密
                // 解密时可以先将 atob 解密，然后再将 decodeURIComponent 解密
                content = btoa(encodeURIComponent(content))
                const blob = new Blob([content], {
                  type: 'application/json;charset=UTF-8'
                })
                const url = URL.createObjectURL(blob)
                const link = document.createElement('a')
                link.textContent = 'download json'
                link.href = url
                link.download = 'GUI'
                link.click()
                URL.revokeObjectURL(url)
              }
              if (info.item.name === '保存') {
                _t.saveGUI()
              }
            }

            if (info.label === '拓扑管理') {
              this.manageGuiShow = true
            }
            break
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
      // 另存为
      copyFn (val) {
        this.saveGUI()
        this.jsonData = val
      },
      loadJson (fileString) {
        const _t = this
        // 解密
        fileString = decodeURIComponent(atob(fileString))
        const fileJson = JSON.parse(fileString)
        // 清空画布
        _t.editor.clear()
        // TOPR 这里可以提pr解决上传回写问题
        _t.currentItem = []
        _t.editor.read(fileJson)
        _t.editor.refresh()
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
      },
      saveGUI () {
        this.saveGuiShow = true
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
        /* window.onbeforeunload = function (event) {
          event.returnValue = false
          return false
        } */
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
        _t.editor.read(data)
        _t.editor.refresh()
        _t.doZoom({
          name: 'actualSize'
        })
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
        debugger
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
        console.log(log, 'doUpdateLog')
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
