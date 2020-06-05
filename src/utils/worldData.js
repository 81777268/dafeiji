/*
 * @Author: your name
 * @Date: 2019-01-07 17:50:08
 * @LastEditTime: 2020-05-15 20:54:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game/src/utils/worldData.js
 */
export default (function () {
  let world;
  return function () {
    if (arguments.length === 0) { return world }

    else {
      const options = arguments[0];
      world = {
        width: options.layer.width,
        height: options.layer.height,
        sceneWidth: options.scene.width,
        sceneHeight: options.scene.height,
      }
    }

  }
})()






