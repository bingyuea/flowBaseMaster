const {
  appendFile,
  readdirSync,
  readFileSync
} = require('fs')
const { resolve } = require('path')
// const dir = '/Users/flavio/folder'

const files = readFileSync(resolve('./params.txt'))
const paramsList = files.toString().split('\r')
console.log(paramsList, '---------')
for (let file of paramsList) {
  if (!file) return
  if (file && file.includes('//')) continue
  file = file.replace(/[\r\n]/g, '')
  console.log(file, '============')
  const str = `
  {
    defaultValue: '',
    description: '',
    name: "${file.split('\t')[0]}(${file.split('\t')[1]})",
    unit: ''
  },
  `
  console.log(str)
  appendFile('params.js', str, error => {
    if (error) return console.log('写入文件失败,原因是' + error.message)
    console.log('写入成功')
  })
}
