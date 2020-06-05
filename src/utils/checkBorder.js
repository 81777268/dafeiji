/*
 * @Author: your name
 * @Date: 2019-01-07 18:10:03
 * @LastEditTime: 2020-05-14 18:31:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game/src/utils/checkBorder.js
 */
import wroldData from './worldData';

export default (target, currentEvt) => {
  const {
    width,
    height
  } = target.attr();
  const {width:layerWidth, height: layerHeight} = wroldData();
  const {
    x,
    y
  } = currentEvt;

  if (
    x <= width / 2 ||
    x >= layerWidth - width / 2 ||
    y <= height / 2 ||
    y >= layerHeight - height / 2
  ) {
    return false;
  }
  return true;
};
