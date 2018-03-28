import * as PIXI from 'pixi.js';

export default class BadGuy {
  constructor(gm, badGuyTex) {
    this.gm = gm;
    this.sprite = new PIXI.Sprite(badGuyTex);
    this.sprite.pivot.x = this.sprite.width / 2;
    this.sprite.pivot.y = this.sprite.height / 2 - 5;
  }

  onLoopUpdate(delta) {
    this.sprite.rotation += 0.15;
    let xmove = this.sprite.x - this.gm.bird.sprite.x;
    let ymove = this.sprite.y - this.gm.bird.sprite.y;
    let xmag = Math.sqrt(this.sprite.x * this.sprite.x);
    let ymag = Math.sqrt(this.sprite.y * this.sprite.y);
    this.sprite.x -= xmove / xmag * 2;
    this.sprite.y -= ymove / ymag * 2;
  }
}
