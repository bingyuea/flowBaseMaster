
import XLSX from 'xlsx'
import de from 'element-ui/src/locale/lang/de'

export default {
  createExcel (excelData) {
    const wb = XLSX.utils.book_new()
    Object.entries(excelData).forEach(sheet => {
      const sheetData = sheet[1]
      const form = sheet[1][0].form
      const sheetName = form.sheetName ? form.sheetName : form.name
      const s = sheetData.map((row, rowIndex) => {
        const obj = {}
        // bus
        debugger
        if (row.busList) {
          const bus = []
          row.busList.map((cell, index) => {
            debugger
            const model = cell.getModel()
            const busIndex = model.idx
            // busIndex 这里需要取母线的busIndex
            bus.push(busIndex)
          })
          if (bus && bus.length) {
            const value = bus.join(',')
            Object.assign(obj, {
              'bus': value
            })
          }
        }

        row.originData.CCS.map(cell => {
          const name = cell.sign
          Object.assign(obj, {
            'uid': rowIndex,
            'idx': row.form.idx,
            ...obj,
            [name]: cell.defaultValue
          })
        })
        console.log(obj)
        return obj
      })
      console.log(s)
      XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(s), sheetName)
    })
    const workbookBlob = this.workbook2blob(wb)
    this.openDownloadDialog(workbookBlob, `GUI.xlsx`)
  },

  openDownloadDialog (blob, fileName) {
    if (typeof blob === 'object' && blob instanceof Blob) {
      blob = URL.createObjectURL(blob) // 创建blob地址
    }
    var aLink = document.createElement('a')
    aLink.href = blob
    // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
    aLink.download = fileName || ''
    var event
    if (window.MouseEvent) {
      event = new MouseEvent('click')
    } else {
      event = document.createEvent('MouseEvents')
      event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    }
    aLink.dispatchEvent(event)
  },

  workbook2blob (workbook) {
    // 生成excel的配置项
    var wopts = {
      // 要生成的文件类型
      bookType: 'xlsx',
      // // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
      bookSST: false,
      type: 'binary'
    }
    var wbout = XLSX.write(workbook, wopts)

    // 将字符串转ArrayBuffer
    function s2ab (s) {
      var buf = new ArrayBuffer(s.length)
      var view = new Uint8Array(buf)
      for (var i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff
      return buf
    }

    var blob = new Blob([s2ab(wbout)], {
      type: 'application/octet-stream'
    })
    return blob
  }
}
