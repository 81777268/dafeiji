/*
 * @Author: your name
 * @Date: 2019-01-07 17:56:05
 * @LastEditTime: 2020-05-15 20:56:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game/src/utils/hero.js
 */
import {
  Sprite
} from 'spritejs';
import checkBorder from './checkBorder';

function Hero() {
  this.startX = 0;
  this.startY = 0;
  this.currentCoordinate = null;
  this.hero = new Sprite();
}

Hero.prototype.init = function () {
  this.hero.attr({
    texture: 'hero1.png',
    pos: [380, 1305],
    anchor: [0.5, 0.5],
    size: [100, 124],
    zIndex: 10,
    hero: true
  })

  this.hero.addEventListener('touchstart', evt => {
    const {
      x,
      y
    } = evt;
    this.startX = x;
    this.startY = y;
    checkBorder(this.hero, evt) &&
      this.hero.attr({
        pos: [x, y],
      });

    this.currentCoordinate = this.hero.attr('pos');
  })

  this.hero.addEventListener('touchmove', evt => {
    if (this.currentCoordinate !== null) {
      const {
        x,
        y
      } = evt;
      const moveX = x - this.startX,
        moveY = y - this.startY;

      checkBorder(this.hero, evt) &&
        this.hero.attr({
          pos: [this.currentCoordinate[0] + moveX, this.currentCoordinate[1] + moveY],
        });
    }
  })

  this.hero.addEventListener('touchend', evt => {
    this.currentCoordinate = null;
  })

  this.hero.animate(
    [{
      texture: 'hero2.png',
    },
    {
      texture: 'hero1.png',
    },
    ], {
    duration: 600,
    iterations: Infinity,
  }
  );

  return this.hero
}

export default Hero;