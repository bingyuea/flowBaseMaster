
import XLSX from 'xlsx'

export default {
  createExcel (excelData) {
    const wb = XLSX.utils.book_new()
    Object.entries(excelData).forEach(sheet => {
      const sheetData = sheet[1]
      const sheetName = sheetData[0].form.modelName
      const s = sheetData.map((row, rowIndex) => {
        let obj = {}
        row.paramList.map(cell => {
          const name = cell.name
          obj = {
            'uid': rowIndex,
            'idx': cell.idx,
            ...obj,
            [name]: cell.defaultValue
          }
        })
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
