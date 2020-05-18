/*
 * @Descripttion: 
 * @Author: 278096437@qq.com 李万春
 */
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8090,
    proxy: {
      '/api': {
        target: 'http://www.api.com/index.php/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // 公共路径(必须有的)
  // publicPath: "/",
  // // 输出文件目录
  // outputDir: "dist",
  // // 静态资源存放的文件夹(相对于ouputDir)
  // assetsDir: "static",
  // // eslint-loader 是否在保存的时候检查(果断不用，这玩意儿我都没装)
  // lintOnSave:false,
  // // 我用的only，打包后小些
  // runtimeCompiler: false,
  productionSourceMap:false,
  chainWebpack: config => {
    config.plugins.delete('prefetch')
  }
}
