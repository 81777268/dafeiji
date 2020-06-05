/*
 * @Author: your name
 * @Date: 2020-05-19 14:47:57
 * @LastEditTime: 2020-05-20 16:43:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game/src/utils/loadAudioFile.js
 */
import { Howl, Howler } from 'howler';

import sun_sound from '../assets/sound/output.mp3';

export default function () {
    return new Promise(resolve => {
        let sound = new Howl({
            src: [sun_sound],
            preload: true,
            sprite: {
                bullet: [0, 209],
                enemy0_down: [2000, 2836],
                enemy1_down: [4000, 7291],
                enemy2_down: [9000, 10248],
                game_music: [12000, 613714],
            }
        });

        sound.once('load', function () {
            resolve(sound)
        });
    })
}

