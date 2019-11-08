const PROXY_TARGET = {
  company: "http://10.0.5.23:3000",
  home: "http://192.168.0.105:3000"
};
module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    open: true,
    proxy: {
      "/api": {
        target: PROXY_TARGET.company,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  productionSourceMap: false
}