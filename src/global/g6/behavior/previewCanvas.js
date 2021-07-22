import utils from "@/global/g6/utils";

/**
 * Created by OXOYO on 2019/9/27.
 *
 * 预览画布交互
 */

export default {
  name: 'preview-canvas',
  options: {
    getDefaultCfg () {
      return {
        config: {}
      }
    },
    getEvents () {
      return {
        'node:contextmenu': 'onNodeContextmenu',
        'canvas:contextmenu': 'onCanvasContextmenu',
        'edge:contextmenu': 'onEdgeContextmenu',
        'node:click': 'onNodeClick',
        'node:mousedown': 'onNodeMousedown',
        'edge:mousedown': 'onEdgeMousedown',
        'edge:dblclick': 'onEdgeDblclick',
      }
    },
    onNodeContextmenu (event) {
      const _t = this
      _t.graph.emit('editor:contextmenu', {
        type: 'node',
        x: event.clientX,
        y: event.clientY,
        canvasX: event.canvasX,
        canvasY: event.canvasY
      })
    },
    onCanvasContextmenu (event) {
      const _t = this
      _t.graph.emit('editor:contextmenu', {
        type: 'canvas',
        x: event.clientX,
        y: event.clientY,
        canvasX: event.canvasX,
        canvasY: event.canvasY
      })
    },
    onEdgeContextmenu (event) {
      const _t = this
      _t.graph.emit('editor:contextmenu', {
        type: 'edge',
        x: event.clientX,
        y: event.clientY,
        canvasX: event.canvasX,
        canvasY: event.canvasY
      })
    },
    onNodeClick(event) {
    },
    onNodeMousedown(event) {
      // console.log('onNodeMousedown')
      // 非左键忽略
      if (!utils.common.isLeftKey(event)) {
        return
      }
      const _t = this
      const model = event.item.getModel()
      _t.graph.emit('editor:getItem',[
        {
          type: 'node',
          id: model.id,
          model: model
        }
      ])
      // 初始化数据
      _t.info = {
        type: null,
        node: event.item,
        target: event.target
      }

      if (_t.info.target && _t.info.target.attr('name')) {
        switch (_t.info.target.attr('name')) {
          case 'anchorPoint':
            _t.info.type = 'drawLine'
            break
          case 'shapeControlPoint':
            _t.info.type = 'shapeControlPoint'
            break
          case 'shapeControlRotate':
            _t.info.type = 'shapeControlRotate'
            break
        }
      }
      if (_t.info && _t.info.type && _t[ _t.info.type ].start) {
        _t[ _t.info.type ].start.call(_t,event)
      }
    },
    onEdgeMousedown(event) {
      // console.log('onEdgeMousedown')
      const _t = this
      const model = event.item.getModel()
      _t.graph.emit('editor:getItem',[
        {
          type: 'edge',
          id: model.id,
          model: model
        }
      ])
    },
    onEdgeDblclick(event) {
      // console.log('onEdgeDblclick')
      const _t = this
      if (_t.config.edgeLabel) {
        // _t.edgeLabel.create.call(_t, event)
      }
    },
  }
}
