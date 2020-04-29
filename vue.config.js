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
        target: 'http://api.2yue.cc/index.php/',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
