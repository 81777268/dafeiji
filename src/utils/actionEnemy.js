import Enemys from './enemyClass';
import wroldData from './worldData';

import { mathRandom, enemyDownImages, enemyDataByType } from '../utils/util';

function CreateEmenys(layer) {
  this.layer = layer;
}

// 创建
CreateEmenys.prototype.init = function (type, amount) {
  return new Promise(resolve => {
    for (let index = 0; index < amount; index++) {

      let worldWidth = wroldData();
      let width = enemyDataByType(type).enemyWidth;
      const enemyWidth = width + 10;
      let mark = mathRandom((worldWidth.width - enemyWidth), enemyWidth)

      const hp = enemyDataByType(type).hp;
      const total_hp = enemyDataByType(type).total_hp;
      const Emeny = new Enemys(this.layer);
      const emeny = Emeny.init(type, { hp, total_hp, x: mark });
      this.layer.append(emeny);
    }
    resolve();
  })
}


// 启动动画
CreateEmenys.prototype.animate = function (enemy, fn) {
  const type = enemy.attributes.type;
  let duration = enemyDataByType(type).enemyAnimateDuration;

  enemy.setAttribute('visibility', true);
  Enemys.animate(enemy, { duration }, function () {
    fn(enemy)
  })
}

// 自然销毁/销毁
CreateEmenys.prototype.remove = function (type, enemy, fn) {
  // type === 1 出界  === 2 销毁；
  const enemyType = enemy.attributes.type;
  let time = enemyDataByType(enemyType).enemyRevmoveAnimateTime;
  let arr = enemyDataByType(enemyType).enemyRevmoveAnimateImages;
  if (type === 1) {
    // 暂停动画 
    enemy.deactivateAnimations();
    Enemys.update(enemy);
    if (fn) fn()
  } else {
    const dro = enemy.animate(arr, { duration: time, fill: 'forwards' });
    dro.finished.then(() => {
      enemy.deactivateAnimations();
      Enemys.update(enemy);
    });
    if (fn) fn()
  }
}

export default CreateEmenys;




// createEmenys(smallAmount, middleAmount, bigAmount, layer, hpArr) {

//   function _createPushLayerEmenys(type, number, layer, hpArr) {
//     for (let index = 0; index < number; index++) {

//       enemy.on('update', (evt) => {
//         arr.forEach((block) => {
//           if (enemy.OBBCollision(block)) {
//             const type = enemy.attr('type');
//             let time = 0;
//             let arr = [];

//             switch (type) {
//               case 0:
//                 arr = arr0;
//                 time = 250;
//                 break;
//               case 1:
//                 arr = arr1;
//                 time = 400;
//                 break;
//               case 2:
//                 arr = arr2;
//                 time = 650;
//                 break;
//             }

//             // 销毁子弹
//             block.attr({ y: -300 })
//             // 计算血量
//             const hp = enemy.attr('hp');
//             const TOTAL_HP = enemy.attr('TOTAL_HP');
//             enemy.attr({
//               hp: hp - 1
//             })

//             if (hp - 1 <= TOTAL_HP / 2 && hp - 1 > 0) {

//               if (type == 1) {
//                 enemy.animate([{ textures: 'enemy1_hit.png' },], { duration: 400, fill: 'forwards' })
//               }
//               if (type == 2) {
//                 enemy.animate([{ textures: 'enemy2_hit.png' },], { duration: 400, fill: 'forwards' })
//               }
//               return;
//             }

//             if (hp - 1 <= 0) {
//               // 销毁飞机
//               const dro = enemy.animate(arr, { duration: time, fill: 'forwards' })
//               dro.finished.then(() => {
//                 enemy.remove();
//               });
//             }
//             return;
//           }
//           return;
//         });
//       });
//     }
//   }

//   let a = _createPushLayerEmenys(0, smallAmount, layer, hpArr);
//   _createPushLayerEmenys(1, middleAmount, layer, hpArr);
//   _createPushLayerEmenys(2, bigAmount, layer, hpArr);
// }



