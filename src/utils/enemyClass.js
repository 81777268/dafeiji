/*
 * @Author: your name
 * @Date: 2019-01-09 11:49:49
 * @LastEditTime: 2020-05-18 17:43:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game/src/utils/enemyClass.js
 */
import {
  Sprite
} from 'spritejs';
import { enemyDataByType, mathRandom } from '../utils/util';
import worldData from './worldData';

function Enemy(layer) {
  this.layer = layer;
}

// 创建
Enemy.prototype.init = function (type, data) {
  const { total_hp, hp, x } = data;
  const img = `enemy${type}.png`;
  let enemy = new Sprite();
  let height = enemyDataByType(type).enemyHeight;

  const _h = 160;


  enemy.attr({
    y: mathRandom(-_h, mathRandom(24, 8) * -_h),
    // y: 500,
    x: x,
    anchor: [0.5, 0.5],
    texture: img,
    hp,
    total_hp,
    visibility: false,
    type: type,
    height: height * 2,
    locationY: height
  })

  return enemy
}

// 运行动画
Enemy.animate = function (enemy, data, fn) {
  const { duration } = data;
  const world = worldData();
  const height = enemy.attributes.locationY;
  const _y = enemy.attr().y;

  // console.log(_y)

  const animate = enemy.animate(
    [{
      y: _y
    },
    {
      y: world.height + height + 100
    },
    ], {
    duration: duration,
    fill: 'forwards',
    easing: 'linear'
  });

  animate.finished.then(() => {
    fn(enemy)
  });

  return enemy
}

Enemy.update = function (enemy) {
  const type = enemy.attributes.type;
  const hp = enemyDataByType(type).hp;
  const img = `enemy${type}.png`;

  const _h = 160;

  enemy.attr({
    y: mathRandom(-_h, mathRandom(24, 8) * -_h),
    visibility: false,
    texture: img,
    hp,
  })
}

export default Enemy;

