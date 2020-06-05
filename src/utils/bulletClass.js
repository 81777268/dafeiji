/*
 * @Author: your name
 * @Date: 2019-01-07 19:13:01
 * @LastEditTime: 2020-05-18 19:32:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game/src/utils/bullet.js
 */
import {
  Sprite,
  Group
} from 'spritejs';


function Bullet(layer) {
  this.layer = layer;
  this.defaultBulletSum = 10;
  this.group = new Group();
}

// 初始化弹药
Bullet.prototype.init = function (bulletSum) {
  bulletSum = bulletSum || this.defaultBulletSum;

  for (let index = 0; index < bulletSum; index++) {
    let bullet = new Sprite();
    bullet.attr({
      anchor: [0.5, 0.5],
      size: [9, 21],
      visibility: false,
    });
    // this.bulletStore.push(bullet);
    this.group.appendChild(bullet);
  }
}

// 发射
Bullet.prototype.setAttr = function (hero, bullet, type, fn) {
  if (!bullet) return;
  let [x, y] = hero.attr('pos');
  let width = hero.attr('width');

  bullet.attr({
    texture: `bullet${type === 'super' ? 2 : 1}.png`,
    pos: [x, y - width / 2],
  });

  const animate = bullet.animate(
    [{
      y: bullet.attr().y - width / 2
    },
    {
      y: -160
    },
    ], {
    duration: 2000,
    fill: 'forwards',
    easing: 'linear'
  });

  animate.finished.then(() => {
    bullet.deactivateAnimations();
    bullet.attr({
      texture: `bullet${type === 'super' ? 2 : 1}.png`,
      pos: [2000, y - width / 2],
    });
  });

  return bullet;
}

// 飞行
Bullet.prototype.fly = function (hero, bullet, distance) {
  let y = bullet.getAttribute('y') - distance;

  bullet.setAttribute('y', y)
  return bullet;
}


//销毁
Bullet.prototype.remove = function (hero, bullet) {
  let [x, y] = hero.attr('pos');
  let width = hero.attr('width');

  bullet.attr({
    pos: [-2000, -2000]
  });
  bullet.setAttribute('visibility', false)
  bullet.deactivateAnimations();
}

export default Bullet;
