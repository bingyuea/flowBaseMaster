/**
 * Created by OXOYO on 2019/7/4.
 *
 * 注册自定义交互
 */

// 综合节点控制交互
import nodeControl from './nodeControl'
// 预览画布交互
import previewCanvas from './previewCanvas'
// 微调
import paramsControl from './paramsControl'

const obj = {
  nodeControl,
  previewCanvas,
  paramsControl
}

export default function (G6) {
  Object.values(obj).forEach(item => {
    G6.registerBehavior(item.name, item.options)
  })
}
