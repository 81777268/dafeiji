/*
 * @Author: your name
 * @Date: 2020-05-15 17:55:31
 * @LastEditTime: 2020-05-18 17:43:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /game/src/utils/util.js
 */
export const mathRandom = function (Max, Min) {
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.floor(Rand * Range);
    return num;
}

export const enemyDownImages = function (type) {
    const arr0 = [
        { texture: 'enemy0_down1.png' },
        { texture: 'enemy0_down2.png' },
        { texture: 'enemy0_down3.png' },
        { texture: 'enemy0_down4.png' },
    ]
    const arr1 = [
        { texture: 'enemy1_down1.png' },
        { texture: 'enemy1_down2.png' },
        { texture: 'enemy1_down3.png' },
        { texture: 'enemy1_down4.png' },
    ]
    const arr2 = [
        { texture: 'enemy2_down1.png' },
        { texture: 'enemy2_down2.png' },
        { texture: 'enemy2_down3.png' },
        { texture: 'enemy2_down4.png' },
        { texture: 'enemy2_down5.png' },
        { texture: 'enemy2_down6.png' },
    ]

    return [arr0, arr1, arr2][type]
}

export const enemyTypeToDurantion = function (type) {

    if (type === undefined) {
        return [ mathRandom(14000, 11000), mathRandom(20000, 14000), mathRandom(28000, 18000)]
    }

    let durantion = 0;
    switch (type) {
        case 0:
            durantion = mathRandom(20000, 12000)
            break;
        case 1:
            durantion = mathRandom(23000, 16000)
            break;
        case 2:
            durantion = mathRandom(30000, 20000)
            break;

        default:
            break;
    }

    return durantion;
}

export const enemyDataByType = function (type) {
    let enemyRevmoveAnimateTime = 0;
    let enemyRevmoveAnimateImages = [];
    let enemyAnimateDuration = 0;
    let enemyHeight = 39 / 2;
    let enemyWidth = 51 / 2;
    let hp = 1;
    let total_hp = 1;
    let enemyLoopNumber = 0;

    enemyRevmoveAnimateImages = enemyDownImages(type);
    enemyAnimateDuration = enemyTypeToDurantion(type);

    switch (type) {
        case 0:
            enemyRevmoveAnimateTime = 350;
            enemyHeight = 39 / 2;
            enemyWidth = 51 / 2;
            hp = 1;
            total_hp = 1;
            enemyLoopNumber = mathRandom(14, 9);
            break;
        case 1:
            enemyRevmoveAnimateTime = 600;
            enemyHeight = 89 / 2;
            enemyWidth = 69 / 2;
            hp = 4;
            total_hp = 4;
            enemyLoopNumber = mathRandom(5, 10);
            break;
        case 2:
            enemyRevmoveAnimateTime = 800;
            enemyHeight = 246 / 2;
            enemyWidth = 165 / 2;
            hp = 8;
            total_hp = 8;
            enemyLoopNumber = mathRandom(3, 1);
            break;
        default:
            break;

    }

    return { enemyRevmoveAnimateTime, enemyRevmoveAnimateImages, enemyAnimateDuration, enemyHeight, enemyWidth, hp,total_hp, enemyLoopNumber }
}
