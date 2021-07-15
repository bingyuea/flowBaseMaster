 // 两种写入方式

/*
 const files = readFileSync(resolve('./paramsCCS.txt'))
// const files = readFileSync(resolve('./paramsGJB.txt'))
// const files = readFileSync(resolve('./paramsGJB.txt'))
const paramsList = files.toString().split('\r')
console.log(paramsList, '---------')
for (let file of paramsList) {
  if (!file) return
  file = file.replace(/[\r\n]/g, '')
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
*/
