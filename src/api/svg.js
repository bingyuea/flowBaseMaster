import { get, post } from '../global/utils/request'

export function getDevice () {
  return get({
    url: 'photinia-api/svg/device',
    params: ''
  })
}

export function getSvgById (id) {
  return get({
    url: 'photinia-api/svg/model',
    params: { id }
  })
}

export function uploadFn (file) {
  /* return get({
    url: `pyapi/upload/${file}`
  }) */
  return post({
    url: `pyapi/upload`,
    data: file
  })
}

export function uploadjson (json) {
  return post({
    url: `pyapi/uploadjson`,
    data: json
  })
}

// http://testflight.jokco.com/pyapi/v1/ShortCircuit/CCS/startCalc/17，开始计算这个接口，最后一个参数传 topologyId
export function startCalc (topologyId) {
  return get({
    url: `pyapi/v1/ShortCircuit/CCS/startCalc/${topologyId}`
  })
}

export function getCalcRes (idx) {
  return get({
    url: `pyapi/v1/ShortCircuit/CCS/getCalcRes/${idx}`
  })
}

export function deleteJSON (params) {
  return get({
    url: `pyapi/deletejson/${params}`
  })
}

// curl -X POST  -d'{"topologyId": 1' "http://testflight.jokco.com/pyapi/deletejson"        删除json

// curl -X POST  -d'{"userId": 1' "http://testflight.jokco.com/pyapi/getjsons"    获取拓扑列表

export function getjsons (params) {
  return post({
    url: `pyapi/getjsons`,
    data: params
  })
}
