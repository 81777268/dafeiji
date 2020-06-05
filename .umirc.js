/*
 * @Author: your name
 * @Date: 2018-12-26 15:29:13
 * @LastEditTime: 2020-05-18 20:25:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game/.umirc.js
 */
// ref: https://umijs.org/config/
export default {
  antd: false,
  dva: false,
  dynamicImport: false,
  title: '飞机大战',
  dll: false,
  hardSource: false,
  routes: [
    {
      path: "/",
      component: "./index",
      routes: [
        {
          name: "index",
          // icon: "smile",
          path: "/",
          component: "./index"
        }
      ]
    },
  ],
  chainWebpack(config){
    config.module
      .rule('url-loader')
      .test(/\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/)
      .use('url-loader')
        .loader('url-loader')
        .end()
  },
  targets: {
    chrome: 30,
    firefox: 30,
    safari: 9,
    ie: 10,
    ios: 9
  }
}
