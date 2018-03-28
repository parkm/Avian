import * as PIXI from 'pixi.js';

export default class Orb {
  constructor(gm, orbTex, type) {
    this.sprite = new PIXI.Sprite(orbTex);
    this.sprite.scale.x = 2;
    this.sprite.scale.y = 2;
    this.sprite.anchor.x = 0.5;
    this.sprite.anchor.y = 0.5;

    this.type = type;
    this.sprite.tint = this.getTypeTint(type);
  }

  getTypeTint(type) {
    switch(type) {
      case 'speed': return 0xfcff00;
      case 'stamina': return 0x00c0ff;
      case 'accel': return 0xb400ff;
      case 'vigor': return 0xff7800;
      default: return 0xffffff;
    }
  }
}
