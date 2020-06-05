/*
 * @Author: your name
 * @Date: 2020-05-18 16:52:55
 * @LastEditTime: 2020-05-18 19:32:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game/src/utils/OBBCollision.js
 */

export default function (sprite, otherSprite) {
    let horizontal = sprite.getAttribute('x') + sprite.getAttribute('height') > otherSprite.getAttribute('x') && sprite.getAttribute('x') < otherSprite.getAttribute('x') + otherSprite.getAttribute('height');
    let vertical = sprite.getAttribute('y') < otherSprite.getAttribute('y') + otherSprite.getAttribute('height') && sprite.getAttribute('y') + sprite.getAttribute('height') > otherSprite.getAttribute('y');

    return horizontal && vertical;
}
