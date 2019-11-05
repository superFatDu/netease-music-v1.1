// const PROXY_TARGET = "http://10.0.5.23:3000";
// const PROXY_TARGET = "http://192.168.0.105:3000";
const PROXY_TARGET = {
  company: "",
  home: "http://192.168.0.105:3000"
};
module.exports = {
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    open: true,
    proxy: {
      "/api": {
        target: PROXY_TARGET.home,
        changeOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  },
  productionSourceMap: false
}