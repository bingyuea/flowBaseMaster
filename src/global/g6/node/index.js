/**
 * Created by OXOYO on 2019/11/9.
 *
 * 注册自定义节点
 */

import general from './general'
import base from './base'
import * as G6Util from '@antv/util'
import { iconStyle } from '../../../config/icon'

const obj = {
  ...general
}

export default function (G6, devices) {
  if (devices && devices.length) {
    devices = devices.map(device => {
      let height = iconStyle[device.name].height
      let width = iconStyle[device.name].width
      return {
        name: device.name,
        sheetName: device.sheetName ? device.sheetName : '',
        data: JSON.stringify(device),
        extendName: 'base-node',
        options: {
          ...base,
          shapeType: 'image',
          getShapeStyle (cfg) {
            const size = this.getSize(cfg)
            width = size[0]
            height = size[1]
            const x = 0 - width / 2
            const y = 0 - height / 2
            const style = G6Util.mix({}, {
              x,
              y,
              width,
              height,
              img: device.imgUrl ? device.imgUrl :' '
            }, cfg.style)
            return style
          }
        }
      }
    })
  }
  const obj2 = {}
  devices && devices.map((e) => {
    obj2[e.name] = e
  })
  Object.assign(obj, obj2)
  Object.values(obj).map(item => {
    G6.registerNode(item.name, item.options, item.extendName)
  })
}
