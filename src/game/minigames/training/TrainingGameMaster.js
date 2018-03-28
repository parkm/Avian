import * as PIXI from 'pixi.js';
import chocoImg from 'res/gfx/choco.png';
import grassImg from 'res/gfx/grass.png';

export default class TrainingGameMaster {
  constructor(canvas) {
    this.pixiApp = new PIXI.Application({
      view: canvas,
      width: 1200,
      height: 800
    });


    let renderer = this.pixiApp.renderer;

    let sprite = new PIXI.Sprite(this.createTexture(chocoImg));
    let grass = new PIXI.extras.TilingSprite(this.createTexture(grassImg), renderer.width, renderer.height);
    this.pixiApp.stage.addChild(grass);
    this.pixiApp.stage.addChild(sprite);
  }

  createTexture(imgSrc) {
    let img = document.createElement('img');
    img.src = imgSrc;
    return new PIXI.Texture(new PIXI.BaseTexture(img));
  }
}
