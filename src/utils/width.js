/*
 * @Author: your name
 * @Date: 2020-05-15 20:45:36
 * @LastEditTime: 2020-05-15 20:46:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game/src/utils/width.js
 */

export default (function () {
    let width;
    return function () {
      if (arguments.length === 0) { return width }
  
      else {
        const _width = arguments[0];
        width = _width;
      }
    }
  })()
