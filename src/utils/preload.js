/*
 * @Author: your name
 * @Date: 2020-05-14 20:13:13
 * @LastEditTime: 2020-05-14 20:50:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game/src/utils/preload.js
 */
import heroPNG from '../assets/img/hero.png';
import enemy0PNG from '../assets/img/enemy0.png';
import enemy1PNG from '../assets/img/enemy1.png';
import enemy2PNG from '../assets/img/enemy2.png';

import herohJSON from '../../public/hero.json';
import enemy0JSON from '../../public/enemy0.json';
import enemy1JSON from '../../public/enemy1.json';
import enemy2JSON from '../../public/enemy2.json';

const location = window.location.origin;

export default function(scene) {
  return Promise.all([
    scene.preload([`${location}${heroPNG}`, herohJSON]),
    scene.preload([`${location}${enemy0PNG}`, enemy0JSON]),
    scene.preload([`${location}${enemy1PNG}`, enemy1JSON]),
    scene.preload([`${location}${enemy2PNG}`, enemy2JSON]),
  ]);
}
