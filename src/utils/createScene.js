/*
 * @Author: your name
 * @Date: 2020-05-14 20:18:01
 * @LastEditTime: 2020-05-15 20:53:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game/src/utils/createScene.js
 */
import { Scene } from 'spritejs';

export default function (container) {
   return new Promise(function (resolve) {
    let scene = new Scene({
        container,
        width: 750,
        height: 1624,
        mode: 'stickyWidth',
    });

    resolve([scene, scene.layer()])
   })
}
