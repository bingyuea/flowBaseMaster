/**
 * Created by OXOYO on 2019/5/31.
 *
 * cli 配置文件
 *
 * 文档：https://cli.vuejs.org/zh/config/
 */

module.exports = {
  // 部署应用包时的基本URL，置空使用相对路径
  publicPath: process.env.IS_BUILD_LIB ? '/' : '',
  // 打包输出目录
  outputDir: 'docs',
  // 静态资源目录
  assetsDir: '',
  productionSourceMap: false,
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    devtool: 'source-map',
    output: {
      chunkFilename: '[name].[chunkhash].js'
    }
  }
}
