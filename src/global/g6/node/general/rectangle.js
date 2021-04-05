/**
 * Created by OXOYO on 2019/7/8.
 *
 * 矩形
 */

import * as G6Util from '@antv/util'
import base from '../base'

export default {
  name: 'rectangle',
  extendName: 'single-node',
  options: {
    ...base,
    shapeType: 'image',
    getShapeStyle (cfg) {
      const size = this.getSize(cfg)
      const width = size[0]
      const height = size[1]
      const x = 0 - width / 2
      const y = 0 - height / 2
      const style = G6Util.mix({}, {
        x,
        y,
        width,
        height,
        img: 'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png'
      }, cfg.style)
      return style
    }
  }
}
