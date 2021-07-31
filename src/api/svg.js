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

export function startCalc () {
  return get({
    url: 'pyapi/v1/ShortCircuit/CCS/startCalc/0'
  })
}

export function getCalcRes (idx) {
  return get({
    url: `pyapi/v1/ShortCircuit/CCS/getCalcRes/${idx}`
  })
}
