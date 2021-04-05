/**
 * Created by OXOYO on 2019/7/11.
 *
 * 物料配置
 */

export default function (enableMaterials) {
  /*
  // FIXME 锚点、图形控制坐标系
  (0, 0) ---------- (0.5, 0) ---------- (1, 0)
  |                                          |
  |                                          |
  |                                          |
  (0, 0.5)                            (1, 0.5)
  |                                          |
  |                                          |
  |                                          |
  (0, 1) ---------- (0.5, 1) ---------- (1, 1)
  */

  const shapeControl = {
    // 控制器
    controllers: [
      [0, 0, 'nwse-resize'],
      [0, 0.5, 'ew-resize'],
      [0, 1, 'nesw-resize'],
      [0.5, 0, 'ns-resize'],
      [0.5, 1, 'ns-resize'],
      [1, 0, 'nesw-resize'],
      [1, 0.5, 'ew-resize'],
      [1, 1, 'nwse-resize']
    ],
    // 旋转
    rotate: true
  }

  // 锚点坐标
  const anchorPoints = [
    [0, 0],
    [0.25, 0],
    [0.5, 0],
    [0.75, 0],
    [1, 0],
    [1, 0.25],
    [1, 0.5],
    [1, 0.75],
    [1, 1],
    [0.75, 1],
    [0.5, 1],
    [0.25, 1],
    [0, 1],
    [0, 0.75],
    [0, 0.5],
    [0, 0.25]
  ]

  const defMaterials = [
    {
      name: 'general',
      label: 'General',
      lang: 'L10301',
      icon: '',
      enable: true,
      children: [
        {
          type: 'rectangle',
          label: 'Rectangle',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 40,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          img: 'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png'
        },
        {
          type: 'rounded-rectangle',
          label: 'Rounded Rectangle',
          defaultLabel: '',
          enable: true,
          width: 80,
          height: 40,
          minWidth: 20,
          minHeight: 20,
          anchorPoints: anchorPoints,
          shapeControl: shapeControl,
          img: 'https://g.alicdn.com/cm-design/arms-trace/1.0.155/styles/armsTrace/images/TAIR.png'
        }
      ]
    }
  ]
  let materials = []
  if (enableMaterials && enableMaterials instanceof Object && Object.keys(enableMaterials).length) {
    Object.entries(enableMaterials).forEach(item => {
      const [ name, types ] = item
      if (defMaterials.find(target => target.name === name)) {
        const materialItem = defMaterials[name]
        materialItem.children = materialItem.children.filter(child => types.includes(child.name))
        materials.push(materialItem)
      }
    })
  } else {
    materials = defMaterials
  }

  return materials
}
