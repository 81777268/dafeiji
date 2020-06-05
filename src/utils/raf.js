/*
 * @Author: your name
 * @Date: 2020-05-15 11:02:01
 * @LastEditTime: 2020-05-15 11:02:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game/src/utils/raf.js
 */

window.RAF = (function () {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window
      .mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (
        callback) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();
