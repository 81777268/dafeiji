import styles from './index.css';
import React, { Component } from 'react';
import { Scene, Sprite, Group, Path, Label } from 'spritejs';
import { throttle } from 'lodash';

import preload from '../utils/preload';
import createScene from '../utils/createScene';
import Hero from '../utils/heroClass';
import Bullet from '../utils/bulletClass';
import Enemy from '../utils/actionEnemy';

import applicationCache from '../utils/worldData';
import { enemyTypeToDurantion, enemyDataByType } from '../utils/util';
import OBBCollision from '../utils/OBBCollision';
import '../utils/raf';

import soundPreload from '../utils/loadAudioFile';


let timerAnimation = null;
let currentbullet = 0;

let duration = 500; // 发射间隔 ms
let duration_fly = 100; // 碰撞检测 ms
let type = { general: 'general', super: 'super' }; // 弹药类型
let distance = 20; // 弹药间距
let enemy_constructor = {};

let backgroundPositionY = 0;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      styleMove: {},
      cacheGroup: {},
      hero: {},
      bullet: {},
      layer: {},
      Enemys: {},
      sound: {}
    };
  }
  async componentDidMount() {
    // 初始化游戏信息
    await this.init();
    // 开启监听帧动画
    this.loop();

    // 开始背景音乐
    this.initPlayBackGroundMusic();
  }

  componentWillUnmount() {
    cancelAnimationFrame(timerAnimation);
  }

  async init() {
      // 初始化基础场景
      const container = document.getElementById('container');
      const [scene, layer] = await createScene(container);
      this.layer = layer;

      // 初始化图片资源
      await preload(scene);
      // 初始化音频资源
      this.sound = await soundPreload();

      // 初始化cache
      applicationCache({
        layer,
        scene
      });

      // 初始化英雄类
      let hero = new Hero().init();

      layer.append(hero);
      this.hero = hero;

      // 初始化弹药
      let bullet = new Bullet();

      bullet.init(15);
      layer.append(bullet.group);
      this.cacheGroup = bullet.group;
      this.bullet = bullet;

      // 初始化敌机
      const Enemys = new Enemy(layer);

      // 创建敌机
      await Enemys.init(1, 20);
      await Enemys.init(0, 30);
      await Enemys.init(2, 10);
      this.Enemys = Enemys;


      console.info(`初始化完成`)




  }

  async loop() {
    const self = this;
    this.update();
    timerAnimation = window.RAF(function () {
      self.loop();
    });
  }

  async update() {
    // 射击
    this.beam(duration);
    // 敌机
    this.enemys(0, 3000)();
    this.enemys(1, 6000)();
    this.enemys(2, 10000)();

    // 碰撞检测
    this.onOBBCollision();

    // 背景动画
    this.loopBackgrounMove();
  }
  beam = throttle(() => {
    if (!this.cacheGroup) return;
    const bulletsChildNodes = this.cacheGroup.childNodes;
    this.bullet.setAttr(this.hero, bulletsChildNodes[currentbullet], type.general);
    if (currentbullet >= bulletsChildNodes.length) {
      currentbullet = 0;
    } else {
      currentbullet += 1;
    }

    this.sound.play('bullet');
  }, duration)

  onOBBCollision = throttle(() => {
    if (!this.cacheGroup) return;
    const bulletsChildNode = this.cacheGroup.childNodes;
    bulletsChildNode.forEach(item => {
      if (!item.attributes.visibility) {

        // this.bullet.fly(this.hero, item, distance);

        this.layer.children.forEach(enemy => {
          if (enemy.attributes.type >= 0 && enemy.attributes.visibility) {
            if (OBBCollision(enemy, item)) {
              const type = enemy.getAttribute('type');

              // 销毁子弹
              this.bullet.remove(this.hero, item);

              // 计算血量
              const hp = enemy.getAttribute('hp');
              const total_hp = enemy.getAttribute('total_hp');

              enemy.setAttribute('hp', hp - 1);

              if (hp - 1 <= total_hp / 2 && hp - 1 > 0) {
                if (type === 1) {
                  enemy.animate([{ texture: 'enemy1_hit.png' },], { duration: 400, fill: 'forwards' })
                }
                if (type === 2) {
                  enemy.animate([{ texture: 'enemy2_hit.png' },], { duration: 400, fill: 'forwards' })
                }
                return;
              }

              if (hp - 1 <= 0) {
                // 销毁飞机
                this.Enemys.remove(2, enemy);
                this.sound.play(`enemy${type}_down`);
              }
              return;
            }
            return
          }
        })

      }
    })
  }, duration_fly)

  enemys(type, duration) {
    let self = this;
    return function () {
      const prefix = `enemy${type}`;
      if (!enemy_constructor[prefix]) {
        enemy_constructor[prefix] = throttle((type) => {
          if (!self.layer) return
          const enemyLoopNumber = enemyDataByType(type).enemyLoopNumber;
          let num = 0;
          self.layer.children.forEach(item => {
            if (item.attributes.type === type && !item.attributes.visibility && num <= enemyLoopNumber) {
              self.Enemys.animate(item, function (enemy) {
                self.Enemys.remove(1, enemy)
              });
              num += 1;
            }
          })
        }, duration)
      } else {
        return enemy_constructor[prefix](type)
      }
    }
  }

  loopBackgrounMove() {
    this.setState({
      styleMove: {
        backgroundPositionY: `${backgroundPositionY}px`,
      },
    });
    backgroundPositionY += 1;
    if (backgroundPositionY === 852) {
      backgroundPositionY = 0;
    }
  }

  initPlayBackGroundMusic(){
    const game_music_id = this.sound.play('game_music');
    this.sound.volume(0.1,game_music_id);
    this.sound.loop(true,game_music_id )
  }

  render() {
    return (
      <div className={styles.wrap}>
        <div className={styles.bg} style={this.state.styleMove} />
        <div id="container" className={styles.container} />
      </div>
    );
  }
}

export default Index;
