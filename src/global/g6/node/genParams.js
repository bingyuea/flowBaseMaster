/*var config = {
  lang: ['CCS'],
  path: './paramsCCS.txt'
}*/
/*var config = {
  lang: ['GJB'],
  path: './paramsGJB.txt'
}*/
var config = {
  lang: ['GB'],
  path: './paramsGB.txt'
}
const fs = require('fs')
const readline = require('readline')
var fWrites = []
config.lang.map(item => {
  fWrites.push({
    writeStream: fs.createWriteStream(item),
    lang: item
  })
})
var fRead = fs.createReadStream(config.path)
fRead.on('end', () => {
  console.log('end')
})
fWrites.forEach(write => {
  var objReadline = readline.createInterface({
    input: fRead,
    output: write.writeStream,
    terminal: false
  })
  objReadline.on('line', async strLine => {
    // 读取文件内容
    console.log(strLine)
    if (!strLine) return
    const str = strLine.replace(/[\r\n]/g, '')
    const res = `
          {
            defaultValue: '',
            description: '',
            name: "${str.split('\t')[0]}(${str.split('\t')[1]})",
            unit: ''
          },
          `
    write.writeStream.write(res)
  })

  objReadline.on('close', () => {
    console.log('readline close...')
  })
})

