/**
 * Created by OXOYO on 2019/7/11.
 *
 * 物料配置
 */

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
let k = 0; const arr = []
  while (k < 1) {
    k = k + 0.02
    arr.push([Number(k.toFixed(2)), Number(k.toFixed(2))])
  }
  console.log(JSON.stringify(arr))
const points = [[0.02, 0.02], [0.04, 0.04], [0.06, 0.06], [0.08, 0.08], [0.1, 0.1], [0.12, 0.12], [0.14, 0.14], [0.16, 0.16], [0.18, 0.18], [0.2, 0.2], [0.22, 0.22], [0.24, 0.24], [0.26, 0.26], [0.28, 0.28], [0.3, 0.3], [0.32, 0.32], [0.34, 0.34], [0.36, 0.36], [0.38, 0.38], [0.4, 0.4], [0.42, 0.42], [0.44, 0.44], [0.46, 0.46], [0.48, 0.48], [0.5, 0.5], [0.52, 0.52], [0.54, 0.54], [0.56, 0.56], [0.58, 0.58], [0.6, 0.6], [0.62, 0.62], [0.64, 0.64], [0.66, 0.66], [0.68, 0.68], [0.7, 0.7], [0.72, 0.72], [0.74, 0.74], [0.76, 0.76], [0.78, 0.78], [0.8, 0.8], [0.82, 0.82], [0.84, 0.84], [0.86, 0.86], [0.88, 0.88], [0.9, 0.9], [0.92, 0.92], [0.94, 0.94], [0.96, 0.96], [0.98, 0.98], [1, 1]]
/* eslint-disable */
export const iconStyle = {
  三相接地故障: { width: '196', height: '86', anchorPoints: [[0.5, 0]] },
  交流传输线: { width: '167', height: '27', anchorPoints: [[1, 0.5], [0, 0.5]] },
  交流母线: { width: '206', height: '12', anchorPoints: points },
  光伏: { width: '165', height: '311', anchorPoints: [[0.5, 1]] },
  // 光伏: { width: '165', height: '311', anchorPoints: points },
  开关动作: { width: '113', height: '54', anchorPoints: [[1, 0.5], [0, 0.5]] },
  接地: { width: '93', height: '93', anchorPoints: [[0.5, 0]] },
  柴油发电机: { width: '93', height: '79', anchorPoints: [[0.5, 0]] },
  '电动机 Group：Motor': { width: '95', height: '58', anchorPoints: [[0, 0.5]] },
  电容直流支路: { width: '167', height: '29', anchorPoints: [[1, 0.5], [0, 0.5]] },
  电感直流线: { width: '215', height: '33', anchorPoints: [[1, 0.5], [0, 0.5]] },
  '电抗器/电容器': { width: '144', height: '29', anchorPoints: [[1, 0.5]] },
  电阻电容串联直流线: { width: '225', height: '40', anchorPoints: [[1, 0.5], [0, 0.5]] },
  电阻电容并联直流线: { width: '196', height: '60', anchorPoints: [[1, 0.5], [0, 0.5]] },
  '电阻、电感与电容串联直流线': { width: '232', height: '37', anchorPoints: [[1, 0.5], [0, 0.5]] },
  '电阻、电感与电容并联直流线': { width: '186', height: '79', anchorPoints: [[1, 0.5], [0, 0.5]] },
  电阻电感串联直流线: { width: '212', height: '37', anchorPoints: [[1, 0.5], [0, 0.5]] },
  电阻直流线: { width: '201', height: '30', anchorPoints: [[1, 0.5], [0, 0.5]] },
  直流节点: {
    width: '70',
    height: '26',
    anchorPoints: [[0.5, 0], // top
      [1, 0.5], // right
      [0.5, 1], // bottom
      [0, 0.5]]
  },
  直驱风机: { width: '117', height: '117', anchorPoints: [[1, 0.5]] },
  相角测量单元: { width: '115', height: '38', anchorPoints: [[0, 0.5]] },
  逆变单元: { width: '210', height: '53', anchorPoints: [[0, 0.5], [1, 0.25], [1, 0.75]] },
  频率测量单元: { width: '134', height: '42', anchorPoints: [[0, 0.5]] },
  '1': { width: '80', height: '80', anchorPoints: [[0, 0.5]] },
  '2': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  '2SW1': { width: '80', height: '80', anchorPoints: [[0.5, 0], [0.25, 1], [0.75, 1]] },
  '3': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'BC1': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'BC2': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'BUS2': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'CABLE': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'CANE11': { width: '80', height: '80', anchorPoints: [[0.5, 0]] },
  'CAP2': { width: '80', height: '80', anchorPoints: [[0.5, 0]] },
  'CEN1': { width: '80', height: '80', anchorPoints: [[0.5, 1] ] },
  'CL1': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'CMYR': { width: '80', height: '80', anchorPoints: [[0.5, 0]] },
  'CONT': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'DC-LINK1': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'FUSE': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'GEA1': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'GRID': { width: '80', height: '80', anchorPoints: [[0, 0.5], [1, 0.25], [1, 0.75]] },
  'HF1': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'LOAD1': { width: '80', height: '80', anchorPoints: [[0.5, 0]] },
  'LUMP1': { width: '80', height: '80', anchorPoints: [[0.5, 0]] },
  'MGSET': { width: '80', height: '80', anchorPoints: [[0.5, 0]] },
  'MOV1': { width: '80', height: '80', anchorPoints: [[0.5, 0]] },
  'MTR1': { width: '80', height: '80', anchorPoints: [[0.5, 0]] },
  'NET-WORK': { width: '80', height: '80', anchorPoints: [[0, 0.5]] },
  'PAL-AN': { width: '80', height: '80', anchorPoints: [[0.5, 0.5]] },
  'PVA1': { width: '80', height: '80', anchorPoints: [[0.5, 1]] },
  'REC': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'SVC1': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'SW1': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'SYN1': { width: '80', height: '80', anchorPoints: [[0.5, 0]] },
  'T1': { width: '80', height: '80', anchorPoints: [[0.5, 0], [0.5, 1]] },
  'T2': { width: '80', height: '80', anchorPoints: [[0.5, 0]] },
  'T3': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'U1': { width: '80', height: '80', anchorPoints: [[0.5, 1]] },
  'WTG1': { width: '80', height: '80', anchorPoints: [[0.5, 1]] },
  'X1': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] },
  'Z1': { width: '80', height: '80', anchorPoints: [[0.5, 1], [0.5, 0]] }
}

export const shapeControl = {
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
