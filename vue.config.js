const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    open: true,
    host: '0.0.0.0',
    proxy: {
      '/api': {
        target: 'http://192.168.113.249:8081/cms',
        changeOrigin: true,
        // 代表在代理请求的时候把  /api 替换成后面的这个空字符串
        pathRewrite: { '^/api': '' },
      },
    }
  }
})
